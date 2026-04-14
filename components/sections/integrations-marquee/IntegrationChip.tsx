export function IntegrationChip({ name }: { name: string }) {
  return (
    <span className="mx-6 inline-flex items-center gap-3 whitespace-nowrap rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] px-5 py-2 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-primary)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)] shadow-[var(--glow-cyan)]" />
      {name}
    </span>
  );
}
