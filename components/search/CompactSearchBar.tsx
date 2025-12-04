"use client";

import { useSearchStore } from "./useSearchStore";

type CompactSearchBarProps = {
  onOpen: () => void;
  onSearch: () => void;
};

export default function CompactSearchBar({ onOpen, onSearch }: CompactSearchBarProps) {
  const { destination, checkIn, checkOut, guests } = useSearchStore();
  const totalGuests = guests.adults + guests.kids + guests.infants + guests.pets;

  return (
    <div className="flex h-12 w-full items-center justify-between gap-4 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg shadow-black/15 transition-opacity duration-300">
      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
        {destination || "여행지"}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
        {checkIn && checkOut ? `${checkIn} ~ ${checkOut}` : "날짜"}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
        게스트 {totalGuests}명
      </span>
      <button
        onClick={() => {
          onOpen();
          onSearch();
        }}
        className="rounded-full bg-[#FF385C] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow"
      >
        🔎
      </button>
    </div>
  );
}
