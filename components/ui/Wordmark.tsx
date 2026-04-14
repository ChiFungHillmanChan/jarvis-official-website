import Link from "next/link";
import { company } from "@/content/company";
import { routes } from "@/lib/constants/routes";

export function Wordmark() {
  return (
    <Link
      href={routes.home}
      className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.25em] text-[color:var(--text-primary)]"
      aria-label={`${company.name} — home`}
    >
      <span className="text-[color:var(--accent-cyan)]">[</span>
      <span>{company.name}</span>
      <span className="text-[color:var(--accent-cyan)]">]</span>
    </Link>
  );
}
