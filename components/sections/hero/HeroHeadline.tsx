import { copy } from "@/content/copy.en";

export function HeroHeadline() {
  return (
    <div className="max-w-2xl lg:max-w-3xl">
      <h1 className="font-display text-3xl leading-[1.08] sm:text-4xl md:text-6xl lg:text-7xl">
        {copy.hero.h1}
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--text-muted)] sm:max-w-lg sm:text-base md:mt-6 md:text-lg">
        {copy.hero.sub}
      </p>
    </div>
  );
}
