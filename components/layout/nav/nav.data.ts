import type { UiStrings } from "@/content/ui";
import { localePath } from "@/lib/i18n/localePath";

export type NavLink = { label: string; href: string };

export function buildNavLinks(locale: string, ui: UiStrings): NavLink[] {
  return [
    { label: ui.nav.product, href: `${localePath(locale, "/")}#product` },
    { label: ui.nav.company, href: localePath(locale, "/company") },
    { label: ui.nav.contact, href: localePath(locale, "/contact") },
  ];
}
