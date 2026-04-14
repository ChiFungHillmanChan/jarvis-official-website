import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [company.github],
    address: { "@type": "PostalAddress", addressCountry: "HK", addressRegion: "Hong Kong SAR" },
    contactPoint: {
      "@type": "ContactPoint",
      email: company.contactEmail,
      contactType: "business",
    },
  };
}
