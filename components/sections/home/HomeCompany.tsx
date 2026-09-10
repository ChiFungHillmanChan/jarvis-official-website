import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";

export async function HomeCompany() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section className="home-section company-section">
      <div className="site-container company-layout">
        <h2>{home.company.title}</h2>
        <div>
          <p>{home.company.body}</p>
          <Link className="text-link" href={localePath(locale, "/company")}>
            {home.company.link}
          </Link>
        </div>
      </div>
    </section>
  );
}
