"use client";

import { create } from "zustand";

export type SearchTab = "destination" | "date" | "guest";

export type GuestCounts = {
  adults: number;
  kids: number;
  infants: number;
  pets: number;
};

type SearchState = {
  activeTab: SearchTab;
  destination: string;
  recentDestinations: string[];
  recommended: { name: string; info: string }[];
  checkIn: string;
  checkOut: string;
  guests: GuestCounts;
  showModal: boolean;
  setTab: (tab: SearchTab) => void;
  setDestination: (value: string) => void;
  toggleModal: (open: boolean) => void;
  setCheckIn: (value: string) => void;
  setCheckOut: (value: string) => void;
  adjustGuest: (key: keyof GuestCounts, delta: number) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  activeTab: "destination",
  destination: "",
  recentDestinations: ["서울 강남구", "제주도 애월", "부산 해운대"],
  recommended: [
    { name: "대구 수성구", info: "예쁜 카페 거리" },
    { name: "광주 동구", info: "예술가의 거리" },
    { name: "대전 서구", info: "문화 예술의 중심" },
  ],
  checkIn: "",
  checkOut: "",
  guests: { adults: 1, kids: 0, infants: 0, pets: 0 },
  showModal: false,
  setTab: (tab) => set({ activeTab: tab, showModal: true }),
  setDestination: (value) =>
    set((state) => {
      const nextRecent = [value, ...state.recentDestinations.filter((item) => item !== value)];
      return {
        destination: value,
        recentDestinations: nextRecent.slice(0, 4),
      };
    }),
  toggleModal: (open) => set({ showModal: open }),
  setCheckIn: (value) => set({ checkIn: value }),
  setCheckOut: (value) => set({ checkOut: value }),
  adjustGuest: (key, delta) =>
    set((state) => {
      const next = Math.max(0, state.guests[key] + delta);
      return { guests: { ...state.guests, [key]: next } };
    }),
}));
