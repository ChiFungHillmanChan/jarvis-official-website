"use client";

import { motion } from "framer-motion";
import { orbits } from "./hud.data";

export function HeroHudOrbits() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      viewBox="-450 -450 900 900"
      aria-hidden="true"
    >
      {orbits.map((o, i) => (
        <motion.g
          key={i}
          initial={{ rotate: o.phaseDeg }}
          animate={{ rotate: o.phaseDeg + 360 }}
          transition={{ duration: o.durationSec, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx={o.radius}
            cy="0"
            r={o.size}
            fill={o.color}
            style={{ filter: `drop-shadow(0 0 10px ${o.color})` }}
          />
          <circle cx={o.radius} cy="0" r={o.size + 4} fill="none" stroke={o.color} strokeOpacity="0.3" />
        </motion.g>
      ))}
    </svg>
  );
}
