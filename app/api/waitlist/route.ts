import { after, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validation/waitlistSchema";
import { sendWaitlistNotification } from "@/lib/resend/sendWaitlistNotification";
import { sendWaitlistConfirmation } from "@/lib/resend/sendWaitlistConfirmation";
import { captureWaitlistSignup } from "@/lib/waitlist/store";
import {
  checkWaitlistAttempt,
  clientIpFrom,
  releaseWaitlistAddress,
  retryAfterSecondsFor,
} from "@/lib/ratelimit/waitlistLimiter";

export const runtime = "nodejs";

// Resend's client sets no timeout of its own. Without this bound a hung send
// would keep the function alive, and billed, until the platform's maxDuration.
const EMAIL_TIMEOUT_MS = 5_000;

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("timeout")), ms);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

function honeypotFilled(payload: unknown): boolean {
  if (typeof payload !== "object" || payload === null) return false;
  const value = (payload as Record<string, unknown>).company;
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path[0]);
    const error = fields.includes("email")
      ? "invalid_email"
      : fields.some((field) =>
            ["privacyAccepted", "termsAccepted", "privacyVersion", "termsVersion"].includes(
              String(field),
            ),
          )
        ? "consent_required"
        : "invalid_input";
    return NextResponse.json({ error }, { status: 400 });
  }

  // Silently discard bots; this branch does not represent a genuine application.
  if (honeypotFilled(payload)) return NextResponse.json({ ok: true });

  const { email } = parsed.data;
  const ip = clientIpFrom(req.headers);
  const gate = checkWaitlistAttempt(ip, email);
  if (!gate.allowed && gate.reason === "rate_limited") {
    const retryAfterSeconds = retryAfterSecondsFor(ip, email);
    return NextResponse.json(
      { error: "rate_limited", retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let created: boolean;
  try {
    // Even a local "duplicate" must reach DynamoDB: another request can still
    // be in flight and fail. An in-memory hold is never evidence of capture.
    ({ created } = await captureWaitlistSignup(parsed.data));
  } catch {
    if (gate.allowed) releaseWaitlistAddress(email);
    // Provider errors can include input values. Log a fixed operational code only.
    console.error("[waitlist] storage_unavailable");
    return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  }

  if (!created || process.env.WAITLIST_EMAILS_ENABLED !== "true") {
    return NextResponse.json({ ok: true });
  }

  // Capture is already durable. Email is supplementary and cannot roll it back.
  // Only the request that inserted the row may send, including across cold starts.
  // after() sends once the response has gone out, so the visitor never waits on
  // Resend; on Vercel it holds the invocation open through waitUntil.
  after(async () => {
    const [notification, confirmation] = await Promise.allSettled([
      withTimeout(
        sendWaitlistNotification({
          signup: email,
          role: parsed.data.role,
          painPoint: parsed.data.painPoint,
        }),
        EMAIL_TIMEOUT_MS,
      ),
      withTimeout(
        sendWaitlistConfirmation({ to: email, locale: parsed.data.locale }),
        EMAIL_TIMEOUT_MS,
      ),
    ]);
    if (notification.status === "rejected") console.error("[waitlist] notification_failed");
    if (confirmation.status === "rejected") console.error("[waitlist] confirmation_failed");
  });

  return NextResponse.json({ ok: true });
}
