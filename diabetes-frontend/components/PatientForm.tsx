"use client";

import { useState } from "react";

interface PatientFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: 45,
    smoking: "never",
    hypertension: false,
    heart_disease: false,
    height: 1.70, // height in meters
    weight: 70, // weight in kg
    hba1c: 5.5,
    glucose: 100
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Calculate BMI from height and weight
  const calculateBMI = (height: number, weight: number): number => {
    if (height <= 0 || weight <= 0) return 0;
    return Number((weight / (height * weight)).toFixed(1));
  };

  const currentBMI = calculateBMI(formData.height, formData.weight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors if validation passes
    setErrors([]);
    
    // Calculate BMI before submitting
    const calculatedBMI = calculateBMI(formData.height, formData.weight);
    onSubmit({
      ...formData,
      bmi: calculatedBMI
    });
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const errs: string[] = [];
    if (!formData.height || formData.height < 0.5 || formData.height > 2.5) {
      errs.push("Chiều cao hợp lệ từ 0.5m đến 2.5m");
    }
    if (!formData.weight || formData.weight < 20 || formData.weight > 300) {
      errs.push("Cân nặng hợp lệ từ 20kg đến 300kg");
    }
    if (formData.age === undefined || formData.age < 0 || formData.age > 120) {
      errs.push("Tuổi bệnh nhân từ 0 đến 120");
    }
    if (!formData.hba1c || formData.hba1c < 3 || formData.hba1c > 15) {
      errs.push("Chỉ số HbA1c từ 3% đến 15%");
    }
    if (!formData.glucose || formData.glucose < 50 || formData.glucose > 500) {
      errs.push("Đường huyết lúc đói (Glucose) từ 50 đến 500 mg/dL");
    }
    return errs;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
        
        {/* BookingCare Clinical Form Header */}
        <div className="bg-gradient-to-r from-[#00b5cc] to-[#0891b2] px-6 sm:px-8 py-6 text-white relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/30">
              🩺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold">Hồ Sơ Lâm Sàng Bệnh Nhân</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ffba00] text-slate-900">
                  Cổng Bác sĩ
                </span>
              </div>
              <p className="text-cyan-50 text-xs sm:text-sm mt-0.5">
                Nhập 8 chỉ số y sinh học để mô hình AI đối soát và phân tích tác động SHAP
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Validation Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <h4 className="text-red-800 font-bold text-sm mb-1">Vui lòng kiểm tra lại thông tin sau:</h4>
                  <ul className="space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-red-700 text-xs sm:text-sm">• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Demographic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-md bg-[#edfafb] text-[#008299] font-bold text-xs flex items-center justify-center border border-[#b2eaf1]">
                1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800">Thông Tin Nhân Khẩu Học & Thói Quen</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Giới tính (Gender)" icon="👤">
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="form-select text-sm font-medium"
                >
                  <option value="Male">Nam (Male)</option>
                  <option value="Female">Nữ (Female)</option>
                  <option value="Other">Khác (Other)</option>
                </select>
              </FormField>

              <FormField label="Tuổi (Age)" icon="🎂">
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) => updateField("age", parseInt(e.target.value) || 0)}
                  className="form-input text-sm font-medium"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>Khoảng: 0 tuổi</span>
                  <span>100+ tuổi</span>
                </div>
              </FormField>

              <FormField label="Tiền sử hút thuốc (Smoking)" icon="🚬">
                <select
                  value={formData.smoking}
                  onChange={(e) => updateField("smoking", e.target.value)}
                  className="form-select text-sm font-medium"
                >
                  <option value="never">Chưa từng hút (Never)</option>
                  <option value="former">Đã cai thuốc (Former)</option>
                  <option value="current">Đang hút (Current)</option>
                  <option value="ever">Thỉnh thoảng (Ever)</option>
                  <option value="not current">Hiện không hút (Not Current)</option>
                  <option value="No Info">Không có dữ liệu (No Info)</option>
                </select>
              </FormField>
            </div>
          </div>

          {/* Section 2: Medical History */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center border border-amber-200">
                2
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800">Tiền Sử Bệnh Lý Tim Mạch</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Tăng huyết áp (Hypertension)" icon="❤️">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateField("hypertension", false)}
                    className={`p-3 rounded-xl border font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      !formData.hypertension
                        ? "bg-[#edfafb] border-[#00b5cc] text-[#008299] shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>✓</span>
                    <span>Không (No)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField("hypertension", true)}
                    className={`p-3 rounded-xl border font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      formData.hypertension
                        ? "bg-red-50 border-red-400 text-red-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>⚠️</span>
                    <span>Có (Yes)</span>
                  </button>
                </div>
              </FormField>

              <FormField label="Bệnh tim mạch (Heart Disease)" icon="💔">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateField("heart_disease", false)}
                    className={`p-3 rounded-xl border font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      !formData.heart_disease
                        ? "bg-[#edfafb] border-[#00b5cc] text-[#008299] shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>✓</span>
                    <span>Không (No)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField("heart_disease", true)}
                    className={`p-3 rounded-xl border font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      formData.heart_disease
                        ? "bg-red-50 border-red-400 text-red-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>⚠️</span>
                    <span>Có (Yes)</span>
                  </button>
                </div>
              </FormField>
            </div>
          </div>

          {/* Section 3: Physical Measurements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">
                3
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800">Chỉ Số Thể Trọng & BMI</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Chiều cao (Height)" icon="📏">
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    max="2.5"
                    step="0.01"
                    value={formData.height}
                    onChange={(e) => updateField("height", parseFloat(e.target.value) || 0)}
                    className="form-input text-sm font-medium pr-10"
                    placeholder="1.70"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    mét
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>Ví dụ: 1.70m</span>
                  <span>(0.5m - 2.5m)</span>
                </div>
              </FormField>

              <FormField label="Cân nặng (Weight)" icon="⚖️">
                <div className="relative">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    step="0.5"
                    value={formData.weight}
                    onChange={(e) => updateField("weight", parseFloat(e.target.value) || 0)}
                    className="form-input text-sm font-medium pr-10"
                    placeholder="70"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    kg
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>Ví dụ: 68kg</span>
                  <span>(20kg - 300kg)</span>
                </div>
              </FormField>

              <FormField label="Chỉ số BMI Tự động" icon="📊">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-slate-900">{currentBMI}</span>
                    <span className="text-xs text-slate-400 ml-1">kg/m²</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    currentBMI < 18.5 ? 'bg-blue-100 text-blue-700' :
                    currentBMI < 25 ? 'bg-emerald-100 text-emerald-700' :
                    currentBMI < 30 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentBMI < 18.5 ? 'Thiếu cân' :
                     currentBMI < 25 ? 'Bình thường' :
                     currentBMI < 30 ? 'Thừa cân' :
                     'Béo phì'}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Chuẩn WHO: 18.5 - 24.9 là cân đối
                </p>
              </FormField>
            </div>
          </div>

          {/* Section 4: Clinical Tests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center border border-purple-200">
                4
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800">Xét Nghiệm Sinh Hóa (Trọng yếu)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Chỉ số HbA1c (%)" icon="🩸">
                <div className="relative">
                  <input
                    type="number"
                    min="3"
                    max="15"
                    step="0.1"
                    value={formData.hba1c}
                    onChange={(e) => updateField("hba1c", parseFloat(e.target.value) || 0)}
                    className="form-input text-sm font-medium pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    %
                  </span>
                </div>
                <div className="mt-2 p-2.5 rounded-lg border text-xs flex items-center justify-between font-medium bg-[#edfafb] border-[#b2eaf1] text-[#008299]">
                  <span>Đánh giá ngưỡng:</span>
                  <span className="font-bold">
                    {formData.hba1c < 5.7 ? "✅ < 5.7%: Bình thường" : 
                     formData.hba1c < 6.5 ? "⚠️ 5.7 - 6.4%: Tiền tiểu đường" : 
                     "🔴 ≥ 6.5%: Nguy cơ tiểu đường cao"}
                  </span>
                </div>
              </FormField>

              <FormField label="Đường huyết đói Glucose (mg/dL)" icon="🧪">
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={formData.glucose}
                    onChange={(e) => updateField("glucose", parseInt(e.target.value) || 0)}
                    className="form-input text-sm font-medium pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    mg/dL
                  </span>
                </div>
                <div className="mt-2 p-2.5 rounded-lg border text-xs flex items-center justify-between font-medium bg-amber-50/70 border-amber-200 text-amber-800">
                  <span>Đánh giá ngưỡng:</span>
                  <span className="font-bold">
                    {formData.glucose < 100 ? "✅ < 100 mg/dL: Bình thường" : 
                     formData.glucose < 126 ? "⚠️ 100 - 125: Tiền tiểu đường" : 
                     "🔴 ≥ 126 mg/dL: Tiểu đường"}
                  </span>
                </div>
              </FormField>
            </div>
          </div>

        </div>

        {/* Submit Button - BookingCare Action */}
        <div className="px-6 sm:px-8 pb-8 pt-2 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            🔒 Dữ liệu được mã hóa và xử lý theo thời gian thực bởi AI Model.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-900 bg-[#ffba00] hover:bg-[#e6a800] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                <span>AI Đang Phân Tích...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Phân Tích Nguy Cơ Lâm Sàng</span>
              </>
            )}
          </button>
        </div>

      </div>
    </form>
  );
}

function FormField({ 
  label, 
  icon, 
  children 
}: { 
  label: string; 
  icon: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="block mb-2 text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}
