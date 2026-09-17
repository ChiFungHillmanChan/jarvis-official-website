"use client";

import { useRef, useState } from "react";
import { getUiFor } from "@/content/ui";
import { isEmail } from "@/lib/utils/isEmail";

type Status = "idle" | "submitting" | "success" | "error";
type SubmissionResult = "success" | "invalid" | "error" | "ignored";

/**
 * Turns the wait /api/waitlist reports on a 429 into something a visitor can
 * act on. A throttle is not a broken form: telling someone "something went
 * wrong, please try again" invites exactly the retry that is being refused.
 *
 * Returns null when the response carried no usable wait, so the caller can fall
 * back to its generic message rather than render a nonsense interval.
 */
function rateLimitMessage(retryAfterSeconds: number): string | null {
  if (!Number.isFinite(retryAfterSeconds) || retryAfterSeconds <= 0) return null;

  // The rest of this form's copy arrives as props from the page, but this
  // message is not one of them. <html lang> is written by app/[locale]/layout,
  // it needs no intl provider, and this runs inside the submit handler, so it
  // never affects render or the server pass.
  const lang = typeof document === "undefined" ? "" : document.documentElement.lang;
  const ui = getUiFor(lang.toLowerCase().startsWith("zh") ? "zh-HK" : "en");

  const minutes = Math.ceil(retryAfterSeconds / 60);
  if (minutes < 60) return ui.waitlist.rateLimitedMinutes.replace("{n}", String(minutes));
  return ui.waitlist.rateLimitedHours.replace("{n}", String(Math.ceil(minutes / 60)));
}

export function useWaitlistSubmit({
  errorInvalid,
  errorGeneric,
}: {
  errorInvalid: string;
  errorGeneric: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<{ message: string; field?: "email" } | null>(null);
  const inFlight = useRef(false);

  // `company` is the honeypot field WaitlistForm keeps hidden. It is passed
  // through untouched so the API route can decide what to do with it.
  async function submit(
    email: string,
    company: string,
    role?: string,
    painPoint?: string,
  ): Promise<SubmissionResult> {
    // The ref closes the gap before React renders the disabled submit button.
    if (inFlight.current) return "ignored";
    setError(null);
    if (!isEmail(email)) {
      setStatus("error");
      setError({ message: errorInvalid, field: "email" });
      return "invalid";
    }
    inFlight.current = true;
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, role, painPoint }),
      });
      if (res.status === 429) {
        setStatus("error");
        setError({ message: rateLimitMessage(Number(res.headers.get("Retry-After"))) ?? errorGeneric });
        return "error";
      }
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      return "success";
    } catch {
      setStatus("error");
      setError({ message: errorGeneric });
      return "error";
    } finally {
      inFlight.current = false;
    }
  }

  return { submit, status, error: error?.message ?? null, invalidEmail: error?.field === "email" };
}
