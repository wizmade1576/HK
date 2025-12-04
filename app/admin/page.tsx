import HostSummaryCards from "@/components/HostSummaryCards";
import { MOCK_ROOMS } from "@/lib/mock-data";

const recentListings = MOCK_ROOMS.slice(0, 5);

export default function AdminPage() {
  const summaryItems = [
    { title: "전체 매물", value: `${MOCK_ROOMS.length}개`, subtitle: "등록된 HK 공간" },
    { title: "전체 예약", value: "218건", subtitle: "현재까지 누적 요청" },
    { title: "예상 매출", value: "82,400,000원", subtitle: "미확정 포함 예상" },
    { title: "신규 호스트", value: "12명", subtitle: "이번 달 가입" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">관리자 대시보드</p>
        <h1 className="mt-1 text-3xl font-semibold text-[#052A49]">HK Admin</h1>
        <p className="text-sm text-[var(--text-muted)]">
          전체 플랫폼 지표를 한눈에 보고, 최신 등록 매물도 빠르게 확인하세요.
        </p>
      </section>

      <HostSummaryCards items={summaryItems} />

      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#052A49]">최근 등록된 매물</h2>
          <span className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">Live</span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3">매물</th>
                <th className="px-4 py-3">지역</th>
                <th className="px-4 py-3">보증금</th>
                <th className="px-4 py-3">주요 옵션</th>
              </tr>
            </thead>
            <tbody>
              {recentListings.map((room) => (
                <tr key={room.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-semibold text-[#052A49]">{room.title}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {room.city} · {room.district}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {new Intl.NumberFormat("ko-KR").format(room.deposit)}원
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {Object.entries(room.options)
                      .filter(([, value]) => value)
                      .map(([key]) => key)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
