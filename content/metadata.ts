import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jarvis-automation.com";

export const baseMetadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "JARVIS AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JARVIS AI" }],
  },
  twitter: { card: "summary_large_image" },
} satisfies Metadata;

const OG_LOCALE: Record<Locale, string> = { en: "en_US", "zh-HK": "zh_HK" };

export function buildOpenGraph(locale: string, route: RouteMeta): NonNullable<Metadata["openGraph"]> {
  const normalized = (locale as Locale) in OG_LOCALE ? (locale as Locale) : "en";
  const alternate = normalized === "zh-HK" ? ["en_US"] : ["zh_HK"];
  const pathSuffix = route.canonical === "/" ? "" : route.canonical;
  return {
    ...baseMetadata.openGraph,
    title: route.title,
    description: route.description,
    url: `${baseUrl}/${normalized}${pathSuffix}`,
    locale: OG_LOCALE[normalized],
    alternateLocale: alternate,
  };
}

export function buildTwitter(route: RouteMeta): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: route.title,
    description: route.description,
    images: ["/og-image.png"],
  };
}

type RouteMeta = { title: string; description: string; canonical: string };
type RouteKey = "home" | "company" | "contact" | "privacy" | "terms" | "security";

const en: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS AI — Desktop AI for operators and engineers",
    description:
      "JARVIS AI is a Hong Kong startup building JARVIS for macOS, a local-first desktop AI assistant for operators and engineers.",
    canonical: "/",
  },
  company: {
    title: "About JARVIS AI",
    description:
      "Learn about JARVIS AI, the Hong Kong startup behind JARVIS for macOS.",
    canonical: "/company",
  },
  contact: {
    title: "Contact JARVIS AI",
    description: "Business contact, beta access requests, and company inquiries for JARVIS AI.",
    canonical: "/contact",
  },
  privacy: {
    title: "Privacy Policy · JARVIS AI",
    description: "How JARVIS AI handles website submissions and local-first product data.",
    canonical: "/privacy",
  },
  terms: {
    title: "Terms of Service · JARVIS AI",
    description: "Terms governing access to the JARVIS website and private beta.",
    canonical: "/terms",
  },
  security: {
    title: "Security · JARVIS AI",
    description:
      "How JARVIS AI handles data, transport encryption, access controls, service providers, and security reports.",
    canonical: "/security",
  },
};

const zhHk: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS AI — 為營運者與工程師而設的桌面 AI",
    description:
      "JARVIS AI 是一間香港初創，正在打造 JARVIS for macOS，一款為營運者與工程師而設、本地優先的桌面 AI 助理。",
    canonical: "/",
  },
  company: {
    title: "關於 JARVIS AI",
    description: "了解 JARVIS AI 以及其為 macOS 打造的桌面 AI 產品。",
    canonical: "/company",
  },
  contact: {
    title: "聯絡 JARVIS AI",
    description: "JARVIS AI 的商業聯絡、Beta 試用申請及公司查詢。",
    canonical: "/contact",
  },
  privacy: {
    title: "私隱政策 · JARVIS AI",
    description: "JARVIS AI 如何處理網站提交資料及本地優先產品數據。",
    canonical: "/privacy",
  },
  terms: {
    title: "服務條款 · JARVIS AI",
    description: "規管 JARVIS 網站及私人 Beta 存取的條款。",
    canonical: "/terms",
  },
  security: {
    title: "安全 · JARVIS AI",
    description:
      "JARVIS AI 如何處理資料、傳輸加密、存取控制、服務供應商及安全通報。",
    canonical: "/security",
  },
};

const byLocale: Record<Locale, Record<RouteKey, RouteMeta>> = {
  en,
  "zh-HK": zhHk,
};

export function getRouteMetadata(locale: string): Record<RouteKey, RouteMeta> {
  return byLocale[locale as Locale] ?? en;
}

export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {
    en: `/en${path === "/" ? "" : path}`,
    "zh-HK": `/zh-HK${path === "/" ? "" : path}`,
  };
  return {
    canonical: `/${locale}${path === "/" ? "" : path}`,
    languages,
  };
}

export type { RouteKey };
