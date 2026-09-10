import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Plus } from "lucide-react";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";

export async function HomeFaq() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section className="home-section faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="site-container faq-layout">
        <div>
          <h2 id="faq-heading">{home.faq.title}</h2>
          <p className="faq-contact">
            {home.faq.contact}
            <br />
            <Link className="text-link" href={localePath(locale, "/contact")}>
              {home.faq.contactLink}
            </Link>
          </p>
        </div>
        <div className="faq-list">
          {home.faq.items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
