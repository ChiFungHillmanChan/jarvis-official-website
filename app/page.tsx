import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Home (sections land in Day 2)</h1>
    </div>
  );
}
