import { routing } from "@/i18n/routing";

// Shared by the desktop and mobile language toggles, which rebuild the current
// path under the other locale.
export function stripLocalePrefix(pathname: string): string {
  for (const loc of routing.locales) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}
