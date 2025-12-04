"use client";

import type { Room, RoomType } from "@/lib/mock-data";

export type RoomFilters = {
  selectedTypes: RoomType[];
  depositRange: {
    min: number;
    max: number;
  };
  weeklyRange: {
    min: number;
    max: number;
  };
  options: Room["options"];
};

type RoomFilterProps = {
  filters: RoomFilters;
};

const optionList: { key: keyof Room["options"]; label: string }[] = [
  { key: "parking", label: "주차" },
  { key: "pet", label: "애완동물" },
  { key: "elevator", label: "엘리베이터" },
  { key: "aircon", label: "에어컨" },
  { key: "washer", label: "세탁기" },
  { key: "wifi", label: "와이파이" },
];

export default function RoomFilter({ filters }: RoomFilterProps) {
  const chips = [
    ...filters.selectedTypes,
    ...optionList
      .filter((option) => filters.options[option.key])
      .map((option) => option.label),
  ];

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
