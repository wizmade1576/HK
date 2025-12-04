"use client";

import { useMemo } from "react";

type SearchCalendarProps = {
  selectedStart: string;
  selectedEnd: string;
  onSelect: (date: string) => void;
};

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const generateCalendar = (monthOffset: number) => {
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const total = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
  const startWeekday = baseDate.getDay();
  const label = `${baseDate.getFullYear()}년 ${baseDate.toLocaleString("ko-KR", {
    month: "long",
  })}`;

  const cells: Array<{ key: number; date: string | null }> = [];
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ key: cells.length, date: null });
  }
  for (let day = 1; day <= total; day += 1) {
    const date = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
    cells.push({ key: cells.length, date: date.toISOString().split("T")[0] });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: cells.length, date: null });
  }

  return { label, cells };
};

const inRange = (date: string, start?: string, end?: string) => {
  if (!start || !end) return false;
  return start < date && date < end;
};

export default function SearchCalendar({ selectedStart, selectedEnd, onSelect }: SearchCalendarProps) {
  const calendars = useMemo(() => [generateCalendar(0), generateCalendar(1)], []);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {calendars.map((calendar) => (
        <div key={calendar.label} className="space-y-3 rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#052A49]">{calendar.label}</h3>
            <span className="text-xs text-[var(--text-muted)]">월 단위</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[var(--text-muted)]">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendar.cells.map((cell) =>
              cell.date ? (
                <button
                  key={cell.key}
                  type="button"
                  onClick={() => onSelect(cell.date!)}
                  className={`aspect-square rounded-2xl text-sm transition ${
                    cell.date === selectedStart || cell.date === selectedEnd
                      ? "bg-[#FF385C] text-white"
                      : inRange(cell.date, selectedStart, selectedEnd)
                      ? "bg-[#FF385C]/20 text-[#FF385C]"
                      : "bg-white text-[var(--text-dark)]"
                  }`}
                >
                  {Number(cell.date.split("-")[2])}
                </button>
              ) : (
                <div key={cell.key} className="aspect-square" />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
