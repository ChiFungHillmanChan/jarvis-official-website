import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { copy } from "@/content/copy.en";
import { WaitlistForm } from "./WaitlistForm";

export function WaitlistCta() {
  return (
    <section id="waitlist" className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Access"
          title={copy.waitlistCta.heading}
          sub={copy.waitlistCta.sub}
          align="center"
        />
        <div className="mt-10">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
