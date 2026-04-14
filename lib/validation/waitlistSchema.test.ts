import { describe, it, expect } from "vitest";
import { waitlistSchema } from "./waitlistSchema";

describe("waitlistSchema", () => {
  it("accepts a valid email and lowercases it", () => {
    const parsed = waitlistSchema.parse({ email: "Hello@Example.COM" });
    expect(parsed.email).toBe("hello@example.com");
  });

  it("trims whitespace", () => {
    const parsed = waitlistSchema.parse({ email: "  a@b.com  " });
    expect(parsed.email).toBe("a@b.com");
  });

  it("rejects missing @", () => {
    const result = waitlistSchema.safeParse({ email: "hello.example.com" });
    expect(result.success).toBe(false);
  });

  it("rejects overly long email", () => {
    const result = waitlistSchema.safeParse({ email: "a".repeat(250) + "@b.com" });
    expect(result.success).toBe(false);
  });
});
