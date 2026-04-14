import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import { Nav } from "@/components/layout/nav/Nav";
import { Footer } from "@/components/layout/footer/Footer";
import { baseMetadata, routeMetadata } from "@/content/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: routeMetadata.home.title,
    template: "%s · JARVIS AI",
  },
  description: routeMetadata.home.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
