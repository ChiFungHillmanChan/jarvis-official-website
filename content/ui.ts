import type { Locale } from "@/i18n/routing";

type UiStrings = {
  nav: {
    product: string;
    company: string;
    contact: string;
    download: string;
    requestAccess: string;
    openMenu: string;
    closeMenu: string;
    languageToggle: string;
  };
  contact: {
    eyebrow: string;
    emailLabel: string;
    locationLabel: string;
    emailInputLabel: string;
  };
  legal: {
    eyebrow: string;
  };
  waitlist: {
    submitting: string;
    // Shown when /api/waitlist answers 429. {n} is the wait it reports.
    rateLimitedMinutes: string;
    rateLimitedHours: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    sub: string;
    back: string;
  };
  footer: {
    rightsReserved: string;
  };
};

const ui: Record<Locale, UiStrings> = {
  en: {
    nav: {
      product: "Product",
      company: "Company",
      contact: "Contact",
      download: "Download",
      requestAccess: "Request access",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageToggle: "Switch to {language}",
    },
    contact: {
      eyebrow: "Contact",
      emailLabel: "Email",
      locationLabel: "Location",
      emailInputLabel: "Email address",
    },
    legal: { eyebrow: "Legal" },
    waitlist: {
      submitting: "…",
      // Abbreviated units so one string covers a wait of one or of many.
      rateLimitedMinutes: "Too many attempts right now. Please try again in about {n} min.",
      rateLimitedHours: "Too many attempts right now. Please try again in about {n} hr.",
    },
    notFound: {
      eyebrow: "404",
      title: "Page not found",
      sub: "The page you were looking for does not exist on this site.",
      back: "Back to home",
    },
    footer: { rightsReserved: "All rights reserved." },
  },
  "zh-HK": {
    nav: {
      product: "產品",
      company: "公司",
      contact: "聯絡",
      download: "下載",
      requestAccess: "申請試用",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      languageToggle: "切換至 {language}",
    },
    contact: {
      eyebrow: "聯絡",
      emailLabel: "電郵",
      locationLabel: "地點",
      emailInputLabel: "電郵地址",
    },
    legal: { eyebrow: "法律" },
    waitlist: {
      submitting: "…",
      rateLimitedMinutes: "嘗試次數過多，請於約 {n} 分鐘後再試。",
      rateLimitedHours: "嘗試次數過多，請於約 {n} 小時後再試。",
    },
    notFound: {
      eyebrow: "404",
      title: "找不到此頁",
      sub: "你正在尋找的頁面並不存在於本網站。",
      back: "返回首頁",
    },
    footer: { rightsReserved: "版權所有，不得轉載。" },
  },
};

export function getUiFor(locale: string): UiStrings {
  return ui[locale as Locale] ?? ui.en;
}

export type { UiStrings };
