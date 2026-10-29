import { describe, it, expect } from "vitest";
import { z } from "zod";
import { isEmail } from "./isEmail";

describe("isEmail", () => {
  it("accepts a normal email", () => {
    expect(isEmail("hello@example.com")).toBe(true);
  });

  it("accepts plus-addressing", () => {
    expect(isEmail("a.b+tag@example.co.uk")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(isEmail("hello.example.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("rejects whitespace", () => {
    expect(isEmail("   ")).toBe(false);
  });

  it("rejects overly long input", () => {
    expect(isEmail("a".repeat(300) + "@b.com")).toBe(false);
  });

  // Each of these passed the old client check and was then refused by the
  // server's zod check, so the visitor was told to "try again" forever.
  it.each([
    "first..last@gmail.com",
    "a@b.c",
    "jos\u00e9@example.com",
    ".a@example.com",
    "a.@example.com",
  ])("rejects %s, which the server rejects", (value) => {
    expect(isEmail(value)).toBe(false);
  });

  it.each([
    "hello@example.com",
    "a.b+tag@example.co.uk",
    "first..last@gmail.com",
    "a@b.c",
    "jos\u00e9@example.com",
    "o'neil@example.ie",
    "a@-example.com",
    "a@example.123",
    "a@sub.example.museum",
    "  Hello@Example.COM  ",
    "a@b",
  ])("agrees with zod's email check on %s", (value) => {
    expect(isEmail(value)).toBe(z.string().trim().email().safeParse(value).success);
  });
});
