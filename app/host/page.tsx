"use client";

import HostSummaryCards from "@/components/HostSummaryCards";
import Link from "next/link";
import { MOCK_ROOMS } from "@/lib/mock-data";

export default function HostPage() {
  const summaryItems = [
    {
      title: "등록한 매물",
      value: `${MOCK_ROOMS.length}개`,
      subtitle: "HK에서 한 번에 관리",
    },
    {
      title: "이번 달 예약",
      value: "14건",
      subtitle: "예상 2.4백만원",
    },
    {
      title: "예상 정산",
      value: "3,120,000원",
      subtitle: "수수료 포함 예상액",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">호스트 센터</p>
          <h1 className="text-3xl font-semibold text-[#052A49]">HK 호스트 대시보드</h1>
          <p className="text-sm text-[var(--text-muted)]">
            매물 등록부터 예약 관리까지 하나의 공간에서 확인하세요.
          </p>
        </div>
        <HostSummaryCards items={summaryItems} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/host/listings"
          className="rounded-3xl border border-slate-200 bg-white/90 p-5 font-semibold text-[#052A49] transition hover:border-[#34D1BF] hover:text-[#34D1BF]"
        >
          내 매물 관리하기
        </Link>
        <Link
          href="/host/listings/new"
          className="rounded-3xl border border-slate-200 bg-white/90 p-5 font-semibold text-[#052A49] transition hover:border-[#34D1BF] hover:text-[#34D1BF]"
        >
          새 매물 등록
        </Link>
        <Link
          href="/host/reservations"
          className="rounded-3xl border border-slate-200 bg-white/90 p-5 font-semibold text-[#052A49] transition hover:border-[#34D1BF] hover:text-[#34D1BF]"
        >
          예약 관리
        </Link>
      </section>
    </div>
  );
}
