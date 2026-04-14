import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { copy } from "@/content/copy.en";
import { PillarCard } from "./PillarCard";
import { pillars } from "./pillars.data";

export function Pillars() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.sections.pillars.eyebrow}
          title={copy.sections.pillars.title}
          sub={copy.sections.pillars.sub}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <PillarCard key={p.title} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
