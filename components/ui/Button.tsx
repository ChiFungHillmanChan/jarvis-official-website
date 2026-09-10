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
  "inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium leading-5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-cyan)]";

const styles: Record<Variant, string> = {
  primary:
    "border-[color:var(--accent-cyan)] bg-[color:var(--accent-cyan)] text-white hover:border-[#005653] hover:bg-[#005653]",
  ghost:
    "border-[var(--grid-line)] bg-white text-[color:var(--text-primary)] hover:border-[#a9b7bc] hover:bg-[var(--bg-panel)]",
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
      <Link href={href} onClick={onClick} className={merged} aria-label={ariaLabel}>
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
