import { classNames } from "@/lib/utils/classNames";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={classNames(
        "relative rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] p-6 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
