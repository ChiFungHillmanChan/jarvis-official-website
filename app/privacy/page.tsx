import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.privacy.title,
  description: routeMetadata.privacy.description,
  alternates: { canonical: routeMetadata.privacy.canonical },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Privacy</h1>
    </div>
  );
}
