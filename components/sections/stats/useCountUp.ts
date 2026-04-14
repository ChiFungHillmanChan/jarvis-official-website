"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface Options {
  target: number;
  active: boolean;
  durationMs?: number;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCountUp({ target, active, durationMs = 1200 }: Options): number {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) return;
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / durationMs);
      setValue(Math.round(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reduced]);

  if (reduced && active) return target;
  return value;
}
