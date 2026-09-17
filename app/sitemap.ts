import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { routing } from "@/i18n/routing";
import { routes } from "@/lib/constants/routes";
import { buildAlternates } from "@/content/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of Object.values(routes)) {
      const { canonical, languages } = buildAlternates(locale, path);
      entries.push({
        url: `${siteUrl}${canonical}`,
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([language, url]) => [language, `${siteUrl}${url}`])),
        },
      });
    }
  }

  return entries;
}
