import Link from "next/link";
import { getUiFor } from "@/content/ui";
import { localePath } from "@/lib/i18n/localePath";

export function FooterLinks({ locale }: { locale: string }) {
  const ui = getUiFor(locale);
  const groups = [
    {
      heading: ui.footer.productHeading,
      links: [
        { label: ui.nav.product, href: `${localePath(locale, "/")}#product` },
        { label: ui.nav.howItWorks, href: localePath(locale, "/how-it-works") },
        { label: ui.nav.download, href: localePath(locale, "/download") },
        { label: ui.footer.security, href: localePath(locale, "/security") },
      ],
    },
    {
      heading: ui.footer.companyHeading,
      links: [
        { label: ui.nav.company, href: localePath(locale, "/company") },
        { label: ui.nav.contact, href: localePath(locale, "/contact") },
        { label: ui.nav.requestAccess, href: `${localePath(locale, "/contact")}#request-access` },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {groups.map((group) => (
        <nav key={group.heading} aria-label={group.heading}>
          <h2 className="text-sm font-semibold text-[color:var(--text-primary)]">
            {group.heading}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--text-secondary)]">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--accent-cyan)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}
