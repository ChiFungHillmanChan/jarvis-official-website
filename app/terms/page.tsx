import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: { absolute: routeMetadata.terms.title },
  description: routeMetadata.terms.description,
  alternates: { canonical: routeMetadata.terms.canonical },
};

export default function TermsPage() {
  return (
    <article className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Legal" title={copy.terms.heading} sub={copy.terms.lastUpdated} as="h1" />
        <div className="mt-12 space-y-10">
          {copy.terms.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-3 text-[color:var(--text-muted)]">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
