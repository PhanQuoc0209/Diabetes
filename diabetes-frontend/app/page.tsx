"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const comprehensiveServices = [
    {
      title: "Khám Chuyên khoa",
      icon: "/bookingcare/kham_chuyen_khoa.png",
      href: "/doctor",
    },
    {
      title: "Khám từ xa",
      icon: "/bookingcare/kham_tu_xa.png",
      href: "/doctor",
    },
    {
      title: "Khám tổng quát",
      icon: "/bookingcare/kham_tong_quat.png",
      href: "/doctor",
    },
    {
      title: "Xét nghiệm y học",
      icon: "/bookingcare/xet_nghiem_y_hoc.png",
      href: "/doctor",
    },
    {
      title: "Sức khỏe tinh thần",
      icon: "/bookingcare/suc_khoe_tinh_than.png",
      href: "/user-prediction",
    },
    {
      title: "Khám nha khoa",
      icon: "/bookingcare/kham_nha_khoa.png",
      href: "/about",
    },
    {
      title: "Gói Phẫu thuật",
      icon: "/bookingcare/goi_phau_thuat.png",
      href: "/about",
    },
    {
      title: "Sống khỏe Tiểu đường",
      icon: "/bookingcare/song_khoe_tieu_duong.png",
      href: "/user-prediction",
    },
    {
      title: "Bài Test Sức khỏe",
      icon: "/bookingcare/bai_test_suc_khoe.png",
      href: "/user-prediction",
    },
    {
      title: "Y tế gần bạn",
      icon: "/bookingcare/y_te_gan_ban.png",
      href: "/about",
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

      {/* COMPREHENSIVE SERVICES (Dịch vụ toàn diện) - Exact Match to Image 5 */}
      <section className="py-8 sm:py-10 bg-[#f5f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">
            Dịch vụ toàn diện
          </h2>

          {/* 2-Column Responsive Grid with Real BookingCare PNG Icons and Background Watermark */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {comprehensiveServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 p-4 sm:p-4.5 flex items-center gap-4 relative overflow-hidden group"
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

                {/* Service Title */}
                <span className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-[#00b5cc] transition-colors">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE DIABETWIN (Redesigned softly, no rigid gradient boxes - Soft BookingCare style) */}
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

          {/* 6 Soft Cards - No harsh gradients, gentle rounded-2xl, soft pastels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <SoftFeatureCard
              icon="⚡"
              iconBg="bg-amber-50 text-amber-600"
              title="Kết quả Tức thì"
              titleEn="Instant Results"
              description="Phân tích AI tốc độ cao trong vòng vài giây, loại bỏ thời gian chờ đợi với công nghệ suy luận tối ưu."
            />
            <SoftFeatureCard
              icon="🎯"
              iconBg="bg-cyan-50 text-[#0099ad]"
              title="Độ chính xác Vượt trội"
              titleEn="Superior Accuracy"
              description="Đạt độ chính xác 95% được chứng thực từ nghiên cứu y tế lâm sàng và tập dữ liệu quy mô lớn."
            />
            <SoftFeatureCard
              icon="🔒"
              iconBg="bg-emerald-50 text-emerald-600"
              title="Bảo mật Tuyệt đối"
              titleEn="Absolute Security"
              description="Dữ liệu sức khỏe cá nhân được mã hóa chuẩn y tế, cam kết bảo mật thông tin an toàn."
            />
            <SoftFeatureCard
              icon="📊"
              iconBg="bg-purple-50 text-purple-600"
              title="Minh bạch Toàn diện"
              titleEn="Full Transparency"
              description="Giải thích rõ ràng nguyên nhân dự đoán của AI thông qua mô hình biểu đồ SHAP hộp trắng."
            />
            <SoftFeatureCard
              icon="💡"
              iconBg="bg-rose-50 text-rose-600"
              title="Cá nhân hóa Thông minh"
              titleEn="Smart Personalization"
              description="Đưa ra lời khuyên y tế, dinh dưỡng và chế độ vận động riêng biệt theo thể trạng từng cá nhân."
            />
            <SoftFeatureCard
              icon="📱"
              iconBg="bg-teal-50 text-teal-600"
              title="Đa nền tảng Linh hoạt"
              titleEn="Cross-Platform Flexibility"
              description="Sử dụng tiện lợi trên mọi thiết bị: máy tính, điện thoại, máy tính bảng mọi lúc mọi nơi."
            />
          </div>

        </div>
      </section>

      {/* HOW IT WORKS (Quy trình 4 bước nhẹ nhàng) */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <SoftStepCard
              step="1"
              icon="📝"
              title="Nhập dữ liệu sức khỏe"
              titleEn="Fill In Your Data"
              description="Điền các thông tin thể trạng, tiền sử bệnh và chỉ số sinh hóa cơ bản."
            />
            <SoftStepCard
              step="2"
              icon="🧠"
              title="AI phân tích đa tầng"
              titleEn="AI Analysis"
              description="Mô hình Machine Learning đối soát dữ liệu với các tập bệnh án lâm sàng."
            />
            <SoftStepCard
              step="3"
              icon="📊"
              title="Nhận kết quả chẩn đoán"
              titleEn="Get Results"
              description="Xem đánh giá xác suất rủi ro, phân loại mức độ và biểu đồ tác động SHAP."
            />
            <SoftStepCard
              step="4"
              icon="🩺"
              title="Khuyến nghị y tế"
              titleEn="Get Recommendations"
              description="Nhận phác đồ dinh dưỡng, thay đổi lối sống từ Bác sĩ AI để ổn định đường huyết."
            />
          </div>

        </div>
      </section>

      {/* STATISTICS & TRUST (Con số ấn tượng) */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            Hiệu Quả & Độ Tin Cậy
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SoftStatCard
              value="95%"
              label="Độ chính xác mô hình"
              description="Mô hình Machine Learning chuẩn y khoa"
            />
            <SoftStatCard
              value="15K+"
              label="Lượt người dùng tin cậy"
              description="Đã đánh giá và theo dõi sức khỏe"
            />
            <SoftStatCard
              value="80%"
              label="Recall Score lâm sàng"
              description="Thẩm định nghiêm ngặt theo chuẩn y khoa"
            />
            <SoftStatCard
              value="<10s"
              label="Thời gian chẩn đoán"
              description="Kết quả trả về tức thì với độ ổn định cao"
            />
          </div>

        </div>
      </section>

      {/* MEDICAL HANDBOOK (Cẩm nang y khoa BookingCare) */}
      <section className="py-10 sm:py-14 bg-[#f5f8fa] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Cẩm Nang Y Khoa & Sống Khỏe
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kiến thức chính thống giúp bạn chủ động phòng ngừa tiểu đường
              </p>
            </div>
            <Link
              href="/about"
              className="text-xs sm:text-sm font-semibold text-[#0099ad] hover:text-[#007b8b] px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <SoftHandbookCard
              tag="Chỉ số sinh học"
              title="Chỉ số HbA1c là gì? Mức độ nào cảnh báo tiền tiểu đường?"
              desc="Hiểu rõ ý nghĩa của xét nghiệm HbA1c và cách đọc kết quả xét nghiệm máu chuẩn xác."
              time="5 phút đọc"
            />
            <SoftHandbookCard
              tag="Dinh dưỡng"
              title="Thực đơn 7 ngày giúp hạ chỉ số đường huyết an toàn"
              desc="Các nhóm thực phẩm có chỉ số GI thấp giúp ổn định insulin và giảm tải chuyển hóa."
              time="7 phút đọc"
            />
            <SoftHandbookCard
              tag="Vận động"
              title="5 bài tập thể dục tốt nhất cho người có nguy cơ cao"
              desc="Phương pháp rèn luyện sức bền và cơ bắp giúp tăng độ nhạy cảm insulin tự nhiên."
              time="4 phút đọc"
            />
            <SoftHandbookCard
              tag="Công nghệ AI"
              title="SHAP Values là gì? AI giải thích nguyên nhân bệnh ra sao?"
              desc="Tìm hiểu cách AI giải mã các mối tương quan phức tạp giữa BMI, huyết áp và tiểu đường."
              time="6 phút đọc"
            />
          </div>

        </div>
      </section>

      {/* CTA BANNER - Soft BookingCare Sky Blue */}
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
    </div>
  );
}

// ─── Sub-Components (Softened BookingCare Design) ─────────────────────────────

function SoftFeatureCard({
  icon,
  iconBg,
  title,
  titleEn,
  description,
}: {
  icon: string;
  iconBg: string;
  title: string;
  titleEn: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-xl mb-3.5`}>
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5">
        {title}
      </h3>
      <p className="text-[11px] font-medium text-slate-400 mb-2 uppercase tracking-wider">
        {titleEn}
      </p>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}

function SoftStepCard({
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
    <div className="bg-white rounded-2xl border border-slate-100/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 text-center">
      <div className="w-8 h-8 rounded-full bg-[#e0f7fa] text-[#0099ad] font-bold text-xs flex items-center justify-center mx-auto mb-3">
        {step}
      </div>
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-slate-900 text-sm mb-0.5">{title}</h3>
      <p className="text-[10px] text-slate-400 uppercase font-medium mb-2">{titleEn}</p>
      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function SoftStatCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-5 text-center">
      <div className="text-2xl sm:text-3xl font-black text-[#00b5cc] mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
        {label}
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SoftHandbookCard({
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
    <div className="bg-white rounded-2xl border border-slate-100/90 p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#edfafb] text-[#0099ad]">
            {tag}
          </span>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug mb-1.5 line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3">
          {desc}
        </p>
      </div>
      <Link href="/about" className="text-xs font-semibold text-[#0099ad] hover:text-[#007b8b] flex items-center gap-1">
        <span>Đọc tiếp</span>
        <span>→</span>
      </Link>
    </div>
  );
}
