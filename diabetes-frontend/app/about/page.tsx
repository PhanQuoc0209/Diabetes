"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<string>("story");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Consultation form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultType, setConsultType] = useState<"home" | "doctor">("home");

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90; // sticky header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Scrollspy & Back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Track active section
      const sectionIds = ["story", "doctor-model", "home-model", "shap-xai", "impact-stats", "team", "values", "consultation"];
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NutDesign Scroll-Triggered Reveal Animations Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      if (consultType === "doctor") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/user-prediction";
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 flex flex-col font-sans selection:bg-[#00b5cc]/20 selection:text-[#008299]">
      <Navigation />

      {/* ── 1. HERO BANNER - NUT Design Style with Medical Elegance ── */}
      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Subtle Dark Medical/Lab Pattern Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/bookingcare/bg_hero_medical.jpg')",
            backgroundColor: "#0a192f"
          }}
        />
        {/* Dark Film Overlay - Exact Nutdesign overlay-custom */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/90" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-medical-grid opacity-20 pointer-events-none" />

        {/* Centered Hero Content with fadeInUp animation */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white fadeInUp space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#45c3d2] text-xs font-semibold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00b5cc] animate-pulse"></span>
            <span>Hồ Sơ Y Khoa & Đội Ngũ Phát Triển</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase drop-shadow-md">
            VỀ CHÚNG TÔI
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light tracking-wide max-w-2xl mx-auto">
            DiabeTwin • Hệ thống Dự đoán & Sàng lọc Nguy cơ Tiểu đường bằng Trí tuệ Nhân tạo Tiên tiến
          </p>
        </div>
      </section>

      {/* ── STICKY SUB-NAVBAR: Quick Jump Pills (Lướt Xuống) ── */}
      <div className="sticky top-16 sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
            <NutNavButton
              active={activeSection === "story"}
              onClick={() => scrollToSection("story")}
              label="Câu Chuyện"
            />
            <NutNavButton
              active={activeSection === "doctor-model"}
              onClick={() => scrollToSection("doctor-model")}
              label="Mô Hình Lâm Sàng"
            />
            <NutNavButton
              active={activeSection === "home-model"}
              onClick={() => scrollToSection("home-model")}
              label="Mô Hình Tại Nhà"
            />
            <NutNavButton
              active={activeSection === "shap-xai"}
              onClick={() => scrollToSection("shap-xai")}
              label="Minh Bạch SHAP"
            />
            <NutNavButton
              active={activeSection === "impact-stats"}
              onClick={() => scrollToSection("impact-stats")}
              label="Chỉ Số & Tác Động"
            />
            <NutNavButton
              active={activeSection === "team"}
              onClick={() => scrollToSection("team")}
              label="Đội Ngũ Kỹ Sư"
            />
            <NutNavButton
              active={activeSection === "values"}
              onClick={() => scrollToSection("values")}
              label="Giá Trị Cốt Lõi"
            />
            <NutNavButton
              active={activeSection === "consultation"}
              onClick={() => scrollToSection("consultation")}
              label="Đăng Ký Tư Vấn"
            />
          </div>
        </div>
      </div>

      {/* ── 2. INTRO BLOCK: CÂU CHUYỆN THƯƠNG HIỆU / SỨ MỆNH DIABETWIN ── */}
      <section id="story" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-100 scroll-reveal">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <h2 className="text-xl sm:text-3xl font-bold tracking-widest text-slate-900 uppercase">
              CÂU CHUYỆN & SỨ MỆNH PHÁT TRIỂN
            </h2>
            <div className="w-16 h-1 bg-[#00b5cc] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="text-sm sm:text-base text-slate-600 leading-relaxed sm:leading-loose text-justify sm:text-center space-y-4">
            <p>
              DiabeTwin được nghiên cứu và phát triển bởi nhóm kỹ sư Trí tuệ Nhân tạo & Khoa học Dữ liệu 
              Đại học FPT, xuất phát từ một thực trạng y tế nhức nhối: <strong>Đái tháo đường đang là căn bệnh diễn tiến âm thầm</strong>, 
              khiến hơn 5 triệu người Việt Nam chịu ảnh hưởng và trên 50% trong số đó không hề biết mình mắc bệnh cho đến khi xuất hiện biến chứng nguy hiểm.
            </p>
            <p>
              Chúng tôi đặt câu hỏi: <em>&ldquo;Làm thế nào để công nghệ AI không chỉ là con số lý thuyết, mà trở thành người đồng hành đáng tin cậy giúp mọi người dân đều có thể tự sàng lọc sức khỏe sớm và các bác sĩ lâm sàng có thêm công cụ hỗ trợ chuẩn xác?&rdquo;</em>
            </p>
            <p>
              Từ câu hỏi đó, <strong>DiabeTwin</strong> ra đời với kiến trúc mô hình sinh đôi chuyên biệt (Twin AI), 
              cam kết minh bạch hộp trắng giải thích SHAP và tuân thủ các quy chuẩn y tế nghiêm ngặt của Hiệp hội Đái tháo đường Hoa Kỳ (ADA) cùng Bộ Y tế Việt Nam.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. ZIG-ZAG ALTERNATING SPLIT SECTIONS (Nutdesign 50/50 Layout) ── */}

      {/* ROW 1: DOCTOR MODEL (Image Left, Text Right) */}
      <section id="doctor-model" className="bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            {/* Left: Image with Hover Zoom Container */}
            <div className="relative group overflow-hidden bg-slate-100 flex items-center justify-center p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/80 scroll-reveal-left">
              <div className="w-full max-w-lg bg-white p-4 rounded-2xl shadow-sm border border-slate-200/90 transition-transform duration-700 ease-out group-hover:scale-103">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className="text-[11px] font-bold text-[#008299] uppercase tracking-wider flex items-center gap-1.5">
                    <span>🩺</span> AdaBoost Lâm Sàng
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00b5cc] text-white">
                    Recall ≥ 80%
                  </span>
                </div>
                <img
                  src="/model_images/model_for_hospital_v2.png"
                  alt="Sơ đồ luồng xử lý lâm sàng Doctor Model"
                  className="w-full h-auto object-contain max-h-[360px] rounded-lg"
                />
              </div>
            </div>

            {/* Right: Text Description */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 scroll-reveal-right">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008299]">
                  Chuyên Khoa Lâm Sàng • Bệnh Viện
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                  MÔ HÌNH BÁC SĨ (DOCTOR MODEL)
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Được huấn luyện tối ưu trên <strong>~100.000 hồ sơ bệnh án y khoa</strong>, Doctor Model sử dụng thuật toán 
                <strong> AdaBoostClassifier</strong> nhằm tăng cường sức mạnh dự đoán đối với các ca bệnh khó và giảm thiểu tối đa tình trạng bỏ sót.
              </p>

              <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-[#00b5cc] font-bold mt-0.5">•</span>
                  <span><strong>Tối ưu hóa độ nhạy Recall:</strong> Đạt $\ge 80\%$ để ưu tiên phát hiện người có nguy cơ tiền đái tháo đường và đái tháo đường lâm sàng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00b5cc] font-bold mt-0.5">•</span>
                  <span><strong>8 Thông số sinh học chuẩn:</strong> Kết hợp HbA1c, Glucose lúc đói, BMI, Huyết áp, Tuổi, Giới tính, Bệnh tim mạch và Thói quen hút thuốc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00b5cc] font-bold mt-0.5">•</span>
                  <span><strong>Tích hợp SHAP nội trú:</strong> Hỗ trợ bác sĩ giải thích trực tiếp cho bệnh nhân lý do vì sao chỉ số của họ cảnh báo nguy cơ.</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="/diabetes_report.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#00b5cc] text-[#008299] hover:bg-[#edfafb] text-xs font-bold shadow-xs transition-colors"
                >
                  <span>📊 Xem Báo Cáo Huấn Luyện (HTML)</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <Link
                  href="/doctor"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Mở Cổng Bác Sĩ</span>
                  <span className="ml-1.5">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROW 2: HOME USER MODEL (Text Left, Image Right - Nutdesign flex-wrap-reverse) */}
      <section id="home-model" className="bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left: Text Description */}
            <div className="order-2 lg:order-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 scroll-reveal-left">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-700">
                  Sàng Lọc Tại Nhà • Y Tế Cộng Đồng
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                  MÔ HÌNH TẠI NHÀ (HOME USER MODEL)
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Chúng tôi nhận ra đa số người dân không có sẵn kết quả xét nghiệm sinh hóa máu thường xuyên. 
                Home User Model được huấn luyện trên <strong>70.692 mẫu dữ liệu</strong> từ hệ thống giám sát hành vi nguy cơ 
                <strong> CDC BRFSS</strong> thông qua thuật toán <strong>LGBMClassifier</strong> tốc độ cao.
              </p>

              <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>18 Câu hỏi dễ trả lời:</strong> Dựa trên thể trạng, thói quen ăn uống, giấc ngủ, tập luyện và tiền sử gia đình.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Phản hồi siêu tốc (&lt;10s):</strong> Suy luận tức thì trên mọi trình duyệt điện thoại mà không đòi hỏi thiết bị cấu hình cao.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span><strong>Định hướng y tế chuẩn:</strong> Khi có dấu hiệu nguy cơ cao, hệ thống chủ động khuyến cáo người dùng đến cơ sở y tế gần nhất làm xét nghiệm HbA1c.</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="/diabetes_report_for_AI_at_home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-purple-400 text-purple-800 hover:bg-purple-50 text-xs font-bold shadow-xs transition-colors"
                >
                  <span>📈 Báo Cáo Huấn Luyện Tại Nhà (HTML)</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <Link
                  href="/user-prediction"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>Sàng Lọc Nguy Cơ Ngay</span>
                  <span className="ml-1.5">→</span>
                </Link>
              </div>
            </div>

            {/* Right: Image with Hover Zoom Container */}
            <div className="order-1 lg:order-2 relative group overflow-hidden bg-purple-50/40 flex items-center justify-center p-6 sm:p-10 border-b lg:border-b-0 lg:border-l border-slate-200/80 scroll-reveal-right">
              <div className="w-full max-w-lg bg-white p-4 rounded-2xl shadow-sm border border-purple-100 transition-transform duration-700 ease-out group-hover:scale-103">
                <div className="flex items-center justify-between pb-3 border-b border-purple-50 mb-3">
                  <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏠</span> LightGBM Cộng Đồng
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                    70.692 Mẫu CDC
                  </span>
                </div>
                <img
                  src="/model_images/model_for_home_v2.png"
                  alt="Sơ đồ mô hình tại nhà Home Model"
                  className="w-full h-auto object-contain max-h-[360px] rounded-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROW 3: SHAP EXPLAINABLE AI & BÁC SĨ TƯ VẤN (Image/Bars Left, Text Right) */}
      <section id="shap-xai" className="bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left: Interactive SHAP Breakdown Bars Card */}
            <div className="relative group overflow-hidden bg-slate-100 flex items-center justify-center p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/80 scroll-reveal-left">
              <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-sm border border-slate-200/90 transition-transform duration-700 ease-out group-hover:scale-102 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <span>📊</span> Bóc Tách Tác Động SHAP Values
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#edfafb] text-[#0099ad]">
                    Game Theory
                  </span>
                </div>

                <div className="space-y-3.5">
                  <NutFeatureBar label="Chỉ số HbA1c (Đường gắn hemoglobin)" percent={28.5} color="bg-rose-500" />
                  <NutFeatureBar label="Đường huyết lúc đói (FPG)" percent={22.4} color="bg-amber-500" />
                  <NutFeatureBar label="Chỉ số khối cơ thể (BMI)" percent={18.1} color="bg-[#00b5cc]" />
                  <NutFeatureBar label="Độ tuổi bệnh nhân" percent={14.2} color="bg-indigo-500" />
                  <NutFeatureBar label="Huyết áp & Tim mạch" percent={11.3} color="bg-purple-500" />
                  <NutFeatureBar label="Lối sống & Thói quen vận động" percent={5.5} color="bg-emerald-500" />
                </div>

                <p className="text-[11px] text-slate-400 italic pt-1">
                  * Dữ liệu trọng số được xác thực trên tập thử nghiệm lâm sàng độc lập.
                </p>
              </div>
            </div>

            {/* Right: Text Description */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 scroll-reveal-right">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008299]">
                  Minh Bạch Hộp Trắng • Explainable AI
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                  GIẢI THÍCH SHAP & BÁC SĨ AI TƯ VẤN
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Khác với các hệ thống AI &ldquo;hộp đen&rdquo; chỉ trả về con số khô khan, DiabeTwin ứng dụng lý thuyết trò chơi 
                hợp tác <strong>Shapley Additive exPlanations (SHAP)</strong> để minh bạch hóa toàn bộ quá trình suy luận.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Chỉ rõ nguyên nhân đẩy rủi ro:</strong> Nhìn thấy ngay chỉ số BMI hay HbA1c đang đóng góp bao nhiêu % vào mức độ tiền tiểu đường.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Phiên dịch khuyến nghị y tế:</strong> Bác sĩ AI tự động chuyển hóa kết quả thành phác đồ thực tiễn: phương pháp đĩa ăn dinh dưỡng và mục tiêu 150 phút tập thể dục mỗi tuần.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Đạo đức y tế chuẩn xác:</strong> Mọi tư vấn đều mang tính định hướng dự phòng sớm, luôn nhắc nhở bệnh nhân thăm khám bác sĩ chuyên khoa nội tiết.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROW 4: SỨ MỆNH & CHỈ SỐ TÁC ĐỘNG (Text Left, 4 Stats Right) */}
      <section id="impact-stats" className="bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Left: Text Description */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5 scroll-reveal-left">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008299]">
                  Cam Kết Chuẩn Mực • Hiệu Quả Y Tế
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
                  CHỈ SỐ THỰC NGHIỆM & TÁC ĐỘNG
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Chúng tôi không đưa ra những lời hứa mơ hồ. Toàn bộ nền tảng DiabeTwin được đánh giá liên tục dựa trên 
                các tiêu chí khoa học định lượng khắt khe và được đối chiếu với các nghiên cứu công bố quốc tế.
              </p>

              <div className="p-4 rounded-2xl bg-[#edfafb] border border-[#b2eaf1] text-xs text-[#008299] space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <span>🏛️</span> Tiêu chuẩn Quốc tế & Quốc gia:
                </div>
                <p className="text-slate-600">
                  Phân loại đường huyết tuân thủ <strong>Hiệp hội Đái tháo đường Hoa Kỳ (ADA 2024)</strong> và 
                  quy chuẩn chẩn đoán điều trị của <strong>Bộ Y tế Việt Nam</strong>.
                </p>
              </div>
            </div>

            {/* Right: 4 Statistic Cards Grid (Nutdesign Numbers showcase) */}
            <div className="p-8 sm:p-12 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200/80 scroll-reveal-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#00b5cc] transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-[#00b5cc] mb-1">95%</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">Độ chính xác</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Độ chính xác trên tập kiểm nghiệm độc lập</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#00b5cc] transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-[#fbb03b] mb-1">15.000+</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">Lượt sàng lọc</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Người dùng tin cậy đánh giá sức khỏe</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#00b5cc] transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-purple-600 mb-1">80%</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">Độ nhạy Recall</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Tối ưu phát hiện ca bệnh tiền đái tháo đường</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#00b5cc] transition-all">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">&lt;10s</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">Tốc độ xử lý</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Suy luận tức thì, không mất thời gian chờ</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. TEAM SHOWCASE (Nutdesign Team Grid Style) ── */}
      <section id="team" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-b border-slate-200/80 scroll-reveal">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xl sm:text-3xl font-bold tracking-widest text-slate-900 uppercase">
              ĐỘI NGŨ PHÁT TRIỂN & CỐ VẤN CHUYÊN MÔN
            </h2>
            <div className="w-16 h-1 bg-[#00b5cc] mx-auto rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500">
              Nhóm kỹ sư Trí tuệ Nhân tạo & Khoa học Dữ liệu Đại học FPT cùng các bác sĩ lâm sàng chuyên khoa
            </p>
          </div>

          {/* 4 Team Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <NutTeamCard
              name="Ngô Quang Trãi"
              role="Machine Learning Engineer"
              avatar="👨‍🔬"
              bio="Nghiên cứu kiến trúc AdaBoostClassifier, LightGBM và tích hợp thuật toán giải thích SHAP Values cho dữ liệu sinh hóa máu."
            />
            <NutTeamCard
              name="Đào Đức Anh Kiệt"
              role="AI & Full-stack Engineer"
              avatar="👨‍💻"
              bio="Thiết kế hệ sinh thái microservice FastAPI, xử lý pipeline suy luận thời gian thực và giao diện Next.js đa nền tảng."
            />
            <NutTeamCard
              name="Nguyễn Nho Huy Hoàng"
              role="Data Scientist"
              avatar="👨‍🔬"
              bio="Phụ trách làm sạch, chuẩn hóa và cân bằng mẫu trên 100.000 hồ sơ bệnh án lâm sàng cùng tập dữ liệu CDC BRFSS."
            />
            <NutTeamCard
              name="Phan Văn Quốc"
              role="Researcher & Project Lead"
              avatar="👨‍💼"
              bio="Trưởng nhóm nghiên cứu, đối soát tiêu chuẩn ADA 2024 và Bộ Y Tế, điều phối quy trình kiểm thử thuật toán."
            />
          </div>

          {/* Clinical Council Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏥</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
                Hội Đồng Cố Vấn & Cơ Sở Khoa Học Y Tế
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mọi thuật toán và khuyến nghị dinh dưỡng trong hệ thống DiabeTwin đều được tham vấn từ các bác sĩ chuyên khoa Nội tiết - Đái tháo đường, 
              đồng thời đối soát độc lập với 20 công trình nghiên cứu quốc tế (Nature, PMLR, WHO, IDF Atlas).
            </p>
          </div>

        </div>
      </section>

      {/* ── 5. CORE VALUES (Nutdesign Giá Trị Cốt Lõi Grid) ── */}
      <section id="values" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200/80 scroll-reveal">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xl sm:text-3xl font-bold tracking-widest text-slate-900 uppercase">
              GIÁ TRỊ CỐT LÕI
            </h2>
            <div className="w-16 h-1 bg-[#00b5cc] mx-auto rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500">
              6 nguyên tắc kim chỉ nam định hình toàn bộ giải pháp công nghệ của DiabeTwin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NutValueCard
              icon="🎯"
              title="Chẩn Đoán Chuẩn Xác"
              desc="Học máy AdaBoost & LightGBM được tinh chỉnh đặc thù theo ngưỡng lâm sàng, kiểm soát sai số tối đa."
            />
            <NutValueCard
              icon="📊"
              title="Minh Bạch Tuyệt Đối"
              desc="Nói không với AI hộp đen. Mọi kết quả đều giải thích rõ lý do thông qua trọng số SHAP hộp trắng."
            />
            <NutValueCard
              icon="⚡"
              title="Tốc Độ Tức Thì (<10s)"
              desc="Tối ưu hóa pipeline suy luận để người dùng và bác sĩ nhận kết quả tư vấn không độ trễ."
            />
            <NutValueCard
              icon="🔒"
              title="Bảo Mật Chuẩn Y Tế"
              desc="Mã hóa đầu cuối, tuân thủ đạo đức dữ liệu y tế, tuyệt đối không thương mại hóa thông tin bệnh nhân."
            />
            <NutValueCard
              icon="💡"
              title="Cá Nhân Hóa Toàn Diện"
              desc="Bác sĩ AI xây dựng lộ trình dinh dưỡng và vận động riêng biệt theo đúng thể trạng thực tế."
            />
            <NutValueCard
              icon="📱"
              title="Đa Nền Tảng Linh Hoạt"
              desc="Trải nghiệm mượt mà trên máy tính, máy tính bảng và điện thoại mà không cần cài đặt phức tạp."
            />
          </div>

        </div>
      </section>

      {/* ── 6. CONSULTATION & REGISTRATION FORM (Nutdesign "Nhận Giải Pháp Thiết Kế" Style) ── */}
      <section id="consultation" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#f8fafc] border-b border-slate-200/80 scroll-reveal">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column (5 cols): Platform Info & Direct Hotline */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#00b5cc] to-[#0099ad] text-white p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#dff6f9]">
                    Hỗ Trợ & Tư Vấn Y Tế
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1 uppercase">
                    NHẬN TƯ VẤN SÀNG LỌC
                  </h3>
                  <div className="w-12 h-1 bg-white/40 mt-3 rounded-full"></div>
                </div>

                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-light">
                  Để lại thông tin hoặc liên hệ trực tiếp với chúng tôi để được giải đáp thắc mắc về chỉ số đường huyết, 
                  phác đồ dinh dưỡng hoặc kết nối hợp tác nghiên cứu lâm sàng.
                </p>

                <div className="space-y-4 pt-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📞</span>
                    <div>
                      <div className="font-bold text-white">Hotline Y Tế</div>
                      <div className="text-slate-100">024 7301 2468 (Hỗ trợ 8h00 – 18h00)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-lg">📧</span>
                    <div>
                      <div className="font-bold text-white">Email Liên Hệ</div>
                      <div className="text-slate-100">support@diabetwin.ai / fpt.research@edu.vn</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-lg">🏢</span>
                    <div>
                      <div className="font-bold text-white">Địa Chỉ Nghiên Cứu</div>
                      <div className="text-slate-100">Khu Công nghệ cao Hòa Lạc, Đại học FPT, Hà Nội</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20 mt-8 text-[11px] text-slate-200">
                © 2026 DiabeTwin Medical AI. All rights reserved.
              </div>
            </div>

            {/* Right Column (7 cols): Consultation Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Đăng Ký Thành Công!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Cảm ơn <strong>{consultName}</strong>. Hệ thống đang chuyển hướng bạn đến cổng đánh giá nguy cơ phù hợp...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                      ĐĂNG KÝ NHẬN HỖ TRỢ / SÀNG LỌC NHANH
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Điền thông tin dưới đây để nhận hướng dẫn chi tiết hoặc kích hoạt phiên đánh giá
                    </p>
                  </div>

                  {/* Consultation Type Selector */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType("home")}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        consultType === "home"
                          ? "bg-[#edfafb] border-[#00b5cc] text-[#008299] shadow-xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🏠 Sàng lọc Cá nhân (Tại nhà)
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType("doctor")}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        consultType === "doctor"
                          ? "bg-[#edfafb] border-[#00b5cc] text-[#008299] shadow-xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🩺 Cổng Bác sĩ (Lâm sàng)
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00b5cc] focus:ring-3 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="Ví dụ: 0912 345 678"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#00b5cc] focus:ring-3 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00b5cc]/20 transition-all cursor-pointer"
                  >
                    {consultType === "home" ? "TIẾP TỤC ĐẾN SÀNG LỌC TẠI NHÀ →" : "MỞ CỔNG BÁC SĨ LÂM SÀNG →"}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    🔒 Thông tin của bạn được cam kết bảo mật 100% theo tiêu chuẩn y tế.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. SEPARATE LINK TO SỐNG KHỎE (Tách Biệt Nghiên Cứu Khoa Học) ── */}
      <section className="py-12 bg-white border-b border-slate-200/80 px-4 sm:px-6 scroll-reveal">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#dff6f9] via-[#ebfafc] to-[#e1f7f9] rounded-3xl p-6 sm:p-10 border border-[#b2eaf1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#008299] text-xs font-bold border border-[#b2eaf1]">
              <span>📚</span>
              <span>Chuyên Mục Độc Lập</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 uppercase">
              20 CÔNG TRÌNH NGHIÊN CỨU & CẨM NANG SỐNG KHỎE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bạn muốn tìm đọc toàn văn các bài báo khoa học từ Nature, WHO, IDF Atlas, cùng hướng dẫn thực đơn dinh dưỡng 7 ngày? 
              Mời bạn truy cập chuyên trang Sống Khỏe độc lập.
            </p>
          </div>

          <Link
            href="/song-khoe"
            className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00b5cc]/20 transition-all hover:scale-102 flex items-center gap-2"
          >
            <span>Khám Phá Trang Sống Khỏe</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ── 8. FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 text-xs text-center border-t border-slate-900">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-white text-base font-bold tracking-wider uppercase">
            DiabeTwin • AI Healthcare Platform
          </div>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hệ sinh thái Trí tuệ Nhân tạo chẩn đoán và dự phòng sớm đái tháo đường, phát triển bởi nhóm kỹ sư Đại học FPT.
          </p>
          <div className="pt-4 border-t border-slate-800 text-slate-400">
            © 2026 DiabeTwin. All rights reserved. Tuân thủ tiêu chuẩn ADA 2024 & Bộ Y Tế.
          </div>
        </div>
      </footer>

      {/* ── FLOATING ACTION WIDGETS (Nutdesign bottom-right floating circle buttons) ── */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-2.5">
        
        {/* Phone / Hotline Floating Button */}
        <a
          href="tel:02473012468"
          title="Gọi Hotline tư vấn"
          className="w-12 h-12 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white flex items-center justify-center shadow-lg shadow-[#00b5cc]/35 hover:scale-110 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>

        {/* Back To Top Floating Button (Nutdesign scroll-to-top) */}
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Cuộn lên đầu trang"
            className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-xs animate-fadeIn"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}

// ─── NUT NAV BUTTON (Pill for smooth scrolling) ──────────────────────────────

function NutNavButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
        active
          ? "bg-[#00b5cc] text-white shadow-xs scale-102"
          : "bg-white text-slate-700 hover:text-[#008299] hover:bg-[#edfafb] border border-slate-200/90"
      }`}
    >
      {label}
    </button>
  );
}

// ─── SHAP FEATURE BAR ────────────────────────────────────────────────────────

function NutFeatureBar({
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
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

// ─── TEAM MEMBER CARD (Nutdesign Team Layout) ────────────────────────────────

function NutTeamCard({
  name,
  role,
  avatar,
  bio,
}: {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-[#00b5cc] hover:shadow-md transition-all duration-300 text-center flex flex-col justify-between group">
      <div>
        <div className="w-20 h-20 rounded-full bg-[#edfafb] border border-[#b2eaf1] flex items-center justify-center text-4xl mx-auto mb-4 shadow-xs group-hover:scale-105 transition-transform duration-300">
          {avatar}
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#00b5cc] transition-colors">
          {name}
        </h3>
        <p className="text-xs font-bold text-[#0099ad] uppercase tracking-wider mb-3">
          {role}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          {bio}
        </p>
      </div>
    </div>
  );
}

// ─── CORE VALUE CARD (Nutdesign Values Layout) ───────────────────────────────

function NutValueCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-[#00b5cc] hover:shadow-md transition-all duration-300 flex flex-col space-y-3 group">
      <div className="w-12 h-12 rounded-xl bg-[#edfafb] text-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#00b5cc] transition-colors uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
