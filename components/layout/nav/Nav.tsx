import { getLocale } from "next-intl/server";
import { Wordmark } from "@/components/ui/Wordmark";
import { getUiFor } from "@/content/ui";
import { NavLinks } from "./NavLinks";
import { NavCta } from "./NavCta";
import { MobileMenu } from "./MobileMenu";
import { LanguageToggle } from "./LanguageToggle";
import { buildNavLinks } from "./nav.data";

export async function Nav() {
  const locale = await getLocale();
  const ui = getUiFor(locale);
  const links = buildNavLinks(locale, ui);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.6)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Wordmark locale={locale} />
        <NavLinks links={links} />
        <div className="hidden items-center gap-5 md:flex">
          <LanguageToggle locale={locale} />
          <NavCta label={ui.nav.joinWaitlist} />
        </div>
        <MobileMenu
          links={links}
          joinWaitlistLabel={ui.nav.joinWaitlist}
          openLabel={ui.nav.openMenu}
          closeLabel={ui.nav.closeMenu}
          locale={locale}
        />
      </div>
    </header>
  );
}
