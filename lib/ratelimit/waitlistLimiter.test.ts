import { describe, it, expect, beforeEach } from "vitest";
import {
  DAILY_LIMIT,
  DUPLICATE_WINDOW_MS,
  HOURLY_LIMIT,
  checkWaitlistAttempt,
  clientIpFrom,
  resetWaitlistLimiter,
} from "./waitlistLimiter";

const HOUR_MS = 60 * 60 * 1000;
const T0 = 1_700_000_000_000;

describe("clientIpFrom", () => {
  it("takes the first entry of x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" });
    expect(clientIpFrom(headers)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip", () => {
    expect(clientIpFrom(new Headers({ "x-real-ip": "198.51.100.9" }))).toBe("198.51.100.9");
  });

  it("returns a stable placeholder when no IP header is present", () => {
    expect(clientIpFrom(new Headers())).toBe("unknown");
  });
});

describe("checkWaitlistAttempt", () => {
  beforeEach(() => {
    resetWaitlistLimiter();
  });

  it("allows the hourly quota then rate limits the same IP", () => {
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      expect(checkWaitlistAttempt("1.1.1.1", `u${i}@example.com`, T0)).toEqual({ allowed: true });
    }
    expect(checkWaitlistAttempt("1.1.1.1", "late@example.com", T0)).toEqual({
      allowed: false,
      reason: "rate_limited",
    });
  });

  it("counts each IP separately", () => {
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      checkWaitlistAttempt("1.1.1.1", `u${i}@example.com`, T0);
    }
    expect(checkWaitlistAttempt("2.2.2.2", "other@example.com", T0)).toEqual({ allowed: true });
  });

  it("restores the hourly quota in the next window", () => {
    for (let i = 0; i <= HOURLY_LIMIT; i += 1) {
      checkWaitlistAttempt("1.1.1.1", `u${i}@example.com`, T0);
    }
    expect(checkWaitlistAttempt("1.1.1.1", "next@example.com", T0 + HOUR_MS)).toEqual({
      allowed: true,
    });
  });

  it("still caps the day once hourly windows have rolled over", () => {
    let allowed = 0;
    let n = 0;
    for (let hour = 0; hour < 4; hour += 1) {
      for (let i = 0; i < HOURLY_LIMIT; i += 1) {
        const now = T0 + hour * HOUR_MS + i * 1000;
        if (checkWaitlistAttempt("1.1.1.1", `u${n}@example.com`, now).allowed) allowed += 1;
        n += 1;
      }
    }
    expect(n).toBeGreaterThan(DAILY_LIMIT);
    expect(allowed).toBe(DAILY_LIMIT);
  });

  it("flags a repeat address inside the window, even from another IP", () => {
    expect(checkWaitlistAttempt("1.1.1.1", "repeat@example.com", T0)).toEqual({ allowed: true });
    expect(checkWaitlistAttempt("2.2.2.2", "repeat@example.com", T0 + 1000)).toEqual({
      allowed: false,
      reason: "duplicate",
    });
  });

  it("accepts the same address again once the duplicate window has passed", () => {
    checkWaitlistAttempt("1.1.1.1", "repeat@example.com", T0);
    expect(
      checkWaitlistAttempt("3.3.3.3", "repeat@example.com", T0 + DUPLICATE_WINDOW_MS),
    ).toEqual({ allowed: true });
  });
});
