export type PillarIconKey = "voice" | "local" | "agentic";

export interface Pillar {
  title: string;
  body: string;
  icon: PillarIconKey;
}
