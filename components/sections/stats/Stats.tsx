import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { StatCounter } from "./StatCounter";

export async function Stats() {
  const copy = await getCopy();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.sections.stats.eyebrow}
          title={copy.sections.stats.title}
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {copy.stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              label={s.label}
              suffix={"suffix" in s ? (s as { suffix?: string }).suffix : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
