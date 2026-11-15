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

  return (
    <header className="sticky top-0 z-50 bg-[#eaf7f9] border-b border-[#daf0f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          
          {/* Left: Hamburger + Logo (Soft BookingCare Style) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/40 transition-colors focus:outline-hidden"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>

            {/* Logo: BookingCare circular emblem + yellow text */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 relative flex items-center justify-center flex-shrink-0">
                {/* Cyan open circle with plus in center (BookingCare style) */}
                <svg className="w-full h-full text-[#00b5cc]" viewBox="0 0 36 36" fill="currentColor">
                  {/* Outer circle with smooth notch */}
                  <path d="M18 2a16 16 0 1016 16A16 16 0 0018 2zm0 28a12 12 0 1112-12 12 12 0 01-12 12z" fill="#00b5cc" />
                  {/* Center Medical Plus */}
                  <path d="M18 10a2 2 0 012 2v4h4a2 2 0 010 4h-4v4a2 2 0 01-4 0v-4h-4a2 2 0 010-4h4v-4a2 2 0 012-2z" fill="#00b5cc" />
                </svg>
              </div>

              {/* Brand Name: Warm Golden Yellow, Soft Sans-serif */}
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#fbb03b] group-hover:text-[#e59e2b] transition-colors select-none font-sans">
                DiabeTwin
              </span>
            </Link>
          </div>

          {/* Middle: Navigation Pills (Tất cả, Tại nhà, Tại viện, Sống khỏe) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-[#fbb03b] text-white px-4 py-1.5 rounded-full shadow-xs hover:bg-[#e59e2b]'
                  : 'text-slate-800 hover:text-[#00b5cc]'
              }`}
            >
              Tất cả
            </Link>

            <Link
              href="/user-prediction"
              className={`text-sm font-semibold transition-all ${
                isActive('/user-prediction')
                  ? 'bg-[#fbb03b] text-white px-4 py-1.5 rounded-full shadow-xs hover:bg-[#e59e2b]'
                  : 'text-slate-800 hover:text-[#00b5cc]'
              }`}
            >
              Tại nhà
            </Link>

            <Link
              href="/doctor"
              className={`text-sm font-semibold transition-all ${
                isActive('/doctor')
                  ? 'bg-[#fbb03b] text-white px-4 py-1.5 rounded-full shadow-xs hover:bg-[#e59e2b]'
                  : 'text-slate-800 hover:text-[#00b5cc]'
              }`}
            >
              Tại viện
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-all ${
                isActive('/about')
                  ? 'bg-[#fbb03b] text-white px-4 py-1.5 rounded-full shadow-xs hover:bg-[#e59e2b]'
                  : 'text-slate-800 hover:text-[#00b5cc]'
              }`}
            >
              Sống khỏe
            </Link>
          </nav>

          {/* Right: Hợp tác & Lịch hẹn (Cyan Icons with text below) */}
          <div className="flex items-center gap-5 sm:gap-6">
            <Link
              href="/about"
              className="flex flex-col items-center group text-[#00b5cc] hover:text-[#0099ad] transition-colors"
            >
              {/* Handshake icon */}
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.78 8.44a2.5 2.5 0 00-3.53 0l-1.07 1.07-2.12-2.12a2.5 2.5 0 00-3.54 0L7.4 9.5a1 1 0 000 1.41l5.66 5.66a1 1 0 001.41 0l2.12-2.12 1.07 1.06a2.5 2.5 0 003.53-3.53l-1.41-1.41 1.41-1.41a2.5 2.5 0 000-3.54zM2 18.5a1.5 1.5 0 001.5 1.5h4.17l3.8-3.8-2.83-2.83-4.5 4.5A1.49 1.49 0 002 18.5zm20 0a1.5 1.5 0 01-1.5 1.5h-4.17l-3.8-3.8 2.83-2.83 4.5 4.5c.38.38.64.9.64 1.43z" />
              </svg>
              <span className="text-[11px] font-medium mt-0.5">Hợp tác</span>
            </Link>

            <Link
              href="/user-prediction"
              className="flex flex-col items-center group text-[#00b5cc] hover:text-[#0099ad] transition-colors"
            >
              {/* Clock / Appointment icon */}
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm.75-13h-1.5v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span className="text-[11px] font-medium mt-0.5">Lịch hẹn</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200/80 px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/') ? 'bg-[#fbb03b] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Tất cả (Trang chủ)
          </Link>
          <Link
            href="/user-prediction"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/user-prediction') ? 'bg-[#fbb03b] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Tại nhà (Sàng lọc nguy cơ cá nhân)
          </Link>
          <Link
            href="/doctor"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/doctor') ? 'bg-[#fbb03b] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Tại viện (Cổng Bác sĩ lâm sàng)
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/about') ? 'bg-[#fbb03b] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Sống khỏe (Cẩm nang & Nghiên cứu)
          </Link>
        </div>
      )}
    </header>
  );
}
