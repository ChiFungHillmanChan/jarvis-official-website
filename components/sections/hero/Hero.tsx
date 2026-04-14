import { ReducedMotionGate } from "@/components/ui/ReducedMotionGate";
import { HeroHeadline } from "./HeroHeadline";
import { HeroCtas } from "./HeroCtas";
import { HeroPoster } from "./HeroPoster";
import { HeroVideo } from "./HeroVideo";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroPoster />
      <ReducedMotionGate fallback={null}>
        <HeroVideo />
        <HeroParallax />
      </ReducedMotionGate>
      <div className="mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-40">
        <HeroHeadline />
        <HeroCtas />
      </div>
    </section>
  );
}
