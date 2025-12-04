"use client";

import { X } from "lucide-react";

export type FilterValues = {
  placeTypes: string[];
  depositMin: number;
  depositMax: number;
  weeklyMin: number;
  weeklyMax: number;
  amenities: string[];
  beds: number;
  bedrooms: number;
  bathrooms: number;
  flexibleDates: boolean;
};

type Props = {
  open: boolean;
  values: FilterValues;
  onChange: (v: FilterValues) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
};

const placeTypes = ["집 전체", "개인실", "다인실"];
const amenities = ["와이파이", "주방", "세탁기", "에어컨", "주차 가능"];

export default function FiltersModal({
  open,
  values,
  onChange,
  onClose,
  onReset,
  onApply,
}: Props) {
  if (!open) return null;

  const toggleArray = (key: keyof FilterValues, value: string) => {
    const list = values[key] as string[];
    const next = list.includes(value)
      ? list.filter((x) => x !== value)
      : [...list, value];
    onChange({ ...values, [key]: next });
  };

  const updateCount = (field: "beds" | "bedrooms" | "bathrooms", step: number) => {
    onChange({
      ...values,
      [field]: Math.max(0, (values[field] as number) + step),
    });
  };

  const updateRange = (
    field: "depositMin" | "depositMax" | "weeklyMin" | "weeklyMax",
    step: number,
  ) => {
    onChange({
      ...values,
      [field]: Math.max(0, (values[field] as number) + step),
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40">
      {/* Bottom Sheet */}
      <div className="h-[85vh] w-full max-w-2xl rounded-t-[32px] bg-white shadow-xl overflow-y-auto animate-slideUp">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 bg-white">
          <button onClick={onClose}>
            <X size={22} className="text-gray-700" />
          </button>
          <p className="text-base font-medium">필터</p>
          <button onClick={onReset} className="text-sm underline">
            초기화
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6 space-y-10">
          {/* 1. 장소 유형 */}
          <section className="space-y-3">
            <p className="text-sm font-semibold">숙소 유형</p>
            <div className="flex flex-col gap-3">
              {placeTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleArray("placeTypes", t)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4
                    ${
                      values.placeTypes.includes(t)
                        ? "border-black font-semibold"
                        : "border-gray-300"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          <div className="border-b" />

          {/* 2. 가격 */}
          <section className="space-y-4">
            <p className="text-sm font-semibold">가격 범위</p>

            <div className="grid grid-cols-2 gap-4">
              {[ 
                { label: "보증금 최소", field: "depositMin" as const },
                { label: "보증금 최대", field: "depositMax" as const },
                { label: "주단가 최소", field: "weeklyMin" as const },
                { label: "주단가 최대", field: "weeklyMax" as const },
              ].map((item) => (
                <div key={item.field} className="rounded-xl border p-4">
                  <p className="text-xs text-gray-500 mb-2">{item.label}</p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => updateRange(item.field, -10000)}
                      className="px-2 text-lg"
                    >
                      –
                    </button>

                    <span className="font-semibold">
                      ₩{values[item.field].toLocaleString()}
                    </span>

                    <button
                      onClick={() => updateRange(item.field, 10000)}
                      className="px-2 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-b" />

          {/* 3. 편의시설 */}
          <section className="space-y-3">
            <p className="text-sm font-semibold">편의시설</p>
            <div className="flex flex-wrap gap-3">
              {amenities.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleArray("amenities", a)}
                  className={`rounded-xl border px-4 py-2 text-sm
                    ${
                      values.amenities.includes(a)
                        ? "border-black bg-gray-100 font-semibold"
                        : "border-gray-300 text-gray-500"
                    }
                  `}
                >
                  {a}
                </button>
              ))}
            </div>
          </section>

          <div className="border-b" />

          {/* 4. 침대 / 침실 / 욕실 */}
          <section className="space-y-4">
            <p className="text-sm font-semibold">침대 / 침실 / 욕실</p>

            {["beds", "bedrooms", "bathrooms"].map((field) => (
              <div
                key={field}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <span className="capitalize">{field}</span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateCount(field as any, -1)}
                    className="px-2 text-lg"
                  >
                    –
                  </button>

                  <span className="text-base font-semibold">
                    {values[field as keyof FilterValues]}
                  </span>

                  <button
                    onClick={() => updateCount(field as any, 1)}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </section>

          <div className="border-b" />

          {/* 5. 유연한 일정 */}
          <section className="flex items-center justify-between">
            <p className="text-sm font-semibold">유연한 일정</p>
            <input
              type="checkbox"
              checked={values.flexibleDates}
              onChange={(e) =>
                onChange({ ...values, flexibleDates: e.target.checked })
              }
              className="h-5 w-5"
            />
          </section>
        </div>

        {/* FOOTER BUTTON */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4">
          <button
            onClick={onApply}
            className="w-full rounded-xl bg-[#FF385C] py-4 text-center text-white font-semibold"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
