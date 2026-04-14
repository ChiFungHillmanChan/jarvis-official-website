import { copy } from "@/content/copy.en";
import type { Feature, FeatureIconKey } from "./features.types";

const order: FeatureIconKey[] = ["sphere", "voice", "tools", "briefing", "automation", "system"];

export const features: Feature[] = copy.features.map((f, i) => ({
  title: f.title,
  body: f.body,
  icon: order[i] ?? "sphere",
}));
