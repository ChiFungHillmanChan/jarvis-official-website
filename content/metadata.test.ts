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
      languages: { en: "/en/download", "zh-HK": "/zh-HK/download" },
    });
  });

  it("points og:url at the download page in the visitor's locale", () => {
    for (const locale of locales) {
      const rm = getRouteMetadata(locale);
      expect(buildOpenGraph(locale, rm.download).url).toMatch(
        new RegExp(`/${locale}/download$`),
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
