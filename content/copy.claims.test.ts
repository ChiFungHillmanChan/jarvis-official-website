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

describe("marketing body copy carries no unsupported claims", () => {
  // The 2026-08 audit found the hero and body copy still said "local-first"
  // after the metadata was cleaned: the guard only looked at metadata.ts and
  // the manifest. Walk every string in both copy trees so a claim cannot hide
  // in a section the tests never read.
  function allStrings(node: unknown, out: string[] = []): string[] {
    if (typeof node === "string") out.push(node);
    else if (Array.isArray(node)) node.forEach((v) => allStrings(v, out));
    else if (node && typeof node === "object")
      Object.values(node).forEach((v) => allStrings(v, out));
    return out;
  }

  const banned: { pattern: RegExp; reason: string }[] = [
    { pattern: /local-first/i, reason: "inference is cloud by default" },
    { pattern: /本地優先/, reason: "inference is cloud by default" },
    { pattern: /32 (AI )?tools/i, reason: "tool count claim removed 2026-07" },
    { pattern: /on-device by default/i, reason: "inference is cloud by default" },
    { pattern: /CloudWatch alarms notify/i, reason: "unverified ops claim removed 2026-08" },
    { pattern: /multi-factor authentication required/i, reason: "unverified ops claim removed 2026-08" },
  ];

  it.each(banned)("no copy string matches $pattern ($reason)", ({ pattern }) => {
    for (const tree of [en, zhHk]) {
      for (const s of allStrings(tree)) {
        expect(s).not.toMatch(pattern);
      }
    }
  });
});
