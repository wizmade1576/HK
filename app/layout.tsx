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

          <main className="flex-1">
            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
