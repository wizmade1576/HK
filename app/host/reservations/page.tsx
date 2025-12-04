"use client";

import ReservationTable, { type ReservationRecord, type ReservationStatus } from "@/components/ReservationTable";
import { useState } from "react";

const dummyReservations: ReservationRecord[] = [
  {
    id: "RST-001",
    roomTitle: "강남 뷰티풀 스튜디오",
    guestName: "김지수",
    startDate: "2025-12-10",
    endDate: "2025-12-24",
    status: "요청",
  },
  {
    id: "RST-002",
    roomTitle: "홍대 감성 레지던스",
    guestName: "박현우",
    startDate: "2025-12-05",
    endDate: "2025-12-20",
    status: "확정",
  },
  {
    id: "RST-003",
    roomTitle: "해운대 오션뷰 오피스텔",
    guestName: "조민정",
    startDate: "2025-11-20",
    endDate: "2025-12-05",
    status: "입주중",
  },
  {
    id: "RST-004",
    roomTitle: "성수 플렉스 스테이",
    guestName: "윤서현",
    startDate: "2025-11-01",
    endDate: "2025-11-22",
    status: "완료",
  },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationRecord[]>(dummyReservations);

  const handleUpdate = (id: string, nextStatus: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status: nextStatus } : reservation
      )
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#052A49]">예약 관리</h1>
        <p className="text-sm text-[var(--text-muted)]">
          요청부터 입주까지 모든 내역을 실시간으로 확인하고 상태를 조절하세요.
        </p>
      </section>

      <ReservationTable reservations={reservations} onUpdateStatus={handleUpdate} />
    </div>
  );
}
