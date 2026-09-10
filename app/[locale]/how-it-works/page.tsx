import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import {
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  getRouteMetadata,
} from "@/content/metadata";
import { getSetupCopy } from "@/content/setup";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const route = getRouteMetadata(locale).howItWorks;
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: buildAlternates(locale, route.canonical),
    openGraph: buildOpenGraph(locale, route),
    twitter: buildTwitter(route),
  };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = getSetupCopy(locale);

  return (
    <article className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </header>

      <section className="prose-section" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading">{copy.requirements.title}</h2>
        <ul>
          {copy.requirements.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="prose-section" aria-labelledby="steps-heading">
        <h2 id="steps-heading">{copy.stepsTitle}</h2>
        <ol className="setup-steps">
          {copy.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.prompt && (
                <blockquote>
                  <p>{step.prompt}</p>
                </blockquote>
              )}
              {step.note && <p className="setup-note">{step.note}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="prose-section" aria-labelledby="calendar-heading">
        <h2 id="calendar-heading">{copy.calendar.title}</h2>
        <p>{copy.calendar.body}</p>
        <blockquote>
          <p>{copy.calendar.prompt}</p>
        </blockquote>
        <p>{copy.calendar.note}</p>
      </section>

      <section className="prose-section" aria-labelledby="data-heading">
        <h2 id="data-heading">{copy.data.title}</h2>
        {copy.data.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="setup-links">
          <Link href={`/${locale}/privacy`}>{copy.next.privacyLabel}</Link>
          <Link href={`/${locale}/security`}>{copy.next.securityLabel}</Link>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="next-heading">
        <h2 id="next-heading">{copy.next.title}</h2>
        <p>{copy.next.body}</p>
        <div className="setup-links">
          <Link href={`/${locale}#access`}>{copy.next.requestLabel}</Link>
          <Link href={`/${locale}/download`}>{copy.next.downloadLabel}</Link>
        </div>
      </section>
    </article>
  );
}
