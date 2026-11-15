

import asyncio
import hashlib
import logging
import os
from contextlib import asynccontextmanager
from typing import Optional

import httpx
import joblib
import pandas as pd
import shap
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv(override=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ==============================================================================
# CONFIGURATION
# ==============================================================================

OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
FIREBASE_SERVICE_ACCOUNT_PATH: str = os.getenv(
    "FIREBASE_CONFIG_JSON", "service-account.json"
)
PROJECT_ID: str = os.getenv("PROJECT_ID", "medical-database-1da52")

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
EMBEDDING_MODEL = "openai/text-embedding-3-small"
LLM_MODEL = "google/gemini-2.0-flash-001"
FIRESTORE_COLLECTION = "diabetes_knowledge_base"

# Hardcoded IDs for the 2 Registry 2026 documents used in the Benchmark Validation step
# (fetched directly, bypassing vector search to guarantee the correct document is always retrieved)
BENCHMARK_DOC_ID_DOCTOR = "83040592-d71f-4dd7-85b3-fd382a8262e8"
BENCHMARK_DOC_ID_USER   = "ba39492f-5641-47d5-a3e2-c3be0d6a0058"

MODELS: dict = {}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_path(filename: str) -> str:
    return os.path.join(BASE_DIR, filename)


# ==============================================================================
# RAG QUERY DIVERSITY – Context-Aware Multi-Dimensional Query Constants
# ==============================================================================

# [BUG-02 FIX] Each smoking status maps to a distinct label.
# Previously current/ever/former all collapsed to "smoking", breaking deduplication.
CLINICAL_FEATURE_VI_MAP: dict[str, str] = {
    "num__blood_glucose_level":          "blood glucose",
    "num__HbA1c_level":                  "HbA1c",
    "num__age":                          "age",
    "num__bmi":                          "BMI index",
    "num__hypertension":                 "blood pressure",
    "num__heart_disease":                "heart disease",
    # Gender OHE dummies — kept distinct so _ohe_active_value() can filter correctly
    "cat__gender_Female":                "female gender",
    "cat__gender_Male":                  "male gender",
    # Smoking OHE dummies — each status has its own label
    "cat__smoking_history_current":      "current smoker",
    "cat__smoking_history_ever":         "ever smoked",
    "cat__smoking_history_former":       "former smoker",
    "cat__smoking_history_never":        "non-smoker",
    "cat__smoking_history_not_current":  "not current smoker",
    "cat__smoking_history_no_info":      "smoking history unknown",
}
HOME_FEATURE_KEY_MAP: dict[str, str] = {
    "High Blood Pressure":       "HighBP",
    "High Cholesterol":          "HighChol",
    "Cholesterol Check":         "CholCheck",
    "BMI Index":                 "BMI",
    "Smoking":                   "Smoker",
    "Stroke":                    "Stroke",
    "Heart Disease":             "HeartDiseaseorAttack",
    "Physical Activity":         "PhysActivity",
    "Fruit Intake":              "Fruits",
    "Vegetable Intake":          "Veggies",
    "Heavy Alcohol Consumption": "HvyAlcoholConsump",
    "General Health":            "GenHlth",
    "Mental Health":             "MentHlth",
    "Physical Health":           "PhysHlth",
    "Difficulty Walking":        "DiffWalk",
    "Gender":                    "Sex",
    "Age Group":                 "Age",
}
# Gold-standard features excluded from RAG query selection.
# HbA1c & Glucose always dominate SHAP top ranks for diabetes but add no
# retrieval diversity because every patient has them → skip them so that
# the truly differentiating secondary features drive the query.
GOLD_STANDARD_FEATURES: set[str] = {
    # Clinical-mode technical keys
    "num__HbA1c_level",
    "num__blood_glucose_level",
    # Clinical-mode mapped display names
    "HbA1c",
    "blood glucose",
    # Home-mode display names (already mapped)
    "HbA1c Level",
    "Blood Glucose Level",
}

# Threshold specs for enriching feature phrases with clinical context labels.
# List entries → (upper_bound_exclusive, label); Dict entries → {int_value: label}
CLINICAL_THRESHOLDS: dict = {
    # ── Clinical mode (technical keys) ──────────────────────────────────────
    "num__bmi": [
        (18.5,         "underweight BMI"),
        (23.0,         "normal BMI by Asian standards"),
        (27.5,         "overweight BMI by Asian standards"),
        (float("inf"), "obese BMI by Asian standards"),
    ],
    "num__age": [
        (35,           "young adult"),
        (50,           "middle-aged adult"),
        (65,           "older adult"),
        (float("inf"), "elderly patient"),
    ],
    "num__hypertension": {1: "with comorbid hypertension"},
    "num__heart_disease": {1: "with comorbid heart disease"},
    # ── Home mode (display names) ────────────────────────────────────────────
    "BMI Index": [
        (18.5,         "underweight BMI"),
        (23.0,         "normal BMI by Asian standards"),
        (27.5,         "overweight BMI by Asian standards"),
        (float("inf"), "obese BMI by Asian standards"),
    ],
    "Age Group": [
        (3,            "young adult (18–34)"),
        (6,            "middle-aged adult (35–49)"),
        (9,            "older adult (50–64)"),
        (float("inf"), "elderly patient (65+)"),
    ],
    "High Blood Pressure":  {1: "with high blood pressure"},
    "Heart Disease":        {1: "with comorbid heart disease"},
    "Smoking":              {1: "active smoker"},
    "Physical Activity":    {0: "physically inactive lifestyle"},
    "Stroke":               {1: "with prior stroke history"},
    "Difficulty Walking":   {1: "with difficulty walking"},
}

# Query templates rotated per patient to maximise embedding vector diversity.
# Placeholders: {features}  {risk_tier}  {context_hint}
QUERY_TEMPLATES: list[str] = [
    "Clinical management of type 2 diabetes in a {risk_tier} patient with {features}",
    "Diabetes prevention and lifestyle intervention for {context_hint} focusing on {features}",
    "Evidence-based treatment targets and monitoring for diabetic patient with {features} ({risk_tier})",
    "Complication risk and therapeutic approach for {risk_tier} diabetes: {features}",
    "Personalised care plan for {context_hint} with primary risk drivers: {features}",
]


# ==============================================================================
# RAG SERVICE  (async-native with httpx)
# ==============================================================================

class RAGService:
    """
    Handles the full RAG pipeline:
      1. Embedding  → httpx.AsyncClient  → OpenRouter /embeddings
      2. Retrieval  → Firestore find_nearest  (sync in executor)
      3. Synthesis  → httpx.AsyncClient  → OpenRouter /chat/completions
    """

    def __init__(self) -> None:
        self._http: Optional[httpx.AsyncClient] = None   # shared for embed + chat
        self._db = None                                   # Firestore client (sync)
        self.initialized = False

    # ── Initialization ─────────────────────────────────────────────────────────

    def initialize(self) -> bool:
        """Called in lifespan (sync context). Returns True if both connections are OK."""
        fs_ok = self._init_firestore()
        if not OPENROUTER_API_KEY:
            logger.error("❌ OPENROUTER_API_KEY has not been set.")
            self.initialized = False
            return False
        self.initialized = fs_ok
        status = "✅" if self.initialized else "⚠️"
        logger.info(f"{status} RAGService initialized (Firestore={fs_ok})")
        return self.initialized

    def _init_firestore(self) -> bool:
        try:
            import json
            from google.cloud import firestore
            from google.oauth2 import service_account

            raw = FIREBASE_SERVICE_ACCOUNT_PATH

            if raw.strip().startswith("{"):
                info = json.loads(raw)
                cred = service_account.Credentials.from_service_account_info(info)
            elif os.path.exists(raw):
                cred = service_account.Credentials.from_service_account_file(raw)
            else:
                logger.error(f"❌ Service account not found: {raw}")
                return False

            self._db = firestore.Client(credentials=cred, project=PROJECT_ID)
            logger.info("✅ Firestore client initialized.")
            return True
        except Exception as e:
            logger.error(f"❌ Firestore init failed: {e}")
            return False

    def _get_http_client(self) -> httpx.AsyncClient:
        """Creates AsyncClient lazily (must be called inside a coroutine)."""
        if self._http is None or self._http.is_closed:
            self._http = httpx.AsyncClient(
                base_url=OPENROUTER_BASE_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                timeout=60.0,
            )
        return self._http

    async def close(self) -> None:
        if self._http and not self._http.is_closed:
            await self._http.aclose()

    # ── STEP 3a: Embedding (async native) ─────────────────────────────────────

    async def get_embedding(self, text: str) -> list[float]:
        client = self._get_http_client()
        payload = {
            "model": EMBEDDING_MODEL,
            "input": [text.replace("\n", " ")],
        }
        resp = await client.post("/embeddings", json=payload)
        resp.raise_for_status()
        return resp.json()["data"][0]["embedding"]

    # ── STEP 3b: Vector Search Firestore (sync → executor) ────────────────────

    async def retrieve_context(
        self,
        query_text: str,
        audience_type: str,   # "doctor" | "user"
        top_k: int = 4,
    ) -> list[dict]:
        """
        Returns list[{"index": int, "content": str, "header": str}]
        audience_type:
          - clinical endpoint → "doctor"
          - home endpoint     → "user"
        """
        query_vector = await self.get_embedding(query_text)

        def _sync_search() -> list[dict]:
            from google.cloud.firestore_v1.base_query import FieldFilter
            from google.cloud.firestore_v1.base_vector_query import DistanceMeasure
            from google.cloud.firestore_v1.vector import Vector

            collection = self._db.collection(FIRESTORE_COLLECTION)
            results = (
                collection
                .where(filter=FieldFilter("audience", "==", audience_type))
                .find_nearest(
                    vector_field="embedding",
                    query_vector=Vector(query_vector),
                    distance_measure=DistanceMeasure.COSINE,
                    limit=top_k,
                )
                .get()
            )
            docs = []
            for i, doc in enumerate(results, start=1):
                data = doc.to_dict()
                content = data.get("content", "")
                metadata = data.get("metadata", {})
                header = (
                    metadata.get("Header_3") or
                    metadata.get("Header_2") or
                    metadata.get("Header_1") or
                    "General Reference Document"
                )
                logger.debug(
                    f"  [RAG][{audience_type}] Segment {i} ({header}): {content[:80]}..."
                )
                #print(content)
                # [BUG-05 FIX] Removed debug print(content) that dumped full docs to stdout
                docs.append({"index": i, "content": content, "header": header})
            return docs

        # [BUG-04 FIX] asyncio.get_event_loop() deprecated; use get_running_loop()
        return await asyncio.get_running_loop().run_in_executor(None, _sync_search)

    # ── STEP 3c: Fetch Benchmark Document (direct ID, sync → executor) ────────

    async def fetch_benchmark_doc(self, audience_type: str) -> str:
        """
        Fetches the Registry 2026 document directly by hardcoded ID from Firestore.
        Used in the Benchmark Validation step inside synthesize_advice.
        audience_type: "doctor" → BENCHMARK_DOC_ID_DOCTOR
                       "user"   → BENCHMARK_DOC_ID_USER
        Returns the document content (str) or an empty string on error.
        """
        doc_id = (
            BENCHMARK_DOC_ID_DOCTOR if audience_type == "doctor"
            else BENCHMARK_DOC_ID_USER
        )

        def _sync_fetch() -> str:
            try:
                doc_ref = self._db.collection(FIRESTORE_COLLECTION).document(doc_id)
                doc = doc_ref.get()
                if not doc.exists:
                    logger.warning(f"⚠️ [Benchmark] Document {doc_id} does not exist.")
                    return ""
                content = doc.to_dict().get("content", "")
                logger.info(
                    f"✅ [Benchmark][{audience_type}] Retrieved Registry 2026 "
                    f"({len(content)} characters)"
                )
                return content
            except Exception as e:
                logger.error(f"❌ [Benchmark] Fetch failed ({doc_id}): {e}")
                return ""

        # [BUG-04 FIX] use get_running_loop()
        return await asyncio.get_running_loop().run_in_executor(None, _sync_fetch)

    # ── STEP 4: LLM Synthesis (async native) ──────────────────────────────────

    async def synthesize_advice(
        self,
        prob: float,
        impacts: list[dict],
        role: str,          # "Clinician" | "General User"
        raw_data: dict,
        context_docs: list[dict],
        benchmark_doc: str = "",   # ← Registry 2026 content for Validate/Critique
    ) -> str:
        """
        Synthesizes advice following a 3-step process:
          Step 1 – Verify:   Compare patient clinical markers vs Thresholds in benchmark_doc
          Step 2 – Critique: Assess the validity of ML prob & SHAP impacts vs RAG
          Step 3 – Synthesis: Provide recommendations based on context_docs (vector search)
        """

        benchmark_block = (
            benchmark_doc.strip()
            if benchmark_doc.strip()
            else "No Registry 2026 data was loaded."
        )

        context_block = (
            "\n\n".join(
                f"[Segment {d['index']}] (Source: {d['header']}):\n{d['content']}"
                for d in context_docs
            )
            if context_docs
            else "No supplementary medical context was retrieved."
        )

        is_doctor = (role == "Clinician")

        system_prompt = f"""You are {'an endocrinology specialist supporting clinical practitioners' if is_doctor else 'a general practitioner supporting general users'}.

You are provided with 2 separate medical data sources:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[REGISTRY 2026 – BENCHMARK STANDARD]
(Used for Steps 1 & 2: Threshold Comparison & ML Critique)
{benchmark_block}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SUPPLEMENTARY CONTEXT – VECTOR SEARCH]
(Used for Step 3: Detailed Recommendation Synthesis)
{context_block}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MANDATORY WORKFLOW – 3-STEP REASONING PROCESS:

STEP 1 – BENCHMARK COMPARISON (Verify):
  • Take each of the patient's clinical markers (BMI, Blood Glucose, HbA1c, age, blood pressure...)
  • Compare them directly against the Thresholds defined in [REGISTRY 2026]
  • Clearly state which markers EXCEED THRESHOLDS and which are within normal limits

STEP 2 – ML MODEL & SHAP CRITIQUE (Critique):
  • Assess whether the ML probability is CONSISTENT with the results from Step 1
    – If ML indicates high risk but all markers are normal: identify the discrepancy
    – If ML indicates low risk but a marker exceeds a threshold: issue an additional warning
  • Evaluate whether the top SHAP features align with the biomechanical mechanisms described in [REGISTRY 2026]
  ⚠️ SAFETY GUARDRAIL: If the ML prediction is found to be INCONSISTENT with the clinical data,
     REQUIRED output: "⚠️ Warning: The technical prediction result shows signs of being inconsistent
     with the current clinical data; verification of [specific marker name] should be prioritized."

STEP 3 – ADVICE SYNTHESIS (Synthesis):
  • After verifying reliability, provide recommendations based on [SUPPLEMENTARY CONTEXT]
  • Every piece of advice must be anchored to the patient's actual data values

GENERAL RULES:
  • NO social pleasantries; begin the response immediately
  • If the Registry does not address a particular issue: write "Current data does not address this issue."
  • Accuracy > Length: prioritize information grounded in RAG
"""

        if is_doctor:
            user_prompt = f"""INPUT DATA:
- Diabetes probability (ML): {prob * 100:.1f}%
- Top SHAP impacts: {impacts}
- Detailed clinical information: {raw_data}

Respond using exactly the 3 sections below (DO NOT add any other sections):

---
**[CLINICAL COMPARISON ANALYSIS]**
*(Steps 1 + 2: Verify & Critique)*
- List each patient marker and compare it against the Thresholds from Registry 2026
- Assess the validity of the ML probability of {prob * 100:.1f}% based on the comparison results
- Evaluate whether the top SHAP features are consistent with the biomechanical mechanisms described in the Registry
- If discrepancies/contradictions are detected: include the mandatory Safety Guardrail warning

**[BIOMECHANICAL MECHANISM]**
*(Explain the mechanism by which the top SHAP features lead to this outcome)*
- Based on mechanisms described in Registry 2026 and SUPPLEMENTARY CONTEXT

**[CLINICAL MANAGEMENT PLAN]**
*(Step 3: Synthesis – in-depth clinical recommendations based on vector search)*
- Additional tests to order (with specific rationale)
- Proposed treatment / intervention approach
- Follow-up schedule and key reassessment milestones
- Urgent alerts if any critical markers are present
"""
        else:
            # [BUG-08 FIX] Replaced literal "raw_data" string in prompt with proper phrasing
            user_prompt = f"""INPUT DATA:
- Diabetes probability (ML): {prob * 100:.1f}%
- Key influencing factors (SHAP): {impacts}
- Health information: {raw_data}

ADDITIONAL RULES:
1. Use plain, easy-to-understand language for users without a medical background
2. Every data value must be explained in context (e.g., "Your BMI of 28 corresponds to Grade I Obesity by Asian standards")
3. Explain this medical data simply but with 100% adherence to the provided sources.

Respond using exactly the 3 sections below (DO NOT add any other sections):

---
**[HEALTH VERIFICATION]**
*(Steps 1 + 2: Simple explanation of markers & assessment of AI results)*
- Explain each of your markers against the standard Thresholds from Registry 2026 (use friendly language)
- Confirm whether the prediction of {prob * 100:.1f}% is consistent with your current lifestyle and markers
- If discrepancies/contradictions are detected: explain gently in plain language (avoid technical jargon)
- Note: the actual age group mapping is: 1(18-24), 2(25-29), 3(30-34), 4(35-39), 5(40-44), 6(45-49), 7(50-54), 8(55-59), 9(60-64), 10(65-69), 11(70-74), 12(75-79), 13(80+)

**[PREDICTION ASSESSMENT]**
*(Practical meaning of the result – why these factors matter for you)*
- Explain why the top SHAP factors affect your risk level, ONLY explain mechanisms found in [Registry 2026] or [SUPPLEMENTARY CONTEXT].
- If a factor's biological mechanism isn't in the context, describe its general impact as shown in your data.

**[ACTION PLAN]**
*(Step 3: Synthesis – practical, quantified advice)*
- Provide diet and exercise advice derived EXCLUSIVELY from [SUPPLEMENTARY CONTEXT].
- Each advice MUST cite its source, for example: "Engage in 150 minutes of exercise per week [Segment 2]".
- If specific quantities (grams/minutes) are not in the segments, do not invent them. 
"""

        try:
            client = self._get_http_client()
            payload = {
                "model": LLM_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            }
            resp = await client.post("/chat/completions", json=payload)
            resp.raise_for_status()
            return resp.json()["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"❌ LLM synthesis failed: {e}")
            return self._fallback_advice(prob, impacts)

    # ── Utilities ──────────────────────────────────────────────────────────────

    @staticmethod
    def _resolve_display_name(raw: str, feature_vi_map: Optional[dict]) -> str:
        """Translate a technical feature key to a human-readable display name."""
        if feature_vi_map and raw in feature_vi_map:
            return feature_vi_map[raw]
        return raw.replace("num__", "").replace("cat__", "").replace("_", " ")

    @staticmethod
    def _get_threshold_label(feature: str, value) -> Optional[str]:
        """
        Return a clinically meaningful label for a (feature, value) pair using
        CLINICAL_THRESHOLDS. Returns None if the feature is not registered.
        """
        spec = CLINICAL_THRESHOLDS.get(feature)
        if spec is None:
            return None
        if isinstance(spec, dict):
            try:
                return spec.get(int(value)) if value is not None else None
            except (TypeError, ValueError):
                return None
        if isinstance(spec, list):
            try:
                v = float(value)
            except (TypeError, ValueError):
                return None
            for upper, label in spec:
                if v < upper:
                    return label
        return None

    @staticmethod
    def _ohe_active_value(raw_key: str, raw_data: dict) -> Optional[int]:
        """
        [BUG-01, BUG-03 FIX]

        Decode whether an OHE cat__ feature is active (1) or not (0) by
        looking up the original field in raw_data.

        Strategy for cat__{field}_{category} keys:
          - Split the suffix on "_" and try each possible split point from left
            to right until we find a key that exists in raw_data.
          - Compare raw_data[field] (lowercased, spaces→underscores) against
            the category portion of the key.
          - Return 1 if they match, 0 otherwise.

        For num__ keys return None (they are not OHE dummies; callers treat
        None as "not applicable" and keep the feature unconditionally).

        Examples
        --------
        raw_key="cat__gender_Female",   raw_data={"gender": "Female"} → 1
        raw_key="cat__gender_Male",     raw_data={"gender": "Female"} → 0
        raw_key="cat__smoking_history_current", raw_data={"smoking_history":"current"} → 1
        raw_key="cat__smoking_history_no_info", raw_data={"smoking_history":"current"} → 0
        raw_key="num__bmi"                                                              → None
        """
        if not raw_key.startswith("cat__"):
            return None  # num__ features: not an OHE dummy

        suffix = raw_key[len("cat__"):]   # e.g. "gender_Female" or "smoking_history_current"
        parts = suffix.split("_")

        for split in range(1, len(parts)):
            candidate_field    = "_".join(parts[:split])
            candidate_category = "_".join(parts[split:])

            if candidate_field not in raw_data:
                continue

            actual_value = str(raw_data[candidate_field]).lower().replace(" ", "_")
            match_value  = candidate_category.lower()
            return 1 if actual_value == match_value else 0

        # Could not decode → treat as inactive to avoid false positives
        return 0

    @staticmethod
    def _build_risk_tier(prob: float) -> str:
        """Map a probability (0–1) to a descriptive risk-tier string."""
        if prob >= 0.75:
            return "very high-risk"
        if prob >= 0.50:
            return "high-risk"
        if prob >= 0.30:
            return "moderate-risk"
        return "low-risk"

    @staticmethod
    def _build_context_hint(enriched_features: list[dict]) -> str:
        """
        Derive a short patient-archetype phrase from the enriched feature list.
        Example output: "overweight middle-aged adult, current smoker"

        [BUG-07 FIX] Extended comorbidity set to cover new per-status smoking labels
        (current smoker, former smoker, etc.) and added "smoker" substring check.
        """
        age_label: Optional[str] = None
        bmi_label: Optional[str] = None
        comorbidity_labels: list[str] = []

        _KNOWN_COMORBIDITIES: set[str] = {
            "active smoker",
            "current smoker",
            "ever smoked",
            "former smoker",
            "not current smoker",
            "physically inactive lifestyle",
            "with prior stroke history",
            "with difficulty walking",
        }

        for ef in enriched_features:
            label = ef.get("threshold_label") or ""
            if not label:
                continue
            if any(k in label for k in ("adult", "elderly", "young")):
                age_label = label
            elif any(k in label for k in ("BMI", "weight", "obese")):
                bmi_label = label
            elif label.startswith("with") or label in _KNOWN_COMORBIDITIES or "smoker" in label:
                comorbidity_labels.append(label)

        parts: list[str] = []
        if bmi_label:
            parts.append(bmi_label)
        if age_label:
            parts.append(age_label)
        parts.extend(comorbidity_labels[:2])
        return " ".join(parts) if parts else "adult diabetic patient"

    @staticmethod
    def build_rag_query(
        impacts: list[dict],
        feature_vi_map: Optional[dict] = None,
        raw_data: Optional[dict] = None,
        prob: float = 0.5,
        top_n: int = 4,
        query_variant: int = 0,
    ) -> str:
        """
        Build a diverse, context-aware semantic query for RAG retrieval.

        Strategy
        --------
        0. [BUG-01 FIX] Filter OHE dummies with decoded value = 0 BEFORE ranking.
           Only features whose cat__ dummy is actually active (value=1) proceed.
        1. Exclude gold-standard features (HbA1c, Glucose) that always dominate
           SHAP but add no retrieval diversity across patients.
        2. Take the top_n remaining features sorted by |SHAP impact|.
        3. Enrich each feature with a clinical threshold label and its raw value.
        4. Derive a short patient archetype (context_hint) from the enriched list.
        5. Select a query template via query_variant to rotate semantics.
        """

        # ── Step 0 [BUG-01 FIX]: Remove inactive OHE dummies ─────────────────
        # For cat__ features: keep only if decoded value == 1 (active dummy).
        # For num__ features (or unknown): always keep.
        # If raw_data is unavailable, skip this filter entirely (graceful degradation).
        if raw_data:
            active_impacts = []
            for item in impacts:
                raw_key = item["feature"]
                ohe_val = RAGService._ohe_active_value(raw_key, raw_data)
                if ohe_val is not None and ohe_val == 0:
                    continue  # OHE dummy is inactive → discard
                active_impacts.append(item)
        else:
            active_impacts = list(impacts)

        # ── Step 1: Sort by |SHAP impact| ────────────────────────────────────
        sorted_impacts = sorted(
            active_impacts, key=lambda x: abs(x["impact"]), reverse=True
        )

        # ── Step 2: Filter gold-standard features ─────────────────────────────
        filtered: list[dict] = []
        for item in sorted_impacts:
            raw_key = item["feature"]
            display = RAGService._resolve_display_name(raw_key, feature_vi_map)
            if raw_key in GOLD_STANDARD_FEATURES or display in GOLD_STANDARD_FEATURES:
                continue
            filtered.append({**item, "display": display})

        # Graceful fallback: if everything was filtered out, use active top_n
        selected = filtered[:top_n] if filtered else [
            {
                **item,
                "display": RAGService._resolve_display_name(
                    item["feature"], feature_vi_map
                ),
            }
            for item in sorted_impacts[:top_n]
        ]

        # ── Step 3: Deduplicate display names ─────────────────────────────────
        # After BUG-01 fix each gender/smoking group has at most one active dummy,
        # so collisions here are now rare — but we keep the guard for safety.
        seen: set[str] = set()
        unique_selected: list[dict] = []
        for item in selected:
            if item["display"] not in seen:
                seen.add(item["display"])
                unique_selected.append(item)

        # ── Step 4: Enrich with threshold labels and correct raw values ────────
        # [BUG-03 FIX] Use _ohe_active_value() for cat__ keys instead of the
        # naive strip-and-lookup that produced "gender_Male" → None.
        enriched: list[dict] = []
        for item in unique_selected:
            raw_key = item["feature"]
            display = item["display"]
            raw_val: Optional[object] = None

            if raw_data:
                if raw_key.startswith("cat__"):
                    # For OHE features the "value" for threshold lookup is 0/1
                    raw_val = RAGService._ohe_active_value(raw_key, raw_data)
                elif raw_key.startswith("num__"):
                    clean_key = raw_key.replace("num__", "")
                    raw_val = raw_data.get(clean_key)
                else:
                    # Home-mode: display names are used as feature keys.
                    # First try the explicit HOME_FEATURE_KEY_MAP to resolve the
                    # actual HomeInput field name (e.g. "BMI Index" → "BMI"),
                    # then fall back to direct key / display name lookup.
                    actual_key = HOME_FEATURE_KEY_MAP.get(raw_key) or HOME_FEATURE_KEY_MAP.get(display)
                    raw_val = (
                        raw_data.get(actual_key)
                        if actual_key is not None
                        else raw_data.get(raw_key) or raw_data.get(display)
                    )

            threshold_label = (
                RAGService._get_threshold_label(raw_key, raw_val)
                or RAGService._get_threshold_label(display, raw_val)
            )

            # For phrase building: use the actual numeric/categorical value for
            # num__ features, and the decoded 0/1 only for binary OHE ones.
            # For display purposes in the phrase, get the human-readable value
            # for cat__ features (e.g. show "current" not "1").
            display_val: Optional[object] = raw_val
            if raw_key.startswith("cat__") and raw_data:
                # Show the raw_data field value (e.g. "current") not "1"
                suffix = raw_key[len("cat__"):]
                parts = suffix.split("_")
                for split in range(1, len(parts)):
                    candidate_field = "_".join(parts[:split])
                    if candidate_field in raw_data:
                        display_val = raw_data[candidate_field]
                        break

            enriched.append({
                "feature":         display,
                "impact":          item["impact"],
                "raw_value":       display_val,
                "threshold_label": threshold_label,
            })

        # ── Step 5: Build feature phrase list ─────────────────────────────────
        feature_phrases: list[str] = []
        for ef in enriched:
            fname     = ef["feature"]
            val       = ef["raw_value"]
            label     = ef["threshold_label"]
            direction = "elevated" if ef["impact"] > 0 else "reduced"

            if label and val is not None:
                phrase = f"{label} ({fname}: {val}) – {direction} risk contribution"
            elif label:
                phrase = f"{label} – {direction} risk contribution"
            elif val is not None:
                phrase = f"{fname} ({val}) – {direction} risk contribution"
            else:
                phrase = fname
            feature_phrases.append(phrase)

        # ── Step 6: Build archetype hint and risk tier ────────────────────────
        risk_tier    = RAGService._build_risk_tier(prob)
        context_hint = RAGService._build_context_hint(enriched)
        features_str = (
            "; ".join(feature_phrases) if feature_phrases
            else "unspecified risk factors"
        )

        # ── Step 7: Select template and fill placeholders ─────────────────────
        template = QUERY_TEMPLATES[query_variant % len(QUERY_TEMPLATES)]
        return template.format(
            features=features_str,
            risk_tier=risk_tier,
            context_hint=context_hint,
        )

    @staticmethod
    def _fallback_advice(prob: float, impacts: list[dict]) -> str:
        top3 = sorted(impacts, key=lambda x: abs(x["impact"]), reverse=True)[:3]
        risk = "high" if prob > 0.7 else "moderate" if prob > 0.4 else "low"
        lines = [
            "**Diabetes Risk Analysis**\n",
            f"🎯 **Result:** Risk level is **{risk}** with a probability of {prob * 100:.1f}%\n",
            "📊 **Top 3 Most Influential Factors:**",
        ]
        for i, item in enumerate(top3, 1):
            direction = "increases" if item["impact"] > 0 else "decreases"
            lines.append(
                f"\n{i}. **{item['feature']}**: {direction} risk by {abs(item['impact']):.1f}%"
            )
        lines.append("\n\n💡 **Recommendations:**\n")
        if prob > 0.7:
            lines += [
                "\n1. Urgent: Consult a diabetes specialist within 1 week",
                "\n2. Get HbA1c and fasting blood glucose tested immediately",
                "\n3. Begin a low-sugar diet and increase physical activity right away",
            ]
        elif prob > 0.4:
            lines += [
                "\n1. Schedule routine health check-ups every 3–6 months",
                "\n2. Adjust your diet and increase physical activity to 30 minutes per day",
                "\n3. Monitor your health markers at home",
            ]
        else:
            lines += [
                "\n1. Maintain your current healthy lifestyle",
                "\n2. Attend annual routine health check-ups",
                "\n3. Keep a stable weight and exercise regularly",
            ]
        lines.append(
            "\n\n⚠️ *Disclaimer: These results are for reference only. "
            "Please consult a specialist clinician.*"
        )
        return "".join(lines)


# ==============================================================================
# RAG QUERY VARIANT HELPER
# ==============================================================================

def _query_variant(raw_data: dict) -> int:
    """
    Derive a deterministic QUERY_TEMPLATES index from the patient's clinical
    data fingerprint.  Same input always → same template, but different patients
    (different clinical values) → different templates → diverse embeddings.

    [BUG-10 FIX] Use repr() for stable cross-platform string conversion of values.
    """
    # [BUG-10 FIX] repr() ensures consistent serialization across Python versions
    fingerprint = str(sorted((k, repr(v)) for k, v in raw_data.items()))
    return int(hashlib.md5(fingerprint.encode()).hexdigest(), 16) % len(QUERY_TEMPLATES)


# Singleton
rag_service = RAGService()


# ==============================================================================
# LIFESPAN
# ==============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 [Lifespan] Starting DiabeTwin AI Backend...")
    try:
        MODELS["preprocessor_clinical"] = joblib.load(get_path("preprocessor_clinical.pkl"))
        MODELS["model_clinical"]         = joblib.load(get_path("model_clinical.pkl"))
        MODELS["clinical_background_processed"] = joblib.load(
            get_path("clinical_background_processed.pkl")
        )
        MODELS["home_model"]      = joblib.load(get_path("diabetes_model_home.pkl"))
        MODELS["home_background"] = joblib.load(get_path("x_train_sample_home.pkl"))
        logger.info("✅ [Lifespan] All ML Models loaded successfully!")
    except Exception as e:
        logger.error(f"❌ [Lifespan] ML model loading error: {e}")
        raise

    rag_ok = rag_service.initialize()
    if not rag_ok:
        logger.warning("⚠️ RAGService is unavailable – fallback advice will be used.")

    yield

    await rag_service.close()
    MODELS.clear()
    logger.info("🧹 [Lifespan] Memory released.")


# ==============================================================================
# APP & CORS
# ==============================================================================

app = FastAPI(title="DiabeTwin AI Backend", version="3.3", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://v0-frontend-ai-one.vercel.app",
        "https://connor-apostolic-jaye.ngrok-free.dev",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================================================================
# SCHEMAS
# ==============================================================================

class ClinicalInput(BaseModel):
    gender: str
    age: int
    smoking_history: str
    hypertension: int
    heart_disease: int
    bmi: float
    hba1c: float
    glucose: int


class HomeInput(BaseModel):
    HighBP: int
    HighChol: int
    CholCheck: int
    BMI: float
    Smoker: int
    Stroke: int
    HeartDiseaseorAttack: int
    PhysActivity: int
    Fruits: int
    Veggies: int
    HvyAlcoholConsump: int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: int
    Sex: int
    Age: int


# ==============================================================================
# HELPER: SHAP
# ==============================================================================

def compute_shap_impacts(
    model,
    processed_data,
    background,
    display_names: list[str],
) -> list[dict]:
    f = lambda x: model.predict_proba(x)[:, 1]
    explainer = shap.Explainer(f, background)
    shap_values = explainer(processed_data)
    return [
        {
            "feature": display_names[i] if i < len(display_names) else f"feature_{i}",
            "impact":  round(float(val) * 100, 2),
        }
        for i, val in enumerate(shap_values.values[0])
    ]


# ==============================================================================
# ENDPOINTS
# ==============================================================================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "models_loaded": len(MODELS) > 0,
        "rag_service_available": rag_service.initialized,
    }


@app.get("/")
async def root():
    return {
        "message": "DiabeTwin AI Backend",
        "version": "3.3",
        "endpoints": {
            "health": "/health",
            "clinical": "/api/predict/clinical",
            "home": "/api/predict/home",
            "docs": "/docs",
        },
    }


@app.post("/api/predict/clinical")
async def predict_clinical(data: ClinicalInput):
    """
    Clinician mode.
    RAG audience = "doctor"  (matches Firestore field).
    """
    try:
        logger.info(f"[Clinical] Request: {data.model_dump()}")

        # ── STEP 1: Preprocessing & ML ────────────────────────────────────────
        clean_smoking = (
            data.smoking_history
            .replace("not current", "not_current")
            .replace("No Info", "no_info")
        )
        raw_input = pd.DataFrame([{
            "gender":             data.gender,
            "age":                data.age,
            "hypertension":       data.hypertension,
            "heart_disease":      data.heart_disease,
            "smoking_history":    clean_smoking,
            "bmi":                data.bmi,
            "HbA1c_level":        data.hba1c,
            "blood_glucose_level": data.glucose,
        }])
        processed_data = MODELS["preprocessor_clinical"].transform(raw_input)
        model = MODELS["model_clinical"]
        prob = float(model.predict_proba(processed_data)[0][1])
        logger.info(f"[Clinical] ML prob: {prob * 100:.1f}%")

        # ── STEP 2: SHAP ──────────────────────────────────────────────────────
        feature_names_out = list(MODELS["preprocessor_clinical"].get_feature_names_out())
        impacts = compute_shap_impacts(
            model=model,
            processed_data=processed_data,
            background=MODELS["clinical_background_processed"],
            display_names=feature_names_out,
        )

        # ── STEP 3: RAG ───────────────────────────────────────────────────────
        benchmark_doc: str = ""
        context_docs: list[dict] = []

        if rag_service.initialized:
            try:
                benchmark_doc = await rag_service.fetch_benchmark_doc(
                    audience_type="doctor"
                )
            except Exception as e:
                logger.warning(f"⚠️ [Clinical Benchmark] Failed: {e}")

            try:
                # Pass raw_data with clean_smoking so OHE decoder matches correctly
                rag_raw_data = data.model_dump()
                rag_raw_data["smoking_history"] = clean_smoking

                rag_query = rag_service.build_rag_query(
                    impacts,
                    feature_vi_map=CLINICAL_FEATURE_VI_MAP,
                    raw_data=rag_raw_data,
                    prob=prob,
                    top_n=4,
                    query_variant=_query_variant(rag_raw_data),
                )
                logger.info(f"[Clinical RAG] Query: {rag_query}")
                context_docs = await rag_service.retrieve_context(
                    query_text=rag_query,
                    audience_type="doctor",
                    top_k=5,
                )
                logger.info(f"[Clinical RAG] Retrieved {len(context_docs)} docs.")
            except Exception as e:
                logger.warning(f"⚠️ [Clinical RAG] Failed: {e}")

        # ── STEP 4: LLM ───────────────────────────────────────────────────────
        ai_advice = await rag_service.synthesize_advice(
            prob=prob,
            impacts=impacts,
            role="Clinician",
            raw_data=data.model_dump(),
            context_docs=context_docs,
            benchmark_doc=benchmark_doc,
        )

        # ── Filter impacts for Frontend (exclude gender, smoking) ─────────────
        excluded_kw = ["gender", "smoking_history"]
        frontend_impacts = [
            i for i in impacts
            if not any(kw in i["feature"] for kw in excluded_kw)
        ]
        #print(ai_advice)
        return {
            "probability": round(prob * 100, 2),
            "status":      "POSITIVE" if prob > 0.4945 else "NEGATIVE",
            "risk_level":  "🔴" if prob > 0.7 else "🟡" if prob > 0.3 else "🟢",
            "impacts":     frontend_impacts,
            "ai_advice":   ai_advice,
        }

    except Exception as e:
        logger.error(f"[Clinical] Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/predict/home")
async def predict_home(data: HomeInput):
    """
    General User / Home mode.
    RAG audience = "user"  (matches Firestore field).
    """
    try:
        logger.info("[Home] Prediction request received.")

        # ── STEP 1: ML ────────────────────────────────────────────────────────
        # [BUG-06 FIX] Use model_dump() instead of deprecated .dict()
        df = pd.DataFrame([data.model_dump()])
        model = MODELS["home_model"]
        prob = float(model.predict_proba(df)[0][1])
        logger.info(f"[Home] ML prob: {prob * 100:.1f}%")

        # ── STEP 2: SHAP ──────────────────────────────────────────────────────
        display_names = [
            "High Blood Pressure", "High Cholesterol", "Cholesterol Check", "BMI Index",
            "Smoking", "Stroke", "Heart Disease", "Physical Activity", "Fruit Intake",
            "Vegetable Intake", "Heavy Alcohol Consumption", "General Health", "Mental Health",
            "Physical Health", "Difficulty Walking", "Gender", "Age Group",
        ]
        impacts = compute_shap_impacts(
            model=model,
            processed_data=df,
            background=MODELS["home_background"],
            display_names=display_names,
        )

        # ── STEP 3: RAG ───────────────────────────────────────────────────────
        benchmark_doc: str = ""
        context_docs: list[dict] = []

        if rag_service.initialized:
            try:
                benchmark_doc = await rag_service.fetch_benchmark_doc(
                    audience_type="user"
                )
            except Exception as e:
                logger.warning(f"⚠️ [Home Benchmark] Failed: {e}")

            try:
                home_raw = data.model_dump()
                rag_query = rag_service.build_rag_query(
                    impacts,
                    feature_vi_map=None,
                    raw_data=home_raw,
                    prob=prob,
                    top_n=4,
                    query_variant=_query_variant(home_raw),
                )
                logger.info(f"[Home RAG] Query: {rag_query}")
                context_docs = await rag_service.retrieve_context(
                    query_text=rag_query,
                    audience_type="user",
                    top_k=5,
                )
                logger.info(f"[Home RAG] Retrieved {len(context_docs)} docs.")
            except Exception as e:
                logger.warning(f"⚠️ [Home RAG] Failed: {e}")

        # ── STEP 4: LLM ───────────────────────────────────────────────────────
        ai_advice = await rag_service.synthesize_advice(
            prob=prob,
            impacts=impacts,
            role="General User",
            raw_data=data.model_dump(),
            context_docs=context_docs,
            benchmark_doc=benchmark_doc,
        )

        # ── Filter impacts for Frontend ────────────────────────────────────────
        excluded = {
            "Gender", "Heavy Alcohol Consumption", "Mental Health",
            "Smoking", "Fruit Intake", "Vegetable Intake",
        }
        frontend_impacts = [i for i in impacts if i["feature"] not in excluded]
        #print(ai_advice)
        return {
            "probability": round(prob * 100, 2),
            "status":      "HIGH RISK" if prob > 0.5 else "SAFE",
            "impacts":     frontend_impacts,
            "ai_advice":   ai_advice,
        }

    except Exception as e:
        logger.error(f"[Home] Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


# ==============================================================================
# ENTRY POINT
# ==============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)