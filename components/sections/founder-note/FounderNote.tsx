import Link from "next/link";
import { getLocale } from "next-intl/server";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";

export async function FounderNote() {
  const copy = await getCopy();
  const locale = await getLocale();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <GlassPanel>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--accent-cyan)]">
            {copy.founder.heading}
          </p>
          <p className="mt-4 text-base text-[color:var(--text-primary)] md:text-lg">
            {copy.founder.body}
          </p>
          <Link
            href={localePath(locale, "/company")}
            className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
          >
            {copy.founder.cta} →
          </Link>
        </GlassPanel>
      </div>
    </section>
  );
}
