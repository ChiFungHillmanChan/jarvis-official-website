import { Button } from "@/components/ui/Button";

export function HeroCtas({
  primaryCta,
  secondaryCta,
}: {
  primaryCta: string;
  secondaryCta: string;
}) {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button href="#waitlist" variant="primary">
        {primaryCta}
      </Button>
      <Button href="#demo" variant="ghost">
        {secondaryCta}
      </Button>
    </div>
  );
}
