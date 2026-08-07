import { buildOrganizationJsonLd } from "@/lib/seo/buildOrganizationJsonLd";

export function OrganizationJsonLd() {
  return (
    <script
      id="ld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildOrganizationJsonLd()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
