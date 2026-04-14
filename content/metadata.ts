import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jarvis-automation.com";

export const baseMetadata = {
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    siteName: "JARVIS AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JARVIS AI" }],
  },
  twitter: { card: "summary_large_image" },
} satisfies Metadata;

type RouteMeta = { title: string; description: string; canonical: string };
type RouteKey = "home" | "company" | "contact" | "privacy" | "terms";

const en: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS AI — Your desktop, operated at the speed of thought",
    description:
      "JARVIS is a native macOS AI assistant that unifies Gmail, Calendar, Notion, GitHub, and Obsidian into one voice-controlled command center. 32 AI tools. Local-first.",
    canonical: "/",
  },
  company: {
    title: "Company · JARVIS AI",
    description:
      "JARVIS AI is a Hong Kong-based startup building native desktop AI agents for engineers and operators.",
    canonical: "/company",
  },
  contact: {
    title: "Contact · JARVIS AI",
    description: "Business contact, beta waitlist, and press inquiries for JARVIS AI.",
    canonical: "/contact",
  },
  privacy: {
    title: "Privacy · JARVIS AI",
    description: "How JARVIS AI handles data. Local-first architecture. No user data on our servers.",
    canonical: "/privacy",
  },
  terms: {
    title: "Terms · JARVIS AI",
    description: "Terms of service for the JARVIS beta.",
    canonical: "/terms",
  },
};

const zhHk: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS AI — 以思考的速度操控你的桌面",
    description:
      "JARVIS 是一款原生 macOS AI 助理,將 Gmail、日曆、Notion、GitHub 及 Obsidian 整合於一個語音操控的指揮中心。32 個 AI 工具。本地優先。",
    canonical: "/",
  },
  company: {
    title: "公司 · JARVIS AI",
    description: "JARVIS AI 是一間總部位於香港的初創,專注為工程師及操作者打造原生桌面 AI 代理。",
    canonical: "/company",
  },
  contact: {
    title: "聯絡 · JARVIS AI",
    description: "JARVIS AI 的商業聯絡、Beta 等候名單及傳媒查詢。",
    canonical: "/contact",
  },
  privacy: {
    title: "私隱 · JARVIS AI",
    description: "JARVIS AI 如何處理資料。本地優先架構。我們的伺服器不儲存使用者資料。",
    canonical: "/privacy",
  },
  terms: {
    title: "條款 · JARVIS AI",
    description: "JARVIS Beta 的服務條款。",
    canonical: "/terms",
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
