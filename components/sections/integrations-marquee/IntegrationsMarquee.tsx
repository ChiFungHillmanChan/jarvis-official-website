import { integrations } from "./integrations.data";
import { IntegrationChip } from "./IntegrationChip";

export function IntegrationsMarquee() {
  return (
    <section
      className="border-y border-[var(--grid-line)] py-8 overflow-hidden"
      aria-label="Integrations"
    >
      <div className="marquee flex">
        {integrations.map((name, i) => (
          <IntegrationChip key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </section>
  );
}
