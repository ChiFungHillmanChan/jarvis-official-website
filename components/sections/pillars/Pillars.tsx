import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { PillarCard } from "./PillarCard";
import { pillars } from "./pillars.data";

export function Pillars() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Principles"
          title="Voice. Local. Agentic."
          sub="Three commitments the product is built around — not marketing copy."
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
