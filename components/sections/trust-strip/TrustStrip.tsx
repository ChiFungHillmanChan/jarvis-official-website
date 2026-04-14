import { getCopy } from "@/content/getCopy";

export async function TrustStrip() {
  const copy = await getCopy();
  return (
    <section className="border-y border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.6)]">
      <p className="mx-auto max-w-6xl px-6 py-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)] md:px-10">
        {copy.trust}
      </p>
    </section>
  );
}
