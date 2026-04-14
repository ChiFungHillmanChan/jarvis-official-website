import Link from "next/link";
import { company } from "@/content/company";
import { localePath } from "@/lib/i18n/localePath";

export function Wordmark({ locale }: { locale: string }) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.25em] text-[color:var(--text-primary)]"
      aria-label={`${company.name} — home`}
    >
      <span className="text-[color:var(--accent-cyan)]">[</span>
      <span>{company.name}</span>
      <span className="text-[color:var(--accent-cyan)]">]</span>
    </Link>
  );
}
