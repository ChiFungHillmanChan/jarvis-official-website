import Link from "next/link";
import { company } from "@/content/company";
import { localePath } from "@/lib/i18n/localePath";

export function Wordmark({ locale }: { locale: string }) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-sm text-[color:var(--text-primary)]"
      aria-label={`${company.productName} ${locale === "zh-HK" ? "首頁" : "home"}`}
    >
      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true">
        <rect width="29" height="29" rx="9" fill="currentColor" />
        <path
          d="M11 8H19V16.5C19 20.09 16.91 22 13.5 22C10.1 22 8 20.05 8 17"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[19px] font-semibold tracking-[-0.035em]">
        {company.productName}
      </span>
    </Link>
  );
}
