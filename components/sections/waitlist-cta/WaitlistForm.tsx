"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy.en";
import { useWaitlistSubmit } from "./useWaitlistSubmit";
import { WaitlistSuccess } from "./WaitlistSuccess";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const { submit, status, error } = useWaitlistSubmit();

  if (status === "success") return <WaitlistSuccess />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit(email);
      }}
      className="flex flex-col gap-3 sm:flex-row"
      noValidate
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        autoComplete="email"
        placeholder={copy.waitlistCta.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
      />
      <Button type="submit" variant="primary">
        {status === "submitting" ? "…" : copy.waitlistCta.submit}
      </Button>
      <p className="min-h-[1.25rem] font-mono text-xs text-[color:var(--accent-cyan)]" aria-live="polite">
        {error ?? ""}
      </p>
    </form>
  );
}
