import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JARVIS AI",
    short_name: "JARVIS",
    description:
      "Desktop AI for operators and engineers — a local-first macOS assistant by a Hong Kong startup.",
    start_url: "/",
    display: "standalone",
    background_color: "#09111b",
    theme_color: "#09111b",
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
