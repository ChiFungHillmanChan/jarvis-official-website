import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { copy } from "@/content/copy.en";
import { FeatureTile } from "./FeatureTile";
import { features } from "./features.data";

export function FeatureGrid() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.sections.features.eyebrow}
          title={copy.sections.features.title}
          sub={copy.sections.features.sub}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureTile key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
