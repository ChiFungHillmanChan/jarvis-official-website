import { describe, it, expect } from "vitest";
import { LATEST_DMG_URL, releaseNotesFor, type ReleaseInfo } from "@/lib/download";

const release = (notesEn: string): ReleaseInfo => ({
  version: "0.5.0",
  notes: "更新內容",
  notesEn,
  pubDate: "",
  downloadUrl: LATEST_DMG_URL,
});

describe("releaseNotesFor", () => {
  it("shows the English notes on the English site", () => {
    expect(releaseNotesFor(release("What changed"), "en")).toBe("What changed");
  });

  it("keeps the Chinese notes on the Chinese site", () => {
    expect(releaseNotesFor(release("What changed"), "zh-HK")).toBe("更新內容");
  });

  it("falls back to the Chinese notes when a release has no English notes", () => {
    expect(releaseNotesFor(release(""), "en")).toBe("更新內容");
  });
});
