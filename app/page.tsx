"use client";

import RoomCard from "@/components/RoomCard";
import { MOCK_ROOMS } from "@/lib/mock-data";
import Link from "next/link";
import SearchHeader from "@/components/search/SearchHeader";

const featuredCities = ["서울", "부산", "대구", "대전", "광주"];

export default function HomePage() {
  const heroRooms = MOCK_ROOMS.slice(0, 5);
  const listRooms = MOCK_ROOMS.slice(2, 10);

  return (
    <div className="space-y-12 pb-12">
      <SearchHeader />
      <section className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-gradient-to-br from-[#FF385C] to-[#f97316] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">HK HOUSE-KEEEPER</p>
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">전세계로 떠나볼 준비가 되셨나요 ?</h1>
            <p className="max-w-xl text-lg text-white/90">
              지역 감성을 담은 숙소로 도시를 탐색하고 이상적인 공간을 발견하세요. 단기거주에 필요한 모든 정보가 한 곳에 모여 있습니다.
            </p>
            <div className="flex w-full gap-3 flex-col rounded-full border border-white/60 bg-white/20 p-3 backdrop-blur lg:max-w-md">
              <input
                className="w-full bg-transparent px-3 text-sm text-white placeholder-white/70 focus:outline-none"
                placeholder="예: 서울 강남구 · 원하는 날짜 · 인원"
              />
              <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#FF385C] shadow-lg transition hover:bg-white/90">
                검색
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex w-full items-end gap-4">
              <div className="flex-1 rounded-3xl bg-white/30 p-6 text-sm backdrop-blur">
                <p className="text-xs uppercase tracking-[0.4em] text-white/80">인기 도시</p>
                <p className="text-3xl font-semibold">5개 도시</p>
                <p className="text-xs text-white/80">오늘 가장 많이 예약된 공간을 확인해보세요.</p>
              </div>
              <div className="h-44 w-44 rounded-3xl bg-white/30 p-4 text-right text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                실시간 핫딜
                <span className="block text-2xl font-bold text-white">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">추천</p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark)]">하우스키퍼 스타일 추천 숙소</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-[#FF385C] hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {heroRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">도시 베스트</p>
          <h3 className="text-2xl font-semibold text-[var(--text-dark)]">도시별 인기 매물</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCities.map((city) => (
            <Link
              key={city}
              href={`/search?city=${encodeURIComponent(city)}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#FF385C]"
            >
              <p className="text-lg font-semibold text-[#052A49]">{city}</p>
              <p className="text-sm text-[var(--text-muted)]">HK 추천 단기임대 24건</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">모든 매물</p>
          <h3 className="text-2xl font-semibold text-[var(--text-dark)]">지금 예약 가능한 공간</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
}
