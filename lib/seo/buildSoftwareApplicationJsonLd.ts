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
    description:
      "AI assistant for Mac that helps triage Gmail, draft email replies and manage Google Calendar. Conversation history is stored on your Mac. Cloud inference is the default, with optional local models.",
    operatingSystem: "macOS 12 or later on Apple Silicon",
    applicationCategory: "BusinessApplication",
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
