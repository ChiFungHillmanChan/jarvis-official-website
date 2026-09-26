// @vitest-environment node
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
// How Next.js itself compiles proxy matchers and next.config header sources.
import { tryToParsePath } from "next/dist/lib/try-to-parse-path";
import { getPathMatch } from "next/dist/shared/lib/router/utils/path-match";
import proxy, { config } from "./proxy";
import { PROXY_SKIPPED_PATHS } from "./lib/security/headers";

function nonceOf(policy: string | null): string | undefined {
  return policy?.match(/'nonce-([^']+)'/)?.[1];
}

describe("proxy", () => {
  it("sends a fresh nonce policy on the page and forwards it to the renderer", () => {
    const first = proxy(new NextRequest("http://localhost/en"));
    const second = proxy(new NextRequest("http://localhost/en"));
    const policy = first.headers.get("Content-Security-Policy");

    expect(nonceOf(policy)).toBeTruthy();
    expect(first.headers.get("x-middleware-request-content-security-policy")).toBe(policy);
    expect(nonceOf(second.headers.get("Content-Security-Policy"))).not.toBe(nonceOf(policy));
  });

  it("still redirects unprefixed paths to a locale", () => {
    const response = proxy(new NextRequest("http://localhost/download"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/en/download");
  });

  it("covers exactly the paths the static policy does not", () => {
    const proxied = new RegExp(tryToParsePath(config.matcher).regexStr ?? "$^");
    const skipped = getPathMatch(PROXY_SKIPPED_PATHS, { strict: true });
    const paths = [
      "/",
      "/en",
      "/zh-HK/download",
      "/en/payment/success",
      "/api/waitlist",
      "/latest.json",
      "/_next/static/chunks/app.js",
      "/_next/image",
      "/_vercel/insights/view",
      "/en/unknown.page",
    ];

    for (const path of paths) {
      expect([path, proxied.test(path) !== (skipped(path) !== false)]).toEqual([path, true]);
    }
  });
});
