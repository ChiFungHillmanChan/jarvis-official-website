import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/resend/sendWaitlistNotification", () => ({
  sendWaitlistNotification: vi.fn(),
}));
vi.mock("@/lib/resend/sendWaitlistConfirmation", () => ({
  sendWaitlistConfirmation: vi.fn(),
}));

import { POST } from "./route";
import { sendWaitlistNotification } from "@/lib/resend/sendWaitlistNotification";
import { sendWaitlistConfirmation } from "@/lib/resend/sendWaitlistConfirmation";
import {
  ADDRESS_DAILY_LIMIT,
  DAILY_LIMIT,
  HOURLY_LIMIT,
  checkWaitlistAttempt,
  normalizeAddressKey,
  resetWaitlistLimiter,
} from "@/lib/ratelimit/waitlistLimiter";

const notifyMock = vi.mocked(sendWaitlistNotification);
const confirmMock = vi.mocked(sendWaitlistConfirmation);
const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

function makeRequest(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    resetWaitlistLimiter();
    consoleError.mockClear();
    notifyMock.mockReset();
    confirmMock.mockReset();
    notifyMock.mockResolvedValue("notif-id");
    confirmMock.mockResolvedValue("conf-id");
  });

  it("returns 200 and sends both emails for a valid email", async () => {
    const res = await POST(makeRequest({ email: "Good@Example.COM" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(notifyMock).toHaveBeenCalledWith({ signup: "good@example.com" });
    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith({ to: "good@example.com" });
  });

  it("still returns 200 when the confirmation email fails", async () => {
    confirmMock.mockRejectedValueOnce(new Error("resend_failed:blocked"));
    const res = await POST(makeRequest({ email: "good@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(notifyMock).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when the notification email fails", async () => {
    notifyMock.mockRejectedValueOnce(new Error("resend_env_missing"));
    const res = await POST(makeRequest({ email: "good@example.com" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toBe("send_failed");
    expect(confirmMock).not.toHaveBeenCalled();
  });

  // A transient Resend failure must not blacklist the address: the retry the
  // visitor is invited to make has to reach the founder, not be swallowed as a
  // duplicate.
  it("lets the same address retry after a failed notification", async () => {
    notifyMock.mockRejectedValueOnce(new Error("resend_failed:429"));
    const first = await POST(makeRequest({ email: "lead@acme.com" }));
    expect(first.status).toBe(500);

    const second = await POST(makeRequest({ email: "lead@acme.com" }));
    expect(second.status).toBe(200);
    expect((await second.json()).ok).toBe(true);
    expect(notifyMock).toHaveBeenCalledTimes(2);
    expect(confirmMock).toHaveBeenCalledTimes(1);
  });

  // The other side of the same coin: once the notification has landed the lead
  // is captured, so the address stays held even though the confirmation failed.
  it("keeps the duplicate hold when only the confirmation failed", async () => {
    confirmMock.mockRejectedValueOnce(new Error("resend_failed:blocked"));
    expect((await POST(makeRequest({ email: "held@acme.com" }))).status).toBe(200);

    const second = await POST(makeRequest({ email: "held@acme.com" }));
    expect(second.status).toBe(200);
    expect(notifyMock).toHaveBeenCalledTimes(1);
  });

  it("returns 200 for a honeypot submission without sending anything", async () => {
    const res = await POST(makeRequest({ email: "bot@example.com", company: "Acme" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(notifyMock).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
  });

  it("returns 429 once the per-IP hourly limit is exceeded", async () => {
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      const ok = await POST(makeRequest({ email: `user${i}@example.com` }));
      expect(ok.status).toBe(200);
    }
    const res = await POST(makeRequest({ email: "late@example.com" }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toBe("rate_limited");
    expect(notifyMock).toHaveBeenCalledTimes(HOURLY_LIMIT);
  });

  it("tells a throttled caller when to come back instead of failing blind", async () => {
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      await POST(makeRequest({ email: `burst${i}@example.com` }));
    }
    const res = await POST(makeRequest({ email: "late@example.com" }));
    expect(res.status).toBe(429);
    const retryAfter = Number(res.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(60 * 60);
    expect((await res.json()).retryAfterSeconds).toBe(retryAfter);
  });

  it("absorbs a burst from one shared network before throttling", async () => {
    // A room of people on one office or venue NAT egresses from a single IP.
    for (let i = 0; i < 10; i += 1) {
      const res = await POST(makeRequest({ email: `guest${i}@example.com` }, "203.0.113.99"));
      expect(res.status).toBe(200);
    }
    expect(notifyMock).toHaveBeenCalledTimes(10);
  });

  // The per-IP budget is generous on purpose, so it cannot be the control that
  // protects a victim inbox: a mail-bomber changes IP, or plus-addresses their
  // way past a dedupe keyed on the raw address. The cap that stops them is the
  // one keyed on the destination.
  it("caps how much mail one inbox can be sent, whatever IP asks", async () => {
    for (let i = 0; i < ADDRESS_DAILY_LIMIT; i += 1) {
      const res = await POST(
        makeRequest({ email: `victim+${i}@gmail.com` }, `203.0.113.${20 + i}`),
      );
      expect(res.status).toBe(200);
    }

    const res = await POST(makeRequest({ email: "victim+last@gmail.com" }, "203.0.113.90"));
    expect(res.status).toBe(429);
    expect((await res.json()).error).toBe("rate_limited");
    // Every request came from a fresh IP well inside the per-IP budget, so the
    // destination cap is the only thing that could have stopped this.
    expect(notifyMock).toHaveBeenCalledTimes(ADDRESS_DAILY_LIMIT);
    expect(confirmMock).toHaveBeenCalledTimes(ADDRESS_DAILY_LIMIT);
    // Normalisation is for the rate-limit key only: the mail still goes to the
    // address as it was submitted, and that is the address reported.
    expect(notifyMock).toHaveBeenCalledWith({ signup: "victim+0@gmail.com" });
    expect(confirmMock).toHaveBeenCalledWith({ to: "victim+0@gmail.com" });
  });

  it("does not re-send to the same address inside the window", async () => {
    const first = await POST(makeRequest({ email: "repeat@example.com" }));
    expect(first.status).toBe(200);
    const second = await POST(makeRequest({ email: "repeat@example.com" }, "198.51.100.7"));
    expect(second.status).toBe(200);
    expect((await second.json()).ok).toBe(true);
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_email");
    expect(notifyMock).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed body", async () => {
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_body");
    expect(notifyMock).not.toHaveBeenCalled();
  });
});

// The rate-limit key normalisation and the window accounting are what make the
// destination cap hold. They are asserted here, next to the endpoint that
// depends on them, because both need an injectable clock or a peek at the key
// that POST does not expose.
describe("waitlist rate-limit keys", () => {
  it("collapses the spellings that reach one inbox", () => {
    // Sub-addressing: the cheapest way to mint budgets.
    expect(normalizeAddressKey("victim+jarvis@fastmail.com")).toBe("victim@fastmail.com");
    // Case is not an identity either.
    expect(normalizeAddressKey("Victim@Fastmail.com")).toBe("victim@fastmail.com");
    // Gmail ignores dots and serves googlemail.com from the same mailbox.
    expect(normalizeAddressKey("v.i.c.t.i.m+42@GMail.com")).toBe("victim@gmail.com");
    expect(normalizeAddressKey("victim@googlemail.com")).toBe("victim@gmail.com");
  });

  it("keeps dots outside Gmail, where they are different people", () => {
    expect(normalizeAddressKey("first.last@acme.com")).toBe("first.last@acme.com");
    expect(normalizeAddressKey("firstlast@acme.com")).toBe("firstlast@acme.com");
  });
});

describe("waitlist window accounting", () => {
  const T0 = 1_700_000_000_000;
  const HOUR_MS = 60 * 60 * 1000;

  beforeEach(() => {
    resetWaitlistLimiter();
  });

  // A rejected attempt sends nothing, so charging it to the window makes the
  // limit stricter than advertised: the blind retries a throttled visitor makes
  // would spend the day budget and turn an hour-long throttle into a day-long
  // one.
  it("does not spend the budget on attempts it rejects", () => {
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      expect(checkWaitlistAttempt("198.51.100.1", `ok${i}@example.com`, T0).allowed).toBe(true);
    }
    for (let i = 0; i < DAILY_LIMIT; i += 1) {
      expect(checkWaitlistAttempt("198.51.100.1", `blind${i}@example.com`, T0 + 1000).allowed).toBe(
        false,
      );
    }

    // Next hour: the day budget still has everything the rejections did not buy.
    for (let i = 0; i < HOURLY_LIMIT; i += 1) {
      expect(
        checkWaitlistAttempt("198.51.100.1", `next${i}@example.com`, T0 + HOUR_MS).allowed,
      ).toBe(true);
    }
  });

  it("frees the destination budget again the next day", () => {
    for (let i = 0; i < ADDRESS_DAILY_LIMIT; i += 1) {
      expect(checkWaitlistAttempt(`10.0.0.${i}`, `v+${i}@gmail.com`, T0).allowed).toBe(true);
    }
    expect(checkWaitlistAttempt("10.0.0.9", "v+late@gmail.com", T0).allowed).toBe(false);
    expect(
      checkWaitlistAttempt("10.0.0.9", "v+late@gmail.com", T0 + 24 * HOUR_MS).allowed,
    ).toBe(true);
  });
});
