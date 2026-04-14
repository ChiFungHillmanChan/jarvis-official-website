import { copy } from "@/content/copy.en";
import type { Pillar, PillarIconKey } from "./pillars.types";

const icons: PillarIconKey[] = ["voice", "local", "agentic"];

export const pillars: Pillar[] = copy.pillars.map((p, i) => ({
  title: p.title,
  body: p.body,
  icon: icons[i] ?? "voice",
}));
