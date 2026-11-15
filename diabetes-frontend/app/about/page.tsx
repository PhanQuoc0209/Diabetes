"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { 
  ALL_RESEARCH_PAPERS, 
  CLINICAL_GUIDELINES, 
  LIFESTYLE_ARTICLES, 
  EDUCATIONAL_RESOURCES 
} from "@/lib/researchData";
import { ArticleReaderModal, ArticleData } from "@/components/ArticleReaderModal";

export type AboutTabKey = 'overview' | 'model' | 'lifestyle' | 'papers' | 'guidelines';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTabKey>('overview');
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      const sub = params.get('sub');
      if (tab === 'lifestyle' || tab === 'papers' || tab === 'guidelines' || tab === 'model' || tab === 'overview') {
        setActiveTab(tab);
      } else if (tab === 'research') {
        if (sub === 'lifestyle' || sub === 'guidelines') {
          setActiveTab(sub);
        } else {
          setActiveTab('papers');
        }
      }
    }
  }, []);

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

      {/* Soft BookingCare Sticky Tabs (Mềm mại, phân tách 3 mục rõ ràng, không viền hộp vuông thô cứng) */}
      <div className="border-b border-slate-200/80 sticky top-16 sm:top-[68px] bg-white/95 backdrop-blur-md z-40 shadow-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <div className="p-1 sm:p-1.5 rounded-full bg-slate-100/90 border border-slate-200/70 shadow-xs flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full">
            <SoftTabPill
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon="🎯"
              label="Tổng quan"
            />
            <SoftTabPill
              active={activeTab === 'model'}
              onClick={() => setActiveTab('model')}
              icon="🤖"
              label="Mô hình AI"
            />
            <SoftTabPill
              active={activeTab === 'lifestyle'}
              onClick={() => setActiveTab('lifestyle')}
              icon="🌿"
              label="Cẩm Nang Sống Khỏe"
              count={LIFESTYLE_ARTICLES.length}
            />
            <SoftTabPill
              active={activeTab === 'papers'}
              onClick={() => setActiveTab('papers')}
              icon="📚"
              label="Nghiên Cứu Khoa Học"
              count={ALL_RESEARCH_PAPERS.length}
            />
            <SoftTabPill
              active={activeTab === 'guidelines'}
              onClick={() => setActiveTab('guidelines')}
              icon="📋"
              label="Tiêu Chuẩn Lâm Sàng"
              count={CLINICAL_GUIDELINES.length}
            />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'model' && <ModelTab />}
        {activeTab === 'lifestyle' && (
          <LifestyleTab
            onOpenArticle={(art) => {
              setSelectedArticle(art);
              setIsModalOpen(true);
            }}
          />
        )}
        {activeTab === 'papers' && (
          <PapersTab
            onOpenArticle={(art) => {
              setSelectedArticle(art);
              setIsModalOpen(true);
            }}
          />
        )}
        {activeTab === 'guidelines' && (
          <GuidelinesTab
            onOpenArticle={(art) => {
              setSelectedArticle(art);
              setIsModalOpen(true);
            }}
          />
        )}
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

      {/* Article Reader Modal */}
      <ArticleReaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle}
      />
    </div>
  );
}

