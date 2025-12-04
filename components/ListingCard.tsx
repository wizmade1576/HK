"use client";

type ListingCardProps = {
  listing: {
    id: string;
    title: string;
    price: number;
    description: string;
    lat: number;
    lng: number;
  };
  highlighted: boolean;
  onHover: (id: string) => void;
  onLeave: () => void;
  onSelect: () => void;
};

export default function ListingCard({
  listing,
  highlighted,
  onHover,
  onLeave,
  onSelect,
}: ListingCardProps) {
  return (
    <article
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={onLeave}
      onClick={onSelect}
      className={`flex cursor-pointer flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ${
        highlighted ? "shadow-xl ring-1 ring-[#FF385C]" : "hover:shadow-lg"
      }`}
    >
      <div className="h-48 w-full overflow-hidden rounded-2xl bg-slate-200">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
      </div>
      <div className="space-y-1 text-sm text-[var(--text-muted)]">
        <p className="text-lg font-semibold text-[#052A49]">{listing.title}</p>
        <p>{listing.description}</p>
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
        <p>{listing.lat.toFixed(3)}, {listing.lng.toFixed(3)}</p>
        <p className="text-base font-semibold text-[#FF385C]">₩{listing.price.toLocaleString()}</p>
      </div>
    </article>
  );
}
