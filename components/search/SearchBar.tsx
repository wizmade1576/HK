"use client";

import { useState } from "react";
import SearchOverlay from "./SearchOverlay";
import SearchDestination from "./SearchDestination";
import SearchCalendar from "./SearchCalendar";
import SearchGuests from "./SearchGuests";

type SearchStep = "destination" | "date" | "guest";

const tabs: Array<{ key: SearchStep; label: string }> = [
  { key: "destination", label: "여행지" },
  { key: "date", label: "날짜" },
  { key: "guest", label: "게스트" },
];

type GuestState = {
  adults: number;
  kids: number;
  infants: number;
  pets: number;
};

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState<SearchStep>("destination");
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<GuestState>({
    adults: 1,
    kids: 0,
    infants: 0,
    pets: 0,
  });

  const totalGuests = guests.adults + guests.kids + guests.infants + guests.pets;

  const overlayContent = () => {
    if (activeTab === "destination") {
      return <SearchDestination value={destination} onChange={setDestination} />;
    }
    if (activeTab === "date") {
      return (
        <SearchCalendar
          selectedStart={checkIn}
          selectedEnd={checkOut}
          onSelect={(date) => {
            if (!checkIn || (checkIn && checkOut)) {
              setCheckIn(date);
              setCheckOut("");
            } else if (date > checkIn) {
              setCheckOut(date);
            } else {
              setCheckIn(date);
            }
          }}
        />
      );
    }
    if (activeTab === "guest") {
      return (
        <SearchGuests
          guests={guests}
          adjustGuest={(key, delta) =>
            setGuests((prev) => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }))
          }
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="relative sticky top-4 z-50 mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-xl shadow-black/5 transition-all">
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setOpen(true);
              }}
              className={`flex-1 min-w-[110px] rounded-full border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] transition ${
                activeTab === tab.key
                  ? "border-[#FF385C] bg-[#FF385C]/10 text-[#FF385C]"
                  : "border-transparent bg-white text-[var(--text-muted)] hover:border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-[var(--text-muted)]">
          <span>{destination || "여행지 추가"}</span>
          <span>
            {checkIn || "날짜"} ~ {checkOut || "날짜"}
          </span>
          <span>{totalGuests}명</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full bg-[#FF385C] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#f1465c]"
          >
            검색
          </button>
        </div>
        {open && (
          <SearchOverlay open={open} onClose={() => setOpen(false)}>
            {overlayContent()}
          </SearchOverlay>
        )}
      </div>
    </>
  );
}
