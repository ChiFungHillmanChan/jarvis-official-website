import { Button } from "@/components/ui/Button";

export function NavCta({ label }: { label: string }) {
  return (
    <Button href="#waitlist" variant="primary">
      {label}
    </Button>
  );
}
