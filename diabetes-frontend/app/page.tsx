"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { FEATURED_ARTICLES } from "@/lib/researchData";
import { ArticleReaderModal, ArticleData } from "@/components/ArticleReaderModal";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only the original core services of DiabeTwin - strictly relevant to diabetes screening & clinical portal
  const coreServices = [
    {
      title: "Khám Chuyên khoa (Cổng Bác sĩ)",
      subtitle: "Chẩn đoán lâm sàng 8 chỉ số y sinh học & biểu đồ SHAP",
      icon: "/bookingcare/kham_chuyen_khoa.png",
      href: "/doctor",
    },
    {
      title: "Khám Tại nhà (Đánh giá cá nhân)",
      subtitle: "Sàng lọc nguy cơ 18 yếu tố thể trạng & thói quen sinh hoạt",
      icon: "/bookingcare/song_khoe_tieu_duong.png",
      href: "/user-prediction",
    },
    {
      title: "Xét nghiệm y học & Đo đường huyết",
      subtitle: "Đánh giá ngưỡng lâm sàng chỉ số HbA1c & Glucose lúc đói",
      icon: "/bookingcare/xet_nghiem_y_hoc.png",
      href: "/doctor",
    },
    {
      title: "Bác sĩ AI Tư vấn cá nhân hóa",
      subtitle: "Khuyến nghị phác đồ dinh dưỡng & lộ trình vận động",
      icon: "/bookingcare/assistant_datlich.png",
      href: "/user-prediction",
    },
    {
      title: "Phân tích Mô hình AI SHAP",
      subtitle: "Minh bạch nguyên nhân rủi ro, giải thích trực quan hộp trắng",
      icon: "/bookingcare/bai_test_suc_khoe.png",
      href: "/doctor",
    },
    {
      title: "Cẩm nang Sống khỏe Tiểu đường",
      subtitle: "Kiến thức y khoa chuẩn xác, hướng dẫn phòng ngừa chủ động",
      icon: "/bookingcare/kham_tu_xa.png",
      href: "/song-khoe",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8fa] flex flex-col font-sans">
      <Navigation />

      {/* HERO SECTION - Exact Soft BookingCare Style (Matching Image 3) */}
      <section className="bg-gradient-to-b from-[#8cd8eb] to-[#7ecfe4] pt-8 pb-10 md:pt-10 md:pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Title - Single line, elegant, clean sans-serif (as in Image 3) */}
          <h1 className="text-center text-slate-900 font-bold text-lg sm:text-2xl md:text-[26px] mb-5 tracking-tight">
            Tìm kiếm bác sĩ, bệnh viện, phòng khám, dịch vụ y tế và đặt lịch khám
          </h1>

          {/* Search Bar - Pure white rounded-full pill (as in Image 3) */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white rounded-full px-5 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between border border-transparent hover:border-white transition-all">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm phòng khám, bác sĩ, chỉ số HbA1c, Glucose, BMI..."
                className="w-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent pr-3"
              />
              <button 
                type="button" 
                aria-label="Tìm kiếm"
                className="text-slate-700 hover:text-[#00b5cc] transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* "Sản phẩm hỗ trợ bởi AI" Section - Exactly like Image 3 */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-slate-900 mb-3 text-left">
              Sản phẩm hỗ trợ bởi AI
            </h2>

            {/* AI Assistant Card (Matching Image 3) */}
            <Link
              href="/user-prediction"
              className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow inline-flex items-center gap-3.5 border border-slate-100 max-w-sm group"
            >
              {/* Official BookingCare Assistant Icon */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <img
                  src="/bookingcare/assistant_datlich.png"
                  alt="Trợ lý Đi khám"
                  className="w-11 h-11 object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#00b5cc] transition-colors">
                  Trợ lý Đi khám
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                  Tìm kiếm thông tin bác sĩ, nơi khám và đặt lịch khám
                </p>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* COMPREHENSIVE SERVICES (Dịch vụ y tế ban đầu của DiabeTwin - Không thêm dịch vụ ngoài) */}
      <section className="py-8 sm:py-10 bg-[#f5f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">
            Dịch vụ toàn diện
          </h2>

          {/* 2-Column Grid with Real BookingCare PNG Icons and Background Watermark - Only 4 core services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {coreServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex items-center gap-4 relative overflow-hidden group"
                style={{
                  backgroundImage: `url('/bookingcare/bg_grid_item.png')`,
                  backgroundPosition: 'right bottom',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {/* Real BookingCare Official Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Service Title & Subtitle */}
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-[#00b5cc] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {service.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE DIABETWIN (Ảnh 2 - Thiết kế mềm mại chuẩn y khoa, không dùng emoji hay khung cứng) */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header with 'Xem thêm' on right */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Vì Sao Nên Chọn DiabeTwin?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Công nghệ AI đồng hành cùng tiêu chuẩn y tế lâm sàng
              </p>
            </div>

            <Link
              href="/about"
              className="text-xs sm:text-sm font-semibold text-[#0099ad] hover:text-[#007b8b] px-3.5 py-1.5 rounded-full bg-[#edfafb] hover:bg-[#dcf6f9] transition-colors"
            >
              Xem thêm
            </Link>
          </div>

          {/* 6 Clean Healthcare Cards - Professional SVG vectors, soft pastel badges, no AI emojis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <CleanFeatureCard
              title="Kết quả Tức thì"
              titleEn="Instant Results"
              badge="Tốc độ <10s"
              description="Phân tích AI tốc độ cao trong vòng vài giây, loại bỏ thời gian chờ đợi với công nghệ suy luận tối ưu."
              iconBg="bg-amber-50 text-amber-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />

            <CleanFeatureCard
              title="Độ chính xác Vượt trội"
              titleEn="Superior Accuracy"
              badge="Chính xác 95%"
              description="Đạt độ chính xác 95% được chứng thực từ nghiên cứu y tế lâm sàng và tập dữ liệu quy mô lớn."
              iconBg="bg-cyan-50 text-[#0099ad]"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />

            <CleanFeatureCard
              title="Bảo mật Tuyệt đối"
              titleEn="Absolute Security"
              badge="Chuẩn Bảo mật"
              description="Dữ liệu sức khỏe cá nhân được mã hóa chuẩn y tế, cam kết bảo mật thông tin an toàn."
              iconBg="bg-emerald-50 text-emerald-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <CleanFeatureCard
              title="Minh bạch Toàn diện"
              titleEn="Full Transparency"
              badge="Mô hình SHAP"
              description="Giải thích rõ ràng nguyên nhân dự đoán của AI thông qua mô hình biểu đồ SHAP hộp trắng."
              iconBg="bg-purple-50 text-purple-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />

            <CleanFeatureCard
              title="Cá nhân hóa Thông minh"
              titleEn="Smart Personalization"
              badge="AI Advisor"
              description="Đưa ra lời khuyên y tế, dinh dưỡng và chế độ vận động riêng biệt theo thể trạng từng cá nhân."
              iconBg="bg-rose-50 text-rose-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
            />

            <CleanFeatureCard
              title="Đa nền tảng Linh hoạt"
              titleEn="Cross-Platform Flexibility"
              badge="Mọi Thiết bị"
              description="Sử dụng tiện lợi trên mọi thiết bị: máy tính, điện thoại, máy tính bảng mọi lúc mọi nơi."
              iconBg="bg-teal-50 text-teal-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />

          </div>

        </div>
      </section>

      {/* HOW IT WORKS (Ảnh 4 - Quy trình 4 bước chuẩn luồng y tế BookingCare) */}
      <section className="py-10 sm:py-14 bg-[#f5f8fa] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Quy Trình Đánh Giá 4 Bước
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Các bước thực hiện nhanh chóng, bảo mật và chuẩn y khoa
              </p>
            </div>
            <Link
              href="/user-prediction"
              className="text-xs sm:text-sm font-semibold text-[#0099ad] hover:text-[#007b8b] px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Bắt đầu ngay
            </Link>
          </div>

          <div className="relative">
            {/* Desktop Patient Journey Connecting Line */}
            <div className="hidden lg:block absolute top-9 left-16 right-16 h-0.5 bg-gradient-to-r from-[#00b5cc]/20 via-[#00b5cc]/40 to-[#00b5cc]/20 z-0" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              <CleanStepCard
                step="1"
                title="Nhập dữ liệu sức khỏe"
                titleEn="Fill In Your Data"
                description="Điền các thông tin thể trạng, tiền sử bệnh và chỉ số sinh hóa cơ bản."
                icon={
                  <svg className="w-5 h-5 text-[#0099ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />

              <CleanStepCard
                step="2"
                title="AI phân tích đa tầng"
                titleEn="AI Analysis"
                description="Mô hình Machine Learning đối soát dữ liệu với các tập bệnh án lâm sàng."
                icon={
                  <svg className="w-5 h-5 text-[#0099ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />

              <CleanStepCard
                step="3"
                title="Nhận kết quả chẩn đoán"
                titleEn="Get Results"
                description="Xem đánh giá xác suất rủi ro, phân loại mức độ và biểu đồ tác động SHAP."
                icon={
                  <svg className="w-5 h-5 text-[#0099ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />

              <CleanStepCard
                step="4"
                title="Khuyến nghị y tế"
                titleEn="Get Recommendations"
                description="Nhận phác đồ dinh dưỡng, thay đổi lối sống từ Bác sĩ AI để ổn định đường huyết."
                icon={
                  <svg className="w-5 h-5 text-[#0099ad]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                }
              />

            </div>
          </div>

        </div>
      </section>

      {/* STATISTICS & TRUST (Ảnh 4 phần dưới - Hiệu quả & Độ tin cậy chuẩn y khoa) */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            Hiệu Quả & Độ Tin Cậy
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100/90 p-5 sm:p-6 text-center hover:border-[#00b5cc]/40 hover:bg-white hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-[#edfafb] text-[#0099ad] flex items-center justify-center mx-auto mb-2.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#00b5cc] mb-1">
                95%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Độ chính xác mô hình
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Mô hình Machine Learning chuẩn y khoa
              </p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100/90 p-5 sm:p-6 text-center hover:border-[#00b5cc]/40 hover:bg-white hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-[#edfafb] text-[#0099ad] flex items-center justify-center mx-auto mb-2.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#00b5cc] mb-1">
                15K+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Lượt người dùng tin cậy
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Đã đánh giá và theo dõi sức khỏe
              </p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100/90 p-5 sm:p-6 text-center hover:border-[#00b5cc]/40 hover:bg-white hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-[#edfafb] text-[#0099ad] flex items-center justify-center mx-auto mb-2.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#00b5cc] mb-1">
                80%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Recall Score lâm sàng
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Thẩm định nghiêm ngặt theo chuẩn y khoa
              </p>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100/90 p-5 sm:p-6 text-center hover:border-[#00b5cc]/40 hover:bg-white hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-[#edfafb] text-[#0099ad] flex items-center justify-center mx-auto mb-2.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#00b5cc] mb-1">
                &lt;10s
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Thời gian chẩn đoán
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Kết quả trả về tức thì với độ ổn định cao
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MEDICAL RESEARCH & HANDBOOK (Nghiên cứu y khoa & Cẩm nang - Ảnh y tế thực tế, không dùng ảnh web ngoài) */}
      <section className="py-10 sm:py-14 bg-[#f5f8fa] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Nghiên Cứu Y Khoa & Cẩm Nang Sống Khỏe
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Các công trình nghiên cứu chính thống và chuẩn y tế quốc tế được tích hợp trong DiabeTwin
              </p>
            </div>
            <Link
              href="/song-khoe#papers-section"
              className="text-xs sm:text-sm font-semibold text-[#0099ad] hover:text-[#007b8b] px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Xem tất cả nghiên cứu
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {FEATURED_ARTICLES.map((article) => (
              <RealArticleCard
                key={article.id}
                article={article}
                onRead={() => {
                  setSelectedArticle(article);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA BANNER - Soft BookingCare Sky Blue (Ảnh 4 phần dưới) */}
      <section className="bg-gradient-to-r from-[#8cd8eb] to-[#7acde3] py-10 sm:py-12 text-slate-900 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-2.5">
            Bạn Đã Sẵn Sàng Kiểm Tra Nguy Cơ Của Mình?
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mb-6 leading-relaxed">
            Chỉ mất 2 phút để hoàn thành đánh giá với sự trợ giúp của AI. Miễn phí, bảo mật và chuẩn xác.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/user-prediction"
              className="px-6 py-2.5 rounded-full bg-[#fbb03b] hover:bg-[#e59e2b] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              Bắt Đầu Đánh Giá Ngay
            </Link>
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER - Soft, clean BookingCare Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#00b5cc] flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
                <span className="text-lg font-bold text-[#fbb03b]">
                  DiabeTwin
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-3">
                Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện. Ứng dụng Trí tuệ Nhân tạo trong sàng lọc nguy cơ tiểu đường.
              </p>
              <div className="space-y-1 text-slate-500">
                <p>📍 Lô B4/D21, Cầu Giấy, Hà Nội</p>
                <p>📞 Hotline: <strong>024 7301 2468</strong></p>
                <p>✉️ Email: support@diabetwin.vn</p>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Dịch Vụ Y Tế</h3>
              <ul className="space-y-2 text-slate-500">
                <li><Link href="/user-prediction" className="hover:text-[#00b5cc]">Khám tại nhà</Link></li>
                <li><Link href="/doctor" className="hover:text-[#00b5cc]">Cổng Bác sĩ lâm sàng</Link></li>
                <li><Link href="/doctor" className="hover:text-[#00b5cc]">Phân tích tác động SHAP</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc]">Tra cứu chỉ số HbA1c</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Hỗ Trợ & Chính Sách</h3>
              <ul className="space-y-2 text-slate-500">
                <li><Link href="/about" className="hover:text-[#00b5cc]">Về chúng tôi</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc]">Quy trình hoạt động</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc]">Chính sách bảo mật y tế</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc]">Điều khoản dịch vụ</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Đối Tác & Pháp Lý</h3>
              <p className="text-slate-500 mb-3 leading-relaxed">
                Được bảo trợ công nghệ và nghiên cứu dữ liệu dựa trên các tập dữ liệu y tế quốc tế.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                  🛡️ SSL Encrypted
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700">
                  ✓ Chuẩn Y Tế
                </span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <p>© 2026 DiabeTwin - Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện.</p>
            <p className="text-center sm:text-right">
              Kết quả phân tích chỉ mang tính tham khảo tầm soát, không thay thế chẩn đoán chuyên môn của Bác sĩ.
            </p>
          </div>
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

// ─── Professional Sub-Components (Clean Healthcare Design, No AI Emojis) ─────

function CleanFeatureCard({
  title,
  titleEn,
  badge,
  description,
  icon,
  iconBg,
}: {
  title: string;
  titleEn: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#00b5cc]/30 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
            {icon}
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-[#edfafb] group-hover:text-[#0099ad] transition-colors">
            {badge}
          </span>
        </div>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#00b5cc] transition-colors mb-0.5">
          {title}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 mb-2">
          {titleEn}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

function CleanStepCard({
  step,
  title,
  titleEn,
  description,
  icon,
}: {
  step: string;
  title: string;
  titleEn: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#00b5cc]/40 transition-all duration-200 text-center flex flex-col items-center group">
      <div className="w-8 h-8 rounded-full bg-[#e0f7fa] border border-[#00b5cc]/30 text-[#0099ad] font-bold text-xs flex items-center justify-center mb-3 group-hover:bg-[#00b5cc] group-hover:text-white transition-all shadow-xs">
        {step}
      </div>
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#edfafb] transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#00b5cc] transition-colors mb-0.5">{title}</h3>
      <p className="text-[10px] text-slate-400 uppercase font-medium mb-2">{titleEn}</p>
      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function RealArticleCard({
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
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#edfafb] text-[#0099ad]">
              {article.category}
            </span>
            <span className="text-[10px] text-slate-400">{article.readTime}</span>
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-[#00b5cc] transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-1">
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
      </div>
    </div>
  );
}
