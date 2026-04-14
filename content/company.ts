import type { Locale } from "@/i18n/routing";

export const company = {
  name: "JARVIS AI",
  tagline: "Native macOS AI assistant.",
  contactEmail: "contact@jarvis-automation.com",
  locationLine: "Hong Kong SAR",
  registrationLine: "Registered entity pending.",
  github: "https://github.com/ChiFungHillmanChan/jarvis-ai-assistant",
  productName: "JARVIS",
  productVersion: "0.1.0",
  foundingYear: 2026,
} as const;

type CompanyL10n = {
  tagline: string;
  locationLine: string;
  registrationLine: string;
};

const byLocale: Record<Locale, CompanyL10n> = {
  en: {
    tagline: company.tagline,
    locationLine: company.locationLine,
    registrationLine: company.registrationLine,
  },
  "zh-HK": {
    tagline: "原生 macOS AI 助理。",
    locationLine: "香港特別行政區",
    registrationLine: "公司註冊進行中。",
  },
};

export function getCompanyL10n(locale: string): CompanyL10n {
  return byLocale[locale as Locale] ?? byLocale.en;
}
