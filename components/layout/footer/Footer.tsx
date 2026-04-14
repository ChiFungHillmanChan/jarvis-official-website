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
    <footer className="border-t border-[var(--grid-line)] mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Wordmark locale={locale} />
          <FooterLinks />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--grid-line)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            {company.name} · {companyL10n.locationLine} · {companyL10n.registrationLine}
          </p>
          <FooterLegal locale={locale} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          © {company.foundingYear} {company.name}. {ui.footer.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
