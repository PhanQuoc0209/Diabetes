'use client';

import { useEffect, useState } from 'react';
import { RiskGaugeChart } from './charts/RiskGaugeChart';
import { FeatureImpactChart } from './charts/FeatureImpactChart';
import { RecommendationsPanel } from './cards/RecommendationsPanel';
import { FactorsOverview } from './cards/FactorsOverview';

interface EnhancedResultsDisplayProps {
  results: {
    probability: number;
    conclusion: string;
    riskLevel: 'low' | 'medium' | 'high';
    impacts: Array<{ feature: string; impact: number }>;
    aiAdvice: string;
  };
  onReset: () => void;
  isDoctorMode?: boolean;
}

export function EnhancedResultsDisplay({
  results,
  onReset,
  isDoctorMode = false,
}: EnhancedResultsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return {
          emoji: '⚠️',
          text: 'Nguy cơ Cao (High Risk)',
          sub: 'Cần thăm khám chuyên khoa nội tiết và xét nghiệm khẳng định',
          theme: 'bg-red-50 border-red-200 text-red-800',
          badge: 'bg-red-600 text-white',
          percentColor: 'text-red-600',
        };
      case 'medium':
        return {
          emoji: '⚡',
          text: 'Tiền Tiểu Đường (Moderate Risk)',
          sub: 'Nguy cơ trung bình - Cần chủ động điều chỉnh dinh dưỡng và vận động',
          theme: 'bg-amber-50/80 border-amber-200 text-amber-900',
          badge: 'bg-[#ffba00] text-slate-900',
          percentColor: 'text-amber-600',
        };
      default:
        return {
          emoji: '✅',
          text: 'Nguy cơ Thấp (Low Risk)',
          sub: 'Chỉ số bình thường - Tiếp tục duy trì lối sống lành mạnh',
          theme: 'bg-[#edfafb] border-[#b2eaf1] text-[#008299]',
          badge: 'bg-[#00b5cc] text-white',
          percentColor: 'text-[#008299]',
        };
    }
  };

  const riskInfo = getRiskBadge(results.riskLevel);

  const topImpacts = [...results.impacts]
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 8);

  const isPositive = results.conclusion.toUpperCase().includes('POSITIVE') || results.conclusion.toUpperCase().includes('DƯƠNG TÍNH');

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Top Banner - BookingCare Medical Result Card */}
      <div className="mb-8">
        <div className={`rounded-2xl border p-6 sm:p-8 shadow-xs ${riskInfo.theme}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{riskInfo.emoji}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${riskInfo.badge}`}>
                  {riskInfo.text}
                </span>
                {isDoctorMode && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white">
                    👨‍⚕️ Lâm sàng
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Kết Quả Đánh Giá Nguy Cơ Tiểu Đường
              </h2>
              <p className="text-xs sm:text-sm mt-1.5 opacity-90 font-medium">
                {riskInfo.sub}
              </p>
            </div>

            {/* Probability Metric Pill */}
            <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/80 shadow-xs text-center min-w-[140px] self-stretch sm:self-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Xác Suất Nguy Cơ
              </span>
              <span className={`text-3xl sm:text-4xl font-black tracking-tight ${riskInfo.percentColor}`}>
                {(results.probability * 100).toFixed(1)}%
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Mô hình AI dự đoán
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
        
        {/* Left Column: Gauge & Conclusion */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-6 text-center uppercase tracking-wider">
              Thang Đo Nguy Cơ (Risk Gauge)
            </h3>
            <RiskGaugeChart probability={results.probability} riskLevel={results.riskLevel} />
          </div>

          <FactorsOverview impacts={results.impacts} />

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
              Kết Luận Sàng Lọc
            </h3>
            <div
              className={`text-center py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base border ${
                isPositive
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isPositive ? '🔴 DƯƠNG TÍNH (CÓ NGUY CƠ)' : '🟢 ÂM TÍNH (AN TOÀN)'}
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              {isPositive
                ? 'Chỉ số phân tích ghi nhận các dấu hiệu bất thường liên quan đến chuyển hóa đường. Khuyến nghị thực hiện xét nghiệm định lượng HbA1c tại bệnh viện.'
                : 'Chỉ số hiện tại nằm trong giới hạn kiểm soát tốt. Nên duy trì chế độ dinh dưỡng cân bằng và kiểm tra lại sau 6-12 tháng.'}
            </p>
          </div>
        </div>

        {/* Middle Column: SHAP Feature Impact Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Phân Tích Tác Động SHAP
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-[#008299] border border-cyan-100">
                Explainable AI
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Đóng góp của từng đặc trưng vào nguy cơ: <span className="text-red-600 font-semibold">Màu đỏ</span> làm tăng nguy cơ, <span className="text-emerald-600 font-semibold">màu xanh</span> là yếu tố bảo vệ.
            </p>
            <div className="space-y-1">
              <FeatureImpactChart impacts={topImpacts} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Thuật toán SHAP (SHapley Additive exPlanations) tính toán dựa trên tập dữ liệu lâm sàng y tế.
          </div>
        </div>

        {/* Right Column: AI Recommendations Panel */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <RecommendationsPanel aiAdvice={results.aiAdvice} isDoctorMode={isDoctorMode} />
        </div>

      </div>

      {/* Action Buttons - BookingCare style */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-slate-200 hover:border-[#00b5cc] transition-all shadow-xs flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          <span>Thực Hiện Đánh Giá Mới</span>
        </button>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00b5cc] hover:bg-[#0099ad] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>🖨️</span>
          <span>In / Lưu Báo Cáo Y Tế</span>
        </button>
      </div>
    </div>
  );
}
