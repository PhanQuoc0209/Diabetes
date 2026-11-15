export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  impact: string;
  category: string;
  image: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  clinicalApplication?: string;
  link: string;
  tags: string[];
}

export interface LifestyleArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  link?: string;
  tags: string[];
}

export interface ClinicalGuideline {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  image: string;
  readTime: string;
  impact?: string;
  summary: string;
  keyTakeaways: string[];
  clinicalApplication?: string;
  link: string;
}

// 4 Featured Articles shown on the Home Page
export const FEATURED_ARTICLES: ResearchPaper[] = [
  {
    id: "who-vietnam-burden",
    title: "Gánh nặng Đái tháo đường tại Việt Nam & Tầm soát sớm",
    authors: "World Health Organization (WHO Country Office Viet Nam)",
    journal: "WHO Feature Stories & Reports",
    year: 2024,
    impact: "Very High",
    category: "Dịch tễ học WHO",
    image: "/research_images/vietnam_who_diabetes.jpg",
    readTime: "5 phút đọc",
    summary: "Báo cáo chính thức từ Tổ chức Y tế Thế giới (WHO) về xu hướng gia tăng bệnh tiểu đường tại Việt Nam, sự trẻ hóa độ tuổi mắc bệnh và vai trò quyết định của các công cụ sàng lọc không xâm lấn phát hiện sớm tiền tiểu đường.",
    keyTakeaways: [
      "Tại Việt Nam, ước tính hơn 5 triệu người trưởng thành đang sống chung với bệnh đái tháo đường, nhưng có tới 65% chưa được chẩn đoán.",
      "Tỷ lệ biến chứng tim mạch, suy thận và mù lòa tăng gấp 3 lần nếu phát hiện muộn sau 5 năm khởi phát.",
      "WHO khuyến nghị áp dụng các giải pháp y tế số và AI để phát hiện nguy cơ ngay tại cộng đồng và gia đình."
    ],
    clinicalApplication: "DiabeTwin sử dụng các chỉ số nhân khẩu học và lối sống của người Việt Nam từ khảo sát y tế để tinh chỉnh ngưỡng phân loại rủi ro sát với thể trạng người Việt.",
    link: "https://www.who.int/vietnam/news/feature-stories/detail/the-growing-burden-of-diabetes-in-viet-nam",
    tags: ["Vietnam", "Epidemiology", "WHO", "Public Health", "Early Detection"]
  },
  {
    id: "pmlr-explainable-ai-shap",
    title: "Mô hình AI Hộp trắng SHAP trong Lâm sàng: Bác sĩ cần gì?",
    authors: "S. Tonekaboni, S. Joshi, K. D. McCradden, A. Goldenberg",
    journal: "Proceedings of Machine Learning Research (PMLR)",
    year: 2019,
    impact: "Very High",
    category: "Trí tuệ Nhân tạo",
    image: "/research_images/explainable_ai_medical.jpg",
    readTime: "6 phút đọc",
    summary: "Nghiên cứu về nhu cầu thực tế của Bác sĩ đối với các mô hình AI có khả năng giải thích (Explainable AI - XAI). Nghiên cứu khẳng định bác sĩ lâm sàng cần biết chính xác trọng số của từng chỉ số (HbA1c, Glucose, BMI) thay vì chỉ nhận một con số xác suất vô cảm.",
    keyTakeaways: [
      "Mô hình AI hộp đen (Black-box) thường bị bác sĩ từ chối sử dụng do thiếu khả năng giải trình y khoa.",
      "Lý thuyết trò chơi SHAP phân bổ giá trị công bằng cho từng yếu tố nguy cơ của từng bệnh nhân cụ thể.",
      "Giúp bác sĩ giải thích trực quan cho bệnh nhân hiểu lý do tại sao họ nằm trong nhóm nguy cơ cao."
    ],
    clinicalApplication: "DiabeTwin tích hợp thuật toán SHAP vào cả Cổng Bác sĩ (Doctor Portal) và Người dùng để minh bạch hóa đóng góp của từng chỉ số sinh học vào kết quả dự đoán.",
    link: "https://proceedings.mlr.press/v106/tonekaboni19a.html",
    tags: ["Explainable AI", "SHAP", "Clinical Decision", "Machine Learning"]
  },
  {
    id: "healthcare-tech-ml-prediction",
    title: "Dự đoán Nguy cơ Đái tháo đường bằng Machine Learning",
    authors: "I. Tasin, T. U. Nabil, S. Islam, R. Khan",
    journal: "Healthcare Technology Letters",
    year: 2022,
    impact: "High",
    category: "Chẩn đoán & ML",
    image: "/research_images/blood_glucose_lab.jpg",
    readTime: "7 phút đọc",
    summary: "Công trình tích hợp thuật toán học máy (AdaBoost, LightGBM) nhằm tối ưu hóa độ nhạy (Recall ≥ 80%) trong việc phát hiện sớm ca nguy cơ đái tháo đường, hạn chế tối đa việc bỏ sót bệnh nhân trong các chương trình sàng lọc cộng đồng.",
    keyTakeaways: [
      "Tối ưu hóa siêu tham số của mô hình Ensemble Learning giúp vượt trội hơn so với phương pháp hồi quy logistic truyền thống.",
      "Kiểm định chéo k-fold trên tập dữ liệu lâm sàng quy mô lớn đảm bảo tính ổn định và ngăn ngừa overfitting.",
      "Thời gian suy luận chỉ mất vài phần nghìn giây, cho phép triển khai mượt mà trên nền tảng web và di động."
    ],
    clinicalApplication: "Đây là nền tảng toán học cốt lõi cho mô hình Doctor Model (AdaBoost) và Home User Model (LightGBM) hiện đang chạy trong DiabeTwin.",
    link: "https://doi.org/10.1049/htl2.12039",
    tags: ["Machine Learning", "Health Tech", "Ensemble", "AdaBoost", "LightGBM"]
  },
  {
    id: "idf-atlas-ada-standards",
    title: "Thống kê Toàn cầu IDF Atlas & Tiêu chuẩn ADA Standards of Care",
    authors: "International Diabetes Federation & American Diabetes Association",
    journal: "IDF Diabetes Atlas 10th Edition & Diabetes Care",
    year: 2024,
    impact: "Very High",
    category: "Tiêu chuẩn Y tế",
    image: "/research_images/clinical_research_doc.jpg",
    readTime: "8 phút đọc",
    summary: "Tổng hợp các tiêu chuẩn vàng trong chẩn đoán, phân loại giai đoạn đường huyết và phân tầng nguy cơ biến chứng tim mạch - thận từ Liên đoàn Đái tháo đường Quốc tế (IDF) và Hiệp hội Đái tháo đường Hoa Kỳ (ADA 2024).",
    keyTakeaways: [
      "Ngưỡng chẩn đoán bình thường: HbA1c < 5.7%, Đường huyết đói < 100 mg/dL.",
      "Giai đoạn tiền tiểu đường: HbA1c 5.7% - 6.4%, Đường huyết đói 100 - 125 mg/dL cần can thiệp lối sống ngay.",
      "Tiểu đường lâm sàng: HbA1c ≥ 6.5%, Đường huyết đói ≥ 126 mg/dL cần chuyển tuyến bác sĩ chuyên khoa nội tiết."
    ],
    clinicalApplication: "Toàn bộ các quy tắc gán nhãn mức độ nguy cơ (Bình thường / Tiền tiểu đường / Tiểu đường) và khuyến nghị y tế trong DiabeTwin đều tuân thủ 100% hướng dẫn của ADA 2024.",
    link: "https://diabetesatlas.org/data-by-location/global/",
    tags: ["ADA 2024", "IDF", "Clinical Standards", "HbA1c", "Glucose"]
  }
];

