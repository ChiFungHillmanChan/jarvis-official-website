import type { Locale } from "@/i18n/routing";

type UiStrings = {
  nav: {
    company: string;
    contact: string;
    joinWaitlist: string;
    openMenu: string;
    closeMenu: string;
    languageToggle: string;
  };
  contact: {
    eyebrow: string;
    businessContactHeading: string;
    joinWaitlistHeading: string;
    waitlistSub: string;
    emailLabel: string;
    githubLabel: string;
    locationLabel: string;
    emailInputLabel: string;
  };
  company: {
    eyebrow: string;
    getInTouch: string;
    contactLinkLabel: string;
  };
  legal: {
    eyebrow: string;
  };
  waitlist: {
    eyebrow: string;
    submitting: string;
  };
  roadmap: {
    eyebrow: string;
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
  cloudRoadmapEyebrow: string;
  accessEyebrow: string;
};

const ui: Record<Locale, UiStrings> = {
  en: {
    nav: {
      company: "Company",
      contact: "Contact",
      joinWaitlist: "Join waitlist",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      languageToggle: "Switch language",
    },
    contact: {
      eyebrow: "Contact",
      businessContactHeading: "Business contact",
      joinWaitlistHeading: "Join the waitlist",
      waitlistSub: "Private beta on macOS. No spam. One launch email.",
      emailLabel: "Email",
      githubLabel: "GitHub",
      locationLabel: "Location",
      emailInputLabel: "Email address",
    },
    company: {
      eyebrow: "Company",
      getInTouch: "Get in touch",
      contactLinkLabel: "contact",
    },
    legal: { eyebrow: "Legal" },
    waitlist: { eyebrow: "Access", submitting: "…" },
    roadmap: { eyebrow: "Cloud roadmap" },
    notFound: {
      eyebrow: "404",
      title: "Page not found",
      sub: "The page you were looking for does not exist on this site.",
      back: "Back to home",
    },
    footer: { rightsReserved: "All rights reserved." },
    cloudRoadmapEyebrow: "Cloud roadmap",
    accessEyebrow: "Access",
  },
  "zh-HK": {
    nav: {
      company: "公司",
      contact: "聯絡",
      joinWaitlist: "加入等候名單",
      openMenu: "開啟選單",
      closeMenu: "關閉選單",
      languageToggle: "切換語言",
    },
    contact: {
      eyebrow: "聯絡",
      businessContactHeading: "商業聯絡",
      joinWaitlistHeading: "加入等候名單",
      waitlistSub: "macOS 私人 Beta。無垃圾郵件,只有一封上線通知。",
      emailLabel: "電郵",
      githubLabel: "GitHub",
      locationLabel: "地點",
      emailInputLabel: "電郵地址",
    },
    company: {
      eyebrow: "公司",
      getInTouch: "聯絡我們",
      contactLinkLabel: "聯絡",
    },
    legal: { eyebrow: "法律" },
    waitlist: { eyebrow: "申請", submitting: "…" },
    roadmap: { eyebrow: "雲端藍圖" },
    notFound: {
      eyebrow: "404",
      title: "找不到此頁",
      sub: "你正在尋找的頁面並不存在於本網站。",
      back: "返回首頁",
    },
    footer: { rightsReserved: "版權所有,不得轉載。" },
    cloudRoadmapEyebrow: "雲端藍圖",
    accessEyebrow: "申請",
  },
};

export function getUiFor(locale: string): UiStrings {
  return ui[locale as Locale] ?? ui.en;
}

export type { UiStrings };
