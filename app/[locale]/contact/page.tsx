import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { buildAlternates, getRouteMetadata } from "@/content/metadata";
import { getCopy } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { company } from "@/content/company";
import { getCompanyL10n } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
import { ExternalLink } from "@/components/ui/ExternalLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const rm = getRouteMetadata(locale);
  return {
    title: { absolute: rm.contact.title },
    description: rm.contact.description,
    alternates: buildAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = await getCopy();
  const ui = getUiFor(locale);
  const companyL10n = getCompanyL10n(locale);

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth} space-y-16`}>
        <SectionHeading
          eyebrow={ui.contact.eyebrow}
          title={copy.contactPage.heading}
          sub={copy.contactPage.sub}
          as="h1"
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassPanel className="h-full">
            <h2 className="font-display text-3xl">{copy.contactPage.directHeading}</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              {copy.contactPage.directBody}
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{ui.contact.emailLabel}: </span>
                <a
                  className="text-[color:var(--accent-cyan)]"
                  href={`mailto:${company.contactEmail}`}
                >
                  {company.contactEmail}
                </a>
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{ui.contact.githubLabel}: </span>
                <ExternalLink href={company.github}>
                  {company.github.replace("https://", "")}
                </ExternalLink>
              </li>
              <li>
                <span className="font-medium text-[color:var(--text-primary)]">{ui.contact.locationLabel}: </span>
                {companyL10n.locationLine}
              </li>
            </ul>
            <div className="mt-10 border-t border-[var(--grid-line)] pt-6">
              <h3 className="font-display text-2xl">{copy.contactPage.inquiryHeading}</h3>
              <ul className="mt-4 space-y-3">
                {copy.contactPage.inquiryItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-cyan)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
          <GlassPanel className="h-full" id="request-access">
            <h2 className="font-display text-3xl">{copy.contactPage.accessHeading}</h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">
              {copy.contactPage.accessSub}
            </p>
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
              {copy.contactPage.privacyNote}{" "}
              <Link href={`/${locale}/privacy`} className="text-[color:var(--text-primary)] underline">
                {copy.contactPage.privacyLinkLabel}
              </Link>
              .
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
