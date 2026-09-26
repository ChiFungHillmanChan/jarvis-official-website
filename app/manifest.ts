import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JARVIS AI",
    short_name: "JARVIS",
    description:
      "Your personal AI assistant for voice, text and Gmail workflows. Currently in beta for macOS.",
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
