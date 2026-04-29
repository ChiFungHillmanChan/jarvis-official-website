import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { company, getCompanyL10n } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { localePath } from "@/lib/i18n/localePath";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
import { getUiFor } from "@/content/ui";

export async function HomeAccess() {
  const locale = await getLocale();
  const copy = await getCopy();
  const ui = getUiFor(locale);
  const companyL10n = getCompanyL10n(locale);

  return (
    <section id="access" className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.home.access.eyebrow}
          title={copy.home.access.title}
          sub={copy.home.access.sub}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassPanel className="h-full">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--accent-cyan)]">
              {copy.home.access.contactLead}
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{ui.contact.emailLabel}: </span>
                <a href={`mailto:${company.contactEmail}`} className="text-[color:var(--accent-cyan)]">
                  {company.contactEmail}
                </a>
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{ui.contact.locationLabel}: </span>
                {companyL10n.locationLine}
              </li>
            </ul>
            <Link
              href={localePath(locale, "/contact")}
              className="mt-8 inline-flex text-sm font-medium text-[color:var(--text-primary)] underline"
            >
              {copy.home.access.contactLinkLabel}
            </Link>
          </GlassPanel>
          <GlassPanel className="h-full" id="request-access">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl">{copy.waitlistCta.submit}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
                {copy.contactPage.accessSub}
              </p>
            </div>
            <div className="mt-6">
              <WaitlistForm
                placeholder={copy.waitlistCta.placeholder}
                submitLabel={copy.waitlistCta.submit}
                submittingLabel={ui.waitlist.submitting}
                successMessage={copy.waitlistCta.success}
                errorInvalid={copy.waitlistCta.errorInvalid}
                errorGeneric={copy.waitlistCta.errorGeneric}
                emailLabel={ui.contact.emailInputLabel}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              {copy.home.access.privacyNote}{" "}
              <Link
                href={localePath(locale, "/privacy")}
                className="text-[color:var(--text-primary)] underline"
              >
                {copy.home.access.privacyLinkLabel}
              </Link>
              .
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
