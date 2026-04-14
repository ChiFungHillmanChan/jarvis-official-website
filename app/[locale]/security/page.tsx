import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter, getRouteMetadata } from "@/content/metadata";
import { getCopy } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.security.title },
    description: rm.security.description,
    alternates: buildAlternates(locale, "/security"),
    openGraph: buildOpenGraph(locale, rm.security),
    twitter: buildTwitter(rm.security),
  };
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getCopy();
  const ui = getUiFor(locale);

  return (
    <article className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow={ui.legal.eyebrow}
          title={copy.security.heading}
          sub={copy.security.lastUpdated}
          as="h1"
        />
        <div className="mt-12 space-y-10">
          {copy.security.sections.map((s) => (
            <section key={s.title} className="rounded-[2rem] border border-[var(--grid-line)] bg-[var(--bg-panel)] p-8 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
