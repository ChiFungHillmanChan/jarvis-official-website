import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { PillarCard } from "./PillarCard";
import { buildPillars } from "./pillars.data";

export async function Pillars() {
  const copy = await getCopy();
  const pillars = buildPillars(copy);

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
