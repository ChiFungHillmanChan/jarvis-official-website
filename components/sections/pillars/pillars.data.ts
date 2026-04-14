import type { Copy } from "@/content/getCopy";
import type { Pillar, PillarIconKey } from "./pillars.types";

const icons: PillarIconKey[] = ["voice", "local", "agentic"];

export function buildPillars(copy: Copy): Pillar[] {
  return copy.pillars.map((p, i) => ({
    title: p.title,
    body: p.body,
    icon: icons[i] ?? "voice",
  }));
}
