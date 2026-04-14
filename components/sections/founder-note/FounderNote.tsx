import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { section } from "@/lib/constants/spacing";
import { routes } from "@/lib/constants/routes";
import { copy } from "@/content/copy.en";

export function FounderNote() {
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
            href={routes.company}
            className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
          >
            {copy.founder.cta} →
          </Link>
        </GlassPanel>
      </div>
    </section>
  );
}
