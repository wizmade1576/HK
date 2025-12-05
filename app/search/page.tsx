"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import RoomCard from "@/components/RoomCard";
import FiltersButton from "@/components/search/FiltersButton";
import FiltersModal from "@/components/search/FiltersModal";

import GoogleMap, {
  type MapBounds,
  type MapListing,
} from "@/components/GoogleMap";

import { MOCK_ROOMS, type Room } from "@/lib/mock-data";

// Airbnb 기본 필터 값
const DEFAULT_FILTERS = {
  placeTypes: [] as string[],
  depositMin: 0,
  depositMax: 30000000,
  weeklyMin: 0,
  weeklyMax: 5000000,
  amenities: [] as string[],
  beds: 1,
  bedrooms: 1,
  bathrooms: 1,
  flexibleDates: false,
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const cityQuery = searchParams.get("city") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = searchParams.get("guests") ?? "1";

  // 필터 상태
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(DEFAULT_FILTERS);

  // 지도 관련 상태
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

  // 1) 필터 적용된 매물
  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter((room) => {
      if (cityQuery && room.city !== cityQuery) return false;

      if (
        filterValues.placeTypes.length &&
        !filterValues.placeTypes.includes(room.type)
      ) return false;

      if (room.deposit < filterValues.depositMin) return false;
      if (room.deposit > filterValues.depositMax) return false;

      if (room.weeklyPrice < filterValues.weeklyMin) return false;
      if (room.weeklyPrice > filterValues.weeklyMax) return false;

      // 옵션 필터
      if (
        filterValues.amenities.length &&
        !filterValues.amenities.every(
          (a) => room.options[a as keyof typeof room.options],
        )
      ) {
        return false;
      }

      // beds undefined 대비
      const bedsCount = room.beds ?? 0;
      if (bedsCount < filterValues.beds) return false;

      if (room.rooms < filterValues.bedrooms) return false;
      if (room.bathrooms < filterValues.bathrooms) return false;

      return true;
    });
  }, [cityQuery, filterValues]);

  // 2) 지도 범위 내 + 이미지 있는 방
  const displayRooms = useMemo(
    () =>
      filteredRooms.filter(
        (room) =>
          room.images.length > 0 &&
          room.lat !== undefined &&
          room.lng !== undefined
      ),
    [filteredRooms]
  );

  // 3) 지도 마커 데이터
  const mapListings: MapListing[] = useMemo(
    () =>
      displayRooms.map((r) => ({
        id: r.id,
        lat: r.lat!,
        lng: r.lng!,
        price: r.weeklyPrice ?? 0,
      })),
    [displayRooms]
  );

  // 4) 초기 맵 위치
  useEffect(() => {
    if (!mapCenter && displayRooms.length > 0) {
      setMapCenter({
        lat: displayRooms[0].lat!,
        lng: displayRooms[0].lng!,
      });
    }
  }, [displayRooms, mapCenter]);

  return (
    <div className="min-h-screen w-full pt-[120px] lg:pt-[120px]">

      {/* 필터 모달 */}
      <FiltersModal
        open={filtersOpen}
        values={filterValues}
        onChange={setFilterValues}
        onClose={() => setFiltersOpen(false)}
        onReset={() => setFilterValues(DEFAULT_FILTERS)}
        onApply={() => setFiltersOpen(false)}
      />

      {/* 필터 버튼 */}
      <div className="mb-6 flex justify-end">
        <FiltersButton onClick={() => setFiltersOpen(true)} />
      </div>

      {/* 메인 콘텐츠: 리스트 + 지도 */}
      <div className="flex w-full gap-6">

        {/* LEFT LIST */}
        <div className="flex-1 min-w-[480px] space-y-5">
          {/* 검색 조건 요약 */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-gray-500">검색 조건</p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-[15px]">
              <span className="rounded-full bg-red-100 px-3 py-1 text-red-500">
                {cityQuery || "전국"}
              </span>

              <span className="text-gray-500">
                {checkIn || "날짜 미설정"} → {checkOut || "날짜 미설정"}
              </span>

              <span className="text-gray-500">게스트 {guests}명</span>
            </div>
          </div>

          {/* 리스트 */}
          <div>
            <h2 className="mb-3 text-[22px] font-semibold">
              {displayRooms.length}개 매물
            </h2>

            {displayRooms.length > 0 ? (
              <div
                className="
                  grid gap-6
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {displayRooms.map((room) => (
                  <div
                    key={room.id}
                    onMouseEnter={() => setActiveRoomId(room.id)}
                    onMouseLeave={() => setActiveRoomId(null)}
                    onClick={() => {
                      setActiveRoomId(room.id);
                      setMapCenter({ lat: room.lat!, lng: room.lng! });
                    }}
                    className={`transition ${
                      activeRoomId === room.id
                        ? "rounded-3xl ring-2 ring-red-400"
                        : ""
                    }`}
                  >
                    <RoomCard room={room as Room} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border bg-gray-100 p-6 text-center text-sm text-gray-500">
                조건에 맞는 매물이 없습니다.  
                지도를 움직이거나 필터를 조정해보세요.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="flex-1 min-w-[500px] sticky top-20 hidden h-[94vh] overflow-hidden rounded-3xl border lg:block">
          <GoogleMap
            listings={mapListings}
            center={mapCenter}
            activeId={activeRoomId}
            onMarkerClick={(id) => {
              setActiveRoomId(id);
              const r = filteredRooms.find((x) => x.id === id);
              if (r) setMapCenter({ lat: r.lat!, lng: r.lng! });
            }}
            onBoundsChange={setMapBounds}
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  );
}
