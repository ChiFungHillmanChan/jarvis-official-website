import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { FeatureTile } from "./FeatureTile";
import { buildFeatures } from "./features.data";

export async function FeatureGrid() {
  const copy = await getCopy();
  const features = buildFeatures(copy);

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
