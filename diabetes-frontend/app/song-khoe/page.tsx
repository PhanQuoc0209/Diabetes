"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
  const [activeCategory, setActiveCategory] = useState<"all" | "lifestyle" | "papers" | "guidelines">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Consultation form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");

  const ITEMS_PER_PAGE = 9;

  // Scroll reveal observer & back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [activeCategory, currentPage, searchQuery]);

  // Unified list of all content items
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      type: "lifestyle" | "paper" | "guideline";
      title: string;
      image: string;
      category: string;
      summary: string;
      timeOrYear?: string;
      authorOrJournal?: string;
      impact?: string;
      raw: any;
    }> = [];

    // Add lifestyle articles
    LIFESTYLE_ARTICLES.forEach((art) => {
      items.push({
        id: art.id,
        type: "lifestyle",
        title: art.title,
        image: art.image,
        category: art.category,
        summary: art.summary,
        timeOrYear: art.readTime,
        authorOrJournal: "Cẩm nang dinh dưỡng",
        raw: art,
      });
    });

    // Add research papers
    ALL_RESEARCH_PAPERS.forEach((paper) => {
      items.push({
        id: paper.id,
        type: "paper",
        title: paper.title,
        image: paper.image,
        category: paper.category,
        summary: paper.summary,
        timeOrYear: paper.readTime || `${paper.year}`,
        authorOrJournal: `${paper.authors} • ${paper.journal}`,
        impact: paper.impact,
        raw: paper,
      });
    });

    // Add clinical guidelines
    CLINICAL_GUIDELINES.forEach((gl) => {
      items.push({
        id: gl.id,
        type: "guideline",
        title: gl.title,
        image: gl.image,
        category: gl.category,
        summary: gl.summary,
        timeOrYear: `${gl.year}`,
        authorOrJournal: gl.organization,
        impact: gl.impact,
        raw: gl,
      });
    });

    return items;
  }, []);

  // Filter items based on activeCategory & searchQuery
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchCategory =
        activeCategory === "all" ||
        (activeCategory === "lifestyle" && item.type === "lifestyle") ||
        (activeCategory === "papers" && item.type === "paper") ||
        (activeCategory === "guidelines" && item.type === "guideline");

      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.authorOrJournal && item.authorOrJournal.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [allItems, activeCategory, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const target = document.getElementById("articles-grid-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openArticle = (item: any) => {
    const raw = item.raw;
    setSelectedArticle({
      id: raw.id,
      title: raw.title,
      category: raw.category,
      image: raw.image,
      readTime: raw.readTime || `${raw.year}`,
      summary: raw.summary,
      content: raw.content,
      keyTakeaways: raw.keyTakeaways,
      authors: raw.authors,
      journal: raw.journal,
      year: raw.year,
      organization: raw.organization,
      clinicalApplication: raw.clinicalApplication,
      link: raw.link,
      tags: raw.tags,
    });
    setIsModalOpen(true);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      window.location.href = "/user-prediction";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 flex flex-col font-sans selection:bg-[#00b5cc]/20 selection:text-[#008299]">
      <Navigation />

      {/* ── 1. HERO BANNER - NUT Design Tin Tức Style ── */}
      <section className="relative w-full h-[340px] sm:h-[400px] md:h-[460px] bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Background Image with slight scale */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/bookingcare/bg_hero_medical.jpg')",
            backgroundColor: "#081b29"
          }}
        />
        {/* Dark Film Overlay - Exact Nutdesign overlay-custom */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-slate-950/90" />
        <div className="absolute inset-0 bg-medical-grid opacity-20 pointer-events-none" />

        {/* Centered Hero Content with fadeInUp animation */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white fadeInUp space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#45c3d2] text-xs font-semibold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00b5cc] animate-pulse"></span>
            <span>Hiểu Để Sống Khỏe • DiabeTwin Medical Journal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-widest text-white uppercase drop-shadow-md">
            CẨM NANG & NGHIÊN CỨU SỐNG KHỎE
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-300 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Kho tri thức y khoa chính thống: dinh dưỡng chuẩn, bài tập thực nghiệm và 20 công trình nghiên cứu khoa học quốc tế về đái tháo đường
          </p>
        </div>
      </section>

      {/* ── 2. FILTER & SEARCH TOOLBAR (NutDesign Minimalist Bar) ── */}
      <div className="sticky top-16 sm:top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
          
          {/* Category Filter Pills (NutDesign Style) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white shadow-xs scale-102"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Tất cả ({allItems.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("lifestyle");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "lifestyle"
                  ? "bg-slate-900 text-white shadow-xs scale-102"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🌿</span>
              <span>Cẩm nang sống khỏe ({LIFESTYLE_ARTICLES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("papers");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "papers"
                  ? "bg-slate-900 text-white shadow-xs scale-102"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>📚</span>
              <span>Nghiên cứu khoa học ({ALL_RESEARCH_PAPERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("guidelines");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "guidelines"
                  ? "bg-slate-900 text-white shadow-xs scale-102"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>📋</span>
              <span>Tiêu chuẩn lâm sàng ({CLINICAL_GUIDELINES.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 lg:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, tài liệu..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 rounded-full border border-slate-300 focus:border-[#00b5cc] focus:ring-2 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white shadow-2xs"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── 3. MAIN ARTICLE GRID (NutDesign 3-Column News Layout) ── */}
      <main id="articles-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 flex-1 w-full">
        
        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 scroll-reveal">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 uppercase flex items-center gap-2">
              <span>📰</span>
              <span>
                {activeCategory === "all" && "TẤT CẢ BÀI VIẾT & CÔNG TRÌNH"}
                {activeCategory === "lifestyle" && "CẨM NANG SỐNG KHỎE & DINH DƯỠNG"}
                {activeCategory === "papers" && "20 CÔNG TRÌNH NGHIÊN CỨU KHOA HỌC"}
                {activeCategory === "guidelines" && "QUY CHUẨN & TIÊU CHUẨN LÂM SÀNG"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hiển thị {filteredItems.length} kết quả {searchQuery ? `cho từ khóa "${searchQuery}"` : ""}
            </p>
          </div>

          <span className="text-xs font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 hidden sm:inline-block">
            Trang {currentPage} / {totalPages}
          </span>
        </div>

        {/* 3-Column Responsive Grid (NutDesign: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedItems.map((item) => (
              <NutArticleCard
                key={item.id}
                item={item}
                onClick={() => openArticle(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Không tìm thấy bài viết hoặc tài liệu phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Không có kết quả nào khớp với &ldquo;{searchQuery}&rdquo;. Hãy thử tìm kiếm với các từ khóa y khoa khác như 
              <strong> HbA1c, Glucose, BMI, ADA, SHAP</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-2 px-5 py-2 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs font-bold shadow-xs transition-colors"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

        {/* ── 4. NUTDESIGN CIRCLE PAGINATION COMPONENT ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6 scroll-reveal">
            {/* Previous Page Button */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-sm font-bold transition-all ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed text-slate-400 bg-slate-50"
                  : "hover:bg-slate-100 hover:border-slate-400 text-slate-700 cursor-pointer"
              }`}
              title="Trang trước"
            >
              ‹
            </button>

            {/* Page Number Circles */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-sm font-bold transition-all ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed text-slate-400 bg-slate-50"
                  : "hover:bg-slate-100 hover:border-slate-400 text-slate-700 cursor-pointer"
              }`}
              title="Trang sau"
            >
              ›
            </button>
          </div>
        )}

        {/* ── 5. 3 GOLDEN RULES INFOBOX (Plate Method, Exercise, HbA1c) ── */}
        <section className="bg-gradient-to-br from-[#edfafb] via-white to-slate-50 rounded-3xl p-6 sm:p-10 border border-[#b2eaf1] shadow-xs space-y-6 scroll-reveal">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
              Khuyến Nghị Lâm Sàng
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              3 Nguyên Tắc Vàng Ngăn Ngừa & Kiểm Soát Đái Tháo Đường
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#b2eaf1]/80 shadow-2xs hover:border-[#00b5cc] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#edfafb] text-2xl flex items-center justify-center mb-3">
                🥗
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5 uppercase">
                1. Phương Pháp Đĩa Ăn
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chia đĩa ăn làm 3 phần: 1/2 rau củ không tinh bột (bông cải, xà lách, dưa chuột); 
                1/4 đạm nạc (cá, ức gà, đậu phụ); 1/4 tinh bột hấp thu chậm (gạo lứt, yến mạch, khoai lang).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#b2eaf1]/80 shadow-2xs hover:border-[#00b5cc] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#edfafb] text-2xl flex items-center justify-center mb-3">
                🏃
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5 uppercase">
                2. Quy Tắc Vận Động 150 Phút
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tối thiểu 150 phút thể dục cường độ vừa phải mỗi tuần (30 phút/ngày, 5 ngày/tuần). 
                Đi bộ nhẹ 10-15 phút sau bữa ăn giúp giảm tức thì đỉnh đường huyết sau ăn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#b2eaf1]/80 shadow-2xs hover:border-[#00b5cc] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#edfafb] text-2xl flex items-center justify-center mb-3">
                🩸
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5 uppercase">
                3. Tầm Soát HbA1c Định Kỳ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Xét nghiệm máu kiểm tra chỉ số HbA1c 3-6 tháng/lần. 
                Giữ HbA1c dưới 5.7% là ngưỡng tối ưu bảo vệ các mạch máu nhỏ ở mắt, thận và thần kinh ngoại biên.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. DIAGNOSTIC THRESHOLDS TABLE (ADA 2024 & MOH) ── */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6 scroll-reveal">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#008299] uppercase tracking-wider">
              Cơ Sở Thẩm Định
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              Bảng Tiêu Chuẩn Phân Loại Ngưỡng Đường Huyết (Theo ADA 2024 & Bộ Y Tế)
            </h3>
            <p className="text-xs text-slate-500">
              Quy chuẩn vàng được ứng dụng xuyên suốt trong cả 2 mô hình AI của DiabeTwin
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50">
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
                  <td className="py-3.5 px-4 text-slate-600">Duy trì lối sống lành mạnh, tái khám định kỳ hàng năm.</td>
                </tr>
                <tr className="bg-amber-50/40">
                  <td className="py-3.5 px-4 font-bold text-amber-700">🟡 Tiền Đái Tháo Đường</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">5.7% - 6.4%</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">100 - 125 mg/dL (5.6 - 6.9 mmol/L)</td>
                  <td className="py-3.5 px-4 text-slate-600">Giai đoạn vàng để can thiệp dinh dưỡng, giảm 5-7% cân nặng giúp đảo ngược nguy cơ.</td>
                </tr>
                <tr className="bg-rose-50/40">
                  <td className="py-3.5 px-4 font-bold text-rose-700">🔴 Đái Tháo Đường Lâm Sàng</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 6.5%</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">≥ 126 mg/dL (≥ 7.0 mmol/L)</td>
                  <td className="py-3.5 px-4 text-slate-600">Cần được bác sĩ chuyên khoa nội tiết thăm khám trực tiếp để xây dựng phác đồ.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 7. NUTDESIGN STYLE CONSULTATION FORM ── */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Info banner */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#45c3d2]">
                  Tư Vấn Trực Tiếp
                </span>
                <h3 className="text-xl sm:text-3xl font-black uppercase">
                  NHẬN TƯ VẤN SÀNG LỌC & DINH DƯỠNG
                </h3>
                <div className="w-12 h-1 bg-[#00b5cc] rounded-full"></div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Nếu bạn có thắc mắc về kết quả xét nghiệm máu, chỉ số BMI hoặc muốn nhận hướng dẫn xây dựng thực đơn ổn định đường huyết, 
                  hãy để lại thông tin để nhóm cố vấn y khoa DiabeTwin liên hệ hỗ trợ.
                </p>

                <div className="space-y-3 pt-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📞</span>
                    <span>Hotline: 024 7301 2468 (8h00 - 18h00)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📧</span>
                    <span>Email: support@diabetwin.ai</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/60 mt-6 text-[11px] text-slate-400">
                Tuân thủ đạo đức nghiên cứu y tế & bảo mật cá nhân.
              </div>
            </div>

            {/* Right: Quick Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Đăng Ký Thành Công!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Cảm ơn <strong>{consultName}</strong>. Hệ thống đang chuyển hướng bạn đến công cụ sàng lọc nguy cơ...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 uppercase">
                      ĐIỀN THÔNG TIN ĐỂ BẮT ĐẦU
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hoàn toàn miễn phí, nhanh chóng và bảo mật
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      placeholder="Ví dụ: Trần Thị Mai"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#00b5cc] focus:ring-2 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="Ví dụ: 0987 654 321"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#00b5cc] focus:ring-2 focus:ring-[#00b5cc]/15 outline-hidden text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00b5cc]/20 transition-all cursor-pointer"
                  >
                    BẮT ĐẦU SÀNG LỌC NGUY CƠ TẠI NHÀ →
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* ── 8. SYNCHRONIZED MEDICAL CYAN FOOTER ── */}
      <Footer />

      {/* ── FLOATING ACTION WIDGETS ── */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-2.5">
        <a
          href="tel:02473012468"
          title="Hotline hỗ trợ"
          className="w-12 h-12 rounded-full bg-[#00b5cc] hover:bg-[#0099ad] text-white flex items-center justify-center shadow-lg shadow-[#00b5cc]/35 hover:scale-110 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>

        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Cuộn lên đầu trang"
            className="w-12 h-12 rounded-full bg-[#008299] hover:bg-[#006e80] text-white flex items-center justify-center shadow-lg shadow-[#008299]/35 hover:scale-110 transition-all duration-300 backdrop-blur-xs animate-fadeIn border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* ── ARTICLE READER MODAL ── */}
      <ArticleReaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle}
      />
    </div>
  );
}

