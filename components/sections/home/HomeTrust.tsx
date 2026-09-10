import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Fingerprint } from "lucide-react";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";

export async function HomeTrust() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section
      className="home-section privacy-section"
      id="privacy"
      aria-labelledby="privacy-heading"
    >
      <div className="site-container privacy-layout">
        <div className="privacy-intro">
          <Fingerprint size={48} strokeWidth={1.2} aria-hidden="true" />
          <h2 id="privacy-heading">{home.trust.title}</h2>
          <p>{home.trust.sub}</p>
          <Link className="text-link" href={localePath(locale, "/security")}>
            {home.trust.link}
          </Link>
        </div>
        <div className="privacy-details">
          {home.trust.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
