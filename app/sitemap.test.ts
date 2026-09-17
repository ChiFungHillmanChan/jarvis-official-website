import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { siteUrl } from "@/lib/constants/site";

describe("crawler entry points", () => {
  it("lists exactly the sixteen canonical public pages with reciprocal language alternatives", () => {
    const entries = sitemap();
    const paths = ["", "/how-it-works", "/company", "/contact", "/download", "/privacy", "/terms", "/security"];
    const expected = ["en", "zh-HK"].flatMap((locale) => paths.map((path) => `${siteUrl}/${locale}${path}`));
    expect(entries.map((entry) => entry.url).sort()).toEqual(expected.sort());
    for (const path of paths) {
      const alternatives = {
        en: `${siteUrl}/en${path}`,
        "zh-HK": `${siteUrl}/zh-HK${path}`,
        "x-default": `${siteUrl}/en${path}`,
      };
      for (const locale of ["en", "zh-HK"]) {
        expect(entries.find((entry) => entry.url === `${siteUrl}/${locale}${path}`)?.alternates?.languages).toEqual(alternatives);
      }
    }
  });

  it("permits public pages and points crawlers to the canonical sitemap", () => {
    expect(robots()).toMatchObject({
      rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
      sitemap: `${siteUrl}/sitemap.xml`,
    });
  });
});
