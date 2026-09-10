import { describe, it, expect } from "vitest";
import { buildAlternates, buildOpenGraph, getRouteMetadata } from "./metadata";

const locales = ["en", "zh-HK"] as const;

describe("download route metadata", () => {
  it("is defined in every locale so the page stops inheriting the homepage entry", () => {
    for (const locale of locales) {
      const rm = getRouteMetadata(locale);
      expect(rm.download).toBeDefined();
      expect(rm.download.canonical).toBe("/download");
      expect(rm.download.title).not.toBe(rm.home.title);
      expect(rm.download.description).not.toBe(rm.home.description);
    }
  });

  it("canonicalises to its own locale-prefixed path, not the homepage", () => {
    expect(buildAlternates("zh-HK", "/download")).toEqual({
      canonical: "/zh-HK/download",
      languages: {
        en: "/en/download",
        "zh-HK": "/zh-HK/download",
        "x-default": "/en/download",
      },
    });
  });

  it("points og:url at the download page in the visitor's locale", () => {
    for (const locale of locales) {
      const rm = getRouteMetadata(locale);
      expect(buildOpenGraph(locale, rm.download).url).toMatch(new RegExp(`/${locale}/download$`));
    }
  });
});

describe("how-it-works route metadata", () => {
  it("uses its own title and localized canonical, social and alternate URLs", () => {
    for (const locale of locales) {
      const rm = getRouteMetadata(locale);
      expect(rm.howItWorks.title).not.toBe(rm.home.title);
      expect(rm.howItWorks.description).not.toBe(rm.home.description);
      expect(rm.howItWorks.canonical).toBe("/how-it-works");
      expect(buildAlternates(locale, rm.howItWorks.canonical)).toEqual({
        canonical: `/${locale}/how-it-works`,
        languages: {
          en: "/en/how-it-works",
          "zh-HK": "/zh-HK/how-it-works",
          "x-default": "/en/how-it-works",
        },
      });
      expect(buildOpenGraph(locale, rm.howItWorks).url).toMatch(
        new RegExp(`/${locale}/how-it-works$`),
      );
    }
  });
});

describe("route metadata locale parity", () => {
  it("zh-HK covers every route key that en covers", () => {
    expect(Object.keys(getRouteMetadata("zh-HK")).sort()).toEqual(
      Object.keys(getRouteMetadata("en")).sort(),
    );
  });
});
