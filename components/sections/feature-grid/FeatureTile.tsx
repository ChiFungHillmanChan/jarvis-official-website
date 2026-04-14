import { GlassPanel } from "@/components/ui/GlassPanel";
import { FeatureIcon } from "./FeatureIcon";
import type { Feature } from "./features.types";

export function FeatureTile({ feature }: { feature: Feature }) {
  return (
    <GlassPanel className="h-full">
      <div className="flex items-center gap-3">
        <FeatureIcon icon={feature.icon} />
        <h3 className="font-display text-xl">{feature.title}</h3>
      </div>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">{feature.body}</p>
    </GlassPanel>
  );
}
