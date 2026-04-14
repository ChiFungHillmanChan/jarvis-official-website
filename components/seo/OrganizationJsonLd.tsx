import Script from "next/script";
import { buildOrganizationJsonLd } from "@/lib/seo/buildOrganizationJsonLd";

export function OrganizationJsonLd() {
  return (
    <Script
      id="ld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
    />
  );
}
