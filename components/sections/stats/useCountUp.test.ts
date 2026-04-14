import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("starts at 0 when active is false", () => {
    const { result } = renderHook(() => useCountUp({ target: 42, active: false, durationMs: 10 }));
    expect(result.current).toBe(0);
  });

  it("reaches target when active flips to true", async () => {
    const { result, rerender } = renderHook(
      ({ active }) => useCountUp({ target: 10, active, durationMs: 10 }),
      { initialProps: { active: false } },
    );
    expect(result.current).toBe(0);
    rerender({ active: true });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 60));
    });
    expect(result.current).toBe(10);
  });
});
