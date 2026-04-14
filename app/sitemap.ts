import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { routing } from "@/i18n/routing";

const paths = ["/", "/company", "/contact", "/privacy", "/terms", "/security"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      const suffix = path === "/" ? "" : path;
      entries.push({
        url: `${siteUrl}/${locale}${suffix}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${siteUrl}/${l}${suffix}`])
          ),
        },
      });
    }
  }

  return entries;
}
