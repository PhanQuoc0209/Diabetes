"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { 
  ALL_RESEARCH_PAPERS, 
  CLINICAL_GUIDELINES, 
  LIFESTYLE_ARTICLES,
  ResearchPaper,
  LifestyleArticle,
  ClinicalGuideline
} from "@/lib/researchData";
import { ArticleReaderModal, ArticleData } from "@/components/ArticleReaderModal";

export default function SongKhoePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter research papers based on search and category
  const filteredPapers = ALL_RESEARCH_PAPERS.filter((paper) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      paper.title.toLowerCase().includes(q) ||
      paper.authors.toLowerCase().includes(q) ||
      paper.journal.toLowerCase().includes(q) ||
      paper.summary.toLowerCase().includes(q) ||
      paper.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory =
      activeCategory === "all" ||
      (activeCategory === "lifestyle" && false) ||
      (activeCategory === "papers" && true) ||
      (activeCategory === "guidelines" && false) ||
      paper.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      paper.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()));

    return matchesSearch && (activeCategory === "all" || activeCategory === "papers" || matchesCategory);
  });

  const openArticle = (article: ArticleData) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navigation />

      {/* HERO BANNER - BookingCare "Sống khỏe" Style */}
      <section className="bg-gradient-to-b from-[#dff6f9] via-[#edfafb] to-[#f8fafc] py-10 sm:py-14 border-b border-[#daf0f4]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#b2eaf1] shadow-xs mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#00b5cc]"></span>
              <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
                Hiểu Để Sống Khỏe • BookingCare Medical Portal
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-3">
              Cẩm Nang & Nghiên Cứu Sức Khỏe Tiểu Đường
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed mb-6">
              Nguồn tham khảo y tế chính xác, tin cậy về dinh dưỡng, lối sống và các công trình nghiên cứu khoa học chuẩn quốc tế, giúp bạn chủ động phòng ngừa và kiểm soát đái tháo đường hiệu quả.
            </p>

            {/* Live Search Input - Soft BookingCare Pill */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết cẩm nang, thực đơn, chỉ số HbA1c hoặc công trình nghiên cứu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 sm:py-4 pl-12 rounded-full border border-slate-300 focus:border-[#00b5cc] focus:ring-4 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white shadow-xs"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-full"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === "all"
                    ? "bg-[#00b5cc] text-white shadow-md shadow-[#00b5cc]/25 scale-102"
                    : "bg-white text-slate-700 hover:bg-[#edfafb] hover:text-[#008299] border border-slate-200"
                }`}
              >
                Tất cả chủ đề
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("lifestyle")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === "lifestyle"
                    ? "bg-[#00b5cc] text-white shadow-md shadow-[#00b5cc]/25 scale-102"
                    : "bg-white text-slate-700 hover:bg-[#edfafb] hover:text-[#008299] border border-slate-200"
                }`}
              >
                <span>🌿</span>
                <span>Cẩm nang sống khỏe ({LIFESTYLE_ARTICLES.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("papers")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === "papers"
                    ? "bg-[#00b5cc] text-white shadow-md shadow-[#00b5cc]/25 scale-102"
                    : "bg-white text-slate-700 hover:bg-[#edfafb] hover:text-[#008299] border border-slate-200"
                }`}
              >
                <span>📚</span>
                <span>Nghiên cứu khoa học ({ALL_RESEARCH_PAPERS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("guidelines")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCategory === "guidelines"
                    ? "bg-[#00b5cc] text-white shadow-md shadow-[#00b5cc]/25 scale-102"
                    : "bg-white text-slate-700 hover:bg-[#edfafb] hover:text-[#008299] border border-slate-200"
                }`}
              >
                <span>📋</span>
                <span>Tiêu chuẩn lâm sàng ({CLINICAL_GUIDELINES.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14 flex-1 w-full">

        {/* SECTION 1: CẨM NANG SỐNG KHỎE & DINH DƯỠNG (Dành cho người dùng / bệnh nhân) */}
        {(activeCategory === "all" || activeCategory === "lifestyle") && (
          <section id="lifestyle-section" className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🌿</span>
                  <span>Cẩm Nang Sống Khỏe & Dinh Dưỡng Thực Tiễn</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kiến thức phòng ngừa, thực đơn ăn uống khoa học và bài tập giúp ổn định chỉ số đường huyết
                </p>
              </div>
              <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1]">
                {LIFESTYLE_ARTICLES.length} bài viết
              </span>
            </div>

            {/* 4 Cards Grid - Soft BookingCare Medical Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LIFESTYLE_ARTICLES.map((art) => (
                <SongKhoeGridCard
                  key={art.id}
                  image={art.image}
                  category={art.category}
                  time={art.readTime}
                  title={art.title}
                  desc={art.summary}
                  onRead={() => openArticle({
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

            {/* 3 Golden Rules Infobox (Plate Method, Exercise, HbA1c) */}
            <div className="bg-gradient-to-br from-[#edfafb] via-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-[#b2eaf1] shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-[#008299] mb-4 flex items-center gap-2">
                <span>🥗</span> 3 Nguyên Tắc Vàng Ngăn Ngừa Tiến Triển Đái Tháo Đường
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs hover:border-[#00b5cc]/40 transition-colors">
                  <div className="text-3xl mb-2.5">🍽️</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">Phương Pháp Đĩa Ăn (Plate Method)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1/2 đĩa là rau củ xanh không chứa tinh bột; 1/4 là đạm nạc (cá, ức gà, đậu phụ); 1/4 là tinh bột chuyển hóa chậm (gạo lứt, yến mạch, khoai lang).
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs hover:border-[#00b5cc]/40 transition-colors">
                  <div className="text-3xl mb-2.5">🏃‍♂️</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">Quy Tắc Vận Động 150 Phút/Tuần</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tối thiểu 30 phút đi bộ nhanh hoặc đạp xe mỗi ngày (5 ngày/tuần). Đi bộ nhẹ 10 phút sau bữa ăn giúp giảm tức thì đỉnh đường huyết sau ăn tới 25%.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#b2eaf1]/60 shadow-xs hover:border-[#00b5cc]/40 transition-colors">
                  <div className="text-3xl mb-2.5">🩸</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">Tầm Soát Chỉ Số HbA1c Định Kỳ</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Xét nghiệm máu 3-6 tháng/lần. Duy trì HbA1c dưới 5.7% là mục tiêu an toàn bảo vệ tim mạch, mắt và thận khỏi các biến chứng nguy hiểm.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: 20 CÔNG TRÌNH NGHIÊN CỨU KHOA HỌC CHUẨN QUỐC TẾ */}
        {(activeCategory === "all" || activeCategory === "papers") && (
          <section id="papers-section" className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📚</span>
                  <span>Công Trình Nghiên Cứu Y Khoa & Machine Learning</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  20 công trình bình duyệt từ Nature, PMLR, BMC Medicine, IEEE, WHO làm cơ sở toán học cho mô hình DiabeTwin
                </p>
              </div>
              <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1]">
                {filteredPapers.length} công trình
              </span>
            </div>

            {/* 20 Cards Grid - Image 1 Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPapers.map((paper) => (
                <SongKhoeGridCard
                  key={paper.id}
                  image={paper.image}
                  category={paper.category}
                  time={paper.readTime}
                  impact={paper.impact}
                  title={paper.title}
                  authors={paper.authors}
                  journal={paper.journal}
                  year={paper.year}
                  desc={paper.summary}
                  link={paper.link}
                  onRead={() => openArticle(paper)}
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
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-semibold text-[#0099ad] hover:underline"
                >
                  Xóa từ khóa tìm kiếm
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: TIÊU CHUẨN LÂM SÀNG & QUY CHUẨN Y TẾ */}
        {(activeCategory === "all" || activeCategory === "guidelines") && (
          <section id="guidelines-section" className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📋</span>
                  <span>Tiêu Chuẩn Lâm Sàng & Hướng Dẫn Điều Trị</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Quy chuẩn chính thống từ ADA 2024, Bộ Y Tế Việt Nam và Tổ chức Y tế Thế giới (WHO)
                </p>
              </div>
              <span className="text-xs font-bold text-[#0099ad] px-3 py-1 rounded-full bg-[#edfafb] border border-[#b2eaf1]">
                {CLINICAL_GUIDELINES.length} bộ quy chuẩn
              </span>
            </div>

            {/* 3 Guidelines Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CLINICAL_GUIDELINES.map((guideline) => (
                <SongKhoeGridCard
                  key={guideline.id}
                  image={guideline.image}
                  category={guideline.category}
                  time={guideline.readTime}
                  impact={guideline.impact}
                  title={guideline.title}
                  authors={guideline.organization}
                  year={guideline.year}
                  desc={guideline.summary}
                  link={guideline.link}
                  onRead={() => openArticle({
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

            {/* Diagnostic Table */}
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
                      <td className="py-3.5 px-4 text-slate-600">Duy trì lối sống năng động, tái khám định kỳ hàng năm.</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="py-3.5 px-4 font-bold text-amber-700">🟡 Tiền Đái Tháo Đường</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">5.7% - 6.4%</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">100 - 125 mg/dL (5.6 - 6.9 mmol/L)</td>
                      <td className="py-3.5 px-4 text-slate-600">Giai đoạn vàng để can thiệp dinh dưỡng, giảm 5-7% cân nặng.</td>
                    </tr>
                    <tr className="bg-rose-50/40">
                      <td className="py-3.5 px-4 font-bold text-rose-700">🔴 Đái Tháo Đường Lâm Sàng</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 6.5%</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 126 mg/dL (≥ 7.0 mmol/L)</td>
                      <td className="py-3.5 px-4 text-slate-600">Khám bác sĩ chuyên khoa nội tiết, thiết lập phác đồ điều trị.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: QUY TRÌNH KIỂM DUYỆT NỘI DUNG & ĐỘI NGŨ CHUYÊN GIA (Chuẩn BookingCare) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2">
              Quy Trình Kiểm Duyệt Y Khoa & Đội Ngũ Cố Vấn
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Mọi nội dung cẩm nang và mô hình tính toán tại DiabeTwin đều tuân thủ quy trình kiểm soát chất lượng y tế nghiêm ngặt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#edfafb] text-[#00b5cc] flex items-center justify-center text-xl mb-3 font-bold">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Đối Soát Y Văn Quốc Tế</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tất cả các khuyến nghị và trọng số tính toán rủi ro đều được trích dẫn trực tiếp từ các nghiên cứu bình duyệt (PubMed, Nature, ADA Standards of Care).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-[#0099ad]">
                ✓ Nguồn tài liệu chính thống
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#edfafb] text-[#00b5cc] flex items-center justify-center text-xl mb-3 font-bold">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Thẩm Định Bác Sĩ Chuyên Khoa</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nội dung cẩm nang dinh dưỡng và phác đồ thay đổi lối sống được tham vấn từ các Bác sĩ chuyên khoa Nội tiết - Đái tháo đường.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-[#0099ad]">
                ✓ Chuyên môn lâm sàng cao
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#edfafb] text-[#00b5cc] flex items-center justify-center text-xl mb-3 font-bold">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Mô Hình AI Minh Bạch (SHAP)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Loại bỏ hoàn toàn &ldquo;hộp đen&rdquo; AI. Mọi dự báo đều giải thích rõ ràng mức độ ảnh hưởng của từng chỉ số cá nhân (HbA1c, Glucose, BMI).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-[#0099ad]">
                ✓ Minh bạch & An toàn y tế
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 DiabeTwin - Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện</p>
          <p className="mt-1 text-slate-400">
            Nội dung mang tính chất tham khảo tầm soát và hỗ trợ nâng cao nhận thức sức khỏe, không thay thế chẩn đoán chuyên môn của Bác sĩ.
          </p>
        </div>
      </footer>

      {/* ARTICLE READER MODAL */}
      <ArticleReaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle}
      />
    </div>
  );
}

// ─── REUSABLE HEALTHCARE GRID CARD COMPONENT (Ảnh 1 Style) ───────────────────

function SongKhoeGridCard({
  image,
  category,
  time,
  impact,
  title,
  authors,
  journal,
  year,
  desc,
  link,
  onRead,
}: {
  image: string;
  category: string;
  time?: string;
  impact?: string;
  title: string;
  authors?: string;
  journal?: string;
  year?: number | string;
  desc: string;
  link?: string;
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
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {impact && (
            <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
              impact === 'Very High'
                ? 'bg-rose-500 text-white'
                : 'bg-[#00b5cc] text-white'
            }`}>
              {impact} Impact
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#edfafb] text-[#0099ad]">
              {category}
            </span>
            <span className="text-[10px] text-slate-400">
              {time || (year ? `${year}` : '')}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#00b5cc] transition-colors">
            {title}
          </h3>

          {authors && (
            <p className="text-[11px] text-slate-400 italic line-clamp-1 mb-1.5">
              {authors} {journal ? `• ${journal}` : ''}
            </p>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {desc}
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

        {link && (
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
