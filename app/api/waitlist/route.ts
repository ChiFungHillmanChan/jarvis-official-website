import { NextResponse } from "next/server";
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
  try {
    await sendWaitlistNotification({
      signup: email,
      role: parsed.data.role,
      painPoint: parsed.data.painPoint,
    });
  } catch {
    console.error("[waitlist] notification_failed");
  }
  try {
    await sendWaitlistConfirmation({ to: email });
  } catch {
    console.error("[waitlist] confirmation_failed");
  }

  return NextResponse.json({ ok: true });
}
