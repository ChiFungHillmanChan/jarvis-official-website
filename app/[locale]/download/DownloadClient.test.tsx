import type { ReactNode } from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { copy as en } from "@/content/copy.en";
import { fetchLatestRelease, LATEST_DMG_URL } from "@/lib/download";
import DownloadClient from "./DownloadClient";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// Never resolves by default, so the component stays in the state the server
// renders it in: platform unknown on the first pass, release manifest not yet
// fetched. The manifest tests below swap in the real fetch.
vi.mock("@/lib/download", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/download")>();
  return { ...actual, fetchLatestRelease: vi.fn(() => new Promise<never>(() => {})) };
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
      "/zh-HK/beta",
    );
  });
});

// The shape scripts/release.sh publishes to public/latest.json: dmg_url is for
// people, platforms.<arch>.url is the updater tarball.
const manifest = {
  version: "0.5.6",
  notes: "更新內容",
  notes_en: "What changed",
  pub_date: "2026-10-25T13:23:40Z",
  dmg_url: "https://jarvis-releases.s3.ap-east-1.amazonaws.com/JARVIS_0.5.6_aarch64.dmg",
  platforms: {
    "darwin-aarch64": {
      signature: "sig",
      url: "https://jarvis-releases.s3.ap-east-1.amazonaws.com/JARVIS_0.5.6_aarch64.app.tar.gz",
    },
  },
};

describe("DownloadClient with the release manifest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  async function renderWithManifest(response: () => Promise<Response>) {
    const actual = await vi.importActual<typeof import("@/lib/download")>("@/lib/download");
    vi.mocked(fetchLatestRelease).mockImplementationOnce(actual.fetchLatestRelease);
    vi.stubGlobal("fetch", vi.fn(response));
    setUserAgent(MAC_UA);
    render(<DownloadClient copy={en.download} locale="en" />);
  }

  it("links the DMG named in the manifest, never the updater tarball", async () => {
    await renderWithManifest(async () => Response.json(manifest));

    const link = await screen.findByRole("link", { name: `${en.download.primaryCta} (v0.5.6)` });
    expect(link).toHaveAttribute("href", manifest.dmg_url);
    expect(document.querySelector('a[href$=".tar.gz"]')).toBeNull();
    expect(screen.getByText("What changed")).toBeInTheDocument();
    expect(screen.queryByText(en.download.fetchError)).toBeNull();
  });

  it.each([
    ["the request fails", () => Promise.reject(new TypeError("Failed to fetch"))],
    ["the server answers with an error", async () => new Response(null, { status: 503 })],
  ])("warns and keeps the stable DMG alias when %s", async (_, response) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await renderWithManifest(response);

    expect(await screen.findByText(en.download.fetchError)).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: (name) => name.startsWith(en.download.primaryCta),
    });
    expect(link).toHaveAttribute("href", LATEST_DMG_URL);
    warn.mockRestore();
  });
});
