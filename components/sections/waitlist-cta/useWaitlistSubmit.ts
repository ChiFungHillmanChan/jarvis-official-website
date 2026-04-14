"use client";

import { useState } from "react";
import { copy } from "@/content/copy.en";
import { isEmail } from "@/lib/utils/isEmail";

type Status = "idle" | "submitting" | "success" | "error";

export function useWaitlistSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string) {
    setError(null);
    if (!isEmail(email)) {
      setStatus("error");
      setError(copy.waitlistCta.errorInvalid);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(copy.waitlistCta.errorGeneric);
    }
  }

  return { submit, status, error };
}
