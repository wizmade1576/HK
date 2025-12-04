export type ReservationStatus = "요청" | "확정" | "입주중" | "완료";

export type ReservationRecord = {
  id: string;
  roomTitle: string;
  guestName: string;
  startDate: string;
  endDate: string;
  status: ReservationStatus;
};

type ReservationTableProps = {
  reservations: ReservationRecord[];
  onUpdateStatus: (id: string, nextStatus: ReservationStatus) => void;
};

const statusActions: Record<ReservationStatus, { label: string; next: ReservationStatus }[]> = {
  요청: [
    { label: "승인", next: "확정" },
    { label: "거절", next: "완료" },
  ],
  확정: [{ label: "입주중", next: "입주중" }],
  입주중: [{ label: "완료", next: "완료" }],
  완료: [],
};

const statusColors: Record<ReservationStatus, string> = {
  요청: "bg-yellow-100 text-yellow-900",
  확정: "bg-emerald-100 text-emerald-900",
  입주중: "bg-cyan-100 text-cyan-900",
  완료: "bg-slate-100 text-slate-900",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR");
}

export default function ReservationTable({
  reservations,
  onUpdateStatus,
}: ReservationTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">
          <tr>
            <th className="px-4 py-3">매물</th>
            <th className="px-4 py-3">게스트</th>
            <th className="px-4 py-3">입주 / 퇴실</th>
            <th className="px-4 py-3">상태</th>
            <th className="px-4 py-3">액션</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-4">
                <p className="text-sm font-semibold text-[#052A49]">{reservation.roomTitle}</p>
                <p className="text-xs text-[var(--text-muted)]">ID: {reservation.id}</p>
              </td>
              <td className="px-4 py-4">
                <p className="text-sm font-semibold">{reservation.guestName}</p>
                <p className="text-xs text-[var(--text-muted)]">게스트</p>
              </td>
              <td className="px-4 py-4">
                <p className="text-sm">
                  {formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}
                </p>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusColors[reservation.status]}`}
                >
                  {reservation.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {statusActions[reservation.status].map((action) => (
                    <button
                      type="button"
                      key={action.label}
                      onClick={() => onUpdateStatus(reservation.id, action.next)}
                      className="rounded-full border border-[#34D1BF] px-3 py-1 text-xs font-semibold text-[#052A49] transition hover:bg-[#34D1BF]/10"
                    >
                      {action.label}
                    </button>
                  ))}
                  {!statusActions[reservation.status].length && (
                    <span className="text-xs text-[var(--text-muted)]">작업 없음</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
