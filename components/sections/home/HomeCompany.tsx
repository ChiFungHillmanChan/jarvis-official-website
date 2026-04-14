import { getCopy } from "@/content/getCopy";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";

export async function HomeCompany() {
  const copy = await getCopy();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.home.company.eyebrow}
          title={copy.home.company.title}
          sub={copy.home.company.sub}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {copy.home.company.cards.map((card) => (
            <GlassPanel key={card.title} className="h-full">
              <h2 className="font-display text-2xl">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{card.body}</p>
            </GlassPanel>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-6">
          {copy.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-[var(--grid-line)] bg-[color:rgba(255,255,255,0.02)] px-5 py-6"
            >
              <div className="font-display text-4xl text-[color:var(--text-primary)]">
                {"suffix" in stat ? stat.suffix : ""}
                {stat.value}
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
