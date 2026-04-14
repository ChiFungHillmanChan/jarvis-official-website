import { describe, it, expect } from "vitest";
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
});
