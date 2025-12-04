"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("데모라서 실제 로그인은 동작하지 않습니다.");
  };

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200">
      <h1 className="text-2xl font-semibold text-[#052A49]">로그인</h1>
      <p className="text-sm text-[var(--text-muted)]">이메일과 비밀번호로 HK에 로그인하세요.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          이메일
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
          />
        </label>
        <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          비밀번호
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-mint focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[#34D1BF] px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#2cb4a9]"
        >
          로그인
        </button>
      </form>
      <p className="text-xs text-[var(--text-muted)]">
        계정이 없으신가요?
        <Link className="ml-1 font-semibold text-[#052A49]" href="/signup">
          회원가입
        </Link>
      </p>
    </section>
  );
}
