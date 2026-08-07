import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter, getRouteMetadata } from "@/content/metadata";
import { getCopy } from "@/content/getCopy";
import DownloadClient from "./DownloadClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.download.title },
    description: rm.download.description,
    alternates: buildAlternates(locale, "/download"),
    openGraph: buildOpenGraph(locale, rm.download),
    twitter: buildTwitter(rm.download),
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getCopy();
  return <DownloadClient copy={copy.download} locale={locale} />;
}
