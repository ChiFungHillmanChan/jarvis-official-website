"use client";

import { motion } from "framer-motion";

export function HeroHudScanner() {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full [mask-image:radial-gradient(circle,black_55%,transparent_85%)]"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0,180,255,0.22) 350deg, rgba(0,180,255,0.35) 360deg, transparent 0deg)",
        filter: "blur(2px)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}
