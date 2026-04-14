"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname() ?? "/";
  const other = locale === "zh-HK" ? "en" : "zh-HK";
  const otherLabel = other === "zh-HK" ? "繁" : "EN";

  const stripped = stripLocalePrefix(pathname);
  const href = `/${other}${stripped === "/" ? "" : stripped}`;

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={`Switch to ${other}`}
      className="rounded-full border border-[var(--grid-line)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-muted)] transition-colors hover:border-[var(--accent-cyan-60)] hover:text-[color:var(--text-primary)]"
    >
      {otherLabel}
    </Link>
  );
}

function stripLocalePrefix(pathname: string): string {
  for (const loc of routing.locales) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}
