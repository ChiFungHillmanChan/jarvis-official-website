import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

// This payload is prerendered into the HTML, so every field here is a public,
// machine-readable claim that search and LLM crawlers ingest and cache. Treat
// it as published copy: it has to survive the same audit as content/metadata.ts.
export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: company.productName,
    // Storage claim only. "Local-first" was removed here for the reason
    // content/copy.claims.test.ts keeps it out of the route descriptions and
    // the app manifest: /security says inference is not local by default, so
    // the phrase reads as an inference claim the product does not support.
    description:
      "Native macOS desktop AI assistant that unifies email, calendar, notes, GitHub, and system actions into one focused interface. Your data stays on your Mac.",
    operatingSystem: "macOS",
    applicationCategory: "ProductivityApplication",
    // Derived from public/latest.json via content/company.ts, the same manifest
    // the download page serves from, so the two cannot disagree in public.
    softwareVersion: company.productVersion,
    url: siteUrl,
    // The download page, not the contact form. localePrefix is "always", so the
    // canonical form carries the locale segment.
    downloadUrl: `${siteUrl}/en/download`,
    // True while the beta download is free. Revisit the moment pricing ships --
    // a stale price is the same class of public falsehood as a stale version.
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: company.name, url: siteUrl },
  };
}
