import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "HK | 단기임대 플랫폼",
  description:
    "HK short-term stay platform for short-term rentals and monthly living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-dark)] antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />

          {/* ★★★ 풀와이드로 변경하는 가장 중요한 부분 ★★★ */}
          <main className="flex-1">
            <div className="flex w-full flex-col gap-6 px-8 py-6">
              {children}
            </div>
          </main>
          {/* ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ */}

          <Footer />
        </div>
      </body>
    </html>
  );
}
