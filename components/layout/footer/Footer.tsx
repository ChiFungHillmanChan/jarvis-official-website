import { Wordmark } from "@/components/ui/Wordmark";
import { company } from "@/content/company";
import { FooterLinks } from "./FooterLinks";
import { FooterLegal } from "./FooterLegal";

export function Footer() {
  return (
    <footer className="border-t border-[var(--grid-line)] mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Wordmark />
          <FooterLinks />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--grid-line)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            {company.name} · {company.locationLine} · {company.registrationLine}
          </p>
          <FooterLegal />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          © {company.foundingYear} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
