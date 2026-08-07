import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/constants/site";

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
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
    url: `${siteUrl}/${normalized}${pathSuffix}`,
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
type RouteKey = "home" | "company" | "contact" | "download" | "privacy" | "terms" | "security";

const en: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS AI — Never miss a client follow-up again",
    description:
      "JARVIS turns Gmail and Calendar into a daily action brief on your Mac: what to reply, book, and chase — drafted first, approved by you. Built in Hong Kong.",
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
  download: {
    title: "Download JARVIS for macOS",
    description:
      "Download JARVIS for macOS, the desktop AI assistant that turns Gmail and Calendar into approved actions. Requires macOS 12 or later on Apple Silicon.",
    canonical: "/download",
  },
  privacy: {
    title: "Privacy Policy · JARVIS AI",
    description:
      "How JARVIS AI handles website submissions and the product data stored on your Mac.",
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
    title: "JARVIS AI — 唔再漏覆客、漏跟進",
    description:
      "JARVIS 每朝把你的 Gmail 同 Calendar 整理成行動簡報：要覆、要約、要追的事先擬好草稿，由你批准先執行。香港打造，資料儲存在本機。",
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
  download: {
    title: "下載 JARVIS for macOS",
    description:
      "下載 JARVIS for macOS，把 Gmail 同 Calendar 變成經你批准的行動的桌面 AI 助理。需要 macOS 12 或以上，並使用 Apple Silicon。",
    canonical: "/download",
  },
  privacy: {
    title: "私隱政策 · JARVIS AI",
    description: "JARVIS AI 如何處理網站提交資料，以及儲存在本機的產品數據。",
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
