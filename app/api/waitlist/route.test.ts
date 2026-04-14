import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/resend/sendWaitlistNotification", () => ({
  sendWaitlistNotification: vi.fn().mockResolvedValue("notif-id"),
}));
vi.mock("@/lib/resend/sendWaitlistConfirmation", () => ({
  sendWaitlistConfirmation: vi.fn().mockResolvedValue("conf-id"),
}));

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test";
    process.env.CONTACT_EMAIL = "ops@example.com";
    process.env.WAITLIST_FROM = "hello@example.com";
  });

  it("returns 200 for a valid email", async () => {
    const res = await POST(makeRequest({ email: "good@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_email");
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
  });
});
