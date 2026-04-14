import { classNames } from "@/lib/utils/classNames";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, sub, className, align = "left" }: SectionHeadingProps) {
  return (
    <div className={classNames(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--accent-cyan)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {sub ? (
        <p className="mt-4 max-w-2xl text-base text-[color:var(--text-muted)] md:text-lg">{sub}</p>
      ) : null}
    </div>
  );
}
