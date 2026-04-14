import { HeroHudBackdrop } from "./HeroHudBackdrop";
import { HeroHudRings } from "./HeroHudRings";
import { HeroHudScanner } from "./HeroHudScanner";
import { HeroHudOrbits } from "./HeroHudOrbits";
import { HeroHudReactor } from "./HeroHudReactor";
import { HeroHudTelemetry, type Telemetry } from "./HeroHudTelemetry";
import { HeroHudStatusBar } from "./HeroHudStatusBar";

export function HeroHud({ telemetry, status }: { telemetry: Telemetry; status: string }) {
  return (
    <>
      <HeroHudBackdrop />
      <HeroHudScanner />
      <HeroHudRings />
      <HeroHudOrbits />
      <HeroHudReactor />
      <HeroHudTelemetry telemetry={telemetry} />
      <HeroHudStatusBar status={status} />
    </>
  );
}
