"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "./nav.data";
import { routing } from "@/i18n/routing";
import { getUiFor } from "@/content/ui";
import { localePath } from "@/lib/i18n/localePath";

export function MobileMenu({
  links,
  requestAccessLabel,
  openLabel,
  closeLabel,
  locale,
}: {
  links: readonly NavLink[];
  requestAccessLabel: string;
  openLabel: string;
  closeLabel: string;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const ui = getUiFor(locale);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const lastLink = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault();
          lastLink?.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const other = locale === "zh-HK" ? "en" : "zh-HK";
  const otherLabel = other === "zh-HK" ? "繁體中文" : "English";
  const stripped = stripLocalePrefix(pathname);
  const langHref = `/${other}${stripped === "/" ? "" : stripped}`;

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--text-primary)] transition-colors hover:bg-[var(--bg-panel)]"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="transition-transform duration-200"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="19" y2="7" />
              <line x1="3" y1="15" x2="19" y2="15" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/20"
          onClick={close}
          aria-hidden
        />
      )}

      <div
        ref={panelRef}
        id="mobile-menu-panel"
        inert={!open}
        className={`fixed top-[72px] right-0 left-0 z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-[var(--grid-line)] bg-white transition-all duration-200 motion-reduce:transition-none ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav
          aria-label={ui.nav.primaryLabel}
          className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-5"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-lg px-3 py-3 text-base font-medium text-[color:var(--text-primary)] transition-colors hover:bg-[var(--bg-panel)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={langHref}
            prefetch={false}
            onClick={close}
            aria-label={ui.nav.languageToggle.replace("{language}", otherLabel)}
            className="rounded-lg px-3 py-3 text-sm text-[color:var(--text-secondary)] transition-colors hover:bg-[var(--bg-panel)] hover:text-[color:var(--accent-cyan)]"
          >
            {otherLabel}
          </Link>
          <div className="mt-3 border-t border-[var(--grid-line)] pt-4">
            <Button
              href={`${localePath(locale, "/contact")}#request-access`}
              onClick={close}
              variant="primary"
              className="w-full"
            >
              {requestAccessLabel}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function stripLocalePrefix(pathname: string): string {
  for (const loc of routing.locales) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}
