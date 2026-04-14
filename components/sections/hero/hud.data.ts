import { copy } from "@/content/copy.en";

export interface OrbitNode {
  radius: number;
  size: number;
  durationSec: number;
  phaseDeg: number;
  color: string;
}

export const orbits: OrbitNode[] = [
  { radius: 160, size: 5, durationSec: 18, phaseDeg: 0, color: "var(--data-task)" },
  { radius: 160, size: 3, durationSec: 18, phaseDeg: 135, color: "var(--data-email)" },
  { radius: 236, size: 6, durationSec: 28, phaseDeg: 30, color: "var(--data-cal)" },
  { radius: 236, size: 3, durationSec: 28, phaseDeg: 220, color: "var(--data-github)" },
  { radius: 320, size: 4, durationSec: 44, phaseDeg: 75, color: "var(--data-notion)" },
  { radius: 320, size: 3, durationSec: 44, phaseDeg: 260, color: "var(--data-cron)" },
];

export const hud = copy.sections.hud;
