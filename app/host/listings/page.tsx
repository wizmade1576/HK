"use client";

import Image from "next/image";
import RoomOptionBadges from "@/components/RoomOptionBadges";
import { MOCK_ROOMS } from "@/lib/mock-data";

const hostRooms = MOCK_ROOMS.slice(0, 6);

export default function HostListingsPage() {
  const handleAction = (type: string, title: string) => {
    window.alert(`${title} - ${type} 버튼 클릭`);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#052A49]">내 매물 목록</h1>
        <p className="text-sm text-[var(--text-muted)]">
          등록된 공간을 빠르게 확인하고 관리하세요.
        </p>
      </section>

      <div className="grid gap-4">
        {hostRooms.map((room) => (
          <div
            key={room.id}
            className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm sm:grid-cols-[0.9fr_0.4fr]"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={room.thumbnail}
                    alt={room.title}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#052A49]">
                    {room.title}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {room.city} · {room.district}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)]">
                {room.shortDescription}
              </p>
              <RoomOptionBadges options={room.options} />
            </div>

            <div className="flex flex-col justify-between gap-3">
              <div className="text-sm text-[var(--text-muted)]">
                <p>
                  보증금 {new Intl.NumberFormat("ko-KR").format(room.deposit)}원
                </p>
                <p>
                  주 {new Intl.NumberFormat("ko-KR").format(room.weeklyPrice)}원
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["편집", "상세 보기", "비활성화"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleAction(label, room.title)}
                    className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] transition hover:border-[#34D1BF] hover:text-[#052A49]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
