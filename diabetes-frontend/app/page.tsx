"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const searchPills = [
    { label: "Đánh giá tại nhà (18 chỉ số)", href: "/user-prediction" },
    { label: "Cổng Bác sĩ (8 chỉ số lâm sàng)", href: "/doctor" },
    { label: "Chỉ số HbA1c", href: "/doctor" },
    { label: "Đường huyết đói (Glucose)", href: "/doctor" },
    { label: "Đo chỉ số BMI", href: "/user-prediction" },
    { label: "Mô hình AI & SHAP", href: "/about" },
  ];

  const filteredPills = searchTerm.trim()
    ? searchPills.filter((p) =>
        p.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : searchPills;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />

      {/* HERO SECTION - BookingCare Healthcare Style */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#dff6f9] via-[#edfafb] to-slate-50 pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-200/60">
        {/* Subtle Medical Background Pattern */}
        <div className="absolute inset-0 bg-medical-grid opacity-70 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Medical Platform Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#b2eaf1] shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00b5cc] animate-ping"></span>
              <span className="text-xs sm:text-sm font-bold text-[#008299] uppercase tracking-wider">
                Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              Hệ Thống AI Đánh Giá & Dự Đoán <br className="hidden sm:block" />
              <span className="text-[#00b5cc] relative">
                Nguy Cơ Tiểu Đường
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#ffba00]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
              Ứng dụng Machine Learning tiên tiến kết hợp giải thích mô hình SHAP, 
              giúp người dùng tầm soát sớm tại nhà và hỗ trợ Bác sĩ chẩn đoán lâm sàng chính xác, khoa học.
            </p>

            {/* SEARCH BOX - Signature BookingCare AI Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border-2 border-[#b2eaf1] p-1.5 sm:p-2">
                <div className="pl-3 sm:pl-4 text-[#00b5cc]">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm chỉ số HbA1c, Glucose, BMI, dịch vụ y tế..."
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-hidden font-medium"
                />
                <div className="flex-shrink-0 flex items-center gap-1.5 pr-1">
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ffba00]/15 text-[#996500] text-xs font-bold border border-[#ffba00]/30">
                    <span>✨</span>
                    <span>AI Hỗ trợ</span>
                  </span>
                  <Link
                    href="/user-prediction"
                    className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Khám ngay</span>
                  </Link>
                </div>
              </div>

              {/* Quick Pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Gợi ý tìm kiếm:</span>
                {filteredPills.map((pill, idx) => (
                  <Link
                    key={idx}
                    href={pill.href}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/80 hover:bg-[#edfafb] text-slate-700 hover:text-[#008299] border border-slate-200/80 hover:border-[#00b5cc] transition-all font-medium"
                  >
                    {pill.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/user-prediction"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Kiểm tra Nguy cơ Tại nhà</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/doctor"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#00b5cc] text-slate-800 hover:text-[#008299] font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>👨‍⚕️ Cổng Bác sĩ Lâm sàng</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* COMPREHENSIVE MEDICAL SERVICES - BookingCare Signature Grid */}
      <section className="py-10 md:py-14 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Dịch vụ Y tế Toàn diện</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Các tiện ích sàng lọc & chẩn đoán tiểu đường chuẩn y khoa</p>
            </div>
            <Link href="/about" className="text-xs sm:text-sm font-semibold text-[#0099ad] hover:text-[#007b8b] flex items-center gap-1">
              <span>Tìm hiểu thêm</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <ServiceIconCard
              href="/doctor"
              icon="🩺"
              bgColor="bg-cyan-50"
              borderColor="border-cyan-200"
              title="Khám Chuyên khoa"
              desc="Cổng Bác sĩ lâm sàng 8 chỉ số"
            />
            <ServiceIconCard
              href="/user-prediction"
              icon="🏠"
              bgColor="bg-emerald-50"
              borderColor="border-emerald-200"
              title="Khám Tại nhà"
              desc="Sàng lọc nguy cơ 18 yếu tố"
            />
            <ServiceIconCard
              href="/doctor"
              icon="📊"
              bgColor="bg-amber-50"
              borderColor="border-amber-200"
              title="Phân tích AI SHAP"
              desc="Minh bạch từng chỉ số tác động"
            />
            <ServiceIconCard
              href="/user-prediction"
              icon="🤖"
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
              title="Bác sĩ AI Tư vấn"
              desc="Khuyến nghị dinh dưỡng & lối sống"
            />
            <ServiceIconCard
              href="/about"
              icon="🧪"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
              title="Xét nghiệm Đường huyết"
              desc="Chuẩn HbA1c & Glucose y tế"
            />
            <ServiceIconCard
              href="/about"
              icon="📖"
              bgColor="bg-rose-50"
              borderColor="border-rose-200"
              title="Cẩm nang Y khoa"
              desc="Hướng dẫn phòng ngừa & sống khỏe"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DIABETWIN - BookingCare Feature Cards (Preserves all 6 original features) */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#00b5cc]/10 text-[#008299] text-xs font-bold uppercase tracking-wider mb-3">
              Ưu điểm Vượt trội
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Vì Sao Nên Chọn DiabeTwin?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Hệ thống kết hợp công nghệ AI hiện đại với tiêu chuẩn thẩm định y khoa, mang lại trải nghiệm an tâm và đáng tin cậy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <BookingCareFeatureCard
              icon="⚡"
              title="Kết quả Tức thì"
              titleEn="Instant Results"
              description="Phân tích AI tốc độ cao trong vòng vài giây, loại bỏ thời gian chờ đợi với công nghệ suy luận tối ưu."
              gradient="from-amber-400 to-orange-500"
              badge="Tốc độ <10s"
            />
            <BookingCareFeatureCard
              icon="🎯"
              title="Độ chính xác Vượt trội"
              titleEn="Superior Accuracy"
              description="Đạt độ chính xác 95% được chứng thực từ nghiên cứu y tế lâm sàng và tập dữ liệu quy mô lớn."
              gradient="from-cyan-400 to-blue-600"
              badge="Chính xác 95%"
            />
            <BookingCareFeatureCard
              icon="🔒"
              title="Bảo mật Tuyệt đối"
              titleEn="Absolute Security"
              description="Dữ liệu sức khỏe cá nhân được mã hóa chuẩn y tế, cam kết không chia sẻ cho bên thứ ba."
              gradient="from-emerald-400 to-teal-600"
              badge="Chuẩn Bảo mật"
            />
            <BookingCareFeatureCard
              icon="📊"
              title="Minh bạch Toàn diện"
              titleEn="Full Transparency"
              description="Giải thích rõ ràng nguyên nhân dự đoán của AI thông qua mô hình biểu đồ SHAP hộp trắng."
              gradient="from-purple-400 to-indigo-600"
              badge="Mô hình SHAP"
            />
            <BookingCareFeatureCard
              icon="💡"
              title="Cá nhân hóa Thông minh"
              titleEn="Smart Personalization"
              description="Đưa ra lời khuyên y tế, dinh dưỡng và chế độ vận động riêng biệt theo thể trạng từng cá nhân."
              gradient="from-pink-400 to-rose-600"
              badge="AI Advisor"
            />
            <BookingCareFeatureCard
              icon="📱"
              title="Đa nền tảng Linh hoạt"
              titleEn="Cross-Platform Flexibility"
              description="Sử dụng tiện lợi trên mọi thiết bị: máy tính, điện thoại, máy tính bảng mọi lúc mọi nơi."
              gradient="from-teal-400 to-cyan-600"
              badge="Mọi Thiết bị"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - BookingCare Step Flow (Preserves all 4 original steps) */}
      <section className="py-12 md:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#ffba00]/20 text-[#996500] text-xs font-bold uppercase tracking-wider mb-3">
              Quy Trình Chuẩn Y Khoa
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Quy Trình Đánh Giá 4 Bước Đơn Giản
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Quy trình khép kín giúp bạn dễ dàng theo dõi sức khỏe và phòng ngừa tiểu đường hiệu quả.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <BookingCareStepCard
              step="1"
              icon="📝"
              title="Nhập dữ liệu sức khỏe"
              titleEn="Fill In Your Data"
              description="Điền các thông tin thể trạng, tiền sử bệnh và chỉ số xét nghiệm sinh hóa cơ bản."
            />
            <BookingCareStepCard
              step="2"
              icon="🧠"
              title="AI phân tích đa tầng"
              titleEn="AI Analysis"
              description="Mô hình Machine Learning đối soát dữ liệu với hàng chục ngàn mẫu bệnh án lâm sàng."
            />
            <BookingCareStepCard
              step="3"
              icon="📊"
              title="Nhận kết quả chẩn đoán"
              titleEn="Get Results"
              description="Xem đánh giá xác suất rủi ro, phân loại mức độ nguy cơ và biểu đồ tác động SHAP."
            />
            <BookingCareStepCard
              step="4"
              icon="🩺"
              title="Khuyến nghị y tế"
              titleEn="Get Recommendations"
              description="Nhận phác đồ dinh dưỡng, thay đổi lối sống từ AI Advisor để kiểm soát đường huyết."
            />
          </div>
        </div>
      </section>

      {/* STATISTICS & TRUST - BookingCare Impact Section (Preserves original 4 stats) */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#edfafb] via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#00b5cc]/10 text-[#008299] text-xs font-bold uppercase tracking-wider mb-3">
              Chứng Nhận & Con Số
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Hiệu Quả & Độ Tin Cậy
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Những chỉ số chứng minh năng lực chẩn đoán và niềm tin của cộng đồng vào DiabeTwin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BookingCareStatCard
              value="95%"
              label="Độ chính xác mô hình"
              labelEn="Accuracy"
              description="Mô hình Machine Learning tiên tiến (State-of-the-art)"
              icon="🎯"
            />
            <BookingCareStatCard
              value="15K+"
              label="Lượt người dùng tin tưởng"
              labelEn="Users Trusting"
              description="Hàng ngàn người đã kiểm tra và theo dõi sức khỏe"
              icon="👥"
            />
            <BookingCareStatCard
              value="80%"
              label="Recall Score lâm sàng"
              labelEn="Clinical Recall"
              description="Thẩm định nghiêm ngặt theo chuẩn y khoa"
              icon="📋"
            />
            <BookingCareStatCard
              value="<10s"
              label="Thời gian chẩn đoán"
              labelEn="Average Speed"
              description="Kết quả trả về tức thì với độ ổn định cao"
              icon="⚡"
            />
          </div>
        </div>
      </section>

      {/* MEDICAL HANDBOOK (BookingCare "Cẩm nang" style) */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                Cẩm Nang Y Khoa & Sống Khỏe
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kiến thức chính thống giúp bạn chủ động phòng ngừa và kiểm soát bệnh tiểu đường
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#edfafb] text-slate-700 hover:text-[#008299] text-xs sm:text-sm font-semibold transition-colors self-start sm:self-auto"
            >
              <span>Xem tất cả bài viết</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <HandbookCard
              tag="Chỉ số sinh học"
              title="Chỉ số HbA1c là gì? Mức độ nào cảnh báo tiền tiểu đường?"
              desc="Hiểu rõ ý nghĩa của xét nghiệm HbA1c và cách đọc kết quả xét nghiệm máu chuẩn xác."
              time="5 phút đọc"
            />
            <HandbookCard
              tag="Dinh dưỡng"
              title="Thực đơn 7 ngày giúp hạ chỉ số đường huyết an toàn"
              desc="Các nhóm thực phẩm có chỉ số GI thấp giúp ổn định insulin và giảm gánh nặng chuyển hóa."
              time="7 phút đọc"
            />
            <HandbookCard
              tag="Vận động"
              title="5 bài tập thể dục tốt nhất cho người có nguy cơ cao"
              desc="Phương pháp rèn luyện sức bền và cơ bắp giúp tăng độ nhạy cảm insulin tự nhiên."
              time="4 phút đọc"
            />
            <HandbookCard
              tag="Công nghệ AI"
              title="SHAP Values là gì? AI giải thích nguyên nhân bệnh như thế nào?"
              desc="Tìm hiểu cách AI giải mã các mối tương quan phức tạp giữa BMI, huyết áp và tiểu đường."
              time="6 phút đọc"
            />
          </div>
        </div>
      </section>

      {/* CTA BANNER - BookingCare Cyan Gradient Style */}
      <section className="bg-bookingcare-banner py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#ffba00]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4">
            Bảo vệ sức khỏe ngay hôm nay
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Bạn Đã Sẵn Sàng Kiểm Tra Nguy Cơ Của Mình?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-cyan-50 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Chỉ mất chưa đầy 2 phút để hoàn thành đánh giá với sự trợ giúp của AI. Miễn phí, bảo mật và chuẩn xác.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/user-prediction"
              className="px-8 py-3.5 rounded-xl bg-[#ffba00] hover:bg-[#e6a800] text-slate-900 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
            >
              Bắt Đầu Đánh Giá Ngay
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border-2 border-white/60 text-white font-bold text-sm sm:text-base backdrop-blur-xs transition-all"
            >
              Tìm Hiểu Công Nghệ
            </Link>
          </div>
        </div>
      </section>

      {/* RICH 4-COLUMN FOOTER - BookingCare Standard */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Info & Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#00b5cc] flex items-center justify-center text-white font-bold">
                  +
                </div>
                <span className="text-xl font-black text-slate-900">
                  Diabe<span className="text-[#00b5cc]">Twin</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện. Ứng dụng Trí tuệ Nhân tạo trong sàng lọc và hỗ trợ chẩn đoán nguy cơ tiểu đường.
              </p>
              <div className="space-y-2 text-xs text-slate-500">
                <p>📍 Lô B4/D21, Cầu Giấy, Hà Nội</p>
                <p>📞 Hotline: <strong>024 7301 2468</strong></p>
                <p>✉️ Email: support@diabetwin.vn</p>
              </div>
            </div>

            {/* Column 2: Dịch vụ y tế */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Dịch Vụ Y Tế</h3>
              <ul className="space-y-2 text-xs">
                <li><Link href="/user-prediction" className="hover:text-[#00b5cc] transition-colors">Đánh giá nguy cơ tại nhà</Link></li>
                <li><Link href="/doctor" className="hover:text-[#00b5cc] transition-colors">Cổng Bác sĩ lâm sàng</Link></li>
                <li><Link href="/doctor" className="hover:text-[#00b5cc] transition-colors">Phân tích tác động SHAP</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Tra cứu chỉ số HbA1c & Glucose</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Khuyến nghị dinh dưỡng & lối sống</Link></li>
              </ul>
            </div>

            {/* Column 3: Hỗ trợ & Khách hàng */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Hỗ Trợ & Chính Sách</h3>
              <ul className="space-y-2 text-xs">
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Về chúng tôi & Sứ mệnh</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Quy trình vận hành AI</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Chính sách bảo mật dữ liệu y tế</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Điều khoản sử dụng</Link></li>
                <li><Link href="/about" className="hover:text-[#00b5cc] transition-colors">Câu hỏi thường gặp (FAQ)</Link></li>
              </ul>
            </div>

            {/* Column 4: Đối tác & Pháp lý */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Chứng Nhận & Đối Tác</h3>
              <p className="text-xs text-slate-500 mb-3">
                Được bảo trợ công nghệ và nghiên cứu dữ liệu dựa trên các tập dữ liệu y tế quốc tế.
              </p>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700">
                  🛡️ SSL Encrypted
                </div>
                <div className="px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-[11px] font-bold text-emerald-700">
                  ✓ HIPAA Compliant
                </div>
              </div>
            </div>

          </div>

          {/* Legal Notice */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 DiabeTwin - Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện.</p>
            <p className="text-center md:text-right max-w-xl text-slate-400">
              <strong className="text-slate-500">Khuyến cáo:</strong> Kết quả phân tích từ DiabeTwin chỉ mang tính chất tham khảo tầm soát và hỗ trợ thông tin y khoa, không thay thế chẩn đoán chuyên môn trực tiếp của Bác sĩ chuyên khoa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function ServiceIconCard({
  href,
  icon,
  bgColor,
  borderColor,
  title,
  desc,
}: {
  href: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#00b5cc] hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <div className={`w-14 h-14 rounded-2xl ${bgColor} border ${borderColor} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
        {icon}
      </div>
      <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#008299] transition-colors leading-tight mb-1">
        {title}
      </h3>
      <p className="text-[11px] text-slate-400 line-clamp-2">
        {desc}
      </p>
    </Link>
  );
}

function BookingCareFeatureCard({
  icon,
  title,
  titleEn,
  description,
  gradient,
  badge,
}: {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  gradient: string;
  badge: string;
}) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 p-6 sm:p-7">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl text-white shadow-xs group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#edfafb] group-hover:text-[#008299] transition-colors">
          {badge}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#008299] transition-colors mb-1">
        {title}
      </h3>
      <p className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">
        {titleEn}
      </p>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}

function BookingCareStepCard({
  step,
  icon,
  title,
  titleEn,
  description,
}: {
  step: string;
  icon: string;
  title: string;
  titleEn: string;
  description: string;
}) {
  return (
    <div className="relative bg-slate-50/80 rounded-2xl border border-slate-200/90 p-6 text-center hover:bg-white hover:border-[#00b5cc] hover:shadow-md transition-all duration-200">
      <div className="w-10 h-10 rounded-full bg-[#00b5cc] text-white font-black text-sm flex items-center justify-center mx-auto mb-4 shadow-sm">
        {step}
      </div>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-[11px] text-slate-400 font-medium mb-2 uppercase">{titleEn}</p>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function BookingCareStatCard({
  value,
  label,
  labelEn,
  description,
  icon,
}: {
  value: string;
  label: string;
  labelEn: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-[#00b5cc] hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{labelEn}</span>
      </div>
      <div className="text-3xl sm:text-4xl font-black text-[#00b5cc] mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-sm sm:text-base font-bold text-slate-800 mb-1">
        {label}
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function HandbookCard({
  tag,
  title,
  desc,
  time,
}: {
  tag: string;
  title: string;
  desc: string;
  time: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-[#00b5cc] transition-all flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-[#008299] border border-cyan-100">
            {tag}
          </span>
          <span className="text-[11px] text-slate-400">{time}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-800 hover:text-[#008299] transition-colors leading-snug mb-2 line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
          {desc}
        </p>
      </div>
      <Link href="/about" className="text-xs font-bold text-[#0099ad] hover:text-[#007b8b] flex items-center gap-1">
        <span>Đọc tiếp</span>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
