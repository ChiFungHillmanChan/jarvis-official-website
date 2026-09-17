import type { Locale } from "@/i18n/routing";

type UiStrings = {
  nav: {
    product: string;
    howItWorks: string;
    primaryLabel: string;
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
    productHeading: string;
    companyHeading: string;
    legalLabel: string;
    privacy: string;
    terms: string;
    security: string;
  };
};

const ui: Record<Locale, UiStrings> = {
  en: {
    nav: {
      product: "Product",
      howItWorks: "How it works",
      primaryLabel: "Main navigation",
      company: "Company",
      contact: "Contact",
      download: "Download",
      requestAccess: "Request beta access",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageToggle: "Switch to {language}",
    },
    contact: {
      eyebrow: "Contact",
      emailLabel: "Email",
      locationLabel: "Location",
      emailInputLabel: "Email address (required)",
    },
    legal: { eyebrow: "Legal" },
    waitlist: {
      submitting: "Sending your request…",
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
    footer: {
      rightsReserved: "All rights reserved.",
      productHeading: "Product",
      companyHeading: "Company",
      legalLabel: "Legal information",
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
    },
  },
  "zh-HK": {
    nav: {
      product: "產品",
      howItWorks: "使用方式",
      primaryLabel: "主要導覽",
      company: "公司",
      contact: "聯絡",
      download: "下載",
      requestAccess: "申請 Beta 試用",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      languageToggle: "切換至 {language}",
    },
    contact: {
      eyebrow: "聯絡",
      emailLabel: "電郵",
      locationLabel: "地點",
      emailInputLabel: "電郵地址（必填）",
    },
    legal: { eyebrow: "法律" },
    waitlist: {
      submitting: "正在提交申請…",
      rateLimitedMinutes: "嘗試次數過多，請於約 {n} 分鐘後再試。",
      rateLimitedHours: "嘗試次數過多，請於約 {n} 小時後再試。",
    },
    notFound: {
      eyebrow: "404",
      title: "找不到此頁",
      sub: "你正在尋找的頁面並不存在於本網站。",
      back: "返回首頁",
    },
    footer: {
      rightsReserved: "版權所有。",
      productHeading: "產品",
      companyHeading: "公司",
      legalLabel: "法律資訊",
      privacy: "私隱",
      terms: "條款",
      security: "安全",
    },
  },
};

export function getUiFor(locale: string): UiStrings {
  return ui[locale as Locale] ?? ui.en;
}

export type { UiStrings };
