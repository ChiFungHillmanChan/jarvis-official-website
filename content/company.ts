import type { Locale } from "@/i18n/routing";
// The release manifest is the single source of the shipped version: the
// download page reads it at runtime and scripts/release.sh in the desktop repo
// rewrites it on every release. Anything on this site that names a version has
// to come from here, or the site claims a build it does not serve.
import latestRelease from "@/public/latest.json";

export const company = {
  name: "JARVIS AI",
  tagline: "Desktop AI for operators and engineers.",
  contactEmail: "contact@jarvis-automation.com",
  locationLine: "Hong Kong SAR",
  statusLine: "Hong Kong AI software startup",
  productName: "JARVIS",
  productVersion: latestRelease.version,
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
