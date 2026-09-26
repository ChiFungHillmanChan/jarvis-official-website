import Link from "next/link";
import { getLegalCopy } from "@/content/legal";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { localePath } from "@/lib/i18n/localePath";

type LegalPage = "privacy" | "terms" | "security";

export function LegalDocument({ locale, page }: { locale: string; page: LegalPage }) {
  const documents = getLegalCopy(locale);
  const document = documents[page];
  const chinese = locale === "zh-HK";

  return (
    <article className="page-shell">
      <PageJsonLd locale={locale} routeKey={page} />
      <header className="page-intro">
        <p className="eyebrow">{chinese ? "法律及信任" : "Legal and trust"}</p>
        <h1>{document.heading}</h1>
        <p className="mt-5 text-sm text-[color:var(--text-muted)]">{document.lastUpdated}</p>
        <p>{document.summary}</p>
      </header>

      <nav aria-label={chinese ? "政策及條款" : "Policies and terms"}>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {(["privacy", "terms", "security"] as const).map((key) => (
            <li key={key}>
              <Link
                href={localePath(locale, `/${key}`)}
                aria-current={page === key ? "page" : undefined}
                className="underline decoration-[var(--grid-line)] underline-offset-4 hover:decoration-current"
              >
                {documents[key].heading}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mt-10 border-y border-[var(--grid-line)] py-6" aria-label={chinese ? "本頁目錄" : "On this page"}>
        <p className="mb-4 text-sm font-medium">{chinese ? "本頁目錄" : "On this page"}</p>
        <ol className="grid gap-x-8 gap-y-3 text-sm leading-6 sm:grid-cols-2">
          {document.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-[color:var(--text-secondary)] hover:underline underline-offset-4">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-12">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id} className="prose-section scroll-mt-28" aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {section.links && (
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="break-words underline underline-offset-4">{link.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
