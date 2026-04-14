import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.contact.title,
  description: routeMetadata.contact.description,
  alternates: { canonical: routeMetadata.contact.canonical },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Contact</h1>
    </div>
  );
}
