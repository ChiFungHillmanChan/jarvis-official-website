"use client";

import { useEffect, useState } from "react";

interface Options {
  target: number;
  active: boolean;
  durationMs?: number;
}

export function useCountUp({ target, active, durationMs = 1200 }: Options): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const progress = Math.min(1, (Date.now() - start) / durationMs);
      setValue(Math.round(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);

  return value;
}
