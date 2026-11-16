"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#008299] via-[#006e80] to-[#005461] text-white border-t-4 border-[#00b5cc] shadow-inner">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#008299] flex items-center justify-center text-base font-bold shadow-md">
                +
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Diabe<span className="text-[#fbb03b]">Twin</span>
              </span>
            </div>
            
            <p className="text-cyan-100 text-xs leading-relaxed">
              Nền tảng Y tế Trí tuệ Nhân tạo hỗ trợ sàng lọc và dự phòng sớm nguy cơ đái tháo đường toàn diện theo chuẩn y khoa quốc tế.
            </p>

            <div className="space-y-2 text-xs text-cyan-100/90 pt-1">
              <div className="flex items-start gap-2">
                <span className="text-[#fbb03b] text-sm shrink-0">📍</span>
                <span>Tòa nhà FPT, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#fbb03b] text-sm shrink-0">📞</span>
                <span>
                  Hotline:{" "}
                  <a href="tel:02473012468" className="font-bold text-white hover:text-[#fbb03b] transition-colors">
                    024 7301 2468
                  </a>{" "}
                  <span className="text-[10px] text-cyan-200 bg-white/10 px-1.5 py-0.5 rounded ml-1">24/7</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#fbb03b] text-sm shrink-0">✉️</span>
                <span>Email: support@diabetwin.vn</span>
              </div>
            </div>
          </div>

          {/* Column 2: Medical Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-white/15 inline-block">
              Dịch Vụ Y Tế
            </h4>
            <ul className="space-y-2.5 text-xs text-cyan-100">
              <li>
                <Link href="/user-prediction" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Sàng lọc cá nhân tại nhà
                </Link>
              </li>
              <li>
                <Link href="/doctor" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Cổng Bác sĩ & Lâm sàng
                </Link>
              </li>
              <li>
                <Link href="/doctor" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Phân tích giải thích SHAP
                </Link>
              </li>
              <li>
                <Link href="/song-khoe" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Cẩm nang Sống khỏe & Nghiên cứu
                </Link>
              </li>
              <li>
                <Link href="/song-khoe" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Tra cứu tiêu chuẩn Glucose & HbA1c
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Research */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-white/15 inline-block">
              Nền Tảng & Nghiên Cứu
            </h4>
            <ul className="space-y-2.5 text-xs text-cyan-100">
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Về chúng tôi (DiabeTwin)
                </Link>
              </li>
              <li>
                <Link href="/about#mo-hinh-ai" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Kiến trúc Mô hình AI (LightGBM & XGBoost)
                </Link>
              </li>
              <li>
                <Link href="/about#shap-minh-bach" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Tính minh bạch giải thích SHAP
                </Link>
              </li>
              <li>
                <Link href="/about#su-menh" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Sứ mệnh y sinh & Đội ngũ kỹ sư
                </Link>
              </li>
              <li>
                <Link href="/about#dang-ky-tu-van" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span className="text-[#fbb03b]">›</span> Đăng ký tư vấn chuyên môn
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards & Security */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-white/15 inline-block">
              Tiêu Chuẩn & Chứng Nhận
            </h4>
            <p className="text-xs text-cyan-100 leading-relaxed">
              Mô hình học máy huấn luyện trên cơ sở dữ liệu y tế quốc tế CDC BRFSS (&gt;253.000 hồ sơ bệnh nhân), kiểm định theo hướng dẫn ADA 2024 và Bộ Y Tế.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] text-cyan-100 font-medium">
                🛡️ SSL 256-bit
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00b5cc]/30 border border-[#00b5cc]/50 text-[11px] text-white font-semibold">
                ✓ Chuẩn ADA 2024
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] text-cyan-100 font-medium">
                ⚕️ Chuẩn Bộ Y Tế
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Bar (Thanh Bản Quyền Cuối Cùng) */}
      <div className="w-full bg-[#004a57] border-t border-white/10 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-cyan-200">
          <p className="font-medium text-center sm:text-left">
            © 2026 <strong className="text-white">DiabeTwin</strong> - Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-cyan-300/80">
            Khuyến cáo: Kết quả phân tích mang tính sàng lọc tầm soát nguy cơ, không thay thế chẩn đoán chuyên môn của Bác sĩ.
          </p>
        </div>
      </div>
    </footer>
  );
}
