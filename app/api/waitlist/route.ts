import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validation/waitlistSchema";
import { sendWaitlistNotification } from "@/lib/resend/sendWaitlistNotification";
import { sendWaitlistConfirmation } from "@/lib/resend/sendWaitlistConfirmation";
import {
  checkWaitlistAttempt,
  clientIpFrom,
  releaseWaitlistAddress,
  retryAfterSecondsFor,
} from "@/lib/ratelimit/waitlistLimiter";

export const runtime = "nodejs";

// A field the form keeps hidden and out of the tab order, so only a bot fills
// it. waitlistSchema strips unknown keys, so it is read off the raw payload.
const HONEYPOT_FIELD = "company";

function honeypotFilled(payload: unknown): boolean {
  if (typeof payload !== "object" || payload === null) return false;
  const value = (payload as Record<string, unknown>)[HONEYPOT_FIELD];
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
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Answer a bot with exactly what a real signup gets, so it cannot tell it was
  // caught. Nothing is sent and nothing is counted.
  if (honeypotFilled(payload)) {
    return NextResponse.json({ ok: true });
  }

  const email = parsed.data.email;
  const ip = clientIpFrom(req.headers);
  const gate = checkWaitlistAttempt(ip, email);
  if (!gate.allowed) {
    if (gate.reason === "rate_limited") {
      // Say when the caller may try again instead of failing blind, so a
      // throttled visitor can be told to wait rather than to retry now. The
      // address is part of the question: the throttle may be on this IP or on
      // how much mail that destination has already had today.
      const retryAfterSeconds = retryAfterSecondsFor(ip, email);
      return NextResponse.json(
        { error: "rate_limited", retryAfterSeconds },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
      );
    }
    // Already signed up inside the window. Report success without re-sending,
    // so the endpoint cannot be used to mail one address repeatedly.
    return NextResponse.json({ ok: true });
  }

  // The founder notification is the capture: there is no database behind this
  // endpoint, so until that mail lands the signup does not exist anywhere. If
  // it fails the address must go back to being submittable, otherwise the gate
  // reads the visitor's retry as a duplicate, answers it with a silent success,
  // and the lead is lost with nobody told.
  try {
    await sendWaitlistNotification({
      signup: email,
      role: parsed.data.role,
      painPoint: parsed.data.painPoint,
    });
  } catch (err) {
    console.error("[waitlist] notification failed", err);
    releaseWaitlistAddress(email);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  // Captured. The visitor's confirmation is best effort from here: failing it
  // must not tell them to retry, because the retry would re-send the
  // notification and burn more quota for a lead already in hand.
  try {
    await sendWaitlistConfirmation({ to: email });
  } catch (err) {
    console.error("[waitlist] confirmation failed", err);
  }

  return NextResponse.json({ ok: true });
}
