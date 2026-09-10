import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/nav/Nav";
import { Footer } from "@/components/layout/footer/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import {
  baseMetadata,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  getRouteMetadata,
} from "@/content/metadata";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    ...baseMetadata,
    title: { default: rm.home.title, template: "%s · JARVIS AI" },
    description: rm.home.description,
    alternates: buildAlternates(locale, "/"),
    openGraph: buildOpenGraph(locale, rm.home),
    twitter: buildTwitter(rm.home),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const htmlLang = locale === "zh-HK" ? "zh-Hant-HK" : "en";

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale}>
          <OrganizationJsonLd />
          <a className="skip-link" href="#main-content">
            {locale === "zh-HK" ? "跳至主要內容" : "Skip to content"}
          </a>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
