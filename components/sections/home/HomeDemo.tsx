import { getCopy } from "@/content/getCopy";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoVideo } from "@/components/sections/demo/DemoVideo";

export async function HomeDemo() {
  const copy = await getCopy();

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={copy.home.demo.eyebrow}
          title={copy.home.demo.title}
          sub={copy.home.demo.sub}
          align="center"
        />
        <div className="mt-10">
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
