// Public, indexable pages only. Sitemap and localized metadata share this list.
// Payment returns and API endpoints must not be added here.
export const routes = {
  home: "/",
  product: "/product",
  demo: "/demo",
  beta: "/beta",
  howItWorks: "/how-it-works",
  company: "/company",
  contact: "/contact",
  download: "/download",
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];
