import { describe, it, expect } from "vitest";
import { languageToggleLabel } from "./LanguageToggle";

describe("languageToggleLabel", () => {
  it("announces the target language in English on the English site", () => {
    expect(languageToggleLabel("en", "zh-HK")).toBe("Switch to 繁體中文");
  });

  it("announces the target language in Chinese on the Chinese site", () => {
    expect(languageToggleLabel("zh-HK", "en")).toBe("切換至 English");
  });

  it("never exposes a raw BCP-47 code", () => {
    expect(languageToggleLabel("en", "zh-HK")).not.toContain("zh-HK");
    expect(languageToggleLabel("zh-HK", "en")).not.toMatch(/\ben\b/);
  });

  it("falls back to the English template for an unknown locale", () => {
    expect(languageToggleLabel("fr", "zh-HK")).toBe("Switch to 繁體中文");
  });
});
