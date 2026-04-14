import { HeroHudBackdrop } from "./HeroHudBackdrop";
import { HeroHudRings } from "./HeroHudRings";
import { HeroHudScanner } from "./HeroHudScanner";
import { HeroHudOrbits } from "./HeroHudOrbits";
import { HeroHudReactor } from "./HeroHudReactor";
import { HeroHudTelemetry } from "./HeroHudTelemetry";
import { HeroHudStatusBar } from "./HeroHudStatusBar";

export function HeroHud() {
  return (
    <>
      <HeroHudBackdrop />
      <HeroHudScanner />
      <HeroHudRings />
      <HeroHudOrbits />
      <HeroHudReactor />
      <HeroHudTelemetry />
      <HeroHudStatusBar />
    </>
  );
}
