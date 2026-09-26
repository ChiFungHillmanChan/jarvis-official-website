import { describe, it, expect } from "vitest";
import { waitlistSchema } from "./waitlistSchema";

const consent = {
  privacyAccepted: true,
  termsAccepted: true,
  privacyVersion: "2026-09-26",
  termsVersion: "2026-09-24",
};

describe("waitlistSchema", () => {
  it("accepts a valid email and lowercases it", () => {
    const parsed = waitlistSchema.parse({ ...consent, email: "Hello@Example.COM" });
    expect(parsed.email).toBe("hello@example.com");
  });

  it("trims whitespace", () => {
    const parsed = waitlistSchema.parse({ ...consent, email: "  a@b.com  " });
    expect(parsed.email).toBe("a@b.com");
  });

  it("rejects missing @", () => {
    const result = waitlistSchema.safeParse({ ...consent, email: "hello.example.com" });
    expect(result.success).toBe(false);
  });

  it("rejects overly long email", () => {
    const result = waitlistSchema.safeParse({ ...consent, email: "a".repeat(250) + "@b.com" });
    expect(result.success).toBe(false);
  });
});

it.each([
  {},
  { privacyAccepted: false },
  { termsAccepted: false },
  { privacyVersion: "2026-01-01" },
  { termsVersion: "future" },
])("rejects absent, refused or stale consent: %j", (override) => {
  const input = Object.keys(override).length ? { ...consent, ...override } : {};
  expect(waitlistSchema.safeParse({ email: "a@example.com", ...input }).success).toBe(false);
});

it("only accepts the supported locale values", () => {
  expect(
    waitlistSchema.safeParse({ email: "a@example.com", ...consent, locale: "zh-HK" }).success,
  ).toBe(true);
  expect(
    waitlistSchema.safeParse({ email: "a@example.com", ...consent, locale: "xx" }).success,
  ).toBe(false);
});
