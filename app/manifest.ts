import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JARVIS AI",
    short_name: "JARVIS",
    description:
      "A personal AI email workspace for Mac. Bring Gmail accounts, email groups, your instructions and source memories together.",
    start_url: "/",
    display: "standalone",
    background_color: "#060d18",
    theme_color: "#060d18",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
