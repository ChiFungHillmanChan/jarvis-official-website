import { describe, expect, it } from "vitest";
import { buildPageJsonLd, buildWebSiteJsonLd } from "./buildPageJsonLd";
import { siteUrl } from "@/lib/constants/site";

describe("page structured data", () => {
  it("connects the localized contact page to its website and breadcrumb trail", () => {
    const data = buildPageJsonLd("zh-HK", "contact");
    expect(data["@graph"]).toEqual([
      expect.objectContaining({
        "@type": "ContactPage",
        "@id": `${siteUrl}/zh-HK/contact#webpage`,
        url: `${siteUrl}/zh-HK/contact`,
        inLanguage: "zh-Hant-HK",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: { "@id": `${siteUrl}/zh-HK/contact#breadcrumb` },
      }),
      expect.objectContaining({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: `${siteUrl}/zh-HK` },
          expect.objectContaining({ position: 2, item: `${siteUrl}/zh-HK/contact` }),
        ],
      }),
    ]);
  });

  it("does not add a one-item breadcrumb to the homepage", () => {
    const data = buildPageJsonLd("en", "home");
    expect(data["@graph"]).toHaveLength(1);
    expect(data["@graph"][0]).not.toHaveProperty("breadcrumb");
    expect(data["@graph"][0]).toMatchObject({
      url: `${siteUrl}/en`,
      mainEntity: { "@id": `${siteUrl}/#software` },
    });
  });

  it("identifies one website and publisher across both languages", () => {
    expect(buildWebSiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      inLanguage: ["en", "zh-Hant-HK"],
      publisher: { "@id": `${siteUrl}/#organization` },
    });
  });
});
