'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (!mounted) return false;
    return pathname === path;
  };

  const navItems = [
    {
      href: '/',
      label: 'Trang chủ',
      subtitle: 'Tổng quan hệ thống',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: '/user-prediction',
      label: 'Đánh giá tại nhà',
      subtitle: 'Sàng lọc cá nhân',
      badge: 'Cá nhân',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      href: '/doctor',
      label: 'Cổng Bác sĩ',
      subtitle: 'Chẩn đoán lâm sàng',
      badge: 'Chuyên gia',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      href: '/about',
      label: 'Cẩm nang & Nghiên cứu',
      subtitle: 'Mô hình AI & Dữ liệu',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Bar - BookingCare style */}
      <div className="bg-[#edfafb] border-b border-[#d4f2f6] text-xs text-slate-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#00b5cc] text-white text-[10px] font-bold">✓</span>
            <span className="font-medium text-slate-700">Nền tảng Y tế Chăm sóc Sức khỏe Toàn diện</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#0099ad] font-semibold">Công nghệ AI Chẩn đoán Nguy cơ Tiểu đường</span>
          </div>
          <div className="flex items-center gap-5 text-slate-600">
            <a href="tel:02473012468" className="flex items-center gap-1.5 hover:text-[#00b5cc] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#00b5cc]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
              </svg>
              <span>Hotline: <strong className="text-slate-800">024 7301 2468</strong></span>
            </a>
            <span className="text-slate-300">|</span>
            <Link href="/about" className="hover:text-[#00b5cc] transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-[#ffba00]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>Hỗ trợ & Hướng dẫn</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo - BookingCare Medical Branding */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#00b5cc] to-[#0891b2] p-0.5 shadow-sm group-hover:shadow-md transition-all">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Medical Cross Graphic */}
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <div className="absolute w-5 h-2 bg-[#00b5cc] rounded-xs"></div>
                  <div className="absolute w-2 h-5 bg-[#00b5cc] rounded-xs"></div>
                  <div className="absolute w-1.5 h-1.5 bg-[#ffba00] rounded-full z-10"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#00b5cc] transition-colors">
                  Diabe<span className="text-[#00b5cc]">Twin</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ffba00]/20 text-[#b47d00] border border-[#ffba00]/30 hidden sm:inline-block">
                  AI Y TẾ
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide uppercase hidden sm:block">
                Hệ thống chẩn đoán tiểu đường
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex flex-col items-start ${
                    active
                      ? 'bg-[#edfafb] text-[#0099ad] shadow-xs border border-[#c6f1f6]'
                      : 'text-slate-700 hover:text-[#0099ad] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={active ? 'text-[#00b5cc]' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        item.badge === 'Chuyên gia' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-normal text-slate-400 pl-5.5 hidden xl:block">
                    {item.subtitle}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Buttons - BookingCare style */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/user-prediction"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#ffba00] hover:bg-[#e6a800] text-slate-900 shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Kiểm tra Nguy cơ</span>
            </Link>

            <Link
              href="/doctor"
              className="hidden sm:inline-flex px-3.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white border border-slate-200 hover:border-[#00b5cc] text-slate-700 hover:text-[#0099ad] hover:bg-[#edfafb] transition-all items-center gap-1.5 shadow-xs"
            >
              <span>Cổng Bác sĩ</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-all ${
                  active
                    ? 'bg-[#edfafb] text-[#0099ad] font-bold border border-[#c6f1f6]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={active ? 'text-[#00b5cc]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <div>
                    <p>{item.label}</p>
                    <p className="text-xs text-slate-400 font-normal">{item.subtitle}</p>
                  </div>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#ffba00]/20 text-[#b47d00]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:02473012468"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200"
            >
              <svg className="w-4 h-4 text-[#00b5cc]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
              </svg>
              <span>Hotline hỗ trợ: <strong>024 7301 2468</strong></span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
