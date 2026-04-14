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
  "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition-all duration-150";

const styles: Record<Variant, string> = {
  primary:
    "border-[color:var(--accent-cyan)] bg-[color:var(--accent-cyan)] text-[color:var(--bg-void)] shadow-[var(--glow-cyan)] hover:-translate-y-0.5 hover:bg-[color:var(--text-primary)]",
  ghost:
    "border-[var(--grid-line)] bg-[color:rgba(255,255,255,0.02)] text-[color:var(--text-primary)] hover:border-[var(--accent-cyan-60)] hover:bg-[var(--accent-cyan-soft)]",
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
