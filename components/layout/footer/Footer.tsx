import { getLocale } from "next-intl/server";
import { Wordmark } from "@/components/ui/Wordmark";
import { company, getCompanyL10n } from "@/content/company";
import { getUiFor } from "@/content/ui";
import { FooterLinks } from "./FooterLinks";
import { FooterLegal } from "./FooterLegal";

export async function Footer() {
  const locale = await getLocale();
  const companyL10n = getCompanyL10n(locale);
  const ui = getUiFor(locale);

  return (
    <footer className="border-t border-[var(--grid-line)] bg-[var(--bg-panel)]">
      <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-8 md:px-10 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <Wordmark locale={locale} />
            <p className="mt-5 max-w-[280px] text-base leading-6 text-[color:var(--text-secondary)]">
              {companyL10n.tagline}
            </p>
            <p className="mt-6 text-xs text-[color:var(--text-muted)]">
              {companyL10n.locationLine}
            </p>
            <a
              href={`mailto:${company.contactEmail}`}
              className="mt-2 inline-block text-sm text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent-cyan)]"
            >
              {company.contactEmail}
            </a>
          </div>
          <FooterLinks locale={locale} />
        </div>
        <div className="mt-12 flex flex-col gap-5 border-t border-[var(--grid-line)] pt-6 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-5 text-[color:var(--text-muted)]">
            © {company.foundingYear} {company.name}. {ui.footer.rightsReserved}
          </p>
          <FooterLegal locale={locale} />
        </div>
      </div>
    </footer>
  );
}
