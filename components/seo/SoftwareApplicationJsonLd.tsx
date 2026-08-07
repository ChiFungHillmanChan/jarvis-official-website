import { buildSoftwareApplicationJsonLd } from "@/lib/seo/buildSoftwareApplicationJsonLd";

export function SoftwareApplicationJsonLd() {
  return (
    <script
      id="ld-software-application"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSoftwareApplicationJsonLd()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
