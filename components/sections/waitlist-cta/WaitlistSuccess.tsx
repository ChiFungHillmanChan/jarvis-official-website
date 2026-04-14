import { copy } from "@/content/copy.en";

export function WaitlistSuccess() {
  return (
    <p className="font-mono text-sm uppercase tracking-[0.22em] text-[color:var(--accent-cyan)]">
      {copy.waitlistCta.success}
    </p>
  );
}
