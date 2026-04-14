import { getLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { AwsServiceBadge } from "./AwsServiceBadge";

export async function RoadmapTeaser() {
  const copy = await getCopy();
  const locale = await getLocale();
  const ui = getUiFor(locale);
  const roadmap = copy.roadmap;

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow={ui.cloudRoadmapEyebrow} title={roadmap.heading} sub={roadmap.sub} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.services.map((s) => (
            <AwsServiceBadge key={s.name} name={s.name} body={s.body} />
          ))}
        </ul>
      </div>
    </section>
  );
}
