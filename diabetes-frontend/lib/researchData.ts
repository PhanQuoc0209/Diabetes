export interface ResearchPaper {
  title: string;
  authors: string;
  journal: string;
  year: number;
  impact: string;
  summary: string;
  link: string;
  tags: string[];
}

export interface ClinicalGuideline {
  title: string;
  organization: string;
  year: string;
  summary: string;
  link: string;
}

export interface EducationalResource {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export const ALL_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "IDF Diabetes Atlas, 10th ed.",
    authors: "International Diabetes Federation",
    journal: "International Diabetes Federation",
    year: 2021,
    impact: "Very High",
    summary: "Comprehensive global diabetes statistics and epidemiological data from the International Diabetes Federation.",
    link: "https://diabetesatlas.org/data-by-location/global/",
    tags: ["Epidemiology", "Global Statistics", "Diabetes Atlas"],
  },
  {
    title: "Diabetes",
    authors: "World Health Organization",
    journal: "WHO Fact Sheets",
    year: 2023,
    impact: "Very High",
    summary: "WHO fact sheet providing essential information about diabetes, its types, complications, and global burden.",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    tags: ["WHO", "Fact Sheet", "Public Health"],
  },
  {
    title: "Heart disease and stroke statistics---2000 update",
    authors: "American Heart Association",
    journal: "Circulation",
    year: 1999,
    impact: "High",
    summary: "Comprehensive statistics on heart disease and stroke, including diabetes-related cardiovascular complications.",
    link: "https://www.ahajournals.org/doi/full/10.1161/01.CIR.100.10.1134",
    tags: ["Cardiovascular", "Statistics", "Complications"],
  },
  {
    title: "Kidney failure and diabetes",
    authors: "Centers for Disease Control and Prevention",
    journal: "CDC",
    year: 2023,
    impact: "High",
    summary: "CDC report on the relationship between diabetes and kidney failure, including prevention strategies.",
    link: "https://www.cdc.gov/diabetes/data-research/research/kidney-failure-diabetes.html",
    tags: ["Kidney Disease", "Complications", "CDC"],
  },
  {
    title: "Promoting diabetic retinopathy screening",
    authors: "World Health Organization Regional Office for Europe",
    journal: "WHO Europe",
    year: 2024,
    impact: "High",
    summary: "WHO Europe initiative to promote screening for diabetic retinopathy, a major diabetes complication.",
    link: "https://www.who.int/europe/activities/promoting-diabetic-retinopathy-screening",
    tags: ["Retinopathy", "Screening", "WHO Europe"],
  },
  {
    title: "Global Report on Effective Access to Assistive Technology",
    authors: "World Health Organization",
    journal: "World Health Organization",
    year: 2022,
    impact: "Very High",
    summary: "WHO global report on access to assistive technology, including devices for diabetes management.",
    link: "https://iris.who.int/server/api/core/bitstreams/1f4d4a08-b20d-4c36-9148-a59429ac3477/content",
    tags: ["Assistive Technology", "Global Health", "WHO"],
  },
  {
    title: "The growing burden of diabetes in Viet Nam",
    authors: "World Health Organization",
    journal: "World Health Organization",
    year: 2024,
    impact: "High",
    summary: "WHO report on the increasing diabetes burden in Vietnam, including epidemiological trends and challenges.",
    link: "https://www.who.int/vietnam/news/feature-stories/detail/the-growing-burden-of-diabetes-in-viet-nam",
    tags: ["Vietnam", "Epidemiology", "Burden"],
  },
  {
    title: "What clinicians want: contextualizing explainable machine learning for clinical end use",
    authors: "S. Tonekaboni, S. Joshi, K. D. McCradden, A. Goldenberg",
    journal: "Proceedings of Machine Learning Research (PMLR)",
    year: 2019,
    impact: "Very High",
    summary: "Research on clinicians' needs for explainable AI in clinical settings, focusing on practical implementation.",
    link: "https://proceedings.mlr.press/v106/tonekaboni19a.html",
    tags: ["Explainable AI", "Clinical", "Machine Learning"],
  },
  {
    title: "Assessment of machine learning algorithms to detect early disease outcomes",
    authors: "R. A. Calvert and others",
    journal: "BMC Medicine",
    year: 2019,
    impact: "Very High",
    summary: "Comprehensive assessment of ML algorithms for early disease detection, including diabetes outcomes.",
    link: "https://doi.org/10.1186/s12916-019-1426-2",
    tags: ["Machine Learning", "Early Detection", "Algorithm Assessment"],
  },
  {
    title: "Machine learning algorithm-based prediction of diabetes among female population using PIMA dataset",
    authors: "A. Ahmed and others",
    journal: "Healthcare",
    year: 2025,
    impact: "High",
    summary: "ML-based diabetes prediction specifically for female population using the PIMA Indian diabetes dataset.",
    link: "https://doi.org/10.3390/healthcare13010037",
    tags: ["PIMA Dataset", "Female Population", "Prediction"],
  },
  {
    title: "Machine learning tools for long-term type 2 diabetes risk prediction",
    authors: "N. Fazakis, O. Kocsis, E. Dritsas, S. Alexiou, N. Fakotakis, K. Moustakas",
    journal: "IEEE Access",
    year: 2021,
    impact: "Very High",
    summary: "Development and evaluation of ML tools for long-term type 2 diabetes risk prediction.",
    link: "https://doi.org/10.1109/ACCESS.2021.3098691",
    tags: ["Type 2 Diabetes", "Long-term Prediction", "IEEE Access"],
  },
  {
    title: "Diabetes prediction using machine learning and explainable AI techniques",
    authors: "I. Tasin, T. U. Nabil, S. Islam, R. Khan",
    journal: "Healthcare Technology Letters",
    year: 2022,
    impact: "High",
    summary: "Integration of machine learning and explainable AI techniques for diabetes prediction and interpretation.",
    link: "https://doi.org/10.1049/htl2.12039",
    tags: ["Explainable AI", "Machine Learning", "Interpretation"],
  },
  {
    title: "High-performance medicine: convergence of human and artificial intelligence",
    authors: "E. J. Topol",
    journal: "Nature Medicine",
    year: 2019,
    impact: "Very High",
    summary: "Vision for the convergence of human expertise and AI in high-performance medicine, including diabetes care.",
    link: "https://www.nature.com/articles/s41591-018-0300-7",
    tags: ["AI Convergence", "High-performance Medicine", "Future Medicine"],
  },
  {
    title: "Using big data-machine learning models for diabetes prediction",
    authors: "T. Nibareke, J. Laassiri",
    journal: "Journal of Big Data",
    year: 2020,
    impact: "High",
    summary: "Application of big data and machine learning models for diabetes prediction using large-scale datasets.",
    link: "https://journalofbigdata.springeropen.com/articles/10.1186/s40537-020-00355-0",
    tags: ["Big Data", "Machine Learning", "Large-scale"],
  },
  {
    title: "A bimodal dataset for diabetes research",
    authors: "J. Li and others",
    journal: "Scientific Data",
    year: 2026,
    impact: "Very High",
    summary: "Novel bimodal dataset specifically designed for comprehensive diabetes research applications.",
    link: "https://www.nature.com/articles/s41597-026-06923-y",
    tags: ["Dataset", "Bimodal", "Research"],
  },
  {
    title: "Large language models encode clinical knowledge",
    authors: "K. Singhal and others",
    journal: "Nature",
    year: 2023,
    impact: "Very High",
    summary: "Demonstration of how large language models can encode and apply clinical medical knowledge.",
    link: "https://www.nature.com/articles/s41586-023-06291-2",
    tags: ["Large Language Models", "Clinical Knowledge", "AI"],
  },
  {
    title: "The utilization of machine learning algorithms for assisting physicians in diagnosis of diabetes",
    authors: "L. P. Nguyen and others",
    journal: "Diagnostics",
    year: 2023,
    impact: "High",
    summary: "Machine learning algorithms designed to assist physicians in diabetes diagnosis and decision-making.",
    link: "https://doi.org/10.3390/diagnostics13122087",
    tags: ["Physician Assistance", "Diagnosis", "Clinical Decision Support"],
  },
  {
    title: "Prediction of Diabetes Using Machine Learning: Analysis of 70,000 Clinical Database Patient Record",
    authors: "S. M. Kuriakose, A. S. Nair, R. S. Kumar, P. V. S. Nair",
    journal: "IEEE ICCCNT",
    year: 2022,
    impact: "High",
    summary: "Large-scale study using 70,000 clinical patient records for diabetes prediction using machine learning.",
    link: "https://ieeexplore.ieee.org/document/9984264",
    tags: ["Large Dataset", "Clinical Records", "IEEE Conference"],
  },
  {
    title: "Retrieval-augmented generation for knowledge-intensive NLP tasks",
    authors: "P. Lewis and others",
    journal: "NeurIPS",
    year: 2020,
    impact: "Very High",
    summary: "RAG framework for enhancing language models with external knowledge retrieval, applicable to medical AI systems.",
    link: "https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
    tags: ["RAG", "LLM", "Information Retrieval"],
  },
  {
    title: "GatorTron: A large clinical language model to unlock patient information from electronic health records",
    authors: "Y. Yang and others",
    journal: "Nature Communications",
    year: 2022,
    impact: "Very High",
    summary: "Large clinical language model specifically designed for processing electronic health records and patient information.",
    link: "https://www.nature.com/articles/s41746-022-00742-2",
    tags: ["Clinical Language Model", "EHR", "Medical NLP"],
  },
];

