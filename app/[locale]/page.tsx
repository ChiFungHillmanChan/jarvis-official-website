import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter, getRouteMetadata } from "@/content/metadata";
import { HomeAccess } from "@/components/sections/home/HomeAccess";
import { HomeAudience } from "@/components/sections/home/HomeAudience";
import { HomeCompany } from "@/components/sections/home/HomeCompany";
import { HomeDemo } from "@/components/sections/home/HomeDemo";
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
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.home.title },
    description: rm.home.description,
    alternates: buildAlternates(locale, "/"),
    openGraph: buildOpenGraph(locale, rm.home),
    twitter: buildTwitter(rm.home),
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
      <HomeHero />
      <HomeTrust />
      <HomeProduct />
      <HomeAudience />
      <HomeCompany />
      <HomeDemo />
      <HomeAccess />
    </>
  );
}
