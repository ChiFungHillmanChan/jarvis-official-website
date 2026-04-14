import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { routes } from "@/lib/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(routes).map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
