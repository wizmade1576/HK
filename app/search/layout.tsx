"use client";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-surface)]">
      {/* 검색 페이지는 Header/Footer 제거하여 Airbnb와 동일하게 */}
      {children}
    </div>
  );
}
