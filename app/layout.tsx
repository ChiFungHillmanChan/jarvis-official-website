import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JARVIS AI",
  description: "Native macOS AI assistant.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
