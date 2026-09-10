export const routes = {
  home: "/",
  howItWorks: "/how-it-works",
  company: "/company",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];
