import type { RouteKey } from "@/content/metadata";
import { buildPageJsonLd } from "@/lib/seo/buildPageJsonLd";

export function PageJsonLd({ locale, routeKey }: { locale: string; routeKey: RouteKey }) {
  return (
    <script
      id="ld-webpage"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPageJsonLd(locale, routeKey)).replace(/</g, "\\u003c") }}
    />
  );
}
