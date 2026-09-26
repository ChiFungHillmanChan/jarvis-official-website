// @vitest-environment node
import { describe, it, expect } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./headers";

function directives(policy: string): Map<string, string> {
  return new Map(
    policy.split(";").map((part) => {
      const [name = "", ...values] = part.trim().split(/\s+/);
      return [name, values.join(" ")];
    }),
  );
}

describe("contentSecurityPolicy", () => {
  it("locks down the directives a DAST scan checks and never allows eval", () => {
    for (const policy of [contentSecurityPolicy(), contentSecurityPolicy("abc123")]) {
      const d = directives(policy);
      expect(policy).not.toContain("unsafe-eval");
      expect(d.get("default-src")).toBe("'self'");
      expect(d.get("object-src")).toBe("'none'");
      expect(d.get("base-uri")).toBe("'none'");
      expect(d.get("form-action")).toBe("'self'");
      expect(d.get("frame-ancestors")).toBe("'none'");
      expect(d.get("script-src")).not.toContain("unsafe-inline");
      expect(d.get("style-src")).not.toContain("unsafe-inline");
      expect(policy).not.toMatch(/(^|\s)\*(\s|;|$)/);
    }
  });

  it("trusts only scripts carrying the request nonce when one is given", () => {
    expect(directives(contentSecurityPolicy("abc123")).get("script-src")).toBe(
      "'self' 'nonce-abc123' 'strict-dynamic'",
    );
    expect(directives(contentSecurityPolicy()).get("script-src")).toBe("'self'");
  });
});

describe("securityHeaders", () => {
  const byKey = Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value]));

  it("sets the baseline hardening headers", () => {
    expect(byKey["X-Content-Type-Options"]).toBe("nosniff");
    expect(byKey["X-Frame-Options"]).toBe("DENY");
    expect(byKey["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(byKey["Cross-Origin-Opener-Policy"]).toBe("same-origin");
    for (const feature of ["camera", "microphone", "geolocation"]) {
      expect(byKey["Permissions-Policy"]).toContain(`${feature}=()`);
    }
  });

  it("keeps HSTS off the preload list", () => {
    expect(byKey["Strict-Transport-Security"]).toBe("max-age=63072000; includeSubDomains");
  });
});
