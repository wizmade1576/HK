"use client";

"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Room } from "@/lib/mock-data";

type RoomCardProps = {
  room: Room;
};

const currencyFormatter = new Intl.NumberFormat("ko-KR");

export default function RoomCard({ room }: RoomCardProps) {
  const priceLabel = currencyFormatter.format(room.weeklyPrice ?? 0);
  const images = useMemo(() => room.images.slice(0, 3), [room.images]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Link
      href={`/rooms/${room.id}`}
      className="group flex h-full min-w-[260px] flex-1 cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#222] shadow-sm">
          {room.type}
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#222] shadow transition hover:bg-white"
          onClick={(e) => e.preventDefault()}
        >
          <Heart
            size={18}
            className="transition group-hover:fill-[#FF385C] group-hover:text-[#FF385C]"
          />
        </button>

        {images.length > 1 && (
          <div className="pointer-events-auto absolute inset-0 flex items-center justify-between px-3 text-lg text-white">
            <button
              type="button"
              className="rounded-full bg-black/40 p-1 text-lg"
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="rounded-full bg-black/40 p-1 text-lg"
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex((prev) => (prev + 1) % images.length);
              }}
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-4 py-3">
        <div className="flex items-center justify-between text-[13px] text-[var(--text-muted,#717171)]">
          <p className="truncate">
            {room.city} · {room.district}
          </p>
          <span className="flex items-center gap-1 text-[#222]">
            <Star size={14} className="fill-[#FF385C] text-[#FF385C]" />
            <span className="text-[13px] font-semibold">
              {room.rating.toFixed(2)}
            </span>
          </span>
        </div>

        <h3 className="line-clamp-1 text-[15px] font-semibold text-[#222222]">
          {room.title}
        </h3>

        <p className="line-clamp-2 text-[13px] text-[var(--text-muted,#717171)]">
          {room.shortDescription}
        </p>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-[15px] font-semibold text-[#222222]">
            ₩{priceLabel}
          </span>
          <span className="text-[12px] text-[var(--text-muted,#717171)]">/주</span>
        </div>
      </div>
    </Link>
  );
}
