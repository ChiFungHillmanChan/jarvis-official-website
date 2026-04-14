export type PreviewLabelStrings = {
  tl: string;
  tr: string;
  bl: string;
  br: string;
};

const base =
  "pointer-events-none absolute font-mono text-[8px] md:text-[10px] uppercase tracking-[0.25em] text-[color:var(--accent-cyan-60)] hidden sm:flex items-center gap-1 md:gap-2";
const dot = "h-1 w-1 rounded-full bg-[color:var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]";

export function PreviewLabels({ labels }: { labels: PreviewLabelStrings }) {
  return (
    <>
      <span className={`${base} left-0 -top-6`} aria-hidden="true">
        <span className={dot} />
        {labels.tl}
      </span>
      <span className={`${base} right-0 -top-6`} aria-hidden="true">
        {labels.tr}
        <span className={dot} />
      </span>
      <span className={`${base} left-0 -bottom-6`} aria-hidden="true">
        <span className={dot} />
        {labels.bl}
      </span>
      <span className={`${base} right-0 -bottom-6`} aria-hidden="true">
        {labels.br}
        <span className={dot} />
      </span>
    </>
  );
}
