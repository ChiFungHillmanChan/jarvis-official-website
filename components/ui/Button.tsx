import Link from "next/link";
import { classNames } from "@/lib/utils/classNames";

type Variant = "primary" | "ghost";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center rounded-sm px-5 py-3 font-mono text-sm uppercase tracking-[0.18em] transition-colors duration-150";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-cyan)] text-[color:var(--bg-void)] hover:bg-[var(--accent-cyan-60)] shadow-[var(--glow-cyan)]",
  ghost:
    "border border-[var(--accent-cyan-60)] text-[color:var(--accent-cyan)] hover:bg-[var(--accent-cyan-20)]",
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  children,
  className,
  ariaLabel,
}: ButtonProps) {
  const merged = classNames(base, styles[variant], className);
  if (href) {
    return (
      <Link href={href} className={merged} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={merged} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
