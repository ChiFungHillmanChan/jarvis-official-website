"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUiFor } from "@/content/ui";
import { routing } from "@/i18n/routing";

export function LanguageToggle({ locale }: { locale: string }) {
  const pathname = usePathname() ?? "/";
  const other = locale === "zh-HK" ? "en" : "zh-HK";
  const otherLabel = other === "zh-HK" ? "繁中" : "English";

  const stripped = stripLocalePrefix(pathname);
  const href = `/${other}${stripped === "/" ? "" : stripped}`;

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={languageToggleLabel(locale, other)}
      className="rounded-sm py-3 text-[13px] text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
    >
      {otherLabel}
    </Link>
  );
}

export function languageToggleLabel(locale: string, target: string): string {
  const targetName = target === "zh-HK" ? "繁體中文" : "English";
  return getUiFor(locale).nav.languageToggle.replace("{language}", targetName);
}

function stripLocalePrefix(pathname: string): string {
  for (const loc of routing.locales) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}
