import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/constants/routes";
import { section } from "@/lib/constants/spacing";

export default function NotFound() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="404"
          title="Page not found"
          sub="The page you were looking for does not exist on this site."
          align="center"
          as="h1"
        />
        <div className="mt-10">
          <Button href={routes.home} variant="primary">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
