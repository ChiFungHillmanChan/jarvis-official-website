import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/icon-512x512.png`,
    // The Companies Registry number doubles as the Business Registration
    // number's root, and is the identifier a registry lookup resolves.
    identifier: company.companyNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 1806, 18/F., 9 Wing Hong Street, Cheung Sha Wan",
      addressCountry: "HK",
      addressRegion: "Hong Kong SAR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: company.contactEmail,
      contactType: "business",
    },
  };
}
