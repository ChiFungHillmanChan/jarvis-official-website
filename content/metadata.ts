import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/constants/site";
import { routes } from "@/lib/constants/routes";

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JARVIS AI",
  category: "productivity",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        alt: "JARVIS — a personal AI email workspace for Mac",
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
    images: baseMetadata.openGraph.images.map(({ url, alt }) => ({ url, alt })),
  };
}

type RouteMeta = { title: string; description: string; canonical: string };
type RouteKey = keyof typeof routes;

const en: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS — Personal AI Email Workspace for Mac",
    description:
      "Bring multiple Gmail accounts into one Mac workspace. Group related emails, add your instructions and source memories, and review AI answers with email references.",
    canonical: routes.home,
  },
  howItWorks: {
    title: "How JARVIS Works — Gmail Workspace & Mac Setup",
    description:
      "Connect Gmail accounts, group related emails and analyse them with your instructions and source memories. Learn Mac setup, GPT processing and data controls.",
    canonical: routes.howItWorks,
  },
  company: {
    title: "About JARVIS AI",
    description: "Meet JARVIS AI, the Hong Kong startup building a personal email workspace for Mac. Learn about our approach to useful AI, clear controls and everyday work.",
    canonical: routes.company,
  },
  contact: {
    title: "Contact JARVIS AI",
    description: "Business contact, beta access requests, and company inquiries for JARVIS AI.",
    canonical: routes.contact,
  },
  download: {
    title: "Download JARVIS for Mac — AI Email Workspace",
    description:
      "Get the JARVIS beta for Apple Silicon Mac, with multiple Gmail accounts, email groups and personal AI context. Requires macOS 12 or later. Read the setup guide.",
    canonical: routes.download,
  },
  privacy: {
    title: "Privacy Policy · JARVIS AI",
    description:
      "How JARVIS AI handles website submissions, local app storage and the content processed by your configured AI providers.",
    canonical: routes.privacy,
  },
  terms: {
    title: "Terms of Service · JARVIS AI",
    description: "Terms governing access to the JARVIS website and private beta.",
    canonical: routes.terms,
  },
  security: {
    title: "Security · JARVIS AI",
    description:
      "How JARVIS AI handles data, transport encryption, access controls, service providers, and security reports.",
    canonical: routes.security,
  },
};

const zhHk: Record<RouteKey, RouteMeta> = {
  home: {
    title: "JARVIS — Mac 個人化 AI 電郵工作區，多個 Gmail 一起整理",
    description:
      "將多個 Gmail 集中喺同一個 Mac 工作區。跨信箱分組、加入個人指示同來源記憶，再用 AI 整理重點及下一步，每次分析附有可核對嘅郵件引用。",
    canonical: routes.home,
  },
  howItWorks: {
    title: "JARVIS 使用指南 — Gmail 工作區、GPT 分析同 Mac 設定",
    description:
      "了解點樣連接多個 Gmail、跨信箱分組，配合個人指示同來源記憶進行分析。由 Mac 設定到 GPT 資料處理，一步步掌握 JARVIS 工作流程。",
    canonical: routes.howItWorks,
  },
  company: {
    title: "關於 JARVIS AI",
    description: "認識 JARVIS AI，為 Mac 打造個人化電郵工作區嘅香港初創。了解我哋點樣將實用 AI、清晰控制同日常工作結合。",
    canonical: routes.company,
  },
  contact: {
    title: "聯絡 JARVIS AI",
    description: "JARVIS AI 的商業聯絡、Beta 試用申請及公司查詢。",
    canonical: routes.contact,
  },
  download: {
    title: "下載 JARVIS for Mac — 個人化 AI 電郵工作區",
    description:
      "下載 JARVIS Beta，喺 Mac 集中多個 Gmail、建立電郵分組同個人 AI 背景。適用於 Apple Silicon Mac 及 macOS 12 或以上，附設設定指南。",
    canonical: routes.download,
  },
  privacy: {
    title: "私隱政策 · JARVIS AI",
    description: "了解 JARVIS AI 如何處理網站提交資料、本機儲存，以及由所選 AI 供應商處理的內容。",
    canonical: routes.privacy,
  },
  terms: {
    title: "服務條款 · JARVIS AI",
    description: "規管 JARVIS 網站及私人 Beta 存取的條款。",
    canonical: routes.terms,
  },
  security: {
    title: "安全 · JARVIS AI",
    description: "JARVIS AI 如何處理資料、傳輸加密、存取控制、服務供應商及安全通報。",
    canonical: routes.security,
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
  const normalized = locale === "zh-HK" ? "zh-HK" : "en";
  const languages: Record<string, string> = {
    en: `/en${path === "/" ? "" : path}`,
    "zh-HK": `/zh-HK${path === "/" ? "" : path}`,
    "x-default": `/en${path === "/" ? "" : path}`,
  };
  return {
    canonical: `/${normalized}${path === "/" ? "" : path}`,
    languages,
  };
}

export function buildPageMetadata(locale: string, key: RouteKey): Metadata {
  const route = getRouteMetadata(locale)[key];
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: buildAlternates(locale, route.canonical),
    openGraph: buildOpenGraph(locale, route),
    twitter: buildTwitter(route),
  };
}

export type { RouteKey };
