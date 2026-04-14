import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { getUiFor } from "@/content/ui";
import { getLocale } from "next-intl/server";
import { localePath } from "@/lib/i18n/localePath";

export default async function NotFound() {
  const locale = await getLocale();
  const ui = getUiFor(locale);

  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow={ui.notFound.eyebrow}
          title={ui.notFound.title}
          sub={ui.notFound.sub}
          align="center"
          as="h1"
        />
        <div className="mt-10">
          <Button href={localePath(locale, "/")} variant="primary">
            {ui.notFound.back}
          </Button>
        </div>
      </div>
    </section>
  );
}
