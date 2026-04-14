import Image from "next/image";
import { getCopy } from "@/content/getCopy";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";

export async function HomeProduct() {
  const copy = await getCopy();

  return (
    <section id="product" className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.home.product.eyebrow}
          title={copy.home.product.title}
          sub={copy.home.product.sub}
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <GlassPanel className="p-4 md:p-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-[var(--grid-line)] bg-[var(--bg-elevated)]">
              <Image
                src="/jarvis-demo-screenshot.avif"
                alt={copy.home.hero.imageAlt}
                width={1600}
                height={1000}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
              {copy.home.product.imageCaption}
            </p>
          </GlassPanel>
          <div className="space-y-5">
            {copy.home.product.items.map((item) => (
              <GlassPanel key={item.title}>
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{item.body}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
