import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: company.productName,
    description:
      "Native macOS desktop AI assistant that unifies email, calendar, notes, GitHub, and system actions into one focused interface. Local-first, private beta.",
    operatingSystem: "macOS",
    applicationCategory: "ProductivityApplication",
    softwareVersion: company.productVersion,
    url: siteUrl,
    downloadUrl: `${siteUrl}/contact`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: company.name, url: siteUrl },
  };
}
