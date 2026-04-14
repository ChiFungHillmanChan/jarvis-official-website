import Link from "next/link";
import { navLinks } from "./nav.data";

export function NavLinks() {
  return (
    <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.22em] md:flex">
      {navLinks.map((link) => (
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
