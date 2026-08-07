import { describe, it, expect } from "vitest";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";
import { getRouteMetadata } from "./metadata";
import manifest from "@/app/manifest";

type PolicyCopy = {
  privacy: { sections: readonly { title: string; body: string }[] };
};

function privacyText(c: PolicyCopy): string {
  return c.privacy.sections.map((s) => `${s.title} ${s.body}`).join("\n");
}

describe("privacy policy: processors match the security page", () => {
  it("names Google and Gemini as processors of message content in both locales", () => {
    for (const text of [privacyText(en), privacyText(zhHk)]) {
      expect(text).toContain("Google");
      expect(text).toContain("Gemini");
    }
  });

  it("names the website processors it relies on in both locales", () => {
    for (const text of [privacyText(en), privacyText(zhHk)]) {
      expect(text).toContain("Resend");
      expect(text).toContain("Stripe");
    }
  });

  it("says inference is not local by default (en)", () => {
    expect(privacyText(en)).toMatch(/not local by default/i);
    expect(privacyText(en)).toMatch(/Local inference is supported/i);
  });

  it("says inference is not local by default (zh-HK)", () => {
    expect(privacyText(zhHk)).toContain("推理預設並非在本機執行");
    expect(privacyText(zhHk)).toContain("本機推理同樣支援");
  });

  it("does not claim customer-managed-key encryption at rest, which is not implemented", () => {
    expect(privacyText(en)).not.toMatch(/customer-managed key/i);
    expect(privacyText(zhHk)).not.toContain("客戶管理金鑰");
  });
});

describe("download fallback copy", () => {
  it("carries no hard-coded version number in either locale", () => {
    expect(en.download.fetchError).not.toMatch(/\d/);
    expect(zhHk.download.fetchError).not.toMatch(/\d/);
  });
});

describe("published descriptions: storage claim, not an inference claim", () => {
  it("keeps 'local-first' out of the route descriptions in both locales", () => {
    for (const locale of ["en", "zh-HK"] as const) {
      for (const route of Object.values(getRouteMetadata(locale))) {
        expect(route.description).not.toMatch(/local-first/i);
        expect(route.description).not.toContain("本地優先");
      }
    }
  });

  it("keeps 'local-first' out of the app manifest", () => {
    const description = manifest().description;
    expect(description).toBeTypeOf("string");
    expect(description).not.toMatch(/local-first/i);
  });
});