// 20 Scientific Research Papers from Old Website
export const ALL_RESEARCH_PAPERS: ResearchPaper[] = [
  ...FEATURED_ARTICLES,
  {
    id: "who-diabetes-factsheet",
    title: "Diabetes Fact Sheet - Comprehensive Information & Global Burden",
    authors: "World Health Organization",
    journal: "WHO Fact Sheets",
    year: 2023,
    impact: "Very High",
    category: "Dịch tễ học WHO",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "5 phút đọc",
    summary: "Tài liệu tổng hợp của WHO cung cấp thông tin thiết yếu về các phân nhóm tiểu đường, sinh lý bệnh, biến chứng nguy hiểm và gánh nặng y tế toàn cầu.",
    keyTakeaways: [
      "Đái tháo đường là nguyên nhân hàng đầu gây mù lòa, suy thận, đau tim và đột quỵ.",
      "Hơn 80% trường hợp tử vong do đái tháo đường xảy ra ở các nước có thu nhập thấp và trung bình.",
      "Chế độ ăn lành mạnh và tập luyện 30 phút mỗi ngày có thể ngăn ngừa tới 70% nguy cơ mắc tiểu đường tuýp 2."
    ],
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    tags: ["WHO", "Fact Sheet", "Public Health", "Global Burden"]
  },
  {
    id: "aha-cardiovascular-stroke",
    title: "Heart disease and stroke statistics - Diabetes Cardiovascular Complications",
    authors: "American Heart Association",
    journal: "Circulation (AHA Journals)",
    year: 1999,
    impact: "High",
    category: "Tim mạch & Biến chứng",
    image: "/research_images/clinical_research_doc.jpg",
    readTime: "6 phút đọc",
    summary: "Thống kê chuyên sâu về mối liên hệ chặt chẽ giữa bệnh lý đái tháo đường và các biến chứng tim mạch nguy hiểm như đột quỵ và nhồi máu cơ tim.",
    keyTakeaways: [
      "Bệnh nhân đái tháo đường có nguy cơ mắc bệnh tim mạch cao gấp 2 đến 4 lần người bình thường.",
      "Kiểm soát huyết áp song song với đường huyết giúp giảm 35% nguy cơ biến chứng tim mạch.",
      "Chỉ số BMI và tiền sử hút thuốc là các nhân tố cộng hưởng nguy hiểm nhất."
    ],
    link: "https://www.ahajournals.org/doi/full/10.1161/01.CIR.100.10.1134",
    tags: ["Cardiovascular", "Statistics", "Complications", "Heart Disease"]
  },
  {
    id: "cdc-kidney-failure-diabetes",
    title: "Kidney failure and diabetes - Prevention & Clinical Research",
    authors: "Centers for Disease Control and Prevention",
    journal: "CDC Diabetes Research",
    year: 2023,
    impact: "High",
    category: "Thận học & Biến chứng",
    image: "/research_images/blood_glucose_lab.jpg",
    readTime: "6 phút đọc",
    summary: "Báo cáo của CDC về mối liên quan giữa đái tháo đường và bệnh thận mạn tính (CKD), cùng các chiến lược can thiệp phát hiện sớm tổn thương cầu thận.",
    keyTakeaways: [
      "Đái tháo đường là nguyên nhân hàng đầu gây suy thận giai đoạn cuối trên toàn cầu.",
      "Kiểm soát đường huyết mục tiêu kết hợp theo dõi huyết áp giúp làm chậm đáng kể tiến trình suy thận.",
      "Sàng lọc định kỳ vi đạm niệu là phương pháp can thiệp sớm hiệu quả nhất."
    ],
    link: "https://www.cdc.gov/diabetes/data-research/research/kidney-failure-diabetes.html",
    tags: ["Kidney Disease", "Complications", "CDC", "Nephrology"]
  },
  {
    id: "who-retinopathy-screening",
    title: "Promoting diabetic retinopathy screening across health systems",
    authors: "World Health Organization Regional Office for Europe",
    journal: "WHO Europe Activities",
    year: 2024,
    impact: "High",
    category: "Nhãn khoa & Sàng lọc",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "5 phút đọc",
    summary: "Sáng kiến của WHO Europe thúc đẩy chương trình sàng lọc bệnh võng mạc tiểu đường thông qua ứng dụng công nghệ trí tuệ nhân tạo và chụp đáy mắt.",
    keyTakeaways: [
      "Tổn thương võng mạc tiểu đường diễn tiến âm thầm và thường không có triệu chứng ở giai đoạn đầu.",
      "AI có thể hỗ trợ phát hiện tổn thương võng mạc với độ nhạy trên 90%.",
      "Sàng lọc hàng năm giúp bảo tồn thị lực cho hàng triệu người bệnh."
    ],
    link: "https://www.who.int/europe/activities/promoting-diabetic-retinopathy-screening",
    tags: ["Retinopathy", "Screening", "WHO Europe", "Vision"]
  },
  {
    id: "who-assistive-technology",
    title: "Global Report on Effective Access to Assistive Technology",
    authors: "World Health Organization",
    journal: "World Health Organization Reports",
    year: 2022,
    impact: "Very High",
    category: "Thiết bị Y tế Số",
    image: "/research_images/ai_neural_health.jpg",
    readTime: "7 phút đọc",
    summary: "Báo cáo toàn cầu của WHO về việc tiếp cận các thiết bị hỗ trợ và công nghệ y tế số trong theo dõi đường huyết liên tục (CGM) và ứng dụng AI tự quản lý bệnh.",
    keyTakeaways: [
      "Thiết bị theo dõi thông minh giúp người bệnh kiểm soát chỉ số HbA1c tốt hơn 1.2%.",
      "Cần bình đẳng hóa quyền tiếp cận các giải pháp AI sàng lọc miễn phí cho người thu nhập thấp.",
      "Kết nối dữ liệu thời gian thực giữa người bệnh và bác sĩ là tương lai của quản lý bệnh mạn tính."
    ],
    link: "https://iris.who.int/server/api/core/bitstreams/1f4d4a08-b20d-4c36-9148-a59429ac3477/content",
    tags: ["Assistive Technology", "Global Health", "WHO", "Digital Health"]
  },
  {
    id: "bmc-disease-outcomes-assessment",
    title: "Assessment of machine learning algorithms to detect early disease outcomes",
    authors: "R. A. Calvert and others",
    journal: "BMC Medicine",
    year: 2019,
    impact: "Very High",
    category: "Machine Learning",
    image: "/research_images/explainable_ai_medical.jpg",
    readTime: "8 phút đọc",
    summary: "Đánh giá thực nghiệm so sánh đa mô hình học máy (Random Forest, SVM, AdaBoost, Neural Nets) trong dự đoán nguy cơ khởi phát sớm các bệnh lý chuyển hóa.",
    keyTakeaways: [
      "Các mô hình Boosting (AdaBoost, Gradient Boosting) cho hiệu năng phát hiện ca dương tính cao nhất.",
      "Khâu xử lý tiền dữ liệu và cân bằng mẫu (SMOTE) là yếu tố quyết định chất lượng mô hình.",
      "Tập dữ liệu lâm sàng thực tế cần tính đến yếu tố dữ liệu thiếu và phân bố lệch."
    ],
    link: "https://doi.org/10.1186/s12916-019-1426-2",
    tags: ["Machine Learning", "Early Detection", "Algorithm Assessment", "BMC Medicine"]
  },
  {
    id: "pima-female-prediction",
    title: "Machine learning algorithm-based prediction of diabetes among female population using PIMA dataset",
    authors: "A. Ahmed and others",
    journal: "MDPI Healthcare",
    year: 2025,
    impact: "High",
    category: "Dữ liệu Lâm sàng",
    image: "/research_images/blood_glucose_lab.jpg",
    readTime: "6 phút đọc",
    summary: "Nghiên cứu dự đoán nguy cơ đái tháo đường trên tập dữ liệu tiêu chuẩn PIMA Indians, tập trung vào yếu tố thai sản, BMI và độ tuổi ở phụ nữ.",
    keyTakeaways: [
      "Chỉ số BMI và Glucose huyết tương sau 2 giờ là 2 nhân tố có tính phân loại mạnh nhất.",
      "Áp dụng phương pháp Ensemble đạt độ chính xác trên 86% trên tập thử nghiệm độc lập.",
      "Tầm soát tiểu đường thai kỳ sớm giúp giảm tỷ lệ biến chứng sinh nở."
    ],
    link: "https://doi.org/10.3390/healthcare13010037",
    tags: ["PIMA Dataset", "Female Population", "Prediction", "MDPI"]
  },
  {
    id: "ieee-longterm-t2d-prediction",
    title: "Machine learning tools for long-term type 2 diabetes risk prediction",
    authors: "N. Fazakis, O. Kocsis, E. Dritsas, S. Alexiou, N. Fakotakis, K. Moustakas",
    journal: "IEEE Access",
    year: 2021,
    impact: "Very High",
    category: "Dự đoán Dài hạn",
    image: "/research_images/ai_neural_health.jpg",
    readTime: "7 phút đọc",
    summary: "Phát triển và thẩm định công cụ học máy dự đoán nguy cơ tiến triển thành đái tháo đường tuýp 2 trong khoảng thời gian 5 đến 10 năm dựa trên thói quen sinh hoạt.",
    keyTakeaways: [
      "Mô hình LightGBM cho tốc độ huấn luyện nhanh gấp 10 lần và tối ưu hóa bộ nhớ trên dữ liệu lớn.",
      "Yếu tố vận động thể chất và giấc ngủ có tác động tích cực đáng kể trong việc ngăn chặn bệnh tiến triển.",
      "Độ tin cậy của mô hình được kiểm chứng trên tập dữ liệu đa trung tâm."
    ],
    link: "https://doi.org/10.1109/ACCESS.2021.3098691",
    tags: ["Type 2 Diabetes", "Long-term Prediction", "IEEE Access", "LightGBM"]
  },
  {
    id: "nature-high-performance-medicine",
    title: "High-performance medicine: convergence of human and artificial intelligence",
    authors: "Eric J. Topol",
    journal: "Nature Medicine",
    year: 2019,
    impact: "Very High",
    category: "AI & Y Học Tương Lai",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "9 phút đọc",
    summary: "Tầm nhìn mang tính bước ngoặt của Giáo sư Eric Topol về sự kết hợp cộng sinh giữa chuyên môn bác sĩ và năng lực suy luận của AI trong y học chuẩn xác.",
    keyTakeaways: [
      "AI không thay thế bác sĩ, mà trao quyền cho bác sĩ để chẩn đoán nhanh hơn và chính xác hơn.",
      "Chuyển đổi từ mô hình y tế phản ứng (Reactive) sang y tế chủ động dự phòng (Proactive).",
      "Tiểu đường và bệnh chuyển hóa là lĩnh vực hưởng lợi lớn nhất từ các mô hình dự báo AI."
    ],
    link: "https://www.nature.com/articles/s41591-018-0300-7",
    tags: ["AI Convergence", "High-performance Medicine", "Nature Medicine", "Future Medicine"]
  },
  {
    id: "big-data-ml-diabetes",
    title: "Using big data-machine learning models for diabetes prediction",
    authors: "T. Nibareke, J. Laassiri",
    journal: "Journal of Big Data",
    year: 2020,
    impact: "High",
    category: "Big Data & AI",
    image: "/research_images/ai_neural_health.jpg",
    readTime: "7 phút đọc",
    summary: "Ứng dụng các kiến trúc dữ liệu lớn và thuật toán học máy xử lý tập dữ liệu bệnh án hàng trăm nghìn bệnh nhân để dự đoán nguy cơ tiểu đường.",
    keyTakeaways: [
      "Xử lý song song dữ liệu lớn giảm thiểu thời gian huấn luyện từ nhiều ngày xuống vài giờ.",
      "Khả năng mở rộng (Scalability) của mô hình cho phép tích hợp trực tiếp vào hạ tầng bệnh viện.",
      "Đạt độ chính xác ổn định trên các tập dữ liệu đa dạng về địa lý và chủng tộc."
    ],
    link: "https://journalofbigdata.springeropen.com/articles/10.1186/s40537-020-00355-0",
    tags: ["Big Data", "Machine Learning", "Large-scale", "Scalability"]
  },
  {
    id: "scientific-data-bimodal-dataset",
    title: "A bimodal dataset for diabetes research",
    authors: "J. Li and others",
    journal: "Nature Scientific Data",
    year: 2026,
    impact: "Very High",
    category: "Tập Dữ Liệu Nghiên Cứu",
    image: "/research_images/blood_glucose_lab.jpg",
    readTime: "6 phút đọc",
    summary: "Giới thiệu bộ dữ liệu bimodal mới kết hợp cả dữ liệu sinh hóa máu và thói quen sinh hoạt liên tục phục vụ cho nghiên cứu đái tháo đường toàn diện.",
    keyTakeaways: [
      "Cung cấp tiêu chuẩn tham chiếu mở cho cộng đồng nghiên cứu AI y tế trên toàn thế giới.",
      "Gắn nhãn chuẩn xác theo tiêu chuẩn y khoa quốc tế với sự thẩm định của bác sĩ chuyên khoa.",
      "Hỗ trợ nghiên cứu cả hai hướng tiếp cận: lâm sàng tại viện và tự theo dõi tại nhà."
    ],
    link: "https://www.nature.com/articles/s41597-026-06923-y",
    tags: ["Dataset", "Bimodal", "Research", "Scientific Data"]
  },
  {
    id: "nature-llm-clinical-knowledge",
    title: "Large language models encode clinical knowledge",
    authors: "K. Singhal and others",
    journal: "Nature",
    year: 2023,
    impact: "Very High",
    category: "LLM & Bác Sĩ AI",
    image: "/research_images/explainable_ai_medical.jpg",
    readTime: "8 phút đọc",
    summary: "Chứng minh mô hình ngôn ngữ lớn (LLM) có khả năng mã hóa và áp dụng kiến thức y khoa lâm sàng với độ chính xác ngang tầm chuyên gia trong tư vấn sức khỏe.",
    keyTakeaways: [
      "Mô hình LLM y tế đạt điểm số chuyên gia trong các kỳ thi cấp chứng chỉ y khoa quốc tế.",
      "Khả năng chuyển ngữ các thuật ngữ y học phức tạp thành lời khuyên dễ hiểu cho người bệnh.",
      "Đóng vai trò trợ lý hỗ trợ bác sĩ tóm tắt bệnh án và gợi ý phác đồ phù hợp."
    ],
    link: "https://www.nature.com/articles/s41586-023-06291-2",
    tags: ["Large Language Models", "Clinical Knowledge", "Nature", "Medical AI"]
  },
  {
    id: "mdpi-physician-assistance",
    title: "The utilization of machine learning algorithms for assisting physicians in diagnosis of diabetes",
    authors: "L. P. Nguyen and others",
    journal: "MDPI Diagnostics",
    year: 2023,
    impact: "High",
    category: "Hỗ Trợ Chẩn Đoán",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "7 phút đọc",
    summary: "Nghiên cứu ứng dụng các thuật toán AI hỗ trợ bác sĩ trong phòng khám đa khoa sàng lọc nhanh nguy cơ tiểu đường, tiết kiệm thời gian khám bệnh.",
    keyTakeaways: [
      "Giảm 40% thời gian phân tích kết quả xét nghiệm cho bác sĩ lâm sàng.",
      "Tăng tỷ lệ phát hiện sớm ca tiền tiểu đường tại các tuyến y tế cơ sở lên 30%.",
      "Giao diện trực quan giúp bác sĩ tương tác nhanh và duyệt quyết định điều trị."
    ],
    link: "https://doi.org/10.3390/diagnostics13122087",
    tags: ["Physician Assistance", "Diagnosis", "Clinical Decision Support", "MDPI"]
  },
  {
    id: "ieee-70k-clinical-records",
    title: "Prediction of Diabetes Using Machine Learning: Analysis of 70,000 Clinical Database Patient Records",
    authors: "S. M. Kuriakose, A. S. Nair, R. S. Kumar, P. V. S. Nair",
    journal: "IEEE ICCCNT",
    year: 2022,
    impact: "High",
    category: "Dữ Liệu Lớn Lâm Sàng",
    image: "/research_images/clinical_research_doc.jpg",
    readTime: "6 phút đọc",
    summary: "Nghiên cứu quy mô lớn phân tích hơn 70.000 hồ sơ bệnh án điện tử để xây dựng mô hình dự báo tiểu đường có độ chính xác cao.",
    keyTakeaways: [
      "Sử dụng kỹ thuật trích xuất đặc trưng tự động giúp nâng cao độ chính xác dự báo lên 95%.",
      "Phân tích mối tương quan phức tạp giữa đường huyết đói, huyết áp và chỉ số HbA1c.",
      "Đóng góp cơ sở thực nghiệm quan trọng cho các hệ thống CDSS (Hỗ trợ ra quyết định lâm sàng)."
    ],
    link: "https://ieeexplore.ieee.org/document/9984264",
    tags: ["Large Dataset", "Clinical Records", "IEEE Conference", "Electronic Health Records"]
  },
  {
    id: "neurips-rag-knowledge",
    title: "Retrieval-augmented generation for knowledge-intensive NLP tasks",
    authors: "P. Lewis and others",
    journal: "NeurIPS",
    year: 2020,
    impact: "Very High",
    category: "RAG & LLM Y Tế",
    image: "/research_images/ai_neural_health.jpg",
    readTime: "8 phút đọc",
    summary: "Kỹ thuật RAG (Retrieval-Augmented Generation) kết hợp truy xuất tri thức từ tài liệu y văn chính thống với mô hình sinh ngôn ngữ, ngăn chặn ảo giác (hallucination) trong tư vấn y khoa.",
    keyTakeaways: [
      "RAG đối chiếu câu trả lời với kho văn bản hướng dẫn y tế (ADA, WHO, Bộ Y Tế) theo thời gian thực.",
      "Đảm bảo mọi lời khuyên y tế của AI đều có trích dẫn nguồn gốc chính xác và đáng tin cậy.",
      "Khắc phục nhược điểm thông tin lỗi thời của các mô hình LLM truyền thống."
    ],
    link: "https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
    tags: ["RAG", "LLM", "Information Retrieval", "NeurIPS"]
  },
  {
    id: "nature-gatortron-ehr",
    title: "GatorTron: A large clinical language model to unlock patient information from electronic health records",
    authors: "Y. Yang and others",
    journal: "Nature Communications",
    year: 2022,
    impact: "Very High",
    category: "Mô Hình Lâm Sàng Lớn",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "9 phút đọc",
    summary: "Mô hình ngôn ngữ lâm sàng quy mô lớn được huấn luyện trên hơn 90 tỷ từ vựng từ dữ liệu bệnh án thực tế, mở khóa tiềm năng khai thác thông tin bệnh nhân phục vụ phòng ngừa tiểu đường.",
    keyTakeaways: [
      "Khả năng đọc hiểu ghi chú lâm sàng phi cấu trúc của bác sĩ với độ chính xác vượt trội.",
      "Tự động nhận diện các yếu tố nguy cơ tiền sử gia đình và bệnh lý nền từ hồ sơ khám bệnh.",
      "Đánh dấu cột mốc mới trong ứng dụng mô hình nền tảng (Foundation Models) vào chăm sóc sức khỏe."
    ],
    link: "https://www.nature.com/articles/s41746-022-00742-2",
    tags: ["Clinical Language Model", "EHR", "Nature Communications", "Medical NLP"]
  }
];

