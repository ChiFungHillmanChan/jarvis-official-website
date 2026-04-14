import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { StatCounter } from "./StatCounter";
import { stats } from "./stats.data";

export function Stats() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="By the numbers" title="What's in the 0.1.0 binary" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} suffix={"suffix" in s ? s.suffix : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
