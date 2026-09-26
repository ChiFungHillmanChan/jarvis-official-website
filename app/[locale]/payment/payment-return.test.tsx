import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next-intl/server", () => ({ setRequestLocale: vi.fn() }));

import SuccessPage, { generateMetadata as successMetadata } from "./success/page";
import CancelPage, { generateMetadata as cancelMetadata } from "./cancel/page";

describe("payment return pages", () => {
  it.each(["en", "zh-HK"])("the %s success return requires server confirmation, even with a session query", async (locale) => {
    const props = {
      params: Promise.resolve({ locale }),
      searchParams: Promise.resolve({ session_id: "cs_unverified_return", paid: "true" }),
    };
    const markup = renderToStaticMarkup(await SuccessPage(props));
    if (locale === "en") {
      expect(markup).toContain("Payment flow returned");
      expect(markup).toContain("server");
      expect(markup).toContain("Refresh");
      expect(markup).toContain("Do not pay again");
    } else {
      expect(markup).toContain("付款流程已返回");
      expect(markup).toContain("伺服器確認方案");
      expect(markup).toContain("重新整理");
      expect(markup).toContain("不要重複付款");
    }
    expect(markup).not.toMatch(/cs_unverified_return|Payment successful|You are now Pro|已成功付款|已升級至 Pro/);
  });

  it.each(["en", "zh-HK"])("the %s cancel return makes no claim about charges", async (locale) => {
    const markup = renderToStaticMarkup(await CancelPage({ params: Promise.resolve({ locale }) }));
    expect(markup).toContain(locale === "en" ? "You left checkout" : "你已離開付款頁面");
    expect(markup).toContain(locale === "en" ? "check your plan status" : "核對方案狀態");
    expect(markup).not.toMatch(/not charged|no charge|沒有扣款|未有扣款|不會扣款|已退款/);
  });

  it.each(["en", "zh-HK"])("both %s return routes link to the local homepage and download page without a deep link", async (locale) => {
    for (const Page of [SuccessPage, CancelPage]) {
      const markup = renderToStaticMarkup(await Page({ params: Promise.resolve({ locale }) }));
      expect(markup).toContain(`href="/${locale}"`);
      expect(markup).toContain(`href="/${locale}/download"`);
      expect(markup).not.toMatch(/href="jarvis:|checkout\.stripe\.com|session_id=/);
    }
  });

  it.each(["en", "zh-HK"])("both %s routes override indexable parent metadata", async (locale) => {
    for (const [state, metadata] of [["success", successMetadata], ["cancel", cancelMetadata]] as const) {
      const result = await metadata({ params: Promise.resolve({ locale }) });
      expect(result.robots).toMatchObject({ index: false, googleBot: { index: false } });
      expect(result.alternates?.canonical).toBe(`/${locale}/payment/${state}`);
      expect(result.title).toBeTruthy();
      expect(result.description).toBeTruthy();
    }
  });
});
