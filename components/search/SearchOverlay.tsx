"use client";

"use client";

import { useEffect, useRef } from "react";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SearchOverlay({ open, onClose, children }: SearchOverlayProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-40 mt-3 flex justify-center">
      <div
        ref={ref}
        className="w-full rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl transition duration-300"
      >
        {children}
      </div>
    </div>
  );
}
