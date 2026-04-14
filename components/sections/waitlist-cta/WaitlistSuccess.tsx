export function WaitlistSuccess({ message }: { message: string }) {
  return (
    <p className="text-sm leading-7 text-[color:var(--accent-cyan)]">
      {message}
    </p>
  );
}
