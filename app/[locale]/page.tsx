import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HomeAccess } from "@/components/sections/home/HomeAccess";
import { HomeAudience } from "@/components/sections/home/HomeAudience";
import { HomeCompany } from "@/components/sections/home/HomeCompany";
import { HomeDemo } from "@/components/sections/home/HomeDemo";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeProduct } from "@/components/sections/home/HomeProduct";
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
      <HomeProduct />
      <HomeAudience />
      <HomeDemo />
      <HomeTrust />
      <HomeCompany />
      <HomeFaq />
      <HomeAccess />
    </>
  );
}
