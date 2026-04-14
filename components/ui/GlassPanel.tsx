import { classNames } from "@/lib/utils/classNames";
import type { ComponentProps } from "react";

type GlassPanelProps = ComponentProps<"div">;

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      {...props}
      className={classNames(
        "relative overflow-hidden rounded-[2rem] border border-[var(--grid-line)] bg-[var(--bg-panel)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
