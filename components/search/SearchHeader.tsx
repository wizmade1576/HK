"use client";

"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import ExpandedSearchBar from "./ExpandedSearchBar";
import CompactSearchBar from "./CompactSearchBar";
import useScrollThreshold from "@/hooks/useScrollThreshold";
import { useSearchStore } from "./useSearchStore";

export default function SearchHeader() {
  const isScrolled = useScrollThreshold(50);
  const router = useRouter();
  const { destination, checkIn, checkOut, guests } = useSearchStore();

  const summary = useMemo(() => {
    const params = new URLSearchParams();
    if (destination) params.set("city", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    const guestCount = guests.adults + guests.kids + guests.infants + guests.pets;
    if (guestCount) params.set("guests", guestCount.toString());
    return params.toString();
  }, [destination, checkIn, checkOut, guests]);

  const handleSearch = () => {
    const query = summary.length ? `?${summary}` : "";
    router.push(`/search${query}`);
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          "transition-all duration-500",
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <ExpandedSearchBar onOpen={() => {}} onSearch={handleSearch} />
      </div>
      <div
        className={clsx(
          "fixed left-0 right-0 top-0 z-50 mx-auto flex w-full justify-center px-4 py-3 transition-all duration-500",
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
      >
        <CompactSearchBar onOpen={() => {}} onSearch={handleSearch} />
      </div>
    </div>
  );
}
