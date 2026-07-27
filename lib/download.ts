// lib/download.ts
const RELEASES_BASE = "https://jarvis-releases.s3.ap-east-1.amazonaws.com";
// The manifest is hosted on this public website (served from public/latest.json
// via Vercel), not the private S3 bucket — that bucket returns 403 to the public.
const MANIFEST_URL = "https://jarvis-automation.com/latest.json";
// Stable alias maintained by scripts/release.sh — always points to the most recent DMG.
export const LATEST_DMG_URL = `${RELEASES_BASE}/JARVIS_latest_aarch64.dmg`;

export interface ReleaseInfo {
  version: string;
  notes: string;
  pubDate: string;
  downloadUrl: string;
}

const FALLBACK: ReleaseInfo = {
  version: "latest",
  notes: "",
  pubDate: "",
  downloadUrl: LATEST_DMG_URL,
};

export async function fetchLatestRelease(): Promise<{
  release: ReleaseInfo;
  source: "live" | "fallback";
}> {
  try {
    const res = await fetch(MANIFEST_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // Prefer the explicit dmg_url field. The platforms.<arch>.url field is the
    // updater tarball — never link humans to that, they need the DMG.
    const dmgUrl: string | undefined =
      data.dmg_url ?? `${RELEASES_BASE}/JARVIS_${data.version}_aarch64.dmg`;
    if (!data.version || !dmgUrl) throw new Error("manifest missing fields");
    return {
      release: {
        version: data.version,
        notes: data.notes ?? "",
        pubDate: data.pub_date ?? "",
        downloadUrl: dmgUrl,
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
