import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustStrip } from "@/components/sections/trust-strip/TrustStrip";
import { Pillars } from "@/components/sections/pillars/Pillars";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
    </>
  );
}
