"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export type AboutTabKey = 'overview' | 'model' | 'lifestyle' | 'papers' | 'guidelines';

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<
    'ai-model' | 'shap-advisor' | 'mission-stats' | 'team-members' | 'core-features'
  >('ai-model');

  // Handle smooth scroll on click
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId as any);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scrollspy to dynamically update active tab when scrolling
  useEffect(() => {
    const sectionIds: Array<'ai-model' | 'shap-advisor' | 'mission-stats' | 'team-members' | 'core-features'> = [
      'ai-model',
      'shap-advisor',
      'mission-stats',
      'team-members',
      'core-features',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Offset for sticky topbars
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navigation />

      {/* Hero Section - Soft BookingCare Medical Style */}
      <section className="bg-gradient-to-b from-[#dff6f9] via-[#edfafb] to-[#f8fafc] py-10 sm:py-14 border-b border-[#daf0f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#b2eaf1] shadow-xs mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
            <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
              Hồ Sơ Y Khoa & Công Nghệ AI
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Về Nền Tảng DiabeTwin
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto mt-3 leading-relaxed">
            Hệ thống dự đoán nguy cơ tiểu đường bằng Trí tuệ Nhân tạo kép (Twin AI), 
            cung cấp giải pháp sàng lọc sớm, giải thích hộp trắng minh bạch theo chuẩn y khoa lâm sàng.
          </p>
        </div>
      </section>

      {/* Sticky Tab Navigation Lướt Xuống (Smooth Scroll Tabs - BookingCare Style) */}
      <div className="sticky top-16 sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2.5 no-scrollbar">
            <ScrollTabButton
              active={activeSection === 'ai-model'}
              onClick={() => scrollToSection('ai-model')}
              icon="🤖"
              label="Kiến trúc Mô hình AI"
            />
            <ScrollTabButton
              active={activeSection === 'shap-advisor'}
              onClick={() => scrollToSection('shap-advisor')}
              icon="🔍"
              label="Giải thích SHAP & AI"
            />
            <ScrollTabButton
              active={activeSection === 'mission-stats'}
              onClick={() => scrollToSection('mission-stats')}
              icon="🎯"
              label="Sứ mệnh & Tác động"
            />
            <ScrollTabButton
              active={activeSection === 'team-members'}
              onClick={() => scrollToSection('team-members')}
              icon="👥"
              label="Đội ngũ Phát triển"
            />
            <ScrollTabButton
              active={activeSection === 'core-features'}
              onClick={() => scrollToSection('core-features')}
              icon="✨"
              label="Tính năng Cốt lõi"
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTINUOUS CONTENT: Mô hình AI ở trên, Đội ngũ ở dưới */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16 flex-1 w-full">

        {/* ── 1. MÔ HÌNH AI Ở TRÊN (Twin Model Architecture) ── */}
        <section id="ai-model" className="scroll-mt-36 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>🤖</span>
                <span>Kiến Trúc Mô Hình Kép DiabeTwin (Doctor & Home)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Hai mô hình chuyên biệt được thiết kế và huấn luyện độc lập cho hai bối cảnh y tế: lâm sàng bệnh viện và sàng lọc tại nhà
              </p>
            </div>
            <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] hidden sm:inline-block">
              Twin AI System
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              DiabeTwin giải quyết bài toán chẩn đoán tiểu đường bằng cách phân tách rõ ràng giữa hai nhóm người dùng thông qua kiến trúc <strong>&quot;sinh đôi&quot; (Twin AI System)</strong>:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              
              {/* Doctor Model (Bệnh viện / Lâm sàng) */}
              <div className="bg-gradient-to-br from-[#edfafb] via-white to-[#f4fcfe] rounded-2xl p-6 border border-[#b2eaf1] flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🩺</span>
                      <h3 className="text-base sm:text-lg font-bold text-[#008299]">Doctor Model (Chuyên Khoa)</h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00b5cc] text-white">
                      AdaBoostClassifier
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                    Huấn luyện trên <strong>~100.000 hồ sơ bệnh án lâm sàng</strong>, dành cho môi trường bệnh viện và phòng khám nơi bác sĩ có sẵn các chỉ số sinh hóa máu chuyên sâu.
                  </p>

                  {/* Sơ đồ luồng xử lý lâm sàng AdaBoost */}
                  <div className="mb-4 bg-white p-3 rounded-xl border border-[#b2eaf1] shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                      <span>🔬</span> Sơ đồ luồng xử lý lâm sàng AdaBoost:
                    </p>
                    <img
                      src="/model_images/model_for_hospital_v2.png"
                      alt="Sơ đồ mô hình lâm sàng Doctor Model"
                      className="w-full rounded-lg object-contain bg-slate-50 max-h-52"
                    />
                  </div>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 mb-4">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00b5cc] font-bold">•</span>
                      <span>Tối ưu hóa <strong>độ nhạy lâm sàng (Recall ≥ 80%)</strong> đối với ca nguy cơ cao để không bỏ sót người bệnh.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00b5cc] font-bold">•</span>
                      <span>Xử lý 8 thông số sinh hóa: HbA1c, Glucose lúc đói, Huyết áp, BMI, Tuổi, Giới tính, Tiền sử tim mạch, Thói quen hút thuốc.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00b5cc] font-bold">•</span>
                      <span>Tích hợp phân tích SHAP bóc tách đóng góp của từng chỉ số máu.</span>
                    </li>
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

              {/* Home User Model (Tại Nhà) */}
              <div className="bg-gradient-to-br from-purple-50/60 via-white to-purple-50/40 rounded-2xl p-6 border border-purple-200 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏠</span>
                      <h3 className="text-base sm:text-lg font-bold text-purple-900">Home User Model (Tại Nhà)</h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-600 text-white">
                      LGBMClassifier
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                    Huấn luyện với <strong>70.692 mẫu dữ liệu</strong> từ khảo sát 
                    <strong> CDC BRFSS (Behavioral Risk Factor Surveillance System)</strong>, tập trung vào thói quen sinh hoạt và chỉ số cơ thể tự đo được.
                  </p>

                  {/* Sơ đồ luồng xử lý tại nhà LightGBM */}
                  <div className="mb-4 bg-white p-3 rounded-xl border border-purple-200 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                      <span>🏠</span> Sơ đồ luồng xử lý tại nhà LightGBM:
                    </p>
                    <img
                      src="/model_images/model_for_home_v2.png"
                      alt="Sơ đồ mô hình tại nhà Home Model"
                      className="w-full rounded-lg object-contain bg-slate-50 max-h-52"
                    />
                  </div>

                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 mb-4">
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Ưu tiên <strong>tốc độ và sự ổn định (&lt;10 giây)</strong>, mượt mà trên mọi điện thoại thông minh.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Bộ câu hỏi 18 chỉ số thân thiện, không bắt buộc người dùng phải có kết quả xét nghiệm máu phức tạp.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>Định hướng người dùng đi khám chuyên khoa kịp thời khi phát hiện có rủi ro cao.</span>
                    </li>
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

        {/* ── 2. GIẢI THÍCH SHAP & BÁC SĨ AI TƯ VẤN ── */}
        <section id="shap-advisor" className="scroll-mt-36 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>🔍</span>
                <span>Giải Thích Mô Hình SHAP & Bác Sĩ AI Tư Vấn</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Công nghệ XAI (Explainable AI) giúp phá bỏ hộp đen của Trí tuệ Nhân tạo, mang lại sự tin cậy tuyệt đối cho bác sĩ và người dùng
              </p>
            </div>
            <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] hidden sm:inline-block">
              Explainable AI (XAI)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SHAP Explanation */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>📊</span>
                  <span>SHAP – Minh Bạch Yếu Tố Nguy Cơ</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  Thay vì chỉ đưa ra xác suất thuần túy, DiabeTwin ứng dụng lý thuyết trò chơi hợp tác <strong>SHAP (Shapley Additive exPlanations)</strong> để bóc tách chính xác mức độ tác động của từng chỉ số vào kết quả dự đoán của mô hình:
                </p>

                <div className="space-y-3.5 mb-6">
                  <BookingCareFeatureBar label="Chỉ số HbA1c (Mức đường gắn hemoglobin)" percent={28.5} color="bg-rose-500" />
                  <BookingCareFeatureBar label="Đường huyết lúc đói (FPG)" percent={22.4} color="bg-amber-500" />
                  <BookingCareFeatureBar label="Chỉ số khối cơ thể (BMI)" percent={18.1} color="bg-[#00b5cc]" />
                  <BookingCareFeatureBar label="Độ tuổi bệnh nhân" percent={14.2} color="bg-indigo-500" />
                  <BookingCareFeatureBar label="Huyết áp & Tiền sử tim mạch" percent={11.3} color="bg-purple-500" />
                  <BookingCareFeatureBar label="Lối sống & Thói quen vận động" percent={5.5} color="bg-emerald-500" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#edfafb] border border-[#b2eaf1] text-xs text-[#008299] font-medium">
                💡 Bác sĩ có thể quan sát trực tiếp yếu tố nào đang đẩy nguy cơ lên cao nhất để đưa ra phác đồ can thiệp trúng đích.
              </div>
            </div>

            {/* AI Doctor Advisor */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>🩺</span>
                  <span>Bác Sĩ AI Tư Vấn – Khuyến Nghị Hành Động</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  Sau khi mô hình tính toán rủi ro và xác định các nhân tố nguy cơ hàng đầu, hệ sinh thái AI sẽ tổng hợp và tự động diễn giải thành các hướng dẫn y tế thực hành cá nhân hóa:
                </p>

                <ul className="text-xs sm:text-sm text-slate-600 space-y-3 mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>Phân loại nguy cơ rõ ràng:</strong> Thấp (Bình thường), Trung bình (Tiền tiểu đường), Cao (Cần khám chuyên khoa).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>Chỉ rõ nguyên nhân then chốt:</strong> Phân tích cụ thể chỉ số BMI, huyết áp hoặc glucose đang ở mức độ nào theo chuẩn ADA.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>Lộ trình hành động cụ thể:</strong> Đề xuất phương pháp đĩa ăn dinh dưỡng, mục tiêu vận động 150 phút/tuần và lịch tái khám định kỳ.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800">
                ⚠️ <strong>Khuyến cáo y tế:</strong> Kết quả và khuyến nghị từ AI mang tính hỗ trợ tầm soát sớm. Mọi quyết định chẩn đoán và điều trị cần được bác sĩ chuyên khoa nội tiết thăm khám trực tiếp.
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. SỨ MỆNH & CHỈ SỐ TÁC ĐỘNG ── */}
        <section id="mission-stats" className="scroll-mt-36 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>🎯</span>
                <span>Sứ Mệnh Phát Triển & Chỉ Số Tác Động</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Ứng dụng công nghệ vì sức khỏe cộng đồng, bình đẳng hóa tiếp cận dịch vụ y tế dự phòng chất lượng cao
              </p>
            </div>
            <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] hidden sm:inline-block">
              Healthcare Mission
            </span>
          </div>

          {/* Mission Box */}
          <div className="bg-gradient-to-br from-[#edfafb] via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-[#b2eaf1] shadow-xs">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
              DiabeTwin ra đời với sứ mệnh <strong>bình đẳng hóa tiếp cận y tế chất lượng cao</strong> thông qua công nghệ Trí tuệ Nhân tạo hiện đại. Chúng tôi tin rằng mọi người dân đều có quyền được tiếp cận các công cụ sàng lọc sức khỏe sớm, chính xác, tin cậy và hoàn toàn miễn phí.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Đái tháo đường đang là gánh nặng bệnh tật ngày càng gia tăng trên toàn cầu cũng như tại Việt Nam (hơn 5 triệu người mắc và trên 50% chưa được chẩn đoán). Việc phát hiện sớm ngay từ giai đoạn tiền tiểu đường có thể phòng ngừa đảo ngược tình trạng bệnh, cứu sống hàng triệu người và giảm tải áp lực cho hệ thống y tế công.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <BookingCareAboutStatCard
              value="95%"
              label="Độ chính xác"
              labelEn="Accuracy"
              description="Độ chính xác trung bình trên tập dữ liệu kiểm thử độc lập"
              badgeColor="bg-emerald-50 text-emerald-700"
            />
            <BookingCareAboutStatCard
              value="15.000+"
              label="Lượt đánh giá"
              labelEn="Users"
              description="Số lượt người dùng đã thực hiện sàng lọc nguy cơ sức khỏe"
              badgeColor="bg-cyan-50 text-cyan-700"
            />
            <BookingCareAboutStatCard
              value="80%"
              label="Độ nhạy (Recall)"
              labelEn="Recall Score"
              description="Khả năng phát hiện chính xác các ca có nguy cơ tiểu đường cao"
              badgeColor="bg-purple-50 text-purple-700"
            />
            <BookingCareAboutStatCard
              value="<10s"
              label="Thời gian xử lý"
              labelEn="Response Speed"
              description="Tốc độ suy luận AI và trả về kết quả tư vấn trên mọi thiết bị"
              badgeColor="bg-amber-50 text-amber-700"
            />
          </div>
        </section>

        {/* ── 4. ĐỘI NGŨ NGHIÊN CỨU & KỸ SƯ Ở DƯỚI ── */}
        <section id="team-members" className="scroll-mt-36 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>👥</span>
                <span>Đội Ngũ Nghiên Cứu & Kỹ Sư Phát Triển</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Nhóm kỹ sư Trí tuệ Nhân tạo & Khoa học Dữ liệu Đại học FPT cùng các cố vấn y khoa lâm sàng
              </p>
            </div>
            <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] hidden sm:inline-block">
              FPT University & Medical Advisors
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8">
            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <BookingCareTeamMember
                name="Ngô Quang Trãi"
                role="Machine Learning Engineer"
                avatar="👨‍🔬"
                description="Kỹ sư Machine Learning, phụ trách nghiên cứu mô hình AdaBoost, LightGBM và thuật toán giải thích SHAP."
              />
              <BookingCareTeamMember
                name="Đào Đức Anh Kiệt"
                role="AI & Full-stack Engineer"
                avatar="👨‍💻"
                description="Kỹ sư Full-stack & AI, thiết kế kiến trúc hệ thống microservices FastAPI và giao diện y tế Next.js."
              />
              <BookingCareTeamMember
                name="Nguyễn Nho Huy Hoàng"
                role="Data Scientist"
                avatar="👨‍🔬"
                description="Chuyên gia Khoa học Dữ liệu, phụ trách tiền xử lý tập dữ liệu lâm sàng y tế và khảo sát CDC BRFSS."
              />
              <BookingCareTeamMember
                name="Phan Văn Quốc"
                role="Researcher & Project Lead"
                avatar="👨‍💼"
                description="Trưởng nhóm nghiên cứu, phụ trách khảo sát y văn lâm sàng, tiêu chuẩn ADA và điều phối dự án."
              />
            </div>

            {/* Medical Review Process & Clinical Advisory */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🏥</span>
                <span>Hội Đồng Cố Vấn & Cơ Sở Quy Chuẩn Y Tế</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#edfafb]/70 border border-[#b2eaf1]">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Tiêu chuẩn ADA 2024
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mọi ngưỡng phân loại đường huyết và nguy cơ đều đối soát theo khuyến nghị của Hiệp hội Đái tháo đường Hoa Kỳ (ADA).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#edfafb]/70 border border-[#b2eaf1]">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Hướng dẫn Bộ Y Tế Việt Nam
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Phù hợp với hướng dẫn chẩn đoán và điều trị đái tháo đường típ 2 do Bộ Y Tế ban hành cho thể trạng người Việt.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#edfafb]/70 border border-[#b2eaf1]">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    Đạo đức & Minh bạch AI
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cam kết bảo mật dữ liệu y tế, không bán thông tin cá nhân và luôn giải thích rõ ràng cơ sở suy luận của mô hình.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TÍNH NĂNG CỐT LÕI ── */}
        <section id="core-features" className="scroll-mt-36 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>✨</span>
                <span>Tính Năng Cốt Lõi Của DiabeTwin</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Các ưu điểm nổi bật giúp DiabeTwin trở thành công cụ đắc lực cho cả bác sĩ lâm sàng và người dân
              </p>
            </div>
            <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1] hidden sm:inline-block">
              Core Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <BookingCareAboutFeatureCard
              icon="🎯"
              title="Dự đoán chuẩn xác"
              desc="Thuật toán AdaBoost và LightGBM được tối ưu hóa đặc thù, giảm thiểu tối đa tình trạng báo động giả."
            />
            <BookingCareAboutFeatureCard
              icon="📊"
              title="Giải thích SHAP minh bạch"
              desc="Minh bạch từng yếu tố sinh học tác động đến kết quả dự đoán của AI, tạo niềm tin cho giới y khoa."
            />
            <BookingCareAboutFeatureCard
              icon="⚡"
              title="Kết quả tức thì (<10s)"
              desc="Nhận phân tích chi tiết trong vài giây với hạ tầng suy luận tối ưu hóa tốc độ cao."
            />
            <BookingCareAboutFeatureCard
              icon="🔒"
              title="Bảo mật chuẩn y tế"
              desc="Mã hóa đầu cuối, cam kết bảo vệ quyền riêng tư và không lưu giữ trái phép dữ liệu định danh cá nhân."
            />
            <BookingCareAboutFeatureCard
              icon="💡"
              title="Bác sĩ AI tư vấn cá nhân hóa"
              desc="Đưa ra khuyến nghị dinh dưỡng và vận động cụ thể theo từng mức độ nguy cơ thực tế."
            />
            <BookingCareAboutFeatureCard
              icon="📱"
              title="Đa nền tảng linh hoạt"
              desc="Giao diện BookingCare nhẹ nhàng, tương thích tối đa trên điện thoại, máy tính bảng và máy tính."
            />
          </div>
        </section>

        {/* ── BANNER ĐIỀU HƯỚNG SANG TRANG SỐNG KHỎE (TÁCH BIỆT RÕ RÀNG) ── */}
        <section className="bg-gradient-to-r from-[#dff6f9] via-[#ebfafc] to-[#e1f7f9] rounded-3xl p-6 sm:p-10 border border-[#b2eaf1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#008299] text-xs font-bold mb-3 border border-[#b2eaf1]">
              <span>🌿</span>
              <span>Chuyên Mục Riêng Biệt</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-2">
              Khám Phá Cẩm Nang Sống Khỏe & 20 Công Trình Nghiên Cứu Y Khoa
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Toàn bộ tài liệu y văn từ Nature, WHO, IDF Diabetes Atlas, cùng các hướng dẫn thực đơn dinh dưỡng 7 ngày đã được tổng hợp đầy đủ tại chuyên trang Sống Khỏe.
            </p>
          </div>

          <Link
            href="/song-khoe"
            className="flex-shrink-0 px-6 py-3 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00b5cc]/20 transition-all hover:scale-102 flex items-center gap-2"
          >
            <span>Đến Trang Sống Khỏe</span>
            <span>→</span>
          </Link>
        </section>

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

// ─── SCROLL TAB BUTTON (BookingCare Pill Navigation) ──────────────────────────

function ScrollTabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
        active
          ? 'bg-[#fbb03b] text-white shadow-xs scale-102'
          : 'bg-white text-slate-700 hover:text-[#008299] hover:bg-[#edfafb] border border-slate-200/90'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function BookingCareAboutStatCard({
  value,
  label,
  labelEn,
  description,
  badgeColor,
}: {
  value: string;
  label: string;
  labelEn: string;
  description: string;
  badgeColor: string;
}) {
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

function BookingCareTeamMember({
  name,
  role,
  avatar,
  description,
}: {
  name: string;
  role: string;
  avatar: string;
  description: string;
}) {
  return (
    <div className="text-center p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div className="w-16 h-16 rounded-full bg-[#edfafb] border border-[#b2eaf1] flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
        {avatar}
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-0.5">{name}</h3>
      <p className="text-xs font-bold text-[#0099ad] mb-2">{role}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function BookingCareAboutFeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
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

function BookingCareFeatureBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
        <span>{label}</span>
        <span className="font-bold text-slate-900">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
