import { Button } from "@/components/ui/Button";
import { localePath } from "@/lib/i18n/localePath";

export function NavCta({ locale, label }: { locale: string; label: string }) {
  return (
    <Button href={`${localePath(locale, "/contact")}#request-access`} variant="primary">
      {label}
    </Button>
  );
}
