import Link from "next/link";
import { company } from "@/content/company";
import { localePath } from "@/lib/i18n/localePath";

export function Wordmark({ locale }: { locale: string }) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex items-center gap-3 text-[color:var(--text-primary)]"
      aria-label={`${company.name} — home`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent-cyan)]" />
      <span className="font-mono text-sm tracking-[0.32em]">{company.name}</span>
    </Link>
  );
}
