import { getCopy } from "@/content/getCopy";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";

export async function HomeTrust() {
  const copy = await getCopy();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow={copy.home.trust.eyebrow} title={copy.home.trust.title} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.home.trust.items.map((item) => (
            <GlassPanel key={item.title} className="h-full">
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{item.body}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
