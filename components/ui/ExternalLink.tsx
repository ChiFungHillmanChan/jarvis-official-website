import { classNames } from "@/lib/utils/classNames";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "text-[color:var(--accent-cyan)] underline underline-offset-4 hover:text-[color:var(--text-primary)]",
        className,
      )}
    >
      {children}
    </a>
  );
}
