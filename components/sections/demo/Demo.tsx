import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { copy } from "@/content/copy.en";
import { DemoVideo } from "./DemoVideo";

export function Demo() {
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
