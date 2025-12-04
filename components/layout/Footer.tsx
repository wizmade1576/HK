import Link from "next/link";

const quickLinks = [
  { label: "이용약관", href: "#terms" },
  { label: "개인정보 처리방침", href: "#privacy" },
  { label: "고객센터", href: "#support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>HK | 단기임대 플랫폼</p>
        <div className="flex flex-wrap gap-4">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#052A49]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
