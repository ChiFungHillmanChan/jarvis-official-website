import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getCopy } from "@/content/getCopy";
import { DemoVideo } from "./DemoVideo";

export async function Demo() {
  const copy = await getCopy();

  return (
    <section id="demo" className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.sections.demo.eyebrow}
          title={copy.sections.demo.title}
          sub={copy.sections.demo.sub}
        />
        <div className="mt-10">
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
