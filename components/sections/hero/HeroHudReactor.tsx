"use client";

import { motion } from "framer-motion";

export function HeroHudReactor() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2"
      viewBox="-110 -110 220 220"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="reactor-glow">
          <stop offset="0%" stopColor="rgba(0,180,255,0.9)" />
          <stop offset="40%" stopColor="rgba(0,180,255,0.35)" />
          <stop offset="100%" stopColor="rgba(0,180,255,0)" />
        </radialGradient>
      </defs>
      <motion.circle
        r="90"
        fill="url(#reactor-glow)"
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle r="42" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" strokeOpacity="0.7" />
      <circle r="34" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 4" />
      <motion.circle
        r="6"
        fill="var(--accent-cyan)"
        style={{ filter: "drop-shadow(0 0 14px var(--accent-cyan))" }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
