import Link from "next/link";
import { getLocale } from "next-intl/server";
import { AudioLines, Command, CornerDownLeft } from "lucide-react";
import { getCopy } from "@/content/getCopy";
import { localePath } from "@/lib/i18n/localePath";

export async function HomeDemo() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section
      className="home-section setup-section"
      id="how-it-works"
      aria-labelledby="setup-heading"
    >
      <div className="site-container setup-layout">
        <div className="setup-intro">
          <div className="input-symbols" aria-hidden="true">
            <span>
              <Command size={27} />
            </span>
            <span>
              <AudioLines size={32} />
            </span>
            <span>
              <CornerDownLeft size={25} />
            </span>
          </div>
          <h2 id="setup-heading">{home.setup.title}</h2>
          <p>{home.setup.sub}</p>
          <Link className="text-link" href={localePath(locale, "/how-it-works")}>
            {home.setup.link}
          </Link>
          <p className="setup-requirement">{home.setup.requirement}</p>
        </div>
        <ol className="home-setup-steps">
          {home.setup.steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
