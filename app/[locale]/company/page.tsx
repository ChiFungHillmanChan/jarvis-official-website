import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter, getRouteMetadata } from "@/content/metadata";
import { getCopy } from "@/content/getCopy";
import { company, getCompanyL10n } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";

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
    openGraph: buildOpenGraph(locale, rm.company),
    twitter: buildTwitter(rm.company),
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
  const companyL10n = getCompanyL10n(locale);
  const labels =
    locale === "zh-HK"
      ? {
          company: "公司",
          product: "產品",
          location: "地點",
          status: "狀態",
        }
      : {
          company: "Company",
          product: "Product",
          location: "Location",
          status: "Status",
        };

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth} space-y-16`}>
        <SectionHeading
          eyebrow={company.name}
          title={copy.companyPage.heading}
          sub={copy.companyPage.sub}
          as="h1"
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassPanel className="h-full">
            <p className="text-base leading-8 text-[color:var(--text-secondary)]">
              {copy.companyPage.intro}
            </p>
          </GlassPanel>
          <GlassPanel className="h-full">
            <ul className="space-y-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{labels.company}: </span>
                {company.name}
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{labels.product}: </span>
                {company.productName} for macOS
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{labels.location}: </span>
                {companyL10n.locationLine}
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{labels.status}: </span>
                {companyL10n.statusLine}
              </li>
            </ul>
          </GlassPanel>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.companyPage.cards.map((card) => (
            <GlassPanel key={card.title} className="h-full">
              <h2 className="font-display text-2xl">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{card.body}</p>
            </GlassPanel>
          ))}
        </div>
        <GlassPanel>
          <h2 className="font-display text-3xl">{copy.companyPage.principlesHeading}</h2>
          <ul className="mt-6 space-y-4">
            {copy.companyPage.principles.map((principle) => (
              <li key={principle} className="flex gap-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-cyan)]" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-7 text-[color:var(--text-secondary)]">
            {copy.companyPage.closing}
          </p>
          <div className="mt-8">
            <Button href={`/${locale}/contact`} variant="primary">
              {copy.home.access.contactLinkLabel}
            </Button>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
