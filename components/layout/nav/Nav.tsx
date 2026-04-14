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
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-[color:rgba(9,17,27,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Wordmark locale={locale} />
        <NavLinks links={links} />
        <div className="hidden items-center gap-5 md:flex">
          <LanguageToggle locale={locale} />
          <NavCta locale={locale} label={ui.nav.requestAccess} />
        </div>
        <MobileMenu
          links={links}
          requestAccessLabel={ui.nav.requestAccess}
          openLabel={ui.nav.openMenu}
          closeLabel={ui.nav.closeMenu}
          locale={locale}
        />
      </div>
    </header>
  );
}
