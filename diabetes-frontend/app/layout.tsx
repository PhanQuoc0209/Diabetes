import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "DiabeTwin - Nền tảng Y tế & Chẩn đoán Nguy cơ Tiểu đường AI",
  description: "Nền tảng Y tế AI chăm sóc sức khỏe toàn diện - Đánh giá và dự đoán nguy cơ tiểu đường chính xác, khoa học và tin cậy theo tiêu chuẩn y khoa.",
  keywords: "BookingCare, DiabeTwin, tiểu đường, chẩn đoán AI, nguy cơ tiểu đường, HbA1c, glucose, y tế số, bác sĩ trực tuyến",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#00b5cc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans bg-slate-50 text-slate-900 selection:bg-[#00b5cc] selection:text-white" suppressHydrationWarning>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
