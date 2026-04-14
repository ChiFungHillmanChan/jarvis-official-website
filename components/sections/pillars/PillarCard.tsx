import { GlassPanel } from "@/components/ui/GlassPanel";
import { PillarIcon } from "./PillarIcon";
import type { Pillar } from "./pillars.types";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <GlassPanel>
      <PillarIcon icon={pillar.icon} />
      <h3 className="mt-5 font-display text-2xl">{pillar.title}</h3>
      <p className="mt-3 text-[color:var(--text-muted)]">{pillar.body}</p>
    </GlassPanel>
  );
}
