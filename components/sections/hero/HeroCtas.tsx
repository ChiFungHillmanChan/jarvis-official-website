import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy.en";

export function HeroCtas() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button href="#waitlist" variant="primary">
        {copy.hero.primaryCta}
      </Button>
      <Button href="#demo" variant="ghost">
        {copy.hero.secondaryCta}
      </Button>
    </div>
  );
}
