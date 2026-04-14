import { describe, it, expect } from "vitest";
import { classNames } from "./classNames";

describe("classNames", () => {
  it("joins truthy strings with spaces", () => {
    expect(classNames("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(classNames("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("handles conditional objects", () => {
    expect(classNames("base", { active: true, disabled: false })).toBe("base active");
  });

  it("returns empty string when no truthy inputs", () => {
    expect(classNames(false, null, undefined)).toBe("");
  });
});
