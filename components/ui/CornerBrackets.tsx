import { classNames } from "@/lib/utils/classNames";

interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
}

export function CornerBrackets({ children, className }: CornerBracketsProps) {
  return (
    <div className={classNames("relative inline-flex items-center px-3 py-1", className)}>
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[var(--accent-cyan)]" />
      {children}
    </div>
  );
}
