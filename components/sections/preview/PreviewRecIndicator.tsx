"use client";

import { motion } from "framer-motion";

export function PreviewRecIndicator() {
  return (
    <div
      className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-sm bg-[color:rgba(6,10,20,0.6)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[color:var(--accent-cyan)] backdrop-blur-sm"
      aria-hidden="true"
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)]"
        style={{ filter: "drop-shadow(0 0 6px var(--accent-cyan))" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      Live
    </div>
  );
}
