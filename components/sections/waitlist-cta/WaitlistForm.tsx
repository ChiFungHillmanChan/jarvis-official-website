"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useWaitlistSubmit } from "./useWaitlistSubmit";
import { WaitlistSuccess } from "./WaitlistSuccess";

export function WaitlistForm({
  placeholder,
  submitLabel,
  submittingLabel,
  successMessage,
  errorInvalid,
  errorGeneric,
  emailLabel,
  roleLabel,
  rolePlaceholder,
  painLabel,
  painPlaceholder,
}: {
  placeholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorInvalid: string;
  errorGeneric: string;
  emailLabel: string;
  roleLabel: string;
  rolePlaceholder: string;
  painLabel: string;
  painPlaceholder: string;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [painPoint, setPainPoint] = useState("");
  // Honeypot. /api/waitlist reads this field off the raw payload and answers a
  // filled one with a normal success response without sending anything.
  const [company, setCompany] = useState("");
  const { submit, status, error } = useWaitlistSubmit({ errorInvalid, errorGeneric });

  if (status === "success") return <WaitlistSuccess message={successMessage} />;

  const fieldClass =
    "min-w-0 flex-1 rounded-lg border border-[var(--grid-line)] bg-[color:rgba(255,255,255,0.02)] px-5 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit(email, company, role, painPoint);
      }}
      className="flex flex-col gap-2"
      noValidate
    >
      {/* Parked off-screen rather than display:none so a naive bot still fills
          it, while tabIndex and aria-hidden keep it away from real visitors. */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          {emailLabel}
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-role" className="sr-only">
          {roleLabel}
        </label>
        <input
          id="waitlist-role"
          type="text"
          maxLength={120}
          placeholder={rolePlaceholder}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={fieldClass}
        />
        <label htmlFor="waitlist-pain" className="sr-only">
          {painLabel}
        </label>
        <input
          id="waitlist-pain"
          type="text"
          maxLength={500}
          placeholder={painPlaceholder}
          value={painPoint}
          onChange={(e) => setPainPoint(e.target.value)}
          className={fieldClass}
        />
      </div>
      <Button type="submit" variant="primary" className="mt-1 w-full rounded-lg">
        {status === "submitting" ? submittingLabel : submitLabel}
      </Button>
      <p className="min-h-[1.25rem] text-sm text-[color:var(--accent-cyan)]" aria-live="polite">
        {error ?? ""}
      </p>
    </form>
  );
}
