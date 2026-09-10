import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JARVIS AI",
    short_name: "JARVIS",
    description:
      "An AI assistant for Mac that helps you search Gmail, draft replies, manage your calendar and keep track of tasks.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#006b68",
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
