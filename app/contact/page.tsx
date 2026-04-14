import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { company } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata: Metadata = {
  title: { absolute: routeMetadata.contact.title },
  description: routeMetadata.contact.description,
  alternates: { canonical: routeMetadata.contact.canonical },
};

export default function ContactPage() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Contact" title={copy.contact.heading} sub={copy.contact.sub} as="h1" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <GlassPanel>
            <h2 className="font-display text-xl">Business contact</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">{copy.contact.intro}</p>
            <ul className="mt-5 space-y-2 font-mono text-sm">
              <li>
                <span className="text-[color:var(--text-muted)]">Email · </span>
                <a
                  className="text-[color:var(--accent-cyan)]"
                  href={`mailto:${company.contactEmail}`}
                >
                  {company.contactEmail}
                </a>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">GitHub · </span>
                <ExternalLink href={company.github}>{company.github.replace("https://", "")}</ExternalLink>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">Location · </span>
                <span>{company.locationLine}</span>
              </li>
            </ul>
          </GlassPanel>
          <GlassPanel>
            <h2 className="font-display text-xl">Join the waitlist</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              Private beta on macOS. No spam. One launch email.
            </p>
            <div className="mt-5">
              <WaitlistForm />
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
