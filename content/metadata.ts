import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jarvis-ai.vercel.app";

export const baseMetadata = {
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    siteName: "JARVIS AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JARVIS AI" }],
  },
  twitter: { card: "summary_large_image" },
} satisfies Metadata;

export const routeMetadata = {
  home: {
    title: "JARVIS AI — Your desktop, operated at the speed of thought",
    description:
      "JARVIS is a native macOS AI assistant that unifies Gmail, Calendar, Notion, GitHub, and Obsidian into one voice-controlled command center. 32 AI tools. Local-first.",
    canonical: "/",
  },
  company: {
    title: "Company · JARVIS AI",
    description:
      "JARVIS AI is a Hong Kong-based startup building native desktop AI agents for engineers and operators.",
    canonical: "/company",
  },
  contact: {
    title: "Contact · JARVIS AI",
    description: "Business contact, beta waitlist, and press inquiries for JARVIS AI.",
    canonical: "/contact",
  },
  privacy: {
    title: "Privacy · JARVIS AI",
    description: "How JARVIS AI handles data. Local-first architecture. No user data on our servers.",
    canonical: "/privacy",
  },
  terms: {
    title: "Terms · JARVIS AI",
    description: "Terms of service for the JARVIS beta.",
    canonical: "/terms",
  },
} as const;

export type RouteKey = keyof typeof routeMetadata;
