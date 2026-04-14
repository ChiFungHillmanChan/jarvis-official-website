import Script from "next/script";
import { buildSoftwareApplicationJsonLd } from "@/lib/seo/buildSoftwareApplicationJsonLd";

export function SoftwareApplicationJsonLd() {
  return (
    <Script
      id="ld-software-application"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareApplicationJsonLd()) }}
    />
  );
}
