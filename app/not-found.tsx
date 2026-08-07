import Link from "next/link";
import { headers } from "next/headers";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import { getUiFor } from "@/content/ui";
import { routing, type Locale } from "@/i18n/routing";
import { localePath } from "@/lib/i18n/localePath";
import "@/styles/globals.css";

// This boundary renders for requests that matched no route at all, so the
// [locale] segment never ran and next-intl has no request context here. The
// locale is negotiated from the request headers instead, strongest signal
// first:
//
//  1. The locale in the requested path. There is no framework API for "the path
//     that 404'd" inside this boundary, so it is read off the two request
//     headers that carry it: x-matched-path, which Vercel sets to the path it
//     routed, and x-next-intl-locale, which the next-intl proxy (proxy.ts) sets
//     on the forwarded request from the path prefix -- localeDetection is off,
//     so that value is the path's locale and never the browser's preference.
//     This is what stops a stale /zh-HK/... link opened in an English-configured
//     browser from answering in English and then bouncing the visitor to /en.
//  2. Accept-Language, for requests that reach here with no path signal (the
//     proxy skips paths containing a dot, among others).
//  3. The default locale.
//
// A URL with no locale prefix is redirected by the proxy to one before it can
// 404, so by the time this renders the requested path normally has a prefix.
// Both header reads are plain strings, so nothing here depends on next-intl.
//
// Still open: this page carries no site navigation beyond the one button, and
// app/[locale]/not-found.tsx -- the localized boundary that does have the nav
// and footer -- stays unreachable until a catch-all route exists inside
// app/[locale].
function knownLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const lower = value.trim().toLowerCase();
  return routing.locales.find((locale) => locale.toLowerCase() === lower) ?? null;
}

function localeFromPath(path: string | null): Locale | null {
  if (!path) return null;
  const [first] = path.split("?")[0]?.split("/").filter(Boolean) ?? [];
  return knownLocale(first);
}

function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const quality = params.find((p) => p.trim().startsWith("q="))?.split("=")[1];
      return {
        tag: tag.trim().toLowerCase(),
        quality: quality === undefined ? 1 : Number(quality),
      };
    })
    .filter((entry) => entry.tag !== "" && Number.isFinite(entry.quality) && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    // zh-HK is the only Chinese locale this site ships, so any zh-* maps to it.
    if (tag.startsWith("zh")) return "zh-HK";
    if (tag.startsWith("en")) return "en";
  }
  return null;
}

export default async function RootNotFound() {
  const requestHeaders = await headers();
  const locale =
    localeFromPath(requestHeaders.get("x-matched-path")) ??
    knownLocale(requestHeaders.get("x-next-intl-locale")) ??
    localeFromAcceptLanguage(requestHeaders.get("accept-language")) ??
    routing.defaultLocale;
  const ui = getUiFor(locale);

  return (
    <html
      // Same tag app/[locale]/layout.tsx uses, so the site advertises one
      // language tag per locale rather than two.
      lang={locale === "zh-HK" ? "zh-Hant-HK" : "en"}
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[color:var(--accent-cyan)]">
            {ui.notFound.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)]">
            {ui.notFound.title}
          </h1>
          <p className="mt-4 text-sm text-[color:var(--text-muted)]">{ui.notFound.sub}</p>
          <Link
            href={localePath(locale, "/")}
            className="mt-10 inline-flex items-center justify-center rounded-full border border-[color:var(--accent-cyan)] bg-[color:var(--accent-cyan)] px-5 py-3 text-sm font-medium text-[color:var(--bg-void)] transition-all duration-150 hover:bg-[color:var(--text-primary)]"
          >
            {ui.notFound.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
