import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, getRouteMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";
import { Preview } from "@/components/sections/preview/Preview";
import { TrustStrip } from "@/components/sections/trust-strip/TrustStrip";
import { Pillars } from "@/components/sections/pillars/Pillars";
import { IntegrationsMarquee } from "@/components/sections/integrations-marquee/IntegrationsMarquee";
import { FeatureGrid } from "@/components/sections/feature-grid/FeatureGrid";
import { Demo } from "@/components/sections/demo/Demo";
import { Stats } from "@/components/sections/stats/Stats";
import { RoadmapTeaser } from "@/components/sections/roadmap-teaser/RoadmapTeaser";
import { FounderNote } from "@/components/sections/founder-note/FounderNote";
import { WaitlistCta } from "@/components/sections/waitlist-cta/WaitlistCta";
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.home.title },
    description: rm.home.description,
    alternates: buildAlternates(locale, "/"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SoftwareApplicationJsonLd />
      <Hero />
      <Preview />
      <TrustStrip />
      <Pillars />
      <IntegrationsMarquee />
      <FeatureGrid />
      <Demo />
      <Stats />
      <RoadmapTeaser />
      <FounderNote />
      <WaitlistCta />
    </>
  );
}
