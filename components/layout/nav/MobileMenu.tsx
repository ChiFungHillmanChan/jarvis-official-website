"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./nav.data";
import { Button } from "@/components/ui/Button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 flex h-10 w-10 items-center justify-center text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)]"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-transform duration-200"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="16" x2="19" y2="16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`fixed left-0 right-0 top-16 z-40 border-b border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.95)] backdrop-blur-lg transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-3 font-mono text-sm uppercase tracking-[0.22em] text-[color:var(--text-muted)] transition-colors hover:bg-[var(--accent-cyan-20)] hover:text-[color:var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-[var(--grid-line)] pt-4">
            <Button href="#waitlist" variant="primary" className="w-full">
              Join waitlist
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
