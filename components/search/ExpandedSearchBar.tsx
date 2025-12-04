"use client";

import { useState } from "react";
import SearchOverlay from "./SearchOverlay";
import SearchDestination from "./SearchDestination";
import SearchCalendar from "./SearchCalendar";
import SearchGuests from "./SearchGuests";
import { useSearchStore } from "./useSearchStore";

type SearchStep = "destination" | "date" | "guest";

const tabs: Array<{ key: SearchStep; label: string }> = [
  { key: "destination", label: "여행지" },
  { key: "date", label: "날짜" },
  { key: "guest", label: "게스트" },
];

type ExpandedSearchBarProps = {
  onOpen: () => void;
  onSearch: () => void;
};

export default function ExpandedSearchBar({ onOpen, onSearch }: ExpandedSearchBarProps) {
  const { destination, checkIn, checkOut, guests } = useSearchStore();
  const [activeTab, setActiveTab] = useState<SearchStep>("destination");
  const [open, setOpen] = useState(false);

  const totalGuests = guests.adults + guests.kids + guests.infants + guests.pets;

  const overlayContent = () => {
    if (activeTab === "destination") {
      return <SearchDestination value={destination} onChange={(value) => useSearchStore.getState().setDestination(value)} />;
    }
    if (activeTab === "date") {
      return (
        <SearchCalendar
          selectedStart={checkIn}
          selectedEnd={checkOut}
          onSelect={(date) => {
            if (!checkIn || (checkIn && checkOut)) {
              useSearchStore.getState().setCheckIn(date);
              useSearchStore.getState().setCheckOut("");
            } else if (date > checkIn) {
              useSearchStore.getState().setCheckOut(date);
            } else {
              useSearchStore.getState().setCheckIn(date);
            }
          }}
        />
      );
    }
    return (
      <SearchGuests
        guests={guests}
        adjustGuest={(key, delta) => useSearchStore.getState().adjustGuest(key, delta)}
      />
    );
  };

  return (
    <div className="rounded-[40px] border border-transparent bg-white p-6 shadow-[0_30px_60px_rgba(255,56,92,0.1)] transition duration-500">
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setActiveTab(tab.key);
              setOpen(true);
            }}
            className={`flex-1 min-w-[150px] rounded-2xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.4em] transition ${
              activeTab === tab.key
                ? "border-[#FF385C] bg-[#FF385C]/10 text-[#FF385C]"
                : "border-slate-200 bg-white text-[var(--text-muted)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            onOpen();
          }}
          className="rounded-full bg-[#FF385C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg transition hover:bg-[#f1465c]"
        >
          검색
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        <span>{destination || "여행지 추가"}</span>
        <span>
          {checkIn || "날짜"} ~ {checkOut || "날짜"}
        </span>
        <span>게스트 {totalGuests}명</span>
      </div>
      <SearchOverlay open={open} onClose={() => setOpen(false)}>
        {overlayContent()}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={() => {
              onSearch();
              setOpen(false);
            }}
            className="rounded-full bg-[#FF385C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg"
          >
            검색
          </button>
        </div>
      </SearchOverlay>
    </div>
  );
}
