"use client";

import type { Room } from "@/lib/mock-data";

const optionLabels: Record<keyof Room["options"], string> = {
  parking: "주차",
  pet: "애완동물",
  elevator: "엘리베이터",
  aircon: "에어컨",
  washer: "세탁기",
  wifi: "와이파이",
};

type RoomOptionBadgesProps = {
  options: Room["options"];
  limit?: number;
};

export default function RoomOptionBadges({ options, limit = 3 }: RoomOptionBadgesProps) {
  const available = (Object.keys(optionLabels) as Array<keyof Room["options"]>).filter(
    (optionKey) => Boolean(options[optionKey])
  );

  if (!available.length) {
    return null;
  }

  const displayed = available.slice(0, limit);
  const overflowCount = available.length - displayed.length;

  return (
    <div className="flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
      {displayed.map((optionKey) => (
        <span
          key={optionKey}
          className="rounded-full border border-slate-200 px-2 py-1 font-semibold uppercase tracking-wide text-[10px]"
        >
          {optionLabels[optionKey]}
        </span>
      ))}
      {overflowCount > 0 && (
        <span className="rounded-full border border-slate-200 px-2 py-1 font-semibold uppercase tracking-wide text-[10px] text-[#FF385C]">
          +{overflowCount} 더보기
        </span>
      )}
    </div>
  );
}
