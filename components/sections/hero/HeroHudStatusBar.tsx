"use client";

import { motion } from "framer-motion";
import { hud } from "./hud.data";

export function HeroHudStatusBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="pointer-events-none absolute left-1/2 top-[calc(50%+180px)] z-10 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--accent-cyan-60)]"
      aria-hidden="true"
    >
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {hud.status}
      </motion.span>
    </motion.div>
  );
}
