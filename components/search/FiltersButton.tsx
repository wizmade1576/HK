"use client";

type FiltersButtonProps = {
  onClick: () => void;
};

export default function FiltersButton({ onClick }: FiltersButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center gap-2
        rounded-full border border-slate-200
        bg-white px-4 py-[10px]
        text-xs font-semibold uppercase tracking-[0.4em]
        text-[var(--text-muted)]
        transition hover:border-[#FF385C] hover:text-[#FF385C]
      "
    >
      필터
    </button>
  );
}
