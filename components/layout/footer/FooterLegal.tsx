import Link from "next/link";
import { getUiFor } from "@/content/ui";
import { localePath } from "@/lib/i18n/localePath";

export function FooterLegal({ locale }: { locale: string }) {
  const ui = getUiFor(locale);
  const links = [
    { label: ui.footer.privacy, path: "/privacy" },
    { label: ui.footer.terms, path: "/terms" },
    { label: ui.footer.security, path: "/security" },
  ];

  return (
    <nav aria-label={ui.footer.legalLabel}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[color:var(--text-muted)]">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={localePath(locale, link.path)}
              className="transition-colors hover:text-[color:var(--text-primary)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