// Lifestyle Articles (Cẩm Nang Sống Khỏe)
export const LIFESTYLE_ARTICLES: LifestyleArticle[] = [
  {
    id: "lifestyle-nutrition-diet",
    title: "Thực Đơn 7 Ngày Hạ Chỉ Số Đường Huyết & Ổn Định Insulin",
    category: "Dinh Dưỡng",
    image: "/research_images/nutrition_healthy_diet.jpg",
    readTime: "7 phút đọc",
    summary: "Hướng dẫn xây dựng thực đơn khoa học với các nhóm thực phẩm có chỉ số đường huyết GI thấp, giúp giảm tải chuyển hóa cho tuyến tụy và ngăn ngừa tích mỡ nội tạng.",
    content: "Nguyên tắc cốt lõi của chế độ ăn cho người có nguy cơ tiểu đường là kiểm soát lượng Carbohydrate tinh chế (cơm trắng, bánh ngọt, nước có gas) và thay thế bằng ngũ cốc nguyên hạt, yến mạch, gạo lứt kết hợp lượng chất xơ dồi dào từ rau xanh. Phương pháp Đĩa Thức Ăn (Plate Method) khuyến nghị: 1/2 đĩa là rau củ không chứa tinh bột, 1/4 là đạm nạc (cá, ức gà, đậu phụ) và 1/4 là tinh bột chuyển hóa chậm.",
    keyTakeaways: [
      "Ưu tiên thực phẩm có chỉ số GI < 55 (rau xanh, táo, cam, yến mạch, các loại đậu).",
      "Hạn chế tối đa đường tự do và thực phẩm chế biến sẵn chứa chất béo bão hòa.",
      "Uống đủ 2 lít nước mỗi ngày và không bỏ bữa sáng để tránh tụt đường huyết đột ngột."
    ],
    tags: ["Dinh Dưỡng", "GI Thấp", "Thực Đơn", "Sống Khỏe"]
  },
  {
    id: "lifestyle-exercise-habits",
    title: "5 Bài Tập Thể Lực Giúp Tăng Độ Nhạy Cảm Insulin Tự Nhiên",
    category: "Vận Động",
    image: "/research_images/exercise_lifestyle.jpg",
    readTime: "5 phút đọc",
    summary: "Phương pháp rèn luyện sức bền kết hợp rèn luyện sức mạnh cơ bắp giúp tế bào cơ sử dụng glucose hiệu quả ngay cả khi không cần nhiều insulin.",
    content: "Khi cơ bắp co bóp trong quá trình vận động, các thụ thể glucose GLUT4 di chuyển ra bề mặt tế bào để hấp thu đường trực tiếp từ máu vào cơ mà không phụ thuộc vào nồng độ insulin. Đi bộ nhanh 30 phút sau bữa ăn 30-45 phút có thể làm giảm đỉnh đường huyết sau ăn tới 25%. Ngoài ra, các bài tập kháng lực (chống đẩy, squat, nâng tạ nhẹ) giúp duy trì khối cơ chuyển hóa.",
    keyTakeaways: [
      "Mục tiêu tối thiểu: 150 phút tập aerobic cường độ vừa phải mỗi tuần (khoảng 30 phút/ngày, 5 ngày/tuần).",
      "Đi bộ nhẹ nhàng 10-15 phút sau bữa ăn trưa và tối giúp hạ đường huyết tức thì.",
      "Không ngồi bất động liên tục quá 60 phút; hãy đứng dậy vận động nhẹ 2 phút."
    ],
    tags: ["Vận Động", "Insulin", "Thể Dục", "Sống Khỏe"]
  },
  {
    id: "lifestyle-hba1c-monitoring",
    title: "Chỉ Số HbA1c Là Gì? Hướng Dẫn Tự Đọc Kết Quả Xét Nghiệm Máu",
    category: "Chỉ Số Sinh Học",
    image: "/research_images/blood_glucose_lab.jpg",
    readTime: "6 phút đọc",
    summary: "Hiểu rõ ý nghĩa của xét nghiệm HbA1c, sự khác biệt giữa đường huyết lúc đói và HbA1c, cùng các mốc cảnh báo đỏ bạn không thể xem nhẹ.",
    content: "Khác với đường huyết lúc đói phản ánh lượng đường tại một thời điểm nhất định và dễ bị biến động bởi bữa ăn gần nhất, HbA1c phản ánh mức đường huyết trung bình trong suốt 2-3 tháng qua (chu kỳ sống của hồng cầu). Do đó, HbA1c được xem là thước đo chuẩn xác nhất để chẩn đoán tiền tiểu đường và theo dõi hiệu quả điều trị.",
    keyTakeaways: [
      "HbA1c < 5.7%: Mức an toàn, chuyển hóa đường hoàn toàn bình thường.",
      "HbA1c 5.7% - 6.4%: Vùng Tiền Tiểu Đường - Thời điểm vàng để đảo ngược nguy cơ bệnh bằng ăn uống và vận động.",
      "HbA1c ≥ 6.5%: Ngưỡng chẩn đoán Đái tháo đường - Cần đi khám Bác sĩ chuyên khoa để được tư vấn phác đồ."
    ],
    tags: ["HbA1c", "Xét Nghiệm Máu", "Chỉ Số Sinh Học", "Tiền Tiểu Đường"]
  },
  {
    id: "lifestyle-medications-care",
    title: "Các Nhóm Thuốc Kiểm Soát Đường Huyết & Lưu Ý An Toàn",
    category: "Y Học & Thuốc",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "6 phút đọc",
    summary: "Tổng hợp thông tin về các nhóm thuốc điều trị phổ biến (Metformin, SGLT-2, GLP-1, Insulin), cách dùng an toàn và nhận biết dấu hiệu hạ đường huyết.",
    content: "Metformin thường là lựa chọn đầu tay giúp giảm sản xuất glucose ở gan và tăng nhạy cảm insulin ở cơ. Các nhóm thuốc thế hệ mới như SGLT-2 ức chế tái hấp thu đường ở thận và GLP-1 kích thích tiết insulin phụ thuộc glucose còn có thêm lợi ích bảo vệ tim và thận. Người bệnh tuyệt đối không tự ý tăng giảm liều hoặc bỏ thuốc khi chưa có chỉ định của Bác sĩ.",
    keyTakeaways: [
      "Uống thuốc đúng giờ, đúng liều lượng theo đơn của bác sĩ chuyên khoa.",
      "Nhận biết dấu hiệu hạ đường huyết cấp tính: run tay chân, vã mồ hôi lạnh, hoa mắt, tim đập nhanh.",
      "Luôn mang theo kẹo ngọt hoặc viên glucose bên mình để xử trí kịp thời khi bị hạ đường huyết."
    ],
    tags: ["Thuốc Điều Trị", "Metformin", "Insulin", "An Toàn Y Tế"]
  }
];