function SoftTabPill({ active, onClick, icon, label, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
        active
          ? 'bg-[#00b5cc] text-white shadow-md shadow-[#00b5cc]/25 scale-[1.02]'
          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
      }`}
    >
      <span className="text-sm sm:text-base">{icon}</span>
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
          active ? 'bg-white/25 text-white' : 'bg-slate-200/90 text-slate-700'
        }`}>
          {count}
        </span>
      )}
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
                <p className="text-xs sm:text-sm text-slate-700 mb-3 leading-relaxed">
                  Huấn luyện trên <strong>~100.000 hồ sơ bệnh án lâm sàng</strong>, dành cho môi trường bệnh viện/phòng khám nơi bác sĩ cần công cụ hỗ trợ ra quyết định độ chính xác cao.
                </p>

                {/* Real Architecture Diagram from Old Web */}
                <div className="mb-4 bg-white p-2.5 rounded-xl border border-[#b2eaf1] shadow-xs">
                  <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                    <span>🔬</span> Sơ đồ luồng xử lý lâm sàng AdaBoost:
                  </p>
                  <img
                    src="/model_images/model_for_hospital_v2.png"
                    alt="Sơ đồ mô hình lâm sàng Doctor Model"
                    className="w-full rounded-lg object-contain bg-slate-50 max-h-48"
                  />
                </div>

                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 mb-4">
                  <li>• Tối ưu hóa <strong>độ nhạy (recall ≥ 80%)</strong> với nhóm ca dương tính để hạn chế tối đa bỏ sót ca bệnh.</li>
                  <li>• Giao diện kết quả chuyên sâu tích hợp biểu đồ SHAP giải thích cho từng bệnh nhân.</li>
                  <li>• Phù hợp áp dụng song song với quy trình khám sàng lọc tiêu chuẩn.</li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-[#b2eaf1] flex flex-wrap gap-2.5">
                <a
                  href="/diabetes_report.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#00b5cc] text-[#008299] hover:bg-[#dcf6f9] text-xs font-bold shadow-xs transition-colors"
                >
                  <span>📊 Xem Báo cáo Huấn luyện (HTML)</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <Link
                  href="/doctor"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs font-bold shadow-xs transition-colors"
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
                <p className="text-xs sm:text-sm text-slate-700 mb-3 leading-relaxed">
                  Huấn luyện với <strong>70.692 mẫu dữ liệu</strong> từ khảo sát 
                  <strong> CDC BRFSS (Behavioral Risk Factor Surveillance System)</strong>, tập trung vào thói quen sinh hoạt và thể trạng.
                </p>

                {/* Real Architecture Diagram from Old Web */}
                <div className="mb-4 bg-white p-2.5 rounded-xl border border-purple-200 shadow-xs">
                  <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                    <span>🏠</span> Sơ đồ luồng xử lý tại nhà LightGBM:
                  </p>
                  <img
                    src="/model_images/model_for_home_v2.png"
                    alt="Sơ đồ mô hình tại nhà Home Model"
                    className="w-full rounded-lg object-contain bg-slate-50 max-h-48"
                  />
                </div>

                <ul className="text-xs sm:text-sm text-slate-600 space-y-2 mb-4">
                  <li>• Ưu tiên <strong>tốc độ và sự ổn định</strong>, mượt mà trên mọi thiết bị di động.</li>
                  <li>• Bộ câu hỏi thân thiện, dễ trả lời cho người dùng không có kiến thức y khoa chuyên sâu.</li>
                  <li>• Sàng lọc nguy cơ sớm tại nhà, định hướng người dùng đi khám chuyên khoa khi có dấu hiệu bất thường.</li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-200 flex flex-wrap gap-2.5">
                <a
                  href="/diabetes_report_for_AI_at_home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-purple-400 text-purple-800 hover:bg-purple-100 text-xs font-bold shadow-xs transition-colors"
                >
                  <span>📈 Xem Báo cáo Huấn luyện (HTML)</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <Link
                  href="/user-prediction"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
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

// ─── 3 SEPARATE MEDICAL SECTIONS (CẨM NANG, NGHIÊN CỨU, TIÊU CHUẨN LÂM SÀNG) ──

// 1. CẨM NANG SỐNG KHỎE & DINH DƯỠNG (Dành cho người dùng & bệnh nhân)
function LifestyleTab({ onOpenArticle }: { onOpenArticle: (article: ArticleData) => void }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] shadow-xs mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
          <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
            Cẩm Nang Chăm Sóc Sức Khỏe
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mb-2">
          Cẩm Nang Y Khoa & Lối Sống Lành Mạnh
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Kiến thức dinh dưỡng, bài tập thể lực và hướng dẫn tự đọc chỉ số sinh học chuẩn y tế dành cho người có nguy cơ hoặc đang điều trị đái tháo đường.
        </p>
      </div>

      {/* Grid of 4 Lifestyle Articles (Ảnh 1 style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {LIFESTYLE_ARTICLES.map((art) => (
          <MedicalGridCard
            key={art.id}
            article={{
              id: art.id,
              title: art.title,
              category: art.category,
              image: art.image,
              readTime: art.readTime,
              summary: art.summary,
              content: art.content,
              keyTakeaways: art.keyTakeaways,
              tags: art.tags,
            }}
            onRead={() => onOpenArticle({
              id: art.id,
              title: art.title,
              category: art.category,
              image: art.image,
              readTime: art.readTime,
              summary: art.summary,
              content: art.content,
              keyTakeaways: art.keyTakeaways,
              tags: art.tags,
            })}
          />
        ))}
      </div>

      {/* 3 Golden Rules Box */}
      <div className="bg-gradient-to-br from-[#edfafb] via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-[#b2eaf1] shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-[#008299] mb-4 flex items-center gap-2">
          <span>🥗</span> 3 Nguyên Tắc Vàng Ngăn Ngừa Tiến Triển Đái Tháo Đường
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs">
            <div className="text-3xl mb-2.5">🍽️</div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Phương Pháp Đĩa Ăn (Plate Method)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              1/2 đĩa là rau củ xanh không chứa tinh bột; 1/4 là đạm nạc (cá, ức gà, đậu phụ); 1/4 là tinh bột chuyển hóa chậm (gạo lứt, yến mạch, khoai lang).
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs">
            <div className="text-3xl mb-2.5">🏃‍♂️</div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Quy Tắc Vận Động 150 Phút/Tuần</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tối thiểu 30 phút đi bộ nhanh hoặc đạp xe mỗi ngày (5 ngày/tuần). Đi bộ nhẹ 10 phút sau bữa ăn giúp giảm tức thì đỉnh đường huyết sau ăn tới 25%.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs">
            <div className="text-3xl mb-2.5">🩸</div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Tầm Soát Chỉ Số HbA1c Định Kỳ</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Xét nghiệm máu 3-6 tháng/lần. Duy trì HbA1c dưới 5.7% là mục tiêu an toàn bảo vệ tim mạch, mắt và thận khỏi các biến chứng nguy hiểm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. NGHIÊN CỨU KHOA HỌC (20 công trình Nature, PMLR, BMC, IEEE, WHO, MDPI)
function PapersTab({ onOpenArticle }: { onOpenArticle: (article: ArticleData) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPapers = ALL_RESEARCH_PAPERS.filter((paper) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.journal.toLowerCase().includes(q) ||
      paper.summary.toLowerCase().includes(q) ||
      paper.tags.some((t) => t.toLowerCase().includes(q));

    const matchesTag = selectedTag ? paper.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(ALL_RESEARCH_PAPERS.flatMap((p) => p.tags))
  ).slice(0, 10);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] shadow-xs mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
          <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
            Y Học Chuẩn Xác & Trí Tuệ Nhân Tạo
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mb-2">
          Tài Liệu & Công Trình Nghiên Cứu Khoa Học
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Tổng hợp 20 công trình nghiên cứu bình duyệt từ các tạp chí y khoa hàng đầu (Nature, PMLR, BMC Medicine, IEEE, WHO, MDPI) làm nền tảng toán học cho các mô hình AI của DiabeTwin.
        </p>
      </div>

      {/* Search Bar & Tag Filter */}
      <div className="max-w-3xl mx-auto text-center pt-2">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, tác giả hoặc từ khóa nghiên cứu (ví dụ: WHO, SHAP, Machine Learning, ADA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 rounded-full border border-slate-300 focus:border-[#00b5cc] focus:ring-3 focus:ring-[#00b5cc]/15 outline-hidden text-sm bg-white shadow-xs pr-11"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`text-xs px-3.5 py-1 rounded-full font-medium transition-colors ${
              selectedTag === null
                ? "bg-[#00b5cc] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Tất cả ({ALL_RESEARCH_PAPERS.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`text-xs px-3.5 py-1 rounded-full font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-[#00b5cc] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Count Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>📚</span>
          <span>Danh Sách Công Trình Nghiên Cứu</span>
          <span className="text-xs font-semibold text-[#0099ad] bg-[#edfafb] px-2.5 py-0.5 rounded-full">
            {filteredPapers.length} công trình
          </span>
        </h3>
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="text-xs text-[#0099ad] hover:underline"
          >
            Xóa bộ lọc: #{selectedTag}
          </button>
        )}
      </div>

      {/* The Responsive Card Grid (Ảnh 1 style - Không danh sách phẳng như Ảnh 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredPapers.map((paper) => (
          <MedicalGridCard
            key={paper.id}
            article={paper}
            onRead={() => onOpenArticle(paper)}
          />
        ))}
      </div>

      {filteredPapers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">
            Không tìm thấy tài liệu phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag(null);
            }}
            className="mt-3 text-xs font-semibold text-[#0099ad] hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

// 3. TIÊU CHUẨN LÂM SÀNG (ADA 2024, Bộ Y Tế, WHO)
function GuidelinesTab({ onOpenArticle }: { onOpenArticle: (article: ArticleData) => void }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] shadow-xs mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
          <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
            Tiêu Chuẩn Lâm Sàng Quốc Gia & Quốc Tế
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-bold text-slate-900 mb-2">
          Quy Chuẩn Y Tế & Tiêu Chuẩn Lâm Sàng
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Các hướng dẫn chẩn đoán và điều trị chính thống từ Hiệp hội Đái tháo đường Hoa Kỳ (ADA 2024), Bộ Y Tế Việt Nam (2023) và Tổ chức Y tế Thế giới (WHO).
        </p>
      </div>

      {/* Grid of 3 Clinical Guidelines (Ảnh 1 style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CLINICAL_GUIDELINES.map((guideline) => (
          <MedicalGridCard
            key={guideline.id}
            article={{
              id: guideline.id,
              title: guideline.title,
              organization: guideline.organization,
              year: guideline.year,
              category: guideline.category,
              image: guideline.image,
              readTime: guideline.readTime,
              impact: guideline.impact,
              summary: guideline.summary,
              keyTakeaways: guideline.keyTakeaways,
              clinicalApplication: guideline.clinicalApplication,
              link: guideline.link,
            }}
            onRead={() => onOpenArticle({
              id: guideline.id,
              title: guideline.title,
              organization: guideline.organization,
              year: guideline.year,
              category: guideline.category,
              image: guideline.image,
              readTime: guideline.readTime,
              impact: guideline.impact,
              summary: guideline.summary,
              keyTakeaways: guideline.keyTakeaways,
              clinicalApplication: guideline.clinicalApplication,
              link: guideline.link,
            })}
          />
        ))}
      </div>

      {/* Diagnostic Threshold Reference Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span>⚖️</span> Bảng Tiêu Chuẩn Chẩn Đoán Đường Huyết & Phân Tầng Nguy Cơ (Theo ADA 2024 & Bộ Y Tế)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/80">
                <th className="py-3 px-4 rounded-l-xl">Phân loại Nguy cơ</th>
                <th className="py-3 px-4">Chỉ số HbA1c</th>
                <th className="py-3 px-4">Đường huyết lúc đói (FPG)</th>
                <th className="py-3 px-4 rounded-r-xl">Khuyến nghị Y tế</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 px-4 font-bold text-emerald-700">🟢 Bình Thường</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">&lt; 5.7%</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">&lt; 100 mg/dL (&lt; 5.6 mmol/L)</td>
                <td className="py-3.5 px-4 text-slate-600">Duy trì chế độ ăn và sinh hoạt lành mạnh, kiểm tra định kỳ hàng năm.</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-3.5 px-4 font-bold text-amber-700">🟡 Tiền Đái Tháo Đường</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">5.7% - 6.4%</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">100 - 125 mg/dL (5.6 - 6.9 mmol/L)</td>
                <td className="py-3.5 px-4 text-slate-600">Giai đoạn vàng để can thiệp dinh dưỡng, giảm 5-7% trọng lượng cơ thể để đưa chỉ số về mức an toàn.</td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="py-3.5 px-4 font-bold text-rose-700">🔴 Đái Tháo Đường Lâm Sàng</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 6.5%</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 126 mg/dL (≥ 7.0 mmol/L)</td>
                <td className="py-3.5 px-4 text-slate-600">Cần khám Bác sĩ chuyên khoa Nội tiết để chẩn đoán xác định và xây dựng phác đồ điều trị kịp thời.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Card Component matching Image 1 ────────────────────────────────────

function MedicalGridCard({
  article,
  onRead,
}: {
  article: ArticleData;
  onRead: () => void;
}) {
  return (
    <div
      onClick={onRead}
      className="bg-white rounded-2xl border border-slate-100/90 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#00b5cc]/40 transition-all flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Real Thumbnail Image with rounded top */}
        <div className="w-full h-36 sm:h-40 overflow-hidden bg-slate-100 relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.impact && (
            <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
              article.impact === 'Very High'
                ? 'bg-rose-500 text-white'
                : 'bg-[#00b5cc] text-white'
            }`}>
              {article.impact} Impact
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#edfafb] text-[#0099ad]">
              {article.category}
            </span>
            <span className="text-[10px] text-slate-400">
              {article.readTime || (article.year ? `${article.year}` : '')}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#00b5cc] transition-colors">
            {article.title}
          </h3>

          {(article.authors || article.organization) && (
            <p className="text-[11px] text-slate-400 italic line-clamp-1 mb-1.5">
              {article.authors || article.organization} {article.journal ? `• ${article.journal}` : ''}
            </p>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRead();
          }}
          className="text-xs font-semibold text-[#0099ad] hover:text-[#007b8b] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Đọc bài viết</span>
          <span>→</span>
        </button>

        {article.link && (
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
            <span>Tài liệu gốc</span>
            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        )}
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
