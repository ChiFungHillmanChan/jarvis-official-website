import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const request = vi.hoisted(() => ({
  acceptLanguage: null as string | null,
  matchedPath: null as string | null,
  intlLocale: null as string | null,
}));

vi.mock("next/headers", () => ({
  headers: async () => {
    const headers = new Headers();
    if (request.acceptLanguage !== null) headers.set("accept-language", request.acceptLanguage);
    if (request.matchedPath !== null) headers.set("x-matched-path", request.matchedPath);
    if (request.intlLocale !== null) headers.set("x-next-intl-locale", request.intlLocale);
    return headers;
  },
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains" }),
  Space_Grotesk: () => ({ variable: "--font-space-grotesk" }),
}));

import RootNotFound from "./not-found";

async function render(
  acceptLanguage: string | null,
  path: { matchedPath?: string; intlLocale?: string } = {},
): Promise<string> {
  request.acceptLanguage = acceptLanguage;
  request.matchedPath = path.matchedPath ?? null;
  request.intlLocale = path.intlLocale ?? null;
  return renderToStaticMarkup(await RootNotFound());
}

describe("root not-found", () => {
  beforeEach(() => {
    request.acceptLanguage = null;
    request.matchedPath = null;
    request.intlLocale = null;
  });

  it("renders a complete document, since the root layout supplies no html or body", async () => {
    const markup = await render(null);
    expect(markup).toContain("<html");
    expect(markup).toContain("<body");
  });

  it("falls back to the default locale when no language is negotiated", async () => {
    const markup = await render(null);
    expect(markup).toContain('lang="en"');
    expect(markup).toContain('href="/en"');
    expect(markup).toContain("Page not found");
  });

  // A zh-HK visitor who mistypes a URL must not be handed an English page that
  // then bounces them out of their locale.
  it("answers a Chinese-preferring visitor in zh-HK and links back into zh-HK", async () => {
    const markup = await render("zh-HK,zh;q=0.9,en;q=0.5");
    expect(markup).toContain('lang="zh-Hant-HK"');
    expect(markup).toContain('href="/zh-HK"');
    expect(markup).toContain("找不到此頁");
  });

  it("respects quality values rather than header order", async () => {
    const markup = await render("zh;q=0.3,en-GB;q=0.9");
    expect(markup).toContain('lang="en"');
    expect(markup).toContain('href="/en"');
  });

  it("ignores locales the site does not ship", async () => {
    const markup = await render("fr-FR,fr;q=0.9");
    expect(markup).toContain('lang="en"');
    expect(markup).toContain('href="/en"');
  });

  // The case Accept-Language gets wrong: a stale zh-HK link, opened from a
  // browser configured in English. The path is the visitor's actual intent.
  it("answers a stale zh-HK link in zh-HK even in an English browser", async () => {
    const markup = await render("en-GB,en;q=0.9", { matchedPath: "/zh-HK/pricing" });
    expect(markup).toContain('lang="zh-Hant-HK"');
    expect(markup).toContain('href="/zh-HK"');
    expect(markup).toContain("找不到此頁");
  });

  it("reads the path locale the proxy forwards when the routed path is internal", async () => {
    const markup = await render("en-GB,en;q=0.9", {
      matchedPath: "/_not-found",
      intlLocale: "zh-HK",
    });
    expect(markup).toContain('lang="zh-Hant-HK"');
    expect(markup).toContain('href="/zh-HK"');
  });

  it("stays on the requested locale when the path says English", async () => {
    const markup = await render("zh-HK,zh;q=0.9", { matchedPath: "/en/pricing" });
    expect(markup).toContain('lang="en"');
    expect(markup).toContain('href="/en"');
    expect(markup).toContain("Page not found");
  });

  it("falls back to Accept-Language when no path signal carries a locale", async () => {
    const markup = await render("zh-HK,zh;q=0.9", { matchedPath: "/_not-found" });
    expect(markup).toContain('lang="zh-Hant-HK"');
    expect(markup).toContain('href="/zh-HK"');
  });
});