// Clinical Guidelines
export const CLINICAL_GUIDELINES: ClinicalGuideline[] = [
  {
    id: "ada-guideline-2024",
    title: "ADA Standards of Care in Diabetes 2024",
    organization: "American Diabetes Association (ADA)",
    year: "2024",
    category: "Tiêu Chuẩn Hoa Kỳ (ADA)",
    image: "/research_images/clinical_research_doc.jpg",
    readTime: "8 phút đọc",
    impact: "Very High",
    summary: "Tiêu chuẩn vàng toàn cầu cập nhật mới nhất về chẩn đoán sớm, phác đồ dùng thuốc bảo vệ tim mạch - thận và công nghệ theo dõi đường huyết liên tục.",
    keyTakeaways: [
      "Khuyến nghị sàng lọc đái tháo đường cho tất cả người trưởng thành từ 35 tuổi trở lên.",
      "Cá nhân hóa mục tiêu HbA1c theo độ tuổi và bệnh lý đồng mắc.",
      "Ưu tiên nhóm thuốc GLP-1 RA và SGLT-2i cho bệnh nhân có nguy cơ tim mạch hoặc thận."
    ],
    clinicalApplication: "Toàn bộ các ngưỡng HbA1c và glucose trong bộ quy tắc của DiabeTwin đều được thiết lập chuẩn theo ADA 2024.",
    link: "https://diabetes.org/"
  },
  {
    id: "moh-vietnam-guideline-2023",
    title: "Hướng Dẫn Chẩn Đoán & Điều Trị Đái Tháo Đường Tuýp 2",
    organization: "Bộ Y Tế Việt Nam",
    year: "2023",
    category: "Quy Chuẩn Bộ Y Tế",
    image: "/research_images/vietnam_who_diabetes.jpg",
    readTime: "7 phút đọc",
    impact: "Very High",
    summary: "Quy chuẩn y tế quốc gia hướng dẫn chi tiết quy trình sàng lọc, phác đồ điều trị phân tầng theo tuyến y tế cơ sở và quản lý biến chứng tại Việt Nam.",
    keyTakeaways: [
      "Quy định chuẩn hóa ngưỡng đường huyết và HbA1c tại các bệnh viện Việt Nam.",
      "Hướng dẫn dinh dưỡng phù hợp với văn hóa ẩm thực và thói quen ăn uống của người Việt.",
      "Chiến lược quản lý bệnh không lây nhiễm tại trạm y tế xã phường."
    ],
    clinicalApplication: "DiabeTwin hiệu chỉnh bộ chỉ số BMI cho người châu Á (BMI ≥ 23 là thừa cân, ≥ 25 là béo phì) theo chuẩn Bộ Y Tế Việt Nam.",
    link: "https://kcb.vn/"
  },
  {
    id: "who-diabetes-guidelines",
    title: "WHO Guidelines on Diabetes Screening & Management",
    organization: "World Health Organization (WHO)",
    year: "2023",
    category: "Khuyến Nghị Quốc Tế WHO",
    image: "/research_images/doctor_consultation.jpg",
    readTime: "6 phút đọc",
    impact: "Very High",
    summary: "Khuyến nghị toàn cầu về phòng ngừa ban đầu, sàng lọc cộng đồng và tăng cường khả năng tiếp cận thuốc thiết yếu insulin cho mọi người dân.",
    keyTakeaways: [
      "Can thiệp sớm lối sống giảm được 58% tỷ lệ tiến triển từ tiền tiểu đường thành tiểu đường.",
      "Khuyến khích ứng dụng trí tuệ nhân tạo và y tế số trong chăm sóc sức khỏe ban đầu.",
      "Kiểm soát huyết áp dưới 130/80 mmHg ở người bệnh tiểu đường."
    ],
    clinicalApplication: "Đóng vai trò định hướng cho module sàng lọc cộng đồng tại nhà không xâm lấn trong DiabeTwin.",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes"
  }
];

