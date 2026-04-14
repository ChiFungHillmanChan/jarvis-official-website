"use client";

import { motion } from "framer-motion";
import { hud } from "./hud.data";

interface ReadoutProps {
  lines: readonly string[];
  align: "left" | "right";
  className: string;
  delay: number;
}

function Readout({ lines, align, className, delay }: ReadoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent-cyan-60)] ${className} ${align === "right" ? "text-right" : "text-left"}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2">
        {align === "left" ? (
          <>
            <span className="h-1 w-1 rounded-full bg-[color:var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
            <span>{lines[0]}</span>
          </>
        ) : (
          <>
            <span>{lines[0]}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
          </>
        )}
      </div>
      <div className="mt-1 text-[color:var(--text-muted)]">{lines[1]}</div>
    </motion.div>
  );
}

export function HeroHudTelemetry() {
  return (
    <>
      <Readout lines={hud.telemetry.tl} align="left" className="left-6 top-6 md:left-10 md:top-10" delay={0.3} />
      <Readout lines={hud.telemetry.tr} align="right" className="right-6 top-6 md:right-10 md:top-10" delay={0.45} />
      <Readout lines={hud.telemetry.bl} align="left" className="bottom-6 left-6 md:bottom-10 md:left-10" delay={0.6} />
      <Readout lines={hud.telemetry.br} align="right" className="bottom-6 right-6 md:bottom-10 md:right-10" delay={0.75} />
    </>
  );
}
