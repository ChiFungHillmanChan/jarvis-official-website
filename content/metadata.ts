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
    images: [
      {
        url: "/social-image.png",
        width: 1200,
        height: 630,
        alt: "JARVIS — your AI assistant for Mac",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
} satisfies Metadata;

const OG_LOCALE: Record<Locale, string> = { en: "en_US", "zh-HK": "zh_HK" };

export function buildOpenGraph(
  locale: string,
  route: RouteMeta,
): NonNullable<Metadata["openGraph"]> {
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
    images: ["/social-image.png"],
  };
}

type RouteMeta = { title: string; description: string; canonical: string };
type RouteKey =
  | "home"
  | "howItWorks"
  | "company"
  | "contact"
  | "download"
  | "privacy"
  | "terms"
  | "security";

const en: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS — AI Assistant for Mac, Gmail & Calendar",
    description:
      "An AI assistant for Mac that helps you triage Gmail, draft replies and manage Google Calendar. Explore the workflow and request access to the JARVIS beta.",
    canonical: "/",
  },
  howItWorks: {
    title: "How JARVIS Works — Mac Setup, Gmail & Calendar",
    description:
      "Set up JARVIS on your Mac, choose an AI provider, connect Gmail and Calendar, and create your first email draft. Learn what is stored locally and sent to AI providers.",
    canonical: "/how-it-works",
  },
  company: {
    title: "About JARVIS AI",
    description: "Learn about JARVIS AI, the Hong Kong startup behind JARVIS for macOS.",
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
      "Get JARVIS, the AI assistant for Mac that helps with Gmail drafts and Google Calendar. Requires macOS 12 or later on Apple Silicon. Beta setup details included.",
    canonical: "/download",
  },
  privacy: {
    title: "Privacy Policy · JARVIS AI",
    description:
      "How JARVIS AI handles website submissions, local app storage and the content processed by your configured AI providers.",
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
    title: "JARVIS — Mac AI 助理，整理 Gmail 與 Google Calendar",
    description:
      "JARVIS 是為 Mac 打造的 AI 助理，協助整理 Gmail、擬寫回覆及管理 Google Calendar。了解實際工作流程，申請加入 Beta 測試。",
    canonical: "/",
  },
  howItWorks: {
    title: "JARVIS 使用指南 — Mac 設定、Gmail 與 Google Calendar",
    description:
      "了解如何在 Mac 設定 JARVIS、選擇 AI 供應商、連接 Gmail 和 Calendar，並建立第一封電郵草稿。清楚認識本機儲存與 AI 供應商處理資料的分別。",
    canonical: "/how-it-works",
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
      "下載 JARVIS Mac AI 助理，協助擬寫 Gmail 草稿及管理 Google Calendar。需要配備 Apple Silicon 的 Mac 及 macOS 12 或以上，並提供 Beta 設定說明。",
    canonical: "/download",
  },
  privacy: {
    title: "私隱政策 · JARVIS AI",
    description: "了解 JARVIS AI 如何處理網站提交資料、本機儲存，以及由所選 AI 供應商處理的內容。",
    canonical: "/privacy",
  },
  terms: {
    title: "服務條款 · JARVIS AI",
    description: "規管 JARVIS 網站及私人 Beta 存取的條款。",
    canonical: "/terms",
  },
  security: {
    title: "安全 · JARVIS AI",
    description: "JARVIS AI 如何處理資料、傳輸加密、存取控制、服務供應商及安全通報。",
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
    "x-default": `/en${path === "/" ? "" : path}`,
  };
  return {
    canonical: `/${locale}${path === "/" ? "" : path}`,
    languages,
  };
}

export type { RouteKey };
