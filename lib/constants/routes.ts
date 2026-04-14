export const routes = {
  home: "/",
  company: "/company",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const navRoutes = [
  { label: "Company", href: routes.company },
  { label: "Contact", href: routes.contact },
] as const;

export const footerLegalRoutes = [
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;
