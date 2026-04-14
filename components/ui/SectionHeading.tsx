import { classNames } from "@/lib/utils/classNames";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  className,
  align = "left",
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={classNames(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-cyan)]">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className="font-display text-4xl leading-tight md:text-6xl">{title}</HeadingTag>
      {sub ? (
        <p className="mt-5 text-base leading-7 text-[color:var(--text-secondary)] md:text-lg">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
