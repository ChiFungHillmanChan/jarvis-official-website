"use client";

import { useRef, useState, useEffect } from "react";
import { useCountUp } from "./useCountUp";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ value, label, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const n = useCountUp({ target: value, active });

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-[color:var(--accent-cyan)] md:text-6xl">
        {suffix}
        {n}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}
