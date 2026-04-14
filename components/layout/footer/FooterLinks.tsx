import { ExternalLink } from "@/components/ui/ExternalLink";
import { social } from "@/lib/constants/social";
import { company } from "@/content/company";

export function FooterLinks() {
  return (
    <ul className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.22em]">
      <li>
        <ExternalLink href={social.github} className="no-underline">
          GitHub
        </ExternalLink>
      </li>
      <li>
        <a
          href={`mailto:${company.contactEmail}`}
          className="text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
        >
          {company.contactEmail}
        </a>
      </li>
    </ul>
  );
}
