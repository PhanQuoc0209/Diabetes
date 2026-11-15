"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'model' | 'research'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />

      {/* Hero Section - BookingCare Medical Style */}
      <section className="bg-gradient-to-b from-[#dff6f9] via-[#edfafb] to-slate-50 py-10 sm:py-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#b2eaf1] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
            <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
              Hồ Sơ Y Khoa & Công Nghệ AI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Về Nền Tảng DiabeTwin
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3 leading-relaxed">
            Hệ thống dự đoán nguy cơ tiểu đường bằng Trí tuệ Nhân tạo tiên tiến, 
            cung cấp giải pháp sàng lọc sớm, chính xác và minh bạch theo chuẩn y khoa.
          </p>
        </div>
      </section>

      {/* BookingCare Sticky Tabs */}
      <div className="border-b border-slate-200 sticky top-16 sm:top-20 bg-white z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon="🎯"
              label="Tổng quan & Sứ mệnh"
              labelEn="Overview"
            />
            <TabButton
              active={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
              icon="🤖"
              label="Kiến trúc Mô hình AI"
              labelEn="AI Model"
            />
            <TabButton
              active={activeTab === 'research'}
              onClick={() => setActiveTab('research')}
              icon="📚"
              label="Nghiên cứu & Dữ liệu Y khoa"
              labelEn="Research"
            />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'model' && <ModelTab />}
        {activeTab === 'research' && <ResearchTab />}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 DiabeTwin - Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện</p>
          <p className="mt-1 text-slate-400">
            Nghiên cứu phát triển bởi nhóm kỹ sư AI & Khoa học dữ liệu Đại học FPT.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, labelEn }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-5 py-3.5 sm:py-4 font-bold border-b-2 transition-all whitespace-nowrap text-xs sm:text-sm flex items-center gap-2 ${
        active
          ? 'border-[#00b5cc] text-[#008299] bg-[#edfafb]/50'
          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
      <span className="text-[10px] text-slate-400 hidden xl:inline">({labelEn})</span>
    </button>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Mission */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Sứ Mệnh Phát Triển</h2>
        </div>
        <div className="bg-gradient-to-br from-[#edfafb] via-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-[#b2eaf1] shadow-xs">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
            DiabeTwin ra đời với sứ mệnh <strong>bình đẳng hóa tiếp cận y tế chất lượng cao</strong> thông qua công nghệ Trí tuệ Nhân tạo hiện đại. Chúng tôi tin rằng mọi người dân đều có quyền được tiếp cận các công cụ sàng lọc sức khỏe sớm, chính xác, tin cậy và hoàn toàn miễn phí.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Đái tháo đường đang là gánh nặng bệnh tật ngày càng gia tăng trên toàn cầu cũng như tại Việt Nam. Việc phát hiện sớm ngay từ giai đoạn tiền tiểu đường có thể cứu sống hàng triệu người và cải thiện đáng kể chất lượng sống.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📈</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Chỉ Số & Tác Động</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <BookingCareAboutStatCard
            value="95%"
            label="Độ chính xác"
            labelEn="Accuracy"
            description="Độ chính xác trung bình trên tập kiểm thử"
            badgeColor="bg-emerald-50 text-emerald-700"
          />
          <BookingCareAboutStatCard
            value="15.000+"
            label="Lượt đánh giá"
            labelEn="Users"
            description="Số người đã thực hiện kiểm tra nguy cơ"
            badgeColor="bg-cyan-50 text-cyan-700"
          />
          <BookingCareAboutStatCard
            value="80%"
            label="Độ nhạy (Recall)"
            labelEn="Recall Score"
            description="Khả năng phát hiện ca dương tính nguy cơ cao"
            badgeColor="bg-purple-50 text-purple-700"
          />
          <BookingCareAboutStatCard
            value="<10s"
            label="Thời gian xử lý"
            labelEn="Response Speed"
            description="Tốc độ suy luận AI trên mọi nền tảng"
            badgeColor="bg-amber-50 text-amber-700"
          />
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">👥</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Đội Ngũ Nghiên Cứu & Phát Triển</h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BookingCareTeamMember
              name="Ngô Quang Trãi"
              role="ML Engineer"
              avatar="👨‍🔬"
              description="Kỹ sư Machine Learning, nghiên cứu mô hình AdaBoost và thuật toán SHAP"
            />
            <BookingCareTeamMember
              name="Đào Đức Anh Kiệt"
              role="AI & Full-stack Engineer"
              avatar="👨‍💻"
              description="Kỹ sư Full-stack & AI, tích hợp Backend FastAPI và Next.js"
            />
            <BookingCareTeamMember
              name="Nguyễn Nho Huy Hoàng"
              role="Data Scientist"
              avatar="👨‍🔬"
              description="Chuyên gia Khoa học Dữ liệu, xử lý dữ liệu lâm sàng và CDC BRFSS"
            />
            <BookingCareTeamMember
              name="Phan Văn Quốc"
              role="Researcher & Project Lead"
              avatar="👨‍💼"
              description="Trưởng nhóm nghiên cứu & khảo sát y văn lâm sàng"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✨</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Tính Năng Cốt Lõi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <BookingCareAboutFeatureCard
            icon="🎯"
            title="Dự đoán chuẩn xác"
            desc="Sử dụng thuật toán học máy tiên tiến được thẩm định trên dữ liệu lâm sàng y tế."
          />
          <BookingCareAboutFeatureCard
            icon="📊"
            title="Giải thích SHAP minh bạch"
            desc="Minh bạch từng yếu tố sinh học tác động đến kết quả dự đoán của mô hình."
          />
          <BookingCareAboutFeatureCard
            icon="⚡"
            title="Kết quả tức thì"
            desc="Nhận phân tích chi tiết trong chưa đầy 10 giây với hạ tầng tối ưu."
          />
          <BookingCareAboutFeatureCard
            icon="🔒"
            title="Bảo mật tuyệt đối"
            desc="Mã hóa đầu cuối, không lưu trữ thông tin nhận dạng cá nhân trái phép."
          />
          <BookingCareAboutFeatureCard
            icon="💡"
            title="Bác sĩ AI tư vấn"
            desc="Cung cấp khuyến nghị lối sống, chế độ ăn uống phù hợp thể trạng từng người."
          />
          <BookingCareAboutFeatureCard
            icon="📱"
            title="Đa nền tảng linh hoạt"
            desc="Trải nghiệm mượt mà trên cả điện thoại, máy tính bảng và máy tính để bàn."
          />
        </div>
      </section>
    </div>
  );
}

