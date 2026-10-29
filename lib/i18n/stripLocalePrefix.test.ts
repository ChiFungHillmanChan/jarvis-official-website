import { describe, it, expect } from "vitest";
import { stripLocalePrefix } from "./stripLocalePrefix";

describe("stripLocalePrefix", () => {
  it.each([
    ["/en/download", "/download"],
    ["/zh-HK/download", "/download"],
    ["/en/payment/success", "/payment/success"],
    ["/en", "/"],
    ["/zh-HK", "/"],
    ["/en/", "/"],
  ])("strips the locale from %s", (pathname, expected) => {
    expect(stripLocalePrefix(pathname)).toBe(expected);
  });

  it.each(["/", "/download", "/english", "/zh-HKdownload", "/fr/download"])(
    "leaves %s unchanged",
    (pathname) => {
      expect(stripLocalePrefix(pathname)).toBe(pathname);
    },
  );
});
