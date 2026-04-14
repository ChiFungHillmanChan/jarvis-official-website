import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh-HK", "en"],
  defaultLocale: "zh-HK",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
