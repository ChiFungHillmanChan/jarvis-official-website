import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { AwsServiceBadge } from "./AwsServiceBadge";
import { roadmap } from "./roadmap.data";

export function RoadmapTeaser() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Cloud roadmap" title={roadmap.heading} sub={roadmap.sub} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.services.map((s) => (
            <AwsServiceBadge key={s.name} name={s.name} body={s.body} />
          ))}
        </ul>
      </div>
    </section>
  );
}
