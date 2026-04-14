import { getLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { WaitlistForm } from "./WaitlistForm";

export async function WaitlistCta() {
  const copy = await getCopy();
  const locale = await getLocale();
  const ui = getUiFor(locale);

  return (
    <section id="waitlist" className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow={ui.accessEyebrow}
          title={copy.waitlistCta.heading}
          sub={copy.waitlistCta.sub}
          align="center"
        />
        <div className="mt-10">
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
      </div>
    </section>
  );
}
