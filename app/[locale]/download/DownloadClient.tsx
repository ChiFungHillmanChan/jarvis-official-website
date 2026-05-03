"use client";

import { useEffect, useState } from "react";
import { fetchLatestRelease, isMacOs, type ReleaseInfo } from "@/lib/download";
import type { Copy } from "@/content/getCopy";

interface Props {
  copy: Copy["download"];
}

export default function DownloadClient({ copy }: Props) {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMac(isMacOs(navigator.userAgent));
    fetchLatestRelease().then(({ release, source }) => {
      setRelease(release);
      setSource(source);
    });
  }, []);

  if (isMac === null || release === null) {
    return <main style={pageStyle}><p>{copy.loadingNotes}</p></main>;
  }

  if (!isMac) {
    return (
      <main style={pageStyle}>
        <p style={eyebrow}>{copy.eyebrow}</p>
        <h1 style={titleStyle}>{copy.nonMacosTitle}</h1>
        <p style={bodyStyle}>{copy.nonMacosBody}</p>
        <a href="/" style={ctaStyle}>{copy.joinWaitlist}</a>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <p style={eyebrow}>{copy.eyebrow}</p>
      <h1 style={titleStyle}>{copy.title}</h1>
      <p style={subtitleStyle}>{copy.subtitle}</p>
      <p style={smallStyle}>{copy.systemRequirements}</p>

      {source === "fallback" && <p style={warnStyle}>{copy.fetchError}</p>}

      <a href={release.downloadUrl} style={ctaStyle}>
        {copy.primaryCta} (v{release.version})
      </a>

      {release.notes && (
        <section style={notesSection}>
          <h2 style={h2Style}>{copy.releaseNotesHeading}</h2>
          <pre style={notesPre}>{release.notes}</pre>
        </section>
      )}
    </main>
  );
}

const pageStyle: React.CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "64px 24px" };
const eyebrow: React.CSSProperties = { fontFamily: "var(--font-mono, monospace)", letterSpacing: 4, fontSize: 12, opacity: 0.6 };
const titleStyle: React.CSSProperties = { fontSize: 36, fontWeight: 600, marginTop: 8 };
const subtitleStyle: React.CSSProperties = { fontSize: 18, opacity: 0.8, marginTop: 12 };
const smallStyle: React.CSSProperties = { fontSize: 14, opacity: 0.6, marginTop: 8 };
const ctaStyle: React.CSSProperties = { display: "inline-block", marginTop: 24, padding: "12px 20px", background: "rgba(0,180,255,0.18)", border: "1px solid rgba(0,180,255,0.5)", borderRadius: 8, color: "rgba(0,180,255,0.95)", fontFamily: "var(--font-mono, monospace)", textDecoration: "none" };
const warnStyle: React.CSSProperties = { marginTop: 16, padding: 12, border: "1px solid rgba(255,180,0,0.4)", borderRadius: 6, fontSize: 14 };
const notesSection: React.CSSProperties = { marginTop: 40 };
const h2Style: React.CSSProperties = { fontSize: 18, marginBottom: 8 };
const notesPre: React.CSSProperties = { whiteSpace: "pre-wrap", fontFamily: "var(--font-mono, monospace)", fontSize: 13, opacity: 0.85 };
const bodyStyle: React.CSSProperties = { fontSize: 16, marginTop: 12, opacity: 0.85 };
