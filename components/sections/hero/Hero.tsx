import { ReducedMotionGate } from "@/components/ui/ReducedMotionGate";
import { getCopy } from "@/content/getCopy";
import { HeroHeadline } from "./HeroHeadline";
import { HeroCtas } from "./HeroCtas";
import { HeroHud } from "./HeroHud";
import { HeroHudStatic } from "./HeroHudStatic";

export async function Hero() {
  const copy = await getCopy();
  const hud = copy.sections.hud;

  return (
    <section className="relative isolate overflow-hidden min-h-[640px] sm:min-h-[760px] md:min-h-[900px]">
      <ReducedMotionGate fallback={<HeroHudStatic telemetry={hud.telemetry} />}>
        <HeroHud telemetry={hud.telemetry} status={hud.status} />
      </ReducedMotionGate>
      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-6 py-24 sm:min-h-[760px] sm:py-32 md:min-h-[900px] md:px-10 md:py-40">
        <HeroHeadline h1={copy.hero.h1} sub={copy.hero.sub} />
        <HeroCtas primaryCta={copy.hero.primaryCta} secondaryCta={copy.hero.secondaryCta} />
      </div>
    </section>
  );
}
