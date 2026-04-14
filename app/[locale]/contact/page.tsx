import type { Metadata } from "next";
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
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={ui.contact.eyebrow}
          title={copy.contact.heading}
          sub={copy.contact.sub}
          as="h1"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <GlassPanel>
            <h2 className="font-display text-xl">{ui.contact.businessContactHeading}</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">{copy.contact.intro}</p>
            <ul className="mt-5 space-y-2 font-mono text-sm">
              <li>
                <span className="text-[color:var(--text-muted)]">{ui.contact.emailLabel} · </span>
                <a
                  className="text-[color:var(--accent-cyan)]"
                  href={`mailto:${company.contactEmail}`}
                >
                  {company.contactEmail}
                </a>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">{ui.contact.githubLabel} · </span>
                <ExternalLink href={company.github}>
                  {company.github.replace("https://", "")}
                </ExternalLink>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">{ui.contact.locationLabel} · </span>
                <span>{companyL10n.locationLine}</span>
              </li>
            </ul>
          </GlassPanel>
          <GlassPanel>
            <h2 className="font-display text-xl">{ui.contact.joinWaitlistHeading}</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">{ui.contact.waitlistSub}</p>
            <div className="mt-5">
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
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
