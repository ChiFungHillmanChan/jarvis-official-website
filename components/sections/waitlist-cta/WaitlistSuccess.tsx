export function WaitlistSuccess({ message }: { message: string }) {
  return (
    <p className="font-mono text-sm uppercase tracking-[0.22em] text-[color:var(--accent-cyan)]">
      {message}
    </p>
  );
}
