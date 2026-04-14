import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.company.title,
  description: routeMetadata.company.description,
  alternates: { canonical: routeMetadata.company.canonical },
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Company</h1>
    </div>
  );
}
