import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { OrganizationJsonLd } from "./OrganizationJsonLd";
import { SoftwareApplicationJsonLd } from "./SoftwareApplicationJsonLd";

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
    expect(data.description).toMatch(/cloud inference is the default/i);
    expect(data.description).not.toMatch(/your data stays on your Mac/i);
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
  });

  it("escapes angle brackets so the payload cannot close the script tag", () => {
    expect(ldJsonPayload(renderToStaticMarkup(<OrganizationJsonLd />))).not.toContain("<");
    expect(ldJsonPayload(renderToStaticMarkup(<SoftwareApplicationJsonLd />))).not.toContain("<");
  });
});
