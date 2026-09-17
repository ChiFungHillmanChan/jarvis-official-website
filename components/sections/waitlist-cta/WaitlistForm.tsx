"use client";

import { useId, useRef, useState } from "react";
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
  const { submit, status, error, invalidEmail } = useWaitlistSubmit({ errorInvalid, errorGeneric });
  const formId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const isSubmitting = status === "submitting";
  const errorId = `${formId}-error`;

  if (status === "success") return <WaitlistSuccess message={successMessage} />;

  const fieldClass =
    "min-w-0 w-full rounded-lg border border-[var(--grid-line)] bg-[color:rgba(255,255,255,0.02)] px-5 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]";
  const labelClass = "text-xs font-medium leading-5 text-[color:var(--text-secondary)]";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await submit(email, company, role, painPoint);
        if (result === "invalid") emailRef.current?.focus();
        else if (result === "error") errorRef.current?.focus();
      }}
      className="flex flex-col gap-4"
      aria-busy={isSubmitting}
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
      <div className="flex min-w-0 flex-col gap-2">
        <label htmlFor={`${formId}-email`} className={labelClass}>
          {emailLabel}
        </label>
        <input
          ref={emailRef}
          id={`${formId}-email`}
          type="email"
          required
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={invalidEmail || undefined}
          aria-describedby={invalidEmail ? errorId : undefined}
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor={`${formId}-role`} className={labelClass}>
            {roleLabel}
          </label>
          <input
            id={`${formId}-role`}
            type="text"
            maxLength={120}
            placeholder={rolePlaceholder}
            value={role}
            disabled={isSubmitting}
            onChange={(e) => setRole(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor={`${formId}-pain`} className={labelClass}>
            {painLabel}
          </label>
          <input
            id={`${formId}-pain`}
            type="text"
            maxLength={500}
            placeholder={painPlaceholder}
            value={painPoint}
            disabled={isSubmitting}
            onChange={(e) => setPainPoint(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="mt-1 w-full rounded-lg disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
      <p
        ref={errorRef}
        id={errorId}
        tabIndex={-1}
        className="min-h-[1.25rem] text-sm text-[color:var(--accent-cyan)]"
        aria-live="polite"
        aria-atomic="true"
      >
        {error ?? ""}
      </p>
    </form>
  );
}
