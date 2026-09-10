import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
import { getUiFor } from "@/content/ui";

export async function HomeAccess() {
  const locale = await getLocale();
  const copy = await getCopy();
  const ui = getUiFor(locale);
  return (
    <section className="home-section access-section" id="access" aria-labelledby="access-heading">
      <div className="site-container access-layout">
        <div>
          <h2 id="access-heading">{copy.home.access.title}</h2>
          <p>{copy.home.access.sub}</p>
          <p className="existing-tester">
            {copy.home.access.note}
            <br />
            <Link href={localePath(locale, "/download")} className="text-link">
              {copy.home.access.download}
            </Link>
          </p>
        </div>
        <div className="access-form" id="request-access">
          <h3>{copy.home.hero.primaryCta}</h3>
          <WaitlistForm
            placeholder={copy.waitlistCta.placeholder}
            submitLabel={copy.waitlistCta.submit}
            submittingLabel={ui.waitlist.submitting}
            successMessage={copy.waitlistCta.success}
            errorInvalid={copy.waitlistCta.errorInvalid}
            errorGeneric={copy.waitlistCta.errorGeneric}
            emailLabel={ui.contact.emailInputLabel}
            roleLabel={copy.waitlistCta.roleLabel}
            rolePlaceholder={copy.waitlistCta.rolePlaceholder}
            painLabel={copy.waitlistCta.painLabel}
            painPlaceholder={copy.waitlistCta.painPlaceholder}
          />
          <p className="consent-note">
            {copy.home.access.privacyNote}{" "}
            <Link href={localePath(locale, "/privacy")}>{copy.home.access.privacyLinkLabel}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
