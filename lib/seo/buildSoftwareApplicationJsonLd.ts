import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: company.productName,
    operatingSystem: "macOS",
    applicationCategory: "ProductivityApplication",
    softwareVersion: company.productVersion,
    url: siteUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: company.name },
  };
}
