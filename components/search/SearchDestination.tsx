"use client";

const recentSearches = ["서울 강남구", "제주 애월", "부산 해운대", "대구 수성구"];
const recommendedCities = [
  { name: "서울 용산구", desc: "도심 뷰와 감성 카페" },
  { name: "제주 서귀포", desc: "바다 가까이 힐링 스테이" },
  { name: "부산 해운대", desc: "해변과 야경 모두" },
];

type SearchDestinationProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchDestination({ value, onChange }: SearchDestinationProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">여행지</label>
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm focus:border-[#FF385C] focus:outline-none"
          placeholder="지역 또는 숙소 검색"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">최근 검색</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {recentSearches.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#052A49] shadow-sm transition hover:border-[#FF385C]"
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">추천 도시</p>
        <div className="mt-3 space-y-3 overflow-auto">
          {recommendedCities.map((city) => (
            <div
              key={city.name}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-[#FF385C]"
            >
              <div>
                <p className="text-sm font-semibold text-[#052A49]">{city.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{city.desc}</p>
              </div>
              <span className="text-lg text-[#FF385C]">➜</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