// Educational Resources
export const EDUCATIONAL_RESOURCES = [
  {
    icon: "🥗",
    title: "Chế Độ Ăn Địa Trung Hải Cho Người Tiền Tiểu Đường",
    description: "Kế hoạch dinh dưỡng giàu dầu olive, cá béo và rau xanh đã được chứng minh lâm sàng giúp giảm 30% nguy cơ tiến triển thành đái tháo đường.",
    link: "https://www.diabetes.org/healthy-living/recipes-nutrition"
  },
  {
    icon: "🏃",
    title: "Hướng Dẫn Vận Động Thể Chất Kháng Lực",
    description: "Các bài tập tăng cường khối lượng cơ bắp giúp thụ thể insulin hoạt động hiệu quả hơn, duy trì đường huyết ổn định sau bữa ăn.",
    link: "https://www.cdc.gov/diabetes/managing/active.html"
  },
  {
    icon: "📊",
    title: "Cẩm Nang Đọc Kết Quả Xét Nghiệm Đường Huyết & HbA1c",
    description: "Giải thích chi tiết các chỉ số Glucose đói, OGTT và HbA1c giúp người bệnh chủ động tự theo dõi tiến trình kiểm soát đường huyết.",
    link: "https://www.niddk.nih.gov/health-information/diabetes"
  },
  {
    icon: "🩺",
    title: "Bộ Hỏi Đáp Thường Gặp Về Thuốc Điều Trị Tiểu Đường",
    description: "Thông tin an toàn về thuốc uống và tiêm insulin, cách phòng ngừa hạ đường huyết đột ngột và tương tác dinh dưỡng cần lưu ý.",
    link: "https://www.who.int/news-room/fact-sheets/detail/diabetes"
  }
];
