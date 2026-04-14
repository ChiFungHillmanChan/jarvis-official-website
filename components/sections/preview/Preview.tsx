import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { preview } from "./preview.data";
import { PreviewFrame } from "./PreviewFrame";

export function Preview() {
  return (
    <section className={`relative isolate overflow-hidden ${section.paddingY} ${section.paddingX}`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,180,255,0.08), transparent)",
        }}
        aria-hidden="true"
      />
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow={preview.eyebrow}
          title={preview.title}
          sub={preview.sub}
          align="center"
        />
        <div className="mt-12 md:mt-20">
          <PreviewFrame />
        </div>
      </div>
    </section>
  );
}
