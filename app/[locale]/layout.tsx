import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/layout/nav/Nav";
import { Footer } from "@/components/layout/footer/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import {
  baseMetadata,
  buildPageMetadata,
} from "@/content/metadata";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import "@/styles/assistant-site.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...baseMetadata,
    ...buildPageMetadata(locale, "home"),
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
  // The CSP nonce from proxy.ts is per request, so pages must never be
  // prerendered: static HTML would carry no nonce and every script would be blocked.
  await connection();

  const htmlLang = locale === "zh-HK" ? "zh-Hant-HK" : "en";

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen">
        <NextIntlClientProvider locale={locale}>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
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
