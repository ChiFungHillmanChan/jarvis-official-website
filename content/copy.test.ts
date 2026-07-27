import { describe, it, expect } from "vitest";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";

type SecurityCopy = {
  security: { sections: readonly { title: string; body: string }[] };
};

function securityText(c: SecurityCopy): string {
  return c.security.sections.map((s) => `${s.title} ${s.body}`).join("\n");
}

function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => [
      `${prefix}.${k}`,
      ...keyPaths(v, `${prefix}.${k}`),
    ]);
  }
  return [];
}

describe("security copy: where inference runs", () => {
  it("does not claim routine inference runs on-device (en)", () => {
    const text = securityText(en);
    expect(text).not.toMatch(/on-device using local models/i);
    expect(text).not.toMatch(/cloud inference are opt-in/i);
  });

  it("does not claim routine inference runs on-device (zh-HK)", () => {
    const text = securityText(zhHk);
    expect(text).not.toContain("日常工作負載以本機模型運行");
    expect(text).not.toContain("雲端推理屬選用");
  });

  it("states that inference is cloud by default (en)", () => {
    expect(securityText(en)).toMatch(/not local by default/i);
  });

  it("states that inference is cloud by default (zh-HK)", () => {
    expect(securityText(zhHk)).toContain("推理預設並非在本機執行");
  });

  it("discloses Google as a processor of message content in both locales", () => {
    for (const text of [securityText(en), securityText(zhHk)]) {
      expect(text).toContain("Google");
      expect(text).toContain("Gemini");
    }
  });

  it("discloses Google in the service-provider section alongside Resend and Stripe", () => {
    for (const c of [en, zhHk] as SecurityCopy[]) {
      const providers = c.security.sections.find((s) => s.body.includes("Resend"));
      expect(providers).toBeDefined();
      expect(providers!.body).toContain("Google");
      expect(providers!.body).toContain("Stripe");
    }
  });
});

describe("security copy: AWS control plane is planned, not live", () => {
  it("does not describe Cognito, KMS, or DynamoDB in present tense (en)", () => {
    const text = securityText(en);
    expect(text).not.toMatch(/We use Amazon Cognito/i);
    expect(text).not.toMatch(/All cloud-stored data is encrypted at rest/i);
    expect(text).toMatch(/planned on AWS/i);
  });

  it("does not describe Cognito, KMS, or DynamoDB in present tense (zh-HK)", () => {
    const text = securityText(zhHk);
    expect(text).not.toContain("我哋使用 Amazon Cognito");
    expect(text).not.toContain("所有雲端儲存數據均以 AWS KMS 客戶管理金鑰加密");
    expect(text).toContain("計劃建構於 AWS");
  });
});

describe("marketing copy: no decaying tool count", () => {
  it("does not advertise a fixed number of AI tools (en)", () => {
    expect(JSON.stringify(en)).not.toMatch(/\d+\s*(AI\s*)?tools/i);
  });

  it("does not advertise a fixed number of AI tools (zh-HK)", () => {
    expect(JSON.stringify(zhHk)).not.toMatch(/\d+\s*個?\s*(AI\s*)?工具/);
  });

  it("keeps five stats in the strip for both locales", () => {
    expect(en.stats).toHaveLength(5);
    expect(zhHk.stats).toHaveLength(en.stats.length);
  });
});

describe("locale parity", () => {
  it("zh-HK mirrors the en key structure exactly", () => {
    expect(keyPaths(zhHk)).toEqual(keyPaths(en));
  });
});