// ─── NUT ARTICLE CARD (Exact Nutdesign 16:9 Aspect Ratio & Zoom Transition) ──

function NutArticleCard({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer flex flex-col justify-between space-y-3.5 transition-all duration-300 scroll-reveal"
    >
      <div>
        {/* 16:9 Widescreen Image Container with NutDesign Scale Zoom */}
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-2xs">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />

          {/* Impact Badge */}
          {item.impact && (
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
              item.impact === "Very High"
                ? "bg-rose-500 text-white"
                : "bg-slate-900 text-white"
            }`}>
              {item.impact} Impact
            </span>
          )}

          {/* Category Tag (Top-left) */}
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
            {item.category}
          </span>
        </div>

        {/* Article Meta & Title */}
        <div className="pt-2 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-[#0099ad]">
              {item.type === "lifestyle" ? "Cẩm nang sống khỏe" : item.type === "paper" ? "Nghiên cứu khoa học" : "Tiêu chuẩn lâm sàng"}
            </span>
            <span>{item.timeOrYear}</span>
          </div>

          {/* 2-line clamped title (NutDesign style) */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#00b5cc] transition-colors duration-200">
            {item.title}
          </h3>

          {item.authorOrJournal && (
            <p className="text-xs text-slate-400 italic line-clamp-1">
              {item.authorOrJournal}
            </p>
          )}

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed pt-0.5">
            {item.summary}
          </p>
        </div>
      </div>

      {/* Read link */}
      <div className="pt-1 flex items-center gap-1 text-xs font-bold text-[#0099ad] group-hover:text-[#007b8b] group-hover:translate-x-1 transition-all">
        <span>Đọc chi tiết</span>
        <span>→</span>
      </div>
    </article>
  );
}
