"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { MOCK_ROOMS } from "@/lib/mock-data";
import { Star, MapPin } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";

export default function RoomDetailPage() {
  const { id } = useParams();
  const room = MOCK_ROOMS.find((x) => x.id === id);

  if (!room) {
    return (
      <div className="p-10 text-center text-gray-500">
        해당 숙소를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] py-10 space-y-10">
      {/* 제목 */}
      <section>
        <h1 className="text-3xl font-bold">{room.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1 text-[#FF385C]">
            <Star size={16} /> {room.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{room.city} {room.district}</span>
        </div>
      </section>

      {/* 이미지 갤러리 */}
      <section className="grid grid-cols-4 gap-3 rounded-3xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative h-[420px]">
          <Image
            src={room.thumbnail}
            alt="main"
            fill
            className="object-cover"
          />
        </div>

        {room.images.slice(0, 4).map((img, idx) => (
          <div key={idx} className="relative h-[200px]">
            <Image
              src={img}
              alt="gallery"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </section>

      {/* 본문 + 가격 박스 레이아웃 */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

        {/* Left content */}
        <div className="space-y-10">

          {/* 호스트 정보 */}
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {room.hostName} 님이 호스팅하는 숙소
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                침대 {room.beds}개 · 욕실 {room.bathrooms}개 · 방 {room.rooms}개
              </p>
            </div>

            <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={room.hostAvatar || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80"}
                alt="host"
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          </div>

          {/* 설명 */}
          <p className="text-gray-700 leading-relaxed">
            {room.description}
          </p>

          {/* 편의시설 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">편의시설</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(room.options).map((opt) => (
                <span
                  key={opt}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  ✅ {opt}
                </span>
              ))}
            </div>
          </div>

          {/* 지도 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">숙소 위치</h3>
            <p className="text-gray-500">{room.city} {room.district}</p>

            <div className="h-[350px] rounded-3xl overflow-hidden border">
              <GoogleMap
                listings={[
                  {
                    id: room.id,
                    lat: room.lat!,
                    lng: room.lng!,
                    price: room.weeklyPrice,
                  },
                ]}
                center={{ lat: room.lat!, lng: room.lng! }}
                activeId={room.id}
              />
            </div>
          </div>

          {/* 리뷰 */}
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-1">
              <Star size={20} className="text-[#FF385C]" />
              {room.rating.toFixed(1)} · 후기 {(room.reviews ?? []).length}개
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {(room.reviews ?? []).map((review, idx) => (
                <div key={idx} className="border rounded-3xl p-5 shadow-sm">
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right reservation box */}
        <div className="border rounded-3xl shadow-lg p-6 h-fit sticky top-24 space-y-6">
          <div>
            <p className="text-2xl font-bold">
              ₩{room.weeklyPrice.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">/ 1주</p>
          </div>

          <button className="w-full rounded-xl bg-[#FF385C] text-white py-4 font-semibold">
            예약 요청하기
          </button>

          <p className="text-xs text-gray-400 text-center">
            예약 확정 전까지 요금이 청구되지 않습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
