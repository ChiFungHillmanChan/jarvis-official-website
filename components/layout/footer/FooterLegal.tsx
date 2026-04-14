import Link from "next/link";
import { legalLinks } from "./footer.data";

export function FooterLegal() {
  return (
    <ul className="flex gap-6 font-mono text-xs uppercase tracking-[0.22em]">
      {legalLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
