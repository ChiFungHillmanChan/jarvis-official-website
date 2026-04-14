import { copy } from "@/content/copy.en";

export function HeroHeadline() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
        {copy.hero.h1}
      </h1>
      <p className="mt-6 max-w-2xl text-base text-[color:var(--text-muted)] md:text-lg">
        {copy.hero.sub}
      </p>
    </div>
  );
}
