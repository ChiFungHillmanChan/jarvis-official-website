import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: { absolute: routeMetadata.company.title },
  description: routeMetadata.company.description,
  alternates: { canonical: routeMetadata.company.canonical },
};

export default function CompanyPage() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Company" title={copy.company.heading} sub={copy.company.sub} as="h1" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.company.sections.map((s) => (
            <GlassPanel key={s.title}>
              <h2 className="font-display text-xl">{s.title}</h2>
              <p className="mt-3 text-sm text-[color:var(--text-muted)]">{s.body}</p>
            </GlassPanel>
          ))}
        </div>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
          Get in touch —{" "}
          <Link href={routes.contact} className="text-[color:var(--accent-cyan)]">
            contact
          </Link>
        </p>
      </div>
    </section>
  );
}
