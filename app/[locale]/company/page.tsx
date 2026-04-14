import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, getRouteMetadata } from "@/content/metadata";
import { getCopy } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { localePath } from "@/lib/i18n/localePath";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.company.title },
    description: rm.company.description,
    alternates: buildAlternates(locale, "/company"),
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getCopy();
  const ui = getUiFor(locale);

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={ui.company.eyebrow}
          title={copy.company.heading}
          sub={copy.company.sub}
          as="h1"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.company.sections.map((s) => (
            <GlassPanel key={s.title}>
              <h2 className="font-display text-xl">{s.title}</h2>
              <p className="mt-3 text-sm text-[color:var(--text-muted)]">{s.body}</p>
            </GlassPanel>
          ))}
        </div>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
          {ui.company.getInTouch} —{" "}
          <Link href={localePath(locale, "/contact")} className="text-[color:var(--accent-cyan)]">
            {ui.company.contactLinkLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
