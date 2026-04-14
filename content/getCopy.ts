import "server-only";
import { getLocale } from "next-intl/server";
import { copy as en } from "./copy.en";
import { copy as zhHk } from "./copy.zh-hk";
import type { Locale } from "@/i18n/routing";
import type { DeepWiden } from "./copy.types";

export type Copy = DeepWiden<typeof en>;

const dict: Record<Locale, Copy> = {
  en,
  "zh-HK": zhHk,
};

export function getCopyFor(locale: string): Copy {
  return dict[locale as Locale] ?? en;
}

export async function getCopy(): Promise<Copy> {
  const locale = await getLocale();
  return getCopyFor(locale);
}
