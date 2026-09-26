import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    // next-intl's ESM imports "next/server" without an extension; let Vite resolve it.
    server: { deps: { inline: ["next-intl"] } },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
