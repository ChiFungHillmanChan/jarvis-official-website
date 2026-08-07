import { describe, it, expect } from "vitest";
import { siteUrl } from "./site";
import { baseMetadata } from "@/content/metadata";

describe("siteUrl", () => {
  it("matches the origin metadata uses for canonicals, hreflang and og:url", () => {
    expect(siteUrl).toBe(baseMetadata.metadataBase.origin);
  });
});
