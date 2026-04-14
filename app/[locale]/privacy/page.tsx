import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, getRouteMetadata } from "@/content/metadata";
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
    title: { absolute: rm.privacy.title },
    description: rm.privacy.description,
    alternates: buildAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({
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
          title={copy.privacy.heading}
          sub={copy.privacy.lastUpdated}
          as="h1"
        />
        <div className="mt-12 space-y-10">
          {copy.privacy.sections.map((s) => (
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
