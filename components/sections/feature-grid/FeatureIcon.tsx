import { Orbit, Mic, Wrench, Sun, Timer, Terminal } from "lucide-react";
import { iconSize } from "@/lib/constants/spacing";
import type { FeatureIconKey } from "./features.types";

const map = {
  sphere: Orbit,
  voice: Mic,
  tools: Wrench,
  briefing: Sun,
  automation: Timer,
  system: Terminal,
} as const;

export function FeatureIcon({ icon }: { icon: FeatureIconKey }) {
  const Cmp = map[icon];
  return <Cmp size={iconSize.md} strokeWidth={1.5} className="text-[color:var(--accent-cyan)]" />;
}
