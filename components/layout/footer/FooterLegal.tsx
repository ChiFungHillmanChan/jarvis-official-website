import Link from "next/link";
import { localePath } from "@/lib/i18n/localePath";

const en = [
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
  { label: "Security", path: "/security" },
];

const zhHk = [
  { label: "私隱", path: "/privacy" },
  { label: "條款", path: "/terms" },
  { label: "安全", path: "/security" },
];

export function FooterLegal({ locale }: { locale: string }) {
  const links = locale === "zh-HK" ? zhHk : en;
  return (
    <ul className="flex gap-6 text-sm text-[color:var(--text-muted)]">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            href={localePath(locale, link.path)}
            className="text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
