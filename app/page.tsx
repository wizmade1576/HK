"use client";

import { useState } from "react";
import RoomCard from "@/components/RoomCard";
import { MOCK_ROOMS } from "@/lib/mock-data";
import Link from "next/link";
import SearchHeader from "@/components/search/SearchHeader";

const featuredCities = ["서울", "부산", "대구", "대전", "광주"];

const planSections = [
  {
    title: "프로젝트 목표",
    items: [
      "공실 플랫폼(내부 관리 시스템)과 HK 서비스 연동",
      "숙소 데이터 자동 동기화 및 자동 매물 업로드 파이프라인 구축",
    ],
  },
  {
    title: "12월 10일 실행 플랜",
    items: [
      "공실 플랫폼 API 명세 확인 (매물 목록, 상세 정보, 이미지 접근 방식)",
      "HK에서 필요한 필드를 정의하고 Supabase 테이블에 매핑",
      "연동 방식 결정 (수동 등록 → 자동 동기화, CRON/Supabase Edge Function 고려)",
      "빈 매물 자동 등록 (API → Supabase DB, 이미지/지도 업데이트)",
      "QA 체크 (지도 좌표 누락, 이미지 404, 가격 형식 통일)",
    ],
  },
];

const completionDate = "투자자 PR 1차 버전: 12월 12일";

const memoSections = [
  {
    title: "필수 체크리스트",
    items: [
      "HK 서비스 핵심 정리 (3줄로 설명하기)",
      "Airbnb 스타일 지도 검색 기능 스크린샷 촬영",
      "호스트 되기 / 로그인 기능 영상 촬영",
      "가격 카드 + 숙소 상세 이미지 캡처",
      "로고/컬러/브랜드 정리본 업로드",
      "공실 플랫폼 API 명세 확인 (매물 목록, 상세 정보, 이미지 접근 방식)",
      "HK에서 필요한 필드를 정의하고 Supabase 테이블에 매핑",
      "연동 방식 결정 (수동 등록 → 자동 동기화, CRON/Supabase Edge Function 고려)",
      "빈 매물 자동 등록 (API → Supabase DB, 이미지/지도 업데이트)",
      "QA 체크 (지도 좌표 누락, 이미지 404, 가격 형식 통일)",
    ],
  },
  {
    title: "기술 점검",
    items: [
      "구글맵 API 정상 적용 테스트 (Vercel)",
      "검색 페이지 SSR 오류 재확인",
      "이미지 로딩 속도 점검",
      "도메인 연결 및 HTTPS 체크",
      "공실 플랫폼(내부 관리 시스템)과 HK 서비스 연동",
      "숙소 데이터 자동 동기화 및 자동 매물 업로드 파이프라인 구축",
    ],
  },
  {
    title: "PR 문구 초안",
    items: [
      "“한국 단기임대를 혁신하는 새로운 플랫폼 HK”",
      "“지도 기반 검색 + 단기/주거형 하이브리드 모델”",
    ],
  },
  {
    title: "할 일 메모",
    items: [
      "보도자료 문구 1차 초안 작성",
      "인스타/블로그 업로드용 콘텐츠 제작",
      "배포 채널 리스트업",
    ],
  },
];

export default function HomePage() {
  const [showMemo, setShowMemo] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const heroRooms = MOCK_ROOMS.slice(0, 5);
  const listRooms = MOCK_ROOMS.slice(2, 10);

  return (
    <>
      {showMemo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-w-3xl w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF385C]">
                  HK Memo
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[#052A49]">
                  주요 실행 항목
                </h3>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#052A49] transition hover:bg-slate-100"
                onClick={() => setShowMemo(false)}
              >
                닫기
              </button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {memoSections.map((section) => (
                <div
                  key={section.title}
                  className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {section.title}
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-2 w-2 flex-none rounded-full bg-[#FF385C]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPlan && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-w-3xl w-full space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF385C]">
                  HK Plan
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[#052A49]">
                  자동화 연동 로드맵
                </h3>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#052A49] transition hover:bg-slate-100"
                onClick={() => setShowPlan(false)}
              >
                닫기
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {planSections.map((section) => (
                <div
                  key={section.title}
                  className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {section.title}
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-2 w-2 flex-none rounded-full bg-[#FF385C]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-dashed border-[#FF385C]/80 bg-[#FF385C]/10 px-4 py-3 text-sm font-semibold text-[#052A49] uppercase tracking-[0.3em]">
              {completionDate}
            </div>
          </div>
        </div>
      )}

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
                2주 단위부터 월세 생활까지, 검증된 파트너가 제안하는 숙소만
                모았습니다. 지금 여행을 계획하고 이상적인 공간을 발견해보세요.
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
              <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
                <button
                  type="button"
                  className="rounded-full border border-white/40 px-4 py-2 font-semibold text-white transition hover:bg-white/20"
                  onClick={() => setShowPlan(true)}
                >
                  12월 10일 실행 플랜
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/20 p-5 text-sm backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                    등록된 숙소
                  </p>
                  <p className="text-3xl font-semibold">5,300+</p>
                  <p className="text-xs text-white/80">
                    맴버들이 추천한 인증 숙소만 모아 제공합니다.
                  </p>
                </div>
                <div className="rounded-3xl bg-white/30 p-5 text-sm text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                    실시간 핫딜
                  </p>
                  <p className="text-3xl font-semibold">24%</p>
                  <p className="text-xs text-white/80">
                    당일 예약자에게만 제공되는 특별 요금
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-sm text-white/80 sm:text-base">
                <p className="font-semibold">여행 전용팀이 상시 관리</p>
                <p className="mt-1 text-[13px] text-white/70">
                  전문 호스트가 매일 객실을 검수하고 응대합니다. 안정적인
                  단기임대 경험을 약속드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
                추천
              </p>
              <h2 className="text-2xl font-semibold text-[var(--text-dark)]">
                HK 스타일 추천 숙소
              </h2>
            </div>
            <Link
              href="/search"
              className="text-sm font-semibold text-[#FF385C] hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 pr-2">
            {heroRooms.map((room) => (
              <div
                key={room.id}
                className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
              도시 베스트
            </p>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)]">
              도시별 인기 매물
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCities.map((city) => (
              <Link
                key={city}
                href={`/search?city=${encodeURIComponent(city)}`}
                className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#FF385C]"
              >
                <p className="text-lg font-semibold text-[#052A49]">{city}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  HK 추천 단기임대 24건
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">
              모든 매물
            </p>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)]">
              지금 예약 가능한 공간
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
