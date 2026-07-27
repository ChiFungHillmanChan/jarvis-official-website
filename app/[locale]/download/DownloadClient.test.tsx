import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { copy as en } from "@/content/copy.en";
import { LATEST_DMG_URL } from "@/lib/download";
import DownloadClient from "./DownloadClient";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// Never resolves, so the component stays in the state the server renders it in:
// platform unknown on the first pass, release manifest not yet fetched.
vi.mock("@/lib/download", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/download")>();
  return { ...actual, fetchLatestRelease: () => new Promise<never>(() => {}) };
});

const MAC_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const WINDOWS_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function setUserAgent(userAgent: string) {
  Object.defineProperty(window.navigator, "userAgent", { value: userAgent, configurable: true });
}

describe("DownloadClient shell without the release manifest", () => {
  it("renders the heading, subtitle and system requirements", () => {
    setUserAgent(MAC_UA);
    render(<DownloadClient copy={en.download} locale="en" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(en.download.title);
    expect(screen.getByText(en.download.subtitle)).toBeInTheDocument();
    expect(screen.getByText(en.download.systemRequirements)).toBeInTheDocument();
  });

  it("offers the stable DMG alias so a visitor without the manifest can still download", () => {
    setUserAgent(MAC_UA);
    render(<DownloadClient copy={en.download} locale="en" />);

    expect(screen.getByRole("link", { name: en.download.primaryCta })).toHaveAttribute(
      "href",
      LATEST_DMG_URL,
    );
  });

  it("does not show the fetch warning before the fetch has had a chance to fail", () => {
    setUserAgent(MAC_UA);
    render(<DownloadClient copy={en.download} locale="en" />);

    expect(screen.queryByText(en.download.fetchError)).toBeNull();
  });
});

describe("DownloadClient non-macOS branch", () => {
  it("keeps the visitor's locale and lands on the waitlist anchor", () => {
    setUserAgent(WINDOWS_UA);
    render(<DownloadClient copy={en.download} locale="zh-HK" />);

    expect(screen.getByRole("link", { name: en.download.joinWaitlist })).toHaveAttribute(
      "href",
      "/zh-HK#access",
    );
  });
});
