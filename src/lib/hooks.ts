"use client";

import { useEffect, useRef, useState } from "react";

/** Progressive substring of `text`, typed at `cps` characters/second once `start` is true. */
export function useTyping(text: string, start: boolean, cps = 38, delayMs = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    setCount(0);
    let raf = 0;
    let t0: number | null = null;
    const step = (t: number) => {
      if (t0 === null) t0 = t + delayMs;
      const elapsed = Math.max(0, t - t0);
      const n = Math.min(text.length, Math.floor((elapsed / 1000) * cps));
      setCount(n);
      if (n < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, start, cps, delayMs]);
  return { typed: text.slice(0, count), done: count >= text.length };
}

/** Repeating callback; pass `null` to pause. */
export function useInterval(cb: () => void, ms: number | null) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  }, [cb]);
  useEffect(() => {
    if (ms === null) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [ms]);
}

/** Matches a media query (SSR-safe: false on the server). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

export const useIsDesktop = () => useMedia("(min-width: 1024px) and (pointer: fine)");

/** True after first client render — for gating cursor-aware effects. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
