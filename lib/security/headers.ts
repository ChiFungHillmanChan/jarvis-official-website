// Security response headers. next.config.ts sends securityHeaders on every
// response and the nonce-less policy on PROXY_SKIPPED_PATHS; proxy.ts sends a
// per-request nonce policy on pages.

const isDev = process.env.NODE_ENV === "development";

// Exactly the paths the proxy.ts matcher skips (static files, API routes,
// framework assets). Keep the two complementary so no response carries two
// policies; proxy.test.ts checks this.
export const PROXY_SKIPPED_PATHS = "/:path((?:api|_next|_vercel).*|.*\\..*)";

export function contentSecurityPolicy(nonce?: string): string {
  const scriptSrc = ["'self'"];
  // Next.js stamps the nonce on its own scripts; 'strict-dynamic' extends that
  // trust to the chunks and the Vercel Analytics script those scripts insert.
  if (nonce) scriptSrc.push(`'nonce-${nonce}'`, "'strict-dynamic'");
  // React uses eval only for dev-server debugging, never in production.
  if (isDev) scriptSrc.push("'unsafe-eval'");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    // Production HTML has no <style> elements; the dev server injects them.
    `style-src 'self'${isDev ? " 'unsafe-inline'" : ""}`,
    // React renders style="" attributes (next/image, the demo progress bars).
    "style-src-attr 'unsafe-inline'",
    // The download page reads the release manifest from the production origin,
    // including when it is viewed on a preview deployment.
    "connect-src 'self' https://jarvis-automation.com",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), browsing-topics=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), hid=(), magnetometer=(), microphone=(), midi=(), payment=(), serial=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];
