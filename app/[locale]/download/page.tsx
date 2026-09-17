import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getCopy } from "@/content/getCopy";
import DownloadClient from "./DownloadClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "download");
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getCopy();
  return (
    <>
      <PageJsonLd locale={locale} routeKey="download" />
      <DownloadClient copy={copy.download} locale={locale} />
    </>
  );
}
