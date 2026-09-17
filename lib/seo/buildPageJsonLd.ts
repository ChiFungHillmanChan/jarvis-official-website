import { company } from "@/content/company";
import { getRouteMetadata, type RouteKey } from "@/content/metadata";
import { siteUrl } from "@/lib/constants/site";
import { localePath } from "@/lib/i18n/localePath";

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: company.name,
    alternateName: company.productName,
    url: siteUrl,
    inLanguage: ["en", "zh-Hant-HK"],
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildPageJsonLd(locale: string, routeKey: RouteKey) {
  const normalized = locale === "zh-HK" ? "zh-HK" : "en";
  const route = getRouteMetadata(normalized)[routeKey];
  const url = `${siteUrl}${localePath(normalized, route.canonical)}`;
  const isHome = routeKey === "home";
  const page = {
    "@type": routeKey === "contact" ? "ContactPage" : routeKey === "company" ? "AboutPage" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: normalized === "zh-HK" ? "zh-Hant-HK" : "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    ...(isHome ? { mainEntity: { "@id": `${siteUrl}/#software` } } : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: normalized === "zh-HK" ? "首頁" : "Home", item: `${siteUrl}/${normalized}` },
      { "@type": "ListItem", position: 2, name: route.title, item: url },
    ],
  };
  return { "@context": "https://schema.org", "@graph": isHome ? [page] : [page, breadcrumb] };
}
