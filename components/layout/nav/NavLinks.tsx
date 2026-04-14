import Link from "next/link";
import type { NavLink } from "./nav.data";

export function NavLinks({ links }: { links: readonly NavLink[] }) {
  return (
    <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.22em] md:flex">
      {links.map((link) => (
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
