export const routes = {
  home: "/",
  howItWorks: "/how-it-works",
  company: "/company",
  contact: "/contact",
  download: "/download",
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];
