import { buildSoftwareApplicationJsonLd } from "@/lib/seo/buildSoftwareApplicationJsonLd";

export function SoftwareApplicationJsonLd({ locale = "en" }: { locale?: string }) {
  return (
    <script
      id="ld-software-application"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSoftwareApplicationJsonLd(locale)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
