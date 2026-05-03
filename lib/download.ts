// lib/download.ts
const MANIFEST_URL =
  "https://jarvis-releases.s3.ap-east-1.amazonaws.com/latest.json";

export interface ReleaseInfo {
  version: string;
  notes: string;
  pubDate: string;
  downloadUrl: string;
}

const FALLBACK: ReleaseInfo = {
  version: "0.1.0",
  notes: "",
  pubDate: "",
  downloadUrl:
    "https://jarvis-releases.s3.ap-east-1.amazonaws.com/JARVIS_0.1.0_aarch64.dmg",
};

export async function fetchLatestRelease(): Promise<{
  release: ReleaseInfo;
  source: "live" | "fallback";
}> {
  try {
    const res = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const platform = data.platforms?.["darwin-aarch64"];
    if (!data.version || !platform?.url) throw new Error("manifest missing fields");
    return {
      release: {
        version: data.version,
        notes: data.notes ?? "",
        pubDate: data.pub_date ?? "",
        downloadUrl: platform.url,
      },
      source: "live",
    };
  } catch (e) {
    console.warn("latest.json fetch failed, using fallback", e);
    return { release: FALLBACK, source: "fallback" };
  }
}

export function isMacOs(userAgent: string): boolean {
  return /Mac OS X|Macintosh/i.test(userAgent);
}
