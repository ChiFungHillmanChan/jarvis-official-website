// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  DynamoDBClient,
  ConditionalCheckFailedException,
  PutItemCommand,
  type AttributeValue,
} from "@aws-sdk/client-dynamodb";

vi.mock("@/lib/resend/sendWaitlistNotification", () => ({ sendWaitlistNotification: vi.fn() }));
vi.mock("@/lib/resend/sendWaitlistConfirmation", () => ({ sendWaitlistConfirmation: vi.fn() }));

import { POST } from "./route";
import { sendWaitlistNotification } from "@/lib/resend/sendWaitlistNotification";
import { sendWaitlistConfirmation } from "@/lib/resend/sendWaitlistConfirmation";
import {
  HOURLY_LIMIT,
  ADDRESS_DAILY_LIMIT,
  resetWaitlistLimiter,
} from "@/lib/ratelimit/waitlistLimiter";

const notifyMock = vi.mocked(sendWaitlistNotification);
const confirmMock = vi.mocked(sendWaitlistConfirmation);
const sendMock = vi.spyOn(DynamoDBClient.prototype, "send");
const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
const consent = {
  privacyAccepted: true,
  termsAccepted: true,
  privacyVersion: "2026-09-26.3",
  termsVersion: "2026-09-24",
};
let records: Map<string, Record<string, AttributeValue>>;

