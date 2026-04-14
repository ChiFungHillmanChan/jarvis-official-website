"use client";

import { motion } from "framer-motion";

interface RingProps {
  radius: number;
  tickCount: number;
  majorEvery: number;
  majorLen: number;
  minorLen: number;
  majorOpacity: number;
  minorOpacity: number;
}

function Ring({ radius, tickCount, majorEvery, majorLen, minorLen, majorOpacity, minorOpacity }: RingProps) {
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const major = i % majorEvery === 0;
    const angle = (i / tickCount) * Math.PI * 2 - Math.PI / 2;
    const outer = radius;
    const inner = radius - (major ? majorLen : minorLen);
    const x1 = Math.cos(angle) * inner;
    const y1 = Math.sin(angle) * inner;
    const x2 = Math.cos(angle) * outer;
    const y2 = Math.sin(angle) * outer;
    return { major, x1, y1, x2, y2 };
  });
  return (
    <>
      <circle r={radius} fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.18" strokeWidth="1" />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="var(--accent-cyan)"
          strokeOpacity={t.major ? majorOpacity : minorOpacity}
          strokeWidth={t.major ? 1.2 : 0.6}
        />
      ))}
    </>
  );
}

export function HeroHudRings() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,black_55%,transparent_85%)]"
      viewBox="-450 -450 900 900"
      aria-hidden="true"
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
      >
        <Ring radius={400} tickCount={144} majorEvery={12} majorLen={14} minorLen={6} majorOpacity={0.6} minorOpacity={0.15} />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        <Ring radius={300} tickCount={96} majorEvery={8} majorLen={10} minorLen={4} majorOpacity={0.7} minorOpacity={0.2} />
      </motion.g>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <Ring radius={200} tickCount={60} majorEvery={5} majorLen={8} minorLen={3} majorOpacity={0.85} minorOpacity={0.25} />
      </motion.g>
    </svg>
  );
}
