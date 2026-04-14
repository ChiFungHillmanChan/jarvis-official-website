export const routes = {
  home: "/",
  company: "/company",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];
