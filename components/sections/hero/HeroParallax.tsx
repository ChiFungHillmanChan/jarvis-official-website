"use client";

import { motion } from "framer-motion";

const dots = [
  { cx: "12%", cy: "24%", size: 6, delay: 0 },
  { cx: "78%", cy: "18%", size: 4, delay: 0.4 },
  { cx: "30%", cy: "78%", size: 5, delay: 0.9 },
  { cx: "66%", cy: "62%", size: 3, delay: 1.3 },
];

export function HeroParallax() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[color:var(--accent-cyan)]"
          style={{
            left: d.cx,
            top: d.cy,
            width: d.size,
            height: d.size,
            boxShadow: "var(--glow-cyan)",
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
