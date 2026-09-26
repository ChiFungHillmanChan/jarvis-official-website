import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/constants/site";
import { routes } from "@/lib/constants/routes";

export function buildSiteVerification(
  token = process.env.GOOGLE_SITE_VERIFICATION,
): Metadata["verification"] {
  const google = token?.trim();
  return google ? { google } : undefined;
}

export const baseMetadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JARVIS AI",
  category: "productivity",
  verification: buildSiteVerification(),
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
        alt: "JARVIS — your personal AI assistant. Currently in beta for macOS.",
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
  const normalized = locale === "zh-HK" ? "zh-HK" : "en";
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
    title: "JARVIS — Personal AI Assistant for Everyday Work",
    description:
      "Meet JARVIS, your personal AI assistant for voice, text and Gmail workflows, with instructions and memories you control. Currently in beta for macOS.",
    canonical: routes.home,
  },
  product: {
    title: "JARVIS AI Assistant — Voice, Memory & Gmail Workflows",
    description:
      "Explore JARVIS: voice and text conversations, multiple Gmail accounts, email groups and source-linked memories. See what the current macOS beta can do.",
    canonical: routes.product,
  },
  demo: {
    title: "JARVIS Demo — See Your Personal AI Assistant in Action",
    description:
      "See JARVIS in action and explore how voice, personal context and Gmail workflows fit into everyday work. Learn about the current beta and its limits.",
    canonical: routes.demo,
  },
  beta: {
    title: "Join the JARVIS Beta — Personal AI Assistant",
    description:
      "Apply to try the JARVIS personal AI assistant, currently in beta for macOS. Share your workflow and help shape voice, memory and email features.",
    canonical: routes.beta,
  },
  howItWorks: {
    title: "How JARVIS Works — AI Assistant Setup & Gmail Guide",
    description:
      "Set up JARVIS for voice and text, then connect Gmail, group messages and analyse them with your own context. Learn AI settings, data controls and beta limits.",
    canonical: routes.howItWorks,
  },
  company: {
    title: "About JARVIS AI",
    description: "Meet JARVIS AI LIMITED, the Hong Kong company building a personal AI assistant. Learn about our approach to useful AI, clear controls and everyday work.",
    canonical: routes.company,
  },
  contact: {
    title: "Contact JARVIS AI",
    description: "Business contact, beta access requests, and company inquiries for JARVIS AI.",
    canonical: routes.contact,
  },
  download: {
    title: "Download JARVIS for Mac — Personal AI Assistant Beta",
    description:
      "Get the JARVIS personal AI assistant beta for Apple Silicon Mac. Explore voice, text and Gmail workflows. Requires macOS 12 or later; setup guide included.",
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
    title: "JARVIS — 協助日常工作的個人 AI 助理",
    description:
      "認識 JARVIS 個人 AI 助理，以語音或文字處理日常工作，集中整理 Gmail，配合由你管理的指示與來源記憶。目前提供 macOS Beta，讓你逐步建立自己的 AI 工作流程。",
    canonical: routes.home,
  },
  product: {
    title: "JARVIS AI 助理功能 — 語音、記憶與 Gmail 工作流程",
    description:
      "了解 JARVIS 的語音及文字對話、多個 Gmail 帳戶、跨信箱分組與可核對來源的記憶。查看目前 macOS Beta 的功能、資料處理方式與使用限制。",
    canonical: routes.product,
  },
  demo: {
    title: "JARVIS 產品示範 — 了解個人 AI 助理的工作方式",
    description:
      "觀看 JARVIS 示範，了解語音、個人背景與 Gmail 工作流程如何融入日常工作。查看目前 Beta 的使用方式與功能界線，再決定是否參與試用。",
    canonical: routes.demo,
  },
  beta: {
    title: "申請 JARVIS Beta — 參與個人 AI 助理試用",
    description:
      "申請試用 JARVIS 個人 AI 助理，目前提供 macOS Beta。分享你的工作流程與需求，協助改善語音互動、個人記憶及電郵整理體驗。",
    canonical: routes.beta,
  },
  howItWorks: {
    title: "JARVIS 使用指南 — AI 助理設定與 Gmail 工作區",
    description:
      "從語音及文字對話開始設定 JARVIS，再連接 Gmail、跨信箱分組，配合個人指示與來源記憶分析。了解 AI 設定、資料處理及目前 Beta 的使用界線。",
    canonical: routes.howItWorks,
  },
  company: {
    title: "關於 JARVIS AI",
    description: "認識 JARVIS AI LIMITED，打造個人 AI 助理的香港公司。了解我們如何將實用 AI、清晰控制與日常工作結合，讓產品隨用戶的需要持續改善。",
    canonical: routes.company,
  },
  contact: {
    title: "聯絡 JARVIS AI",
    description: "JARVIS AI 的商業聯絡、Beta 試用申請及公司查詢。",
    canonical: routes.contact,
  },
  download: {
    title: "下載 JARVIS for Mac — 個人 AI 助理 Beta",
    description:
      "下載 JARVIS 個人 AI 助理 Beta，體驗語音、文字與 Gmail 工作流程。現階段適用於 Apple Silicon Mac 及 macOS 12 或以上，附設安裝與設定指南。",
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
  return byLocale[locale === "zh-HK" ? "zh-HK" : "en"];
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
