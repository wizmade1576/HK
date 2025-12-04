type HostSummaryItem = {
  title: string;
  value: string;
  subtitle?: string;
};

type HostSummaryCardsProps = {
  items: HostSummaryItem[];
};

export default function HostSummaryCards({ items }: HostSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-200"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
            {item.title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-[#052A49]">{item.value}</p>
          {item.subtitle && <p className="mt-1 text-sm text-[var(--text-muted)]">{item.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