function makeRequest(body: Record<string, unknown>, ip = "203.0.113.10") {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ ...consent, ...body }),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.stubEnv("WAITLIST_TABLE_NAME", "test-waitlist");
    vi.stubEnv("AWS_REGION", "ap-southeast-1");
    vi.stubEnv("AWS_ROLE_ARN", "");
    vi.stubEnv("VERCEL", "");
    vi.stubEnv("WAITLIST_EMAILS_ENABLED", "true");
    resetWaitlistLimiter();
    consoleError.mockClear();
    records = new Map();
    sendMock.mockReset();
    sendMock.mockImplementation(async (command) => {
      const input = (command as PutItemCommand).input;
      expect(input.ConditionExpression).toBe("attribute_not_exists(#email)");
      const item = input.Item!;
      const email = item.email!.S!;
      if (records.has(email))
        throw new ConditionalCheckFailedException({ message: "exists", $metadata: {} });
      records.set(email, item);
      return { $metadata: { httpStatusCode: 200 } };
    });
    notifyMock.mockReset().mockResolvedValue("notif-id");
    confirmMock.mockReset().mockResolvedValue("conf-id");
  });

  afterEach(() => vi.unstubAllEnvs());

  it("does not report success without database configuration", async () => {
    vi.stubEnv("WAITLIST_TABLE_NAME", "");
    const res = await POST(makeRequest({ email: "durable@example.com" }));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: "storage_unavailable" });
    expect(records.size).toBe(0);
    expect(notifyMock).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
  });

  it("requires an OIDC role for Vercel instead of falling back to local credentials", async () => {
    vi.stubEnv("VERCEL", "1");
    const res = await POST(makeRequest({ email: "durable@example.com" }));
    expect(res.status).toBe(503);
    expect(records.size).toBe(0);
  });

  it("stores normalized data and consent before sending either email", async () => {
    notifyMock.mockImplementationOnce(async () => {
      expect(records.has("good@example.com")).toBe(true);
      return "notif-id";
    });
    confirmMock.mockImplementationOnce(async () => {
      expect(records.has("good@example.com")).toBe(true);
      return "conf-id";
    });
    const res = await POST(
      makeRequest({
        email: " Good@Example.COM ",
        role: " Founder ",
        painPoint: " Follow-ups ",
        locale: "zh-HK",
        ip: "untrusted",
        userAgent: "untrusted",
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const record = records.get("good@example.com")!;
    expect(record).toMatchObject({
      email: { S: "good@example.com" },
      role: { S: "Founder" },
      painPoint: { S: "Follow-ups" },
      locale: { S: "zh-HK" },
      status: { S: "pending" },
      privacyVersion: { S: "2026-09-26.3" },
      termsVersion: { S: "2026-09-24" },
    });
    expect(record.createdAt!.S).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(record.privacyAcceptedAt).toEqual(record.createdAt);
    expect(record.termsAcceptedAt).toEqual(record.createdAt);
    expect(record.ip).toBeUndefined();
    expect(record.userAgent).toBeUndefined();
    expect(notifyMock).toHaveBeenCalledOnce();
    expect(confirmMock).toHaveBeenCalledOnce();
  });

  it("does not send mail or claim capture when the database fails, and permits retry", async () => {
    sendMock.mockRejectedValueOnce(new Error("provider error containing lead@example.com"));
    const first = await POST(makeRequest({ email: "lead@example.com" }));
    expect(first.status).toBe(503);
    expect(notifyMock).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
    expect(records.size).toBe(0);
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("lead@example.com");
    const second = await POST(makeRequest({ email: "lead@example.com" }));
    expect(second.status).toBe(200);
    expect(records.has("lead@example.com")).toBe(true);
  });

  it("never treats an in-flight local reservation as a saved application", async () => {
    let failFirst!: (reason: Error) => void;
    sendMock.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          failFirst = reject;
        }),
    );
    const first = POST(makeRequest({ email: "concurrent@example.com" }));
    await vi.waitFor(() => expect(failFirst).toBeDefined());
    sendMock.mockRejectedValueOnce(new Error("database down"));
    const second = await POST(makeRequest({ email: "concurrent@example.com" }));
    expect(second.status).toBe(503);
    failFirst(new Error("database down"));
    expect((await first).status).toBe(503);
    expect(records.size).toBe(0);
    expect(notifyMock).not.toHaveBeenCalled();
  });

  it("deduplicates concurrent submissions durably", async () => {
    const responses = await Promise.all([
      POST(makeRequest({ email: "race@example.com", role: "First" })),
      POST(makeRequest({ email: "RACE@example.com", role: "Second" }, "203.0.113.11")),
    ]);
    expect(responses.map((res) => res.status)).toEqual([200, 200]);
    expect(records.size).toBe(1);
    expect(records.get("race@example.com")!.role!.S).toBe("First");
    expect(notifyMock).toHaveBeenCalledOnce();
    expect(confirmMock).toHaveBeenCalledOnce();
  });

  it("keeps deduplication after process-local state is lost", async () => {
    await POST(makeRequest({ email: "repeat@example.com", role: "Original" }));
    resetWaitlistLimiter();
    const second = await POST(
      makeRequest({ email: "repeat@example.com", role: "Overwrite attempt" }),
    );
    expect(second.status).toBe(200);
    expect(records.get("repeat@example.com")!.role!.S).toBe("Original");
    expect(notifyMock).toHaveBeenCalledOnce();
  });

  it.each(["notification", "confirmation"])(
    "retains durable capture when %s email fails",
    async (kind) => {
      (kind === "notification" ? notifyMock : confirmMock).mockRejectedValueOnce(
        new Error("email contains private@example.com"),
      );
      const res = await POST(makeRequest({ email: "private@example.com" }));
      expect(res.status).toBe(200);
      expect(records.has("private@example.com")).toBe(true);
      expect(JSON.stringify(consoleError.mock.calls)).not.toContain("private@example.com");
      resetWaitlistLimiter();
      await POST(makeRequest({ email: "private@example.com" }));
      expect(notifyMock).toHaveBeenCalledOnce();
      expect(confirmMock).toHaveBeenCalledOnce();
    },
  );

  it("can capture applications with both supplementary emails disabled", async () => {
    vi.stubEnv("WAITLIST_EMAILS_ENABLED", "false");
    const res = await POST(makeRequest({ email: "smoke@example.com" }));
    expect(res.status).toBe(200);
    expect(records.has("smoke@example.com")).toBe(true);
    expect(notifyMock).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
  });

  it("discards honeypot submissions without storing or mailing", async () => {
    const res = await POST(makeRequest({ email: "bot@example.com", company: "Acme" }));
    expect(res.status).toBe(200);
    expect(records.size).toBe(0);
    expect(notifyMock).not.toHaveBeenCalled();
    expect(confirmMock).not.toHaveBeenCalled();
  });

  it("returns 429 with retry timing after the per-IP hourly budget", async () => {
    for (let i = 0; i < HOURLY_LIMIT; i++)
      expect((await POST(makeRequest({ email: `user${i}@example.com` }))).status).toBe(200);
    const res = await POST(makeRequest({ email: "late@example.com" }));
    expect(res.status).toBe(429);
    const retryAfter = Number(res.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(3600);
    expect((await res.json()).retryAfterSeconds).toBe(retryAfter);
    expect(records.size).toBe(HOURLY_LIMIT);
  });

  it("counts duplicate database attempts towards the IP budget", async () => {
    for (let i = 0; i < HOURLY_LIMIT; i++) {
      expect((await POST(makeRequest({ email: "repeat-budget@example.com" }))).status).toBe(200);
    }
    const blocked = await POST(makeRequest({ email: "repeat-budget@example.com" }));
    expect(blocked.status).toBe(429);
    expect(sendMock).toHaveBeenCalledTimes(HOURLY_LIMIT);
    expect(records.size).toBe(1);
    expect(notifyMock).toHaveBeenCalledOnce();
  });

  it("recovers when a write committed but its acknowledgement was lost", async () => {
    sendMock.mockImplementationOnce(async (command) => {
      const item = (command as PutItemCommand).input.Item!;
      records.set(item.email!.S!, item);
      throw new Error("socket closed after commit");
    });
    const first = await POST(makeRequest({ email: "ambiguous@example.com" }));
    expect(first.status).toBe(503);
    expect(records.size).toBe(1);
    const retry = await POST(makeRequest({ email: "ambiguous@example.com" }));
    expect(retry.status).toBe(200);
    expect(records.size).toBe(1);
    expect(notifyMock).not.toHaveBeenCalled();
  });

  it("limits address variants from different IPs before storage or mail", async () => {
    for (let i = 0; i < ADDRESS_DAILY_LIMIT; i++)
      await POST(makeRequest({ email: `victim+${i}@gmail.com` }, `203.0.113.${20 + i}`));
    const res = await POST(makeRequest({ email: "victim+last@gmail.com" }, "203.0.113.99"));
    expect(res.status).toBe(429);
    expect(records.size).toBe(ADDRESS_DAILY_LIMIT);
  });

  it.each([
    [{ email: "bad" }, "invalid_email"],
    [{ email: "good@example.com", privacyAccepted: false }, "consent_required"],
    [{ email: "good@example.com", termsVersion: "outdated" }, "consent_required"],
    [{ email: "good@example.com", painPoint: "x".repeat(501) }, "invalid_input"],
  ])("rejects invalid input before persistence: %j", async (body, error) => {
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error });
    expect(records.size).toBe(0);
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(
      new Request("http://localhost/api/waitlist", { method: "POST", body: "not json" }),
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "invalid_body" });
    expect(records.size).toBe(0);
  });
});
