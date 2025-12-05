"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SearchHeader from "@/components/search/SearchHeader";

const navItems = [
  { label: "숙소", href: "/" },
  { label: "방 찾기", href: "/search" },
  { label: "호스트 센터", href: "/host" },
  { label: "로그인/회원가입", href: "/login" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const showSearchBar = pathname === "/search";
  const headerHeight = showSearchBar ? "h-[110px]" : "h-[78px]";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${headerHeight} ${
        scrolled ? "shadow-xl" : "shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] flex-col justify-between px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col items-start gap-0.5">
            <span className="text-2xl font-extrabold tracking-normal text-[#FF385C]">
              HK
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              HOUSE-KEEPER
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-sm font-medium text-[var(--text-muted)] lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 transition-colors hover:text-[#FF385C]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/signup"
              className="hidden rounded-full border border-[#052A49] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#052A49] transition hover:bg-[#FF385C] hover:text-white lg:block"
            >
              호스트 되기
            </Link>

            <button
              type="button"
              className="lg:hidden rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#052A49] transition hover:bg-[#FF385C] hover:text-white"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
            >
              메뉴
            </button>
          </div>
        </div>

        {showSearchBar && (
          <div className="mt-1 px-0">
            <SearchHeader />
          </div>
        )}
      </div>

      {mobileNavOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/90 shadow-sm">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 pb-4 pt-3 text-sm text-[var(--text-muted)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-2 transition hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="rounded-2xl border border-[#052A49] px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-[#052A49] transition hover:bg-[#FF385C] hover:text-white"
            >
              호스트 되기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
