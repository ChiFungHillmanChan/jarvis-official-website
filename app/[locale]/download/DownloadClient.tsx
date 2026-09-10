"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchLatestRelease, isMacOs, LATEST_DMG_URL, type ReleaseInfo } from "@/lib/download";
import { localePath } from "@/lib/i18n/localePath";
import type { Copy } from "@/content/getCopy";

interface Props {
  copy: Copy["download"];
  locale: string;
}

// Stable subscribe (no-op) — UA never changes during a session, no resubscription needed.
const subscribe = () => () => {};
const getClientSnapshot = (): boolean => isMacOs(window.navigator.userAgent);
const getServerSnapshot = (): boolean | null => null;
const downloadButtonClassName =
  "mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--accent-cyan)] bg-[var(--accent-cyan)] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#005653] hover:bg-[#005653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-cyan)]";

export default function DownloadClient({ copy, locale }: Props) {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  // useSyncExternalStore is the canonical React pattern for client-only values:
  // returns null during SSR, resolves to the boolean on first client render.
  // Avoids the setState-in-effect lint rule that fires on cascading renders.
  const isMac = useSyncExternalStore<boolean | null>(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    fetchLatestRelease().then(({ release, source }) => {
      setRelease(release);
      setSource(source);
    });
  }, []);

  if (isMac === false) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.nonMacosTitle}
          sub={copy.nonMacosBody}
          as="h1"
        />
        <Link href={`${localePath(locale, "/")}#access`} className={downloadButtonClassName}>
          {copy.joinWaitlist}
        </Link>
      </section>
    );
  }

  // isMac === null on the server and on the hydration render, and release is null
  // until the client fetch lands. Both fall through to the macOS shell so the
  // server HTML carries the heading, the requirements and a working download link.
  return (
    <section className="mx-auto max-w-[800px] px-6 py-20 md:px-10 md:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} sub={copy.subtitle} as="h1" />
      <p className="mt-5 text-sm leading-6 text-[color:var(--text-muted)]">
        {copy.systemRequirements}
      </p>

      {release !== null && source === "fallback" && (
        <p className="mt-6 rounded-xl border border-[var(--grid-line)] bg-[var(--bg-panel)] p-4 text-sm leading-6 text-[color:var(--text-secondary)]">
          {copy.fetchError}
        </p>
      )}

      <a href={release?.downloadUrl ?? LATEST_DMG_URL} className={downloadButtonClassName}>
        {release === null ? copy.primaryCta : `${copy.primaryCta} (v${release.version})`}
      </a>

      {release === null ? (
        <p className="mt-4 text-sm text-[color:var(--text-muted)]">{copy.loadingNotes}</p>
      ) : (
        release.notes && (
          <section className="mt-14 border-t border-[var(--grid-line)] pt-8">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.025em]">
              {copy.releaseNotesHeading}
            </h2>
            <pre className="mt-4 font-sans text-sm leading-7 whitespace-pre-wrap text-[color:var(--text-secondary)]">
              {release.notes}
            </pre>
          </section>
        )
      )}
    </section>
  );
}
