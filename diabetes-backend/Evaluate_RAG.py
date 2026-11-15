import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import faithfulness
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

# =========================
# 🔑 CONFIGURATION
# =========================
OPENROUTER_API_KEY = ""
BASE_URL = "https://openrouter.ai/api/v1"

# Academic Styling for Paper (Vector-friendly)
plt.rcParams.update({
    "font.family": "serif",
    "pdf.fonttype": 42,
    "ps.fonttype": 42,
    "axes.edgecolor": "#333333",
    "grid.alpha": 0.3
})

llm = ChatOpenAI(
    model="openai/gpt-3.5-turbo",
    api_key=OPENROUTER_API_KEY,
    base_url=BASE_URL,
    temperature=0,
    default_headers={"HTTP-Referer": "http://localhost", "X-Title": "DiabeTwin-Eval"}
)

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    api_key=OPENROUTER_API_KEY,
    base_url=BASE_URL
)


def run_eval(file_path, mode_label):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Ensure contexts are List[List[str]] for Ragas consistency
    dataset = Dataset.from_dict({
        "question": [x["question"] for x in data],
        "answer": [x["answer"] for x in data],
        "contexts": [x["contexts"] if isinstance(x["contexts"], list) else [x["contexts"]] for x in data],
    })

    result = evaluate(
        dataset=dataset,
        metrics=[faithfulness],
        llm=llm,
        embeddings=embeddings
    )

    df = result.to_pandas()
    df['Mode'] = mode_label
    # FIX: Get mean score from pandas to avoid unhashable type error
    mean_score = df["faithfulness"].mean()
    return df, mean_score


# =========================
# 🚀 EXECUTION
# =========================
print("Evaluating Doctor Mode...")
df_doctor, score_doctor = run_eval("evaluate_data.json", "Doctor Mode")

print("Evaluating Home Mode...")
df_home, score_home = run_eval("evaluate_rag_home.json", "Home User Mode")

# Merge results
final_df = pd.concat([df_doctor, df_home], ignore_index=True)

# =========================
# 📊 VECTOR VISUALIZATION
# =========================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
colors = ['#4C72B0', '#55A868']  # Academic Blue and Green

# 1. Bar Chart (Mean)
bars = ax1.bar(['Doctor Mode', 'Home User Mode'], [score_doctor, score_home],
               color=colors, alpha=0.85, edgecolor='black', width=0.6)
ax1.set_title('Mean Faithfulness Comparison', fontsize=12, fontweight='bold')
ax1.set_ylabel('Average Score', fontsize=10)
ax1.set_ylim(0, 1.0)
for bar in bars:
    height = bar.get_height()
    ax1.text(bar.get_x() + bar.get_width() / 2., height + 0.02, f'{height:.2f}',
             ha='center', fontweight='bold')

# 2. Box Plot (Stability)
sns.boxplot(x='Mode', y='faithfulness', data=final_df, palette=colors, ax=ax2, width=0.4)
ax2.set_title('Score Distribution & Stability', fontsize=12, fontweight='bold')
ax2.set_ylabel('Faithfulness Range', fontsize=10)
ax2.set_xlabel('System Mode', fontsize=10)

plt.tight_layout()

# --- EXPORT VECTOR PDF ---
plt.savefig("DiabeTwin_Faithfulness_Analysis.pdf", format='pdf', bbox_inches='tight')
print("\n✅ Success! Vector file saved: DiabeTwin_Faithfulness_Analysis.pdf")