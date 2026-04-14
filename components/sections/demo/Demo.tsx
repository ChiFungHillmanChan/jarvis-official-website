import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { DemoVideo } from "./DemoVideo";

export function Demo() {
  return (
    <section id="demo" className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Watch"
          title="See JARVIS in action"
          sub="90 seconds. Voice, tool calls, the 3D data sphere, and the morning briefing."
        />
        <div className="mt-10">
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
