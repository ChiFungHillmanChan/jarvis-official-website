import { getCopy } from "@/content/getCopy";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";

export async function HomeAudience() {
  const copy = await getCopy();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.home.audience.eyebrow}
          title={copy.home.audience.title}
          sub={copy.home.audience.sub}
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.home.audience.groups.map((group) => (
            <GlassPanel key={group.title} className="h-full">
              <h2 className="font-display text-2xl">{group.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{group.body}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
