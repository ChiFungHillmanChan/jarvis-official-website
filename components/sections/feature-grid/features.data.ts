import type { Copy } from "@/content/getCopy";
import type { Feature, FeatureIconKey } from "./features.types";

const order: FeatureIconKey[] = ["sphere", "voice", "tools", "briefing", "automation", "system"];

export function buildFeatures(copy: Copy): Feature[] {
  return copy.features.map((f, i) => ({
    title: f.title,
    body: f.body,
    icon: order[i] ?? "sphere",
  }));
}
