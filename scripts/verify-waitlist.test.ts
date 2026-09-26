// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock, destroyMock } = vi.hoisted(() => ({ sendMock: vi.fn(), destroyMock: vi.fn() }));
vi.mock("@aws-sdk/client-dynamodb", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@aws-sdk/client-dynamodb")>();
  return {
    ...actual,
    DynamoDBClient: class {
      send = sendMock;
      destroy = destroyMock;
    },
  };
});

type Row = Record<string, { S: string }>;
let rows: Map<string, Row>;
let deletions: string[];
const fetchMock = vi.fn();
const verificationScript = "./verify-waitlist.mjs";

function capture(body: string) {
  const payload = JSON.parse(body);
  const timestamp = "2026-09-24T00:00:00.000Z";
  rows.set(payload.email, {
    email: { S: payload.email },
    role: { S: payload.role },
    status: { S: "pending" },
    privacyVersion: { S: payload.privacyVersion },
    termsVersion: { S: payload.termsVersion },
    locale: { S: payload.locale },
    createdAt: { S: timestamp },
    privacyAcceptedAt: { S: timestamp },
    termsAcceptedAt: { S: timestamp },
    source: { S: "website-beta" },
  });
  return Response.json({ ok: true });
}

describe("live waitlist verification script", () => {
  beforeEach(() => {
    vi.resetModules();
    rows = new Map();
    deletions = [];
    vi.stubEnv("WAITLIST_SMOKE_BASE_URL", "https://test.example.invalid");
    vi.stubEnv("WAITLIST_TABLE_NAME", "test-waitlist");
    vi.stubEnv("AWS_REGION", "ap-southeast-1");
    vi.stubEnv("WAITLIST_SMOKE_EMAILS_DISABLED", "true");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
    destroyMock.mockClear();
    vi.spyOn(console, "log").mockImplementation(() => {});
    sendMock.mockReset().mockImplementation(async ({ input }) => {
      const email = input.Key.email.S;
      if (input.ConsistentRead) return { Item: rows.get(email) };
      expect(input.ConditionExpression).toBe("attribute_not_exists(#email) OR #source = :source");
      deletions.push(email);
      rows.delete(email);
      return {};
    });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("deletes only its synthetic reserved-domain address and preserves other rows", async () => {
    rows.set("applicant@example.com", { email: { S: "applicant@example.com" } });
    fetchMock.mockResolvedValueOnce(Response.json({ error: "consent_required" }, { status: 400 }));
    fetchMock.mockImplementation(async (_url, options) => capture(options.body));
    await import(verificationScript);
    expect(deletions).toHaveLength(1);
    expect(deletions[0]).toMatch(/^jarvis-db-probe-[0-9a-f-]+@example\.invalid$/);
    expect([...rows.keys()]).toEqual(["applicant@example.com"]);
    expect(destroyMock).toHaveBeenCalledOnce();
  });

  it("waits for every concurrent request to settle before cleanup after one fails", async () => {
    let complete!: () => void;
    fetchMock.mockResolvedValueOnce(Response.json({ error: "consent_required" }, { status: 400 }));
    fetchMock.mockRejectedValueOnce(new Error("network reset"));
    fetchMock.mockImplementationOnce(
      (_url, options) =>
        new Promise((resolve) => {
          complete = () => resolve(capture(options.body));
        }),
    );
    const result = import(verificationScript).catch((error: unknown) => error);
    try {
      await vi.waitFor(() => expect(complete).toBeDefined());
      // Let immediate failure and cleanup continuations run; the other request is still pending.
      await new Promise((resolve) => setImmediate(resolve));
      expect(deletions).toHaveLength(0);
    } finally {
      complete();
      await result;
    }
    expect(deletions).toHaveLength(1);
    expect(rows.size).toBe(0);
  });
});