export const CLINICAL_GUIDELINES: ClinicalGuideline[] = [
  {
    title: "American Diabetes Association Standards of Care 2024",
    organization: "American Diabetes Association (ADA)",
    year: "2024",
    summary: "Tiêu chuẩn vàng trong chẩn đoán, phân loại và quản lý biến chứng đái tháo đường toàn cầu.",
    link: "https://diabetes.org/",
  },
  {
    title: "Hướng Dẫn Chẩn Đoán & Điều Trị Đái Tháo Đường Tuýp 2",
    organization: "Bộ Y Tế Việt Nam",
    year: "2023",
    summary: "Quy chuẩn quốc gia về tiêu chuẩn chẩn đoán đường huyết, HbA1c và phác đồ can thiệp lâm sàng tại Việt Nam.",
    link: "https://kcb.vn/",
  },
  {
    title: "WHO Guidelines on Diabetes Management",
    organization: "World Health Organization (WHO)",
    year: "2023",
    summary: "Khuyến nghị toàn cầu về phòng ngừa, chẩn đoán sớm và quản lý bệnh đái tháo đường.",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
  },
];

export const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    icon: "📖",
    title: "Hiểu Về Bệnh Tiểu Đường (Understanding Diabetes)",
    description: "Tổng quan về bệnh tiểu đường, cơ chế bệnh sinh, nguyên nhân, triệu chứng và các biến chứng nguy hiểm.",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
  },
  {
    icon: "🍎",
    title: "Dinh Dưỡng Cho Người Tiểu Đường (Nutrition)",
    description: "Hướng dẫn chế độ ăn lành mạnh, lựa chọn thực phẩm có chỉ số đường huyết GI thấp giúp ổn định insulin.",
    link: "https://diabetes.org/food-nutrition",
  },
  {
    icon: "🏃",
    title: "Vận Động & Lối Sống (Exercise & Lifestyle)",
    description: "Các bài tập thể chất phù hợp và phương pháp rèn luyện sức bền giúp tăng độ nhạy cảm insulin tự nhiên.",
    link: "https://diabetes.org/healthy-living/fitness",
  },
  {
    icon: "💊",
    title: "Thuốc & Phương Pháp Điều Trị (Medications)",
    description: "Thông tin tổng hợp về các nhóm thuốc điều trị phổ biến, tiêm insulin và quản lý phác đồ điều trị.",
    link: "https://diabetes.org/healthy-living/medication-treatments",
  },
];
