import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { OrganizationJsonLd } from "./OrganizationJsonLd";
import { SoftwareApplicationJsonLd } from "./SoftwareApplicationJsonLd";
import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

function ldJsonPayload(markup: string): string {
  const payload = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/.exec(
    markup,
  )?.[1];
  if (payload === undefined) {
    throw new Error("no ld+json script tag found in server-rendered markup");
  }
  return payload;
}

describe("JSON-LD components", () => {
  it("emits the organization payload into server-rendered markup", () => {
    const data = JSON.parse(ldJsonPayload(renderToStaticMarkup(<OrganizationJsonLd />)));
    expect(data["@type"]).toBe("Organization");
    expect(data["@context"]).toBe("https://schema.org");
  });

  it("emits the software application payload into server-rendered markup", () => {
    const data = JSON.parse(ldJsonPayload(renderToStaticMarkup(<SoftwareApplicationJsonLd />)));
    expect(data["@type"]).toBe("SoftwareApplication");
    expect(data["@context"]).toBe("https://schema.org");
    expect(data.description).toMatch(/Gmail/i);
    expect(data.description).not.toMatch(/your data stays on your Mac/i);
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("offers");
    expect(data.softwareVersion).toBe(company.productVersion);
    expect(data.downloadUrl).toBe(`${siteUrl}/en/download`);
  });

  it("links the Chinese software description to the Chinese page and download", () => {
    const data = JSON.parse(ldJsonPayload(renderToStaticMarkup(<SoftwareApplicationJsonLd locale="zh-HK" />)));
    expect(data.inLanguage).toBe("zh-Hant-HK");
    expect(data.url).toBe(`${siteUrl}/zh-HK`);
    expect(data.downloadUrl).toBe(`${siteUrl}/zh-HK/download`);
    expect(data.description).toContain("Gmail");
    expect(data.description).toContain("記憶");
  });

  it("escapes angle brackets so the payload cannot close the script tag", () => {
    expect(ldJsonPayload(renderToStaticMarkup(<OrganizationJsonLd />))).not.toContain("<");
    expect(ldJsonPayload(renderToStaticMarkup(<SoftwareApplicationJsonLd />))).not.toContain("<");
  });
});
