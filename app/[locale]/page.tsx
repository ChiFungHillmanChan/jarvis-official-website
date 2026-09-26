import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { HomeOverview } from "@/components/sections/home/HomeOverview";
import { HomeInvitation } from "@/components/sections/home/HomeInvitation";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeTrust } from "@/components/sections/home/HomeTrust";
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageJsonLd locale={locale} routeKey="home" />
      <SoftwareApplicationJsonLd locale={locale} />
      <HomeHero />
      <HomeOverview />
      <HomeTrust />
      <HomeFaq />
      <HomeInvitation />
    </>
  );
}
