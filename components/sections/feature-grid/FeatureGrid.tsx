import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { FeatureTile } from "./FeatureTile";
import { features } from "./features.data";

export function FeatureGrid() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Product"
          title="What JARVIS ships with"
          sub="32 AI tool functions, five integrations, and a real-time holographic data sphere — all on a ~10 MB native binary."
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
