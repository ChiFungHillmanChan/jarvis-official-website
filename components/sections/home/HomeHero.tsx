import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { company, getCompanyL10n } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { localePath } from "@/lib/i18n/localePath";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

export async function HomeHero() {
  const copy = await getCopy();
  const locale = await getLocale();
  const companyL10n = getCompanyL10n(locale);

  return (
    <section
      className={`surface-grid relative overflow-hidden ${section.paddingX} pt-20 pb-16 md:pt-28 md:pb-24`}
    >
      <div
        className={`mx-auto grid ${section.maxWidth} gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center`}
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-cyan)]">
            {copy.home.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            {copy.home.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">
            {copy.home.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#access" variant="primary">
              {copy.home.hero.primaryCta}
            </Button>
            <Button href={localePath(locale, "/company")} variant="ghost">
              {copy.home.hero.secondaryCta}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            <span>
              {company.productName} {company.productVersion}
            </span>
            <span>{companyL10n.locationLine}</span>
            <span>{companyL10n.statusLine}</span>
          </div>
        </div>

        <GlassPanel className="p-4 md:p-5">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--grid-line)] px-2 pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--accent-cyan)]">
                {copy.home.hero.summaryLabel}
              </p>
              <h2 className="mt-2 font-display text-2xl">{copy.home.hero.summaryTitle}</h2>
            </div>
            <span className="rounded-full border border-[var(--grid-line)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              {copy.home.hero.summaryBadge}
            </span>
          </div>
          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[var(--grid-line)] bg-[var(--bg-elevated)]">
            <Image
              src="/jarvis-demo-screenshot.webp"
              alt={copy.home.hero.imageAlt}
              width={1600}
              height={1000}
              className="h-auto w-full"
              priority
            />
          </div>
          <p className="mt-5 text-sm leading-7 text-[color:var(--text-secondary)]">
            {copy.home.hero.summaryBody}
          </p>
          <ul className="mt-5 space-y-3">
            {copy.home.hero.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-6 text-[color:var(--text-secondary)]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-cyan)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </section>
  );
}
