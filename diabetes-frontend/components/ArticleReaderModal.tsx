'use client';

import React, { useEffect } from 'react';

export interface ArticleData {
  id: string;
  title: string;
  authors?: string;
  organization?: string;
  journal?: string;
  year?: number | string;
  impact?: string;
  category: string;
  image: string;
  readTime?: string;
  summary: string;
  content?: string;
  keyTakeaways?: string[];
  clinicalApplication?: string;
  link?: string;
  tags?: string[];
}

interface ArticleReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ArticleData | null;
}

export function ArticleReaderModal({ isOpen, onClose, article }: ArticleReaderModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Overlay click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 z-10">
        
        {/* Cover Image Header */}
        <div className="relative w-full h-48 sm:h-56 bg-slate-100 flex-shrink-0 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/95 text-[#008299] text-xs font-bold shadow-xs">
              {article.category}
            </span>
            {article.impact && (
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs ${
                article.impact === 'Very High'
                  ? 'bg-rose-500 text-white'
                  : 'bg-[#00b5cc] text-white'
              }`}>
                {article.impact} Impact
              </span>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-colors"
            aria-label="Đóng"
          >
            ✕
          </button>

          {/* Read time on image */}
          {article.readTime && (
            <div className="absolute bottom-3 left-4 text-xs font-semibold text-white/90 flex items-center gap-1.5">
              <span>⏱️ Thời gian đọc: {article.readTime}</span>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-5 flex-1">
          {/* Title */}
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
              {article.title}
            </h2>
            {(article.authors || article.organization) && (
              <p className="text-xs sm:text-sm text-slate-500 italic">
                {article.authors || article.organization} {article.journal ? `• ${article.journal}` : ''} {article.year ? `(${article.year})` : ''}
              </p>
            )}
          </div>

          {/* Summary / Abstract Box */}
          <div className="bg-[#edfafb] rounded-2xl p-4 sm:p-5 border border-[#b2eaf1]/80">
            <h3 className="text-xs font-bold text-[#008299] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>📋</span> Tóm Tắt Nội Dung Nghiên Cứu
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {article.summary}
            </p>
          </div>

          {/* Full content if present */}
          {article.content && (
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{article.content}</p>
            </div>
          )}

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                <span>💡</span> Điểm Nhấn Lâm Sàng & Thực Tiễn
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {article.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00b5cc] font-bold text-sm mt-0.5">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DiabeTwin Clinical Application */}
          {article.clinicalApplication && (
            <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100">
              <h3 className="text-xs sm:text-sm font-bold text-purple-900 mb-1.5 flex items-center gap-1.5">
                <span>🤖</span> Ý Nghĩa Ứng Dụng Trong DiabeTwin
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {article.clinicalApplication}
              </p>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            🛡️ Dữ liệu nghiên cứu y khoa chính thống & chuẩn quốc tế
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Đóng
            </button>
            {article.link && (
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white text-xs font-bold shadow-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Xem tài liệu gốc</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
