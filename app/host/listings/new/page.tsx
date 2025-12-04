"use client";

import type { FormEvent } from "react";
import type { Room, RoomType } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ListingFormState = {
  title: string;
  address: string;
  city: string;
  district: string;
  type: RoomType;
  sizeM2: string;
  rooms: string;
  bathrooms: string;
  deposit: string;
  weeklyPrice: string;
  maintenanceFee: string;
  options: Room["options"];
};

const initialOptions: Room["options"] = {
  parking: false,
  pet: true,
  elevator: true,
  aircon: true,
  washer: true,
  wifi: true,
};

const roomTypes: RoomType[] = ["원룸", "오피스텔", "아파트", "쉐어하우스", "고시원", "기타"];

const optionList: { key: keyof Room["options"]; label: string }[] = [
  { key: "parking", label: "주차" },
  { key: "pet", label: "애완동물" },
  { key: "elevator", label: "엘리베이터" },
  { key: "aircon", label: "에어컨" },
  { key: "washer", label: "세탁기" },
  { key: "wifi", label: "와이파이" },
];

export default function NewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState<ListingFormState>({
    title: "",
    address: "",
    city: "",
    district: "",
    type: "원룸",
    sizeM2: "",
    rooms: "1",
    bathrooms: "1",
    deposit: "",
    weeklyPrice: "",
    maintenanceFee: "",
    options: initialOptions,
  });

  const handleChange = (key: keyof ListingFormState, value: string | Room["options"]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("등록 폼 데이터:", {
      ...form,
      deposit: Number(form.deposit),
      weeklyPrice: Number(form.weeklyPrice),
      maintenanceFee: Number(form.maintenanceFee),
    });
    router.push("/host/listings");
  };

  const toggleOption = (key: keyof Room["options"]) => {
    setForm((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: !prev.options[key],
      },
    }));
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">호스트 등록</p>
        <h1 className="text-3xl font-semibold text-[#052A49]">새 매물 등록</h1>
        <p className="text-sm text-[var(--text-muted)]">입력한 정보는 데모 UI에만 반영됩니다.</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
          제목
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
          />
        </label>

        <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
          주소
          <input
            type="text"
            value={form.address}
            onChange={(event) => handleChange("address", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            도시
            <input
              type="text"
              value={form.city}
              onChange={(event) => handleChange("city", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            구/동
            <input
              type="text"
              value={form.district}
              onChange={(event) => handleChange("district", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            유형
            <select
              value={form.type}
              onChange={(event) => handleChange("type", event.target.value as RoomType)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            면적 (m²)
            <input
              type="number"
              value={form.sizeM2}
              onChange={(event) => handleChange("sizeM2", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            방 개수
            <input
              type="number"
              value={form.rooms}
              onChange={(event) => handleChange("rooms", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            />
          </label>
          <label className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
            욕실 개수
            <input
              type="number"
              value={form.bathrooms}
              onChange={(event) => handleChange("bathrooms", event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "보증금", key: "deposit" },
            { label: "주단위 금액", key: "weeklyPrice" },
            { label: "관리비", key: "maintenanceFee" },
          ].map((field) => (
            <label key={field.key} className="space-y-1 text-sm font-semibold text-[var(--text-muted)]">
              {field.label}
              <input
                type="number"
                value={form[field.key as keyof ListingFormState] as string}
                onChange={(event) =>
                  handleChange(field.key as keyof ListingFormState, event.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
              />
            </label>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">옵션</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[var(--text-muted)]">
            {optionList.map((option) => (
              <label
                key={option.key}
                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 transition hover:border-[#34D1BF]"
              >
                <input
                  type="checkbox"
                  checked={form.options[option.key]}
                  onChange={() => toggleOption(option.key)}
                  className="h-4 w-4 rounded border-slate-300 text-[#34D1BF]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--text-muted)]">이미지 업로드 (선택)</p>
          <input
            type="file"
            multiple
            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm text-[var(--text-muted)]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-[#34D1BF] px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#2cb4a9]"
        >
          등록하기
        </button>
      </form>
    </section>
  );
}
