export type FeatureIconKey =
  | "sphere"
  | "voice"
  | "tools"
  | "briefing"
  | "automation"
  | "system";

export interface Feature {
  title: string;
  body: string;
  icon: FeatureIconKey;
}
