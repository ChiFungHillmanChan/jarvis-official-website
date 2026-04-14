import { Mic, HardDrive, Zap } from "lucide-react";
import { iconSize } from "@/lib/constants/spacing";
import type { PillarIconKey } from "./pillars.types";

const map = {
  voice: Mic,
  local: HardDrive,
  agentic: Zap,
} as const;

export function PillarIcon({ icon }: { icon: PillarIconKey }) {
  const Cmp = map[icon];
  return <Cmp size={iconSize.lg} strokeWidth={1.5} className="text-[color:var(--accent-cyan)]" />;
}
