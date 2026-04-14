import type { Locale } from "@/i18n/routing";

export const company = {
  name: "JARVIS AI",
  tagline: "Desktop AI for operators and engineers.",
  contactEmail: "contact@jarvis-automation.com",
  locationLine: "Hong Kong SAR",
  statusLine: "Hong Kong AI software startup",
  github: "https://github.com/ChiFungHillmanChan/jarvis-ai-assistant",
  productName: "JARVIS",
  productVersion: "0.1.0",
  foundingYear: 2026,
} as const;

type CompanyL10n = {
  tagline: string;
  locationLine: string;
  statusLine: string;
};

const byLocale: Record<Locale, CompanyL10n> = {
  en: {
    tagline: company.tagline,
    locationLine: company.locationLine,
    statusLine: company.statusLine,
  },
  "zh-HK": {
    tagline: "為營運者與工程師而設的桌面 AI。",
    locationLine: "香港特別行政區",
    statusLine: "香港 AI 軟件初創",
  },
};

export function getCompanyL10n(locale: string): CompanyL10n {
  return byLocale[locale as Locale] ?? byLocale.en;
}
