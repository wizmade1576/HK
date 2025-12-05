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

      <section className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-gradient-to-br from-[#FF385C] to-[#f97316] p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] text-white">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 md:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/80">
              HK HOUSE-KEEPER
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              한국의 감성, 세계의 여행을 위한 새로운 기준
            </h1>
            <p className="text-lg text-white/90 sm:text-xl">
              단기 머무름부터 월세 생활까지, 검증된 파트너가 제안하는 숙소만 모았습니다. 지금 여행을 계획하고 이상적인 공간을 발견해보세요.
            </p>
            <div className="flex flex-col gap-3 rounded-full border border-white/60 bg-white/20 p-3 backdrop-blur transition sm:flex-row sm:items-center">
              <input
                className="flex-1 bg-transparent px-3 text-sm text-white placeholder-white/70 focus:outline-none"
                placeholder="예: 서울 강남구 · 원하는 날짜 · 인원"
              />
              <button className="w-full rounded-full border border-white bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-[#FF385C] shadow-lg transition hover:bg-white/90 sm:w-auto">
                검색
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/20 p-5 text-sm backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-white/80">등록된 숙소</p>
                <p className="text-3xl font-semibold">5,300+</p>
                <p className="text-xs text-white/80">맴버들이 추천한 인증 숙소만 모아 제공합니다.</p>
              </div>
              <div className="rounded-3xl bg-white/30 p-5 text-sm text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-white/80">실시간 핫딜</p>
                <p className="text-3xl font-semibold">24%</p>
                <p className="text-xs text-white/80">당일 예약자에게만 제공되는 특별 요금</p>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 text-sm text-white/80 sm:text-base">
              <p className="font-semibold">여행 전용팀이 상시 관리</p>
              <p className="mt-1 text-[13px] text-white/70">
                전문 호스트가 매일 객실을 검수하고 응대합니다. 안정적인 단기임대 경험을 약속드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">추천</p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark)]">HK 스타일 추천 숙소</h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-[#FF385C] hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 pr-2">
          {heroRooms.map((room) => (
            <div key={room.id} className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]">
              <RoomCard room={room} />
            </div>
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
              className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#FF385C]"
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
