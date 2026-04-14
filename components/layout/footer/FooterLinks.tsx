import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { social } from "@/lib/constants/social";
import { company } from "@/content/company";
import { localePath } from "@/lib/i18n/localePath";

export function FooterLinks({ locale }: { locale: string }) {
  const labels =
    locale === "zh-HK"
      ? { product: "產品", company: "公司", contact: "聯絡" }
      : { product: "Product", company: "Company", contact: "Contact" };

  return (
    <ul className="flex flex-wrap gap-5 text-sm text-[color:var(--text-secondary)]">
      <li>
        <Link
          href={`${localePath(locale, "/")}#product`}
          className="hover:text-[color:var(--text-primary)]"
        >
          {labels.product}
        </Link>
      </li>
      <li>
        <Link href={localePath(locale, "/company")} className="hover:text-[color:var(--text-primary)]">
          {labels.company}
        </Link>
      </li>
      <li>
        <Link href={localePath(locale, "/contact")} className="hover:text-[color:var(--text-primary)]">
          {labels.contact}
        </Link>
      </li>
      <li>
        <ExternalLink href={social.github} className="no-underline">
          GitHub
        </ExternalLink>
      </li>
      <li>
        <a
          href={`mailto:${company.contactEmail}`}
          className="text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
        >
          {company.contactEmail}
        </a>
      </li>
    </ul>
  );
}
