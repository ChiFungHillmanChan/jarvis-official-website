import { HeroHudBackdrop } from "./HeroHudBackdrop";
import type { Telemetry } from "./HeroHudTelemetry";

export function HeroHudStatic({ telemetry }: { telemetry: Telemetry }) {
  return (
    <>
      <HeroHudBackdrop />
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,black_55%,transparent_85%)]"
        viewBox="-450 -450 900 900"
        aria-hidden="true"
      >
        <circle r="400" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.18" strokeWidth="1" />
        <circle r="300" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.2" strokeWidth="1" />
        <circle r="200" fill="none" stroke="var(--accent-cyan)" strokeOpacity="0.25" strokeWidth="1" />
        <circle r="90" fill="rgba(0,180,255,0.2)" />
        <circle r="42" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" strokeOpacity="0.7" />
        <circle r="6" fill="var(--accent-cyan)" />
      </svg>
      <div
        className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent-cyan-60)] md:left-10 md:top-10"
        aria-hidden="true"
      >
        {telemetry.tl[0]}
      </div>
      <div
        className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent-cyan-60)] md:right-10 md:top-10"
        aria-hidden="true"
      >
        {telemetry.tr[0]}
      </div>
    </>
  );
}
