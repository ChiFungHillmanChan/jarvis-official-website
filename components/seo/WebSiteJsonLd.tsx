import { buildWebSiteJsonLd } from "@/lib/seo/buildPageJsonLd";

export function WebSiteJsonLd() {
  return (
    <script
      id="ld-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd()).replace(/</g, "\\u003c") }}
    />
  );
}