// ─── MODEL TAB ───────────────────────────────────────────────────────────────

function ModelTab() {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Twin Model Architecture */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏗️</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Kiến Trúc Mô Hình Kép DiabeTwin (Doctor & Home)</h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            DiabeTwin được thiết kế theo cấu trúc <strong>"sinh đôi" (Twin AI system)</strong> với hai mô hình chuyên biệt, được huấn luyện tối ưu hóa riêng cho từng bối cảnh sử dụng:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            
            {/* Doctor Model */}
            <div className="bg-[#edfafb] rounded-2xl p-6 border border-[#b2eaf1] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#008299]">Doctor Model (Chuyên Khoa)</h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00b5cc] text-white">
                    AdaBoostClassifier
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                  Huấn luyện trên <strong>~100.000 hồ sơ bệnh án lâm sàng</strong>, dành cho môi trường bệnh viện/phòng khám nơi bác sĩ cần công cụ hỗ trợ ra quyết định độ chính xác cao.
                </p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Tối ưu hóa <strong>độ nhạy (recall ≥ 80%)</strong> với nhóm ca dương tính để hạn chế tối đa bỏ sót ca bệnh.</li>
                  <li>• Giao diện kết quả chuyên sâu tích hợp biểu đồ SHAP giải thích cho từng bệnh nhân.</li>
                  <li>• Phù hợp áp dụng song song với quy trình khám sàng lọc tiêu chuẩn.</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#b2eaf1]">
                <Link
                  href="/doctor"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors w-full sm:w-auto"
                >
                  🩺 Trải nghiệm Cổng Bác sĩ
                </Link>
              </div>
            </div>

            {/* Home User Model */}
            <div className="bg-purple-50/70 rounded-2xl p-6 border border-purple-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-purple-900">Home User Model (Tại Nhà)</h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-600 text-white">
                    LGBMClassifier
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                  Huấn luyện với <strong>70.692 mẫu dữ liệu</strong> từ khảo sát 
                  <strong> CDC BRFSS (Behavioral Risk Factor Surveillance System)</strong>, tập trung vào thói quen sinh hoạt và thể trạng.
                </p>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li>• Ưu tiên <strong>tốc độ và sự ổn định</strong>, mượt mà trên mọi thiết bị di động.</li>
                  <li>• Bộ câu hỏi thân thiện, dễ trả lời cho người dùng không có kiến thức y khoa chuyên sâu.</li>
                  <li>• Sàng lọc nguy cơ sớm tại nhà, định hướng người dùng đi khám chuyên khoa khi có dấu hiệu bất thường.</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-purple-200">
                <Link
                  href="/user-prediction"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors w-full sm:w-auto"
                >
                  🏠 Sàng lọc Nguy cơ Tại nhà
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHAP & LLM Advisor */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Giải Thích Mô Hình SHAP & Bác Sĩ AI</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              SHAP – Minh Bạch Yếu Tố Nguy Cơ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              Thay vì chỉ trả về con số xác suất thuần túy, DiabeTwin ứng dụng lý thuyết trò chơi hợp tác <strong>SHAP</strong> để bóc tách đóng góp của từng chỉ số vào kết quả tổng thể.
            </p>
            <div className="space-y-3">
              <BookingCareFeatureBar label="Chỉ số HbA1c" percent={28.5} color="bg-red-500" />
              <BookingCareFeatureBar label="Đường huyết lúc đói (Glucose)" percent={22.4} color="bg-orange-500" />
              <BookingCareFeatureBar label="Thể trọng & BMI" percent={18.1} color="bg-amber-500" />
              <BookingCareFeatureBar label="Độ tuổi bệnh nhân" percent={14.2} color="bg-blue-500" />
              <BookingCareFeatureBar label="Huyết áp & Tim mạch" percent={11.3} color="bg-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Bác Sĩ AI Tư Vấn – Khuyến Nghị Hành Động
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              Sau khi mô hình tính toán rủi ro và xác định các nhân tố nguy cơ hàng đầu, hệ sinh thái AI sẽ tổng hợp và phiên dịch kết quả thành lời khuyên y tế dễ hiểu:
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[#00b5cc] font-bold">✓</span>
                <span>Tóm tắt tình trạng nguy cơ: Thấp, Trung bình (Tiền tiểu đường), Cao.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00b5cc] font-bold">✓</span>
                <span>Chỉ rõ yếu tố nào đang đẩy nguy cơ lên cao nhất (BMI, HbA1c, Huyết áp...).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00b5cc] font-bold">✓</span>
                <span>Đề xuất các bước hành động cụ thể về khẩu phần dinh dưỡng, vận động và lịch tái khám.</span>
              </li>
            </ul>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              ⚠️ Lưu ý: Lời khuyên từ AI mang tính định hướng tham khảo. Mọi quyết định điều trị cần có sự hướng dẫn của Bác sĩ chuyên khoa nội tiết.
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// ─── RESEARCH TAB ────────────────────────────────────────────────────────────

function ResearchTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const researchPapers = [
    {
      title: "IDF Diabetes Atlas, 10th ed.",
      authors: "International Diabetes Federation",
      journal: "International Diabetes Federation",
      year: 2021,
      impact: "Very High",
      summary: "Số liệu dịch tễ học và thống kê toàn cầu về bệnh đái tháo đường từ Liên đoàn Đái tháo đường Quốc tế.",
      link: "https://diabetesatlas.org/data-by-location/global/",
      tags: ["Epidemiology", "Global Statistics", "IDF"]
    },
    {
      title: "The growing burden of diabetes in Viet Nam",
      authors: "World Health Organization",
      journal: "WHO Country Office Vietnam",
      year: 2024,
      impact: "High",
      summary: "Báo cáo của WHO về gánh nặng gia tăng của bệnh tiểu đường tại Việt Nam và các giải pháp can thiệp sớm.",
      link: "https://www.who.int/vietnam/news/feature-stories/detail/the-growing-burden-of-diabetes-in-viet-nam",
      tags: ["Vietnam", "Epidemiology", "WHO"]
    },
    {
      title: "What clinicians want: contextualizing explainable machine learning for clinical end use",
      authors: "S. Tonekaboni, S. Joshi, K. D. McCradden, A. Goldenberg",
      journal: "Proceedings of Machine Learning Research (PMLR)",
      year: 2019,
      impact: "Very High",
      summary: "Nghiên cứu về nhu cầu thực tế của Bác sĩ đối với các mô hình AI có khả năng giải thích (Explainable AI) trong lâm sàng.",
      link: "https://proceedings.mlr.press/v106/tonekaboni19a.html",
      tags: ["Explainable AI", "SHAP", "Clinical Decision"]
    },
    {
      title: "Diabetes prediction using machine learning and explainable AI techniques",
      authors: "I. Tasin, T. U. Nabil, S. Islam, R. Khan",
      journal: "Healthcare Technology Letters",
      year: 2022,
      impact: "High",
      summary: "Tích hợp thuật toán học máy và phương pháp giải thích AI nhằm tối ưu hóa độ nhạy trong dự đoán nguy cơ tiểu đường.",
      link: "https://doi.org/10.1049/htl2.12039",
      tags: ["Machine Learning", "Health Tech", "XAI"]
    },
    {
      title: "Assessment of machine learning algorithms to detect early disease outcomes",
      authors: "R. A. Calvert and others",
      journal: "BMC Medicine",
      year: 2019,
      impact: "Very High",
      summary: "Đánh giá toàn diện các thuật toán học máy trong phát hiện sớm nguy cơ bệnh mạn tính.",
      link: "https://doi.org/10.1186/s12916-019-1426-2",
      tags: ["Early Detection", "Algorithm Assessment", "BMC"]
    },
  ];

  const filteredPapers = researchPapers.filter(paper => {
    const q = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Search Input */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, tác giả hoặc từ khóa nghiên cứu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-slate-300 focus:border-[#00b5cc] focus:ring-3 focus:ring-[#00b5cc]/15 outline-hidden text-sm bg-white shadow-xs"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
      </div>

      {/* Papers */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">📚 Tài Liệu Nghiên Cứu Khoa Học</h2>
        <div className="space-y-4">
          {filteredPapers.map((paper, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-[#00b5cc] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {paper.authors} • <em>{paper.journal}</em> ({paper.year})
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#008299] border border-cyan-100 self-start">
                  {paper.impact} Impact
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {paper.summary}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0099ad] hover:text-[#007b8b] flex items-center gap-1"
                >
                  <span>Xem tài liệu</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Guidelines */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">📋 Hướng Dẫn Điều Trị & Tiêu Chuẩn Lâm Sàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BookingCareGuidelineCard
            title="ADA Standards of Medical Care in Diabetes"
            org="Hiệp hội Đái tháo đường Hoa Kỳ (ADA)"
            year="2024"
            desc="Tiêu chuẩn vàng trong chẩn đoán, phân loại và quản lý biến chứng đái tháo đường toàn cầu."
          />
          <BookingCareGuidelineCard
            title="Hướng Dẫn Chẩn Đoán & Điều Trị Đái Tháo Đường Tuýp 2"
            org="Bộ Y Tế Việt Nam"
            year="2023"
            desc="Quy chuẩn quốc gia về tiêu chuẩn chẩn đoán đường huyết, HbA1c và phác đồ can thiệp."
          />
          <BookingCareGuidelineCard
            title="WHO Global Report on Diabetes"
            org="Tổ chức Y tế Thế giới (WHO)"
            year="2023"
            desc="Chiến lược phòng ngừa dịch bệnh không lây nhiễm và tăng cường khả năng tiếp cận thuốc."
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function BookingCareAboutStatCard({ value, label, labelEn, description, badgeColor }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#00b5cc] transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
          {labelEn}
        </span>
      </div>
      <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-bold text-slate-800 mb-1">{label}</div>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function BookingCareTeamMember({ name, role, avatar, description }: any) {
  return (
    <div className="text-center p-4 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="w-16 h-16 rounded-full bg-[#edfafb] border border-[#b2eaf1] flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
        {avatar}
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-0.5">{name}</h3>
      <p className="text-xs font-bold text-[#0099ad] mb-2">{role}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function BookingCareAboutFeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#00b5cc] transition-all">
      <div className="w-10 h-10 rounded-xl bg-[#edfafb] text-[#00b5cc] flex items-center justify-center text-2xl mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function BookingCareFeatureBar({ label, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
        <span>{label}</span>
        <span className="font-bold text-slate-900">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function BookingCareGuidelineCard({ title, org, year, desc }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <span className="text-2xl mb-2 block">📋</span>
        <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1">{title}</h4>
        <p className="text-xs font-semibold text-[#0099ad] mb-2">{org} • {year}</p>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-600">✓ Tiêu chuẩn quốc tế</span>
      </div>
    </div>
  );
}
