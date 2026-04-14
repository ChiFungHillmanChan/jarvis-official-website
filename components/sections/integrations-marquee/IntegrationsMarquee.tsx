import { getCopy } from "@/content/getCopy";
import { IntegrationChip } from "./IntegrationChip";

export async function IntegrationsMarquee() {
  const copy = await getCopy();
  const integrations = [...copy.integrations, ...copy.integrations];

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
