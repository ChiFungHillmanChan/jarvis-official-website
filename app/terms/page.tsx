import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.terms.title,
  description: routeMetadata.terms.description,
  alternates: { canonical: routeMetadata.terms.canonical },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Terms</h1>
    </div>
  );
}
