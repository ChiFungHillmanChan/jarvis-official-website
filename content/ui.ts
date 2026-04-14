import type { Locale } from "@/i18n/routing";

type UiStrings = {
  nav: {
    product: string;
    company: string;
    contact: string;
    requestAccess: string;
    openMenu: string;
    closeMenu: string;
    languageToggle: string;
  };
  contact: {
    eyebrow: string;
    emailLabel: string;
    githubLabel: string;
    locationLabel: string;
    emailInputLabel: string;
  };
  legal: {
    eyebrow: string;
  };
  waitlist: {
    submitting: string;
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
      requestAccess: "Request access",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageToggle: "Switch language",
    },
    contact: {
      eyebrow: "Contact",
      emailLabel: "Email",
      githubLabel: "GitHub",
      locationLabel: "Location",
      emailInputLabel: "Email address",
    },
    legal: { eyebrow: "Legal" },
    waitlist: { submitting: "…" },
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
      requestAccess: "申請試用",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      languageToggle: "切換語言",
    },
    contact: {
      eyebrow: "聯絡",
      emailLabel: "電郵",
      githubLabel: "GitHub",
      locationLabel: "地點",
      emailInputLabel: "電郵地址",
    },
    legal: { eyebrow: "法律" },
    waitlist: { submitting: "…" },
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
