import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { getPaymentReturnCopy, type PaymentReturnState } from "@/content/payment-return";
import { localePath } from "@/lib/i18n/localePath";

export function PaymentReturn({ locale, state }: { locale: string; state: PaymentReturnState }) {
  const copy = getPaymentReturnCopy(locale, state);
  return (
    <section className="mx-auto max-w-[800px] px-6 py-20 md:px-10 md:py-28">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} sub={copy.description} as="h1" />
      <GlassPanel className="mt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight">{copy.nextHeading}</h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{copy.next}</p>
        <p className="mt-4 text-sm leading-7 text-[color:var(--text-secondary)]">{copy.caution}</p>
      </GlassPanel>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={localePath(locale, "/")}>{copy.home}</Button>
        <Button href={localePath(locale, "/download")} variant="ghost">{copy.download}</Button>
      </div>
    </section>
  );
}
