import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
  contentSecurityPolicy,
  PROXY_SKIPPED_PATHS,
  securityHeaders,
} from "./lib/security/headers";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Pages get a per-request nonce policy from proxy.ts instead.
      {
        source: PROXY_SKIPPED_PATHS,
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy() }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
