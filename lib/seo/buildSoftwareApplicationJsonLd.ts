import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";
import { getRouteMetadata } from "@/content/metadata";

// This payload is prerendered into the HTML, so every field here is a public,
// machine-readable claim that search and LLM crawlers ingest and cache. Treat
// it as published copy: it has to survive the same audit as content/metadata.ts.
export function buildSoftwareApplicationJsonLd(locale = "en") {
  const normalized = locale === "zh-HK" ? "zh-HK" : "en";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: company.productName,
    description: getRouteMetadata(normalized).home.description,
    inLanguage: normalized === "zh-HK" ? "zh-Hant-HK" : "en",
    operatingSystem: "macOS 12 or later on Apple Silicon",
    applicationCategory: "BusinessApplication",
    // Derived from public/latest.json via content/company.ts, the same manifest
    // the download page serves from, so the two cannot disagree in public.
    softwareVersion: company.productVersion,
    url: `${siteUrl}/${normalized}`,
    image: `${siteUrl}/social-image.png`,
    // The download page, not the contact form. localePrefix is "always", so the
    // canonical form carries the locale segment.
    downloadUrl: `${siteUrl}/${normalized}/download`,
    // No invented pricing or ratings to manufacture a rich-result appearance.
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}
