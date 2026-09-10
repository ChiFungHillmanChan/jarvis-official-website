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
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-white/95 md:backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">
        <Wordmark locale={locale} />
        <NavLinks links={links} label={ui.nav.primaryLabel} />
        <div className="hidden items-center gap-4 md:flex">
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
