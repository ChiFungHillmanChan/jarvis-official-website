import Link from "next/link";
import { company } from "@/content/company";
import { localePath } from "@/lib/i18n/localePath";
import { BrandIcon } from "./BrandIcon";

export function Wordmark({ locale }: { locale: string }) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-sm text-[color:var(--text-primary)]"
      aria-label={`${company.productName} ${locale === "zh-HK" ? "首頁" : "home"}`}
    >
      <BrandIcon />
      <span className="font-display text-[19px] font-semibold tracking-[-0.035em]">
        {company.productName}
      </span>
    </Link>
  );
}
