import type { Locale } from "@/i18n/routing";
// The release manifest is the single source of the shipped version: the
// download page reads it at runtime and scripts/release.sh in the desktop repo
// rewrites it on every release. Anything on this site that names a version has
// to come from here, or the site claims a build it does not serve.
import latestRelease from "@/public/latest.json";

export const company = {
  name: "JARVIS AI",
  // The registered name, exactly as it appears on the Certificate of
  // Incorporation. Cap. 622B ss.4-5 requires a Hong Kong company to display
  // this on any website of the company, so it is not interchangeable with the
  // trade name above and must never be translated: the CI and the Business
  // Registration Certificate are issued in English only, and no Chinese name
  // is registered.
  legalName: "JARVIS AI LIMITED",
  // Companies Registry number, incorporated 17 September 2026.
  companyNumber: "81247037",
  // Business Registration Certificate number, valid 17/09/2026 to 16/09/2027.
  // Not required on a website -- Cap. 310 s.12 is a duty to display the
  // certificate at every business address -- but shown here as a trust signal.
  businessRegistrationNumber: "81247037-000-09-26-7",
  registeredAddress: "Unit 1806, 18/F., 9 Wing Hong Street, Cheung Sha Wan, Hong Kong",
  tagline: "Your personal AI assistant for everyday work.",
  contactEmail: "contact@jarvis-automation.com",
  statusLine: "AI software startup",
  productName: "JARVIS",
  productVersion: latestRelease.version,
  foundingYear: 2026,
} as const;

type CompanyL10n = {
  tagline: string;
  statusLine: string;
  /** Registered-name disclosure line shown in the footer. */
  legalLine: string;
};

const byLocale: Record<Locale, CompanyL10n> = {
  en: {
    tagline: company.tagline,
    statusLine: company.statusLine,
    legalLine: `${company.legalName} (Company No. ${company.companyNumber}).`,
  },
  "zh-HK": {
    tagline: "協助你處理日常工作的個人 AI 助理。",
    statusLine: "AI 軟件初創",
    // The registered name stays in English because that is the only name on the
    // Certificate of Incorporation; a Chinese rendering would not be registered.
    legalLine: `${company.legalName}（公司編號 ${company.companyNumber}）。`,
  },
};

export function getCompanyL10n(locale: string): CompanyL10n {
  return byLocale[locale as Locale] ?? byLocale.en;
}
