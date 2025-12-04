 "use client";

import type { GuestCounts } from "./useSearchStore";

const guestDefinitions: Array<{ key: keyof GuestCounts; label: string; helper: string }> = [
  { key: "adults", label: "성인", helper: "만 13세 이상" },
  { key: "kids", label: "어린이", helper: "만 2~12세" },
  { key: "infants", label: "유아", helper: "만 0~2세 (무릎)" },
  { key: "pets", label: "반려동물", helper: "반려동물 동반 선택" },
];

type SearchGuestsProps = {
  guests: GuestCounts;
  adjustGuest: (key: keyof GuestCounts, delta: number) => void;
};

export default function SearchGuests({ guests, adjustGuest }: SearchGuestsProps) {

  return (
    <div className="space-y-4">
      {guestDefinitions.map((definition) => (
        <div
          key={definition.key}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-[#052A49]">{definition.label}</p>
            <p className="text-xs text-[var(--text-muted)]">{definition.helper}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => adjustGuest(definition.key, -1)}
              className="h-9 w-9 rounded-full border border-slate-300 text-sm font-semibold text-[var(--text-muted)] transition hover:border-[#FF385C]"
            >
              -
            </button>
            <span className="w-8 text-center text-lg font-semibold text-[#052A49]">
              {guests[definition.key]}
            </span>
            <button
              type="button"
              onClick={() => adjustGuest(definition.key, 1)}
              className={`h-9 w-9 rounded-full border text-sm font-semibold transition ${
                guests[definition.key] > 0
                  ? "border-[#FF385C] text-[#FF385C]"
                  : "border-slate-300 text-[var(--text-muted)]"
              }`}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <p className="text-xs text-[var(--text-muted)]">반려동물을 동반하시나요?</p>
    </div>
  );
}
