interface Props {
  name: string;
  body: string;
}

export function AwsServiceBadge({ name, body }: Props) {
  return (
    <li className="rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent-cyan)]">
        {name}
      </p>
      <p className="mt-2 text-sm text-[color:var(--text-muted)]">{body}</p>
    </li>
  );
}
