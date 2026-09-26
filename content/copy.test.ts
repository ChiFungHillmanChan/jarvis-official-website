import { describe, it, expect } from "vitest";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";
import type { LegalPageCopy } from "./legal";

function sectionBody(page: LegalPageCopy, id: string): string {
  const section = page.sections.find((section) => section.id === id);
  if (!section) throw new Error(`Missing legal section: ${id}`);
  return section.body;
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

describe("security copy: actual data boundaries", () => {
  const locales = [
    {
      locale: "en", copy: en,
      storageBoundary: /local storage[^.]*does not mean local AI processing/i,
      fallback: /cloud providers and fallbacks/i,
      voice: /voice[^.]*own provider settings/i,
      encryption: /encrypted with AES-256 \(SQLCipher\), its key is kept in macOS Keychain/i,
      separateApplications: /beta applications are separate server-side records/i,
      noMailboxUpload: /does not upload[^.]*mailbox or conversations/i,
      readOnly: /email workspace[^.]*read-only Gmail/i,
      broaderConnection: /general-assistant connection[^.]*Gmail modification, Calendar and profile/i,
      drafts: /creates Gmail drafts for review/i,
      noSync: /does not offer cloud backup or cross-device sync/i,
      noCertification: /do not establish[^.]*certification[^.]*Google OAuth verification/i,
    },
    {
      locale: "zh-HK", copy: zhHk,
      storageBoundary: /本機儲存不代表.*本機處理/,
      fallback: /雲端供應商及後備路徑/,
      voice: /語音轉錄及朗讀.*各有供應商設定/,
      encryption: /以 AES-256（SQLCipher）加密，金鑰存於 macOS 鑰匙圈/,
      separateApplications: /Beta 申請是獨立的伺服器端紀錄/,
      noMailboxUpload: /不會把.*信箱或對話上傳/,
      readOnly: /電郵工作區只申請 Gmail 唯讀/,
      broaderConnection: /一般助理的獨立連接.*Gmail 修改、日曆及個人資料/,
      drafts: /建立 Gmail 草稿供你審閱/,
      noSync: /不提供雲端備份或跨裝置同步/,
      noCertification: /不代表取得安全認證.*Google OAuth 驗證/,
    },
  ];

  it.each(locales)("separates storage, cloud analysis and voice ($locale)", (entry) => {
    const text = sectionBody(entry.copy.security, "processing");
    expect(text).toMatch(entry.storageBoundary);
    expect(text).toMatch(entry.fallback);
    expect(text).toMatch(entry.voice);
    for (const provider of ["OpenAI", "Bedrock"]) expect(text).toContain(provider);
  });

  it.each(locales)("does not turn the beta database into a product cloud workspace ($locale)", (entry) => {
    const text = sectionBody(entry.copy.security, "local-data");
    expect(text).toContain("SQLite");
    expect(text).toMatch(entry.encryption);
    expect(text).toMatch(entry.separateApplications);
    expect(text).toMatch(entry.noMailboxUpload);
  });

  it.each(locales)("distinguishes Google permissions and draft review ($locale)", (entry) => {
    const text = sectionBody(entry.copy.security, "connections");
    expect(text).toMatch(entry.readOnly);
    expect(text).toMatch(entry.broaderConnection);
    expect(text).toMatch(entry.drafts);
  });

  it.each(locales)("keeps sync and certification limits explicit ($locale)", (entry) => {
    const text = sectionBody(entry.copy.security, "limits");
    expect(text).toMatch(entry.noSync);
    expect(text).toMatch(entry.noCertification);
    expect(entry.copy.security.sections.map((section) => section.body).join("\n"))
      .not.toMatch(/Cognito|customer-managed key|客戶管理金鑰/i);
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
