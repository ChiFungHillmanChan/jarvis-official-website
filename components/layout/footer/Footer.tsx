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
    <footer className="mt-24 border-t border-[var(--grid-line)] bg-[color:rgba(5,10,16,0.45)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Wordmark locale={locale} />
          <p className="max-w-2xl text-sm leading-6 text-[color:var(--text-muted)]">
            {companyL10n.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-6 border-t border-[var(--grid-line)] pt-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
              {company.name} · {companyL10n.locationLine} · {companyL10n.statusLine}
            </p>
            <FooterLinks locale={locale} />
          </div>
          <FooterLegal locale={locale} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          © {company.foundingYear} {company.name}. {ui.footer.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
