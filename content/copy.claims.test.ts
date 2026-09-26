import { describe, it, expect } from "vitest";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";
import { getRouteMetadata } from "./metadata";
import type { LegalPageCopy } from "./legal";
import { PRIVACY_VERSION, TERMS_VERSION } from "@/lib/waitlist/policy";
import manifest from "@/app/manifest";

type PolicyCopy = {
  privacy: { sections: readonly { title: string; body: string }[] };
};

function privacyText(c: PolicyCopy): string {
  return c.privacy.sections.map((s) => `${s.title} ${s.body}`).join("\n");
}

function sectionBody(page: LegalPageCopy, id: string): string {
  const section = page.sections.find((section) => section.id === id);
  if (!section) throw new Error(`Missing legal section: ${id}`);
  return section.body;
}

describe("privacy policy: actual processors and consent", () => {
  const locales = [
    {
      locale: "en", copy: en,
      defaultProvider: /default general-assistant[^.]*Google Gemini/i,
      cloudConsent: /acknowledge the cloud transfer[^.]*email text[^.]*instructions[^.]*memories[^.]*sent to that provider/i,
      localAnalysis: /local Ollama analysis[^.]*supported/i,
      noAutomaticFallback: /email analysis does not automatically switch/i,
      noZeroRetention: /does not guarantee zero provider retention/i,
      conditionalEmail: /where application email notifications are enabled[^.]*Resend/i,
      noStoredIp: /application record does not include[^.]*IP address[^.]*user-agent/i,
      consentRecord: /time and versions[^.]*privacy acknowledgement[^.]*terms acceptance/i,
      noMarketing: /applying does not subscribe you to general marketing/i,
      noCharge: /applying for beta access does not[^.]*authorise a charge/i,
      limitedRetention: /only while needed[^.]*request[^.]*legal obligation/i,
      backupCaveat: /provider logs and backups may remain/i,
      explicitDeletion: /explicitly deleting[^.]*local emails[^.]*without deleting Gmail originals/i,
    },
    {
      locale: "zh-HK", copy: zhHk,
      defaultProvider: /一般助理的預設路徑使用 Google Gemini/,
      cloudConsent: /確認雲端傳送後.*群組郵件、個人指示.*記憶.*傳送至該供應商/,
      localAnalysis: /使用支援的本機 Ollama 分析/,
      noAutomaticFallback: /電郵分析失敗時不會自動轉用另一供應商/,
      noZeroRetention: /不保證供應商完全不保留資料/,
      conditionalEmail: /如啟用申請電郵通知.*Resend/,
      noStoredIp: /申請紀錄不包括.*IP 地址.*user-agent/,
      consentRecord: /確認已閱讀私隱政策和接受條款的時間與版本/,
      noMarketing: /申請不會自動訂閱一般推廣/,
      noCharge: /Beta 申請不是訂閱購買.*不授權扣款/,
      limitedRetention: /只在處理申請.*履行法律責任所需的期間/,
      backupCaveat: /供應商紀錄及備份.*可能.*繼續存在/,
      explicitDeletion: /明確刪除帳戶.*本機郵件.*不會刪除 Gmail 原信/,
    },
  ];

  it.each(locales)("discloses default cloud processing and independent email consent ($locale)", (entry) => {
    const text = sectionBody(entry.copy.privacy, "ai-processing");
    expect(text).toMatch(entry.defaultProvider);
    for (const provider of ["OpenAI", "Anthropic", "Amazon Bedrock", "MiniMax"]) {
      expect(text).toContain(provider);
    }
    expect(text).toMatch(entry.cloudConsent);
    expect(text).toMatch(entry.localAnalysis);
    expect(text).toMatch(entry.noAutomaticFallback);
    expect(text).toMatch(entry.noZeroRetention);
  });

  it.each(locales)("names website processors without treating optional email as guaranteed ($locale)", (entry) => {
    const text = sectionBody(entry.copy.privacy, "website-services");
    for (const provider of ["Vercel", "Amazon DynamoDB", "AWS", "Resend"]) {
      expect(text).toContain(provider);
    }
    expect(text).toMatch(/Singapore|新加坡/);
    expect(text).toMatch(entry.conditionalEmail);
    expect(text).toMatch(entry.noStoredIp);
  });

  it.each(locales)("records current consent versions without authorising marketing or payment ($locale)", (entry) => {
    expect(entry.copy.privacy.lastUpdated).toContain(PRIVACY_VERSION);
    expect(entry.copy.terms.lastUpdated).toContain(TERMS_VERSION);
    const application = sectionBody(entry.copy.privacy, "website-data");
    expect(application).toMatch(entry.consentRecord);
    expect(application).toMatch(entry.noMarketing);
    expect(sectionBody(entry.copy.terms, "third-parties-fees")).toMatch(entry.noCharge);
  });

  it.each(locales)("explains purpose-based retention and separate local deletion ($locale)", (entry) => {
    const text = sectionBody(entry.copy.privacy, "retention");
    expect(text).toMatch(entry.limitedRetention);
    expect(text).toMatch(entry.backupCaveat);
    expect(text).toMatch(entry.explicitDeletion);
  });

  it.each(locales)("links Google's Limited Use policy without claiming verification ($locale)", (entry) => {
    const section = entry.copy.privacy.sections.find((section) => section.id === "google-limited-use");
    expect(section?.body).toContain("Limited Use");
    expect(section?.body).toMatch(/not a claim of Google verification|不代表已取得 Google 驗證/);
    expect(section?.links).toEqual(expect.arrayContaining([
      expect.objectContaining({ href: "https://developers.google.com/terms/api-services-user-data-policy" }),
    ]));
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
    { pattern: /on-device using local models/i, reason: "routine inference is not guaranteed to be local" },
    { pattern: /cloud inference are opt-in/i, reason: "general chat has a default cloud route" },
    { pattern: /日常工作負載以本機模型運行/, reason: "routine inference is not guaranteed to be local" },
    { pattern: /雲端推理屬選用/, reason: "general chat has a default cloud route" },
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
