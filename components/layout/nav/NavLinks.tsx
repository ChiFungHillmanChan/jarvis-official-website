import Link from "next/link";
import type { NavLink } from "./nav.data";

export function NavLinks({ links, label }: { links: readonly NavLink[]; label: string }) {
  return (
    <nav aria-label={label} className="hidden md:block">
      <ul className="flex items-center gap-7 text-[13px] font-medium">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-3 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
