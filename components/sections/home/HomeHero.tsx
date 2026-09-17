import { ArrowDown } from "lucide-react";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { Button } from "@/components/ui/Button";
import { WorkflowPreview } from "./WorkflowPreview";

export async function HomeHero() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section className="home-hero" id="experience" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="product-label">{home.hero.label}</p>
        <h1 id="hero-heading">{home.hero.title}</h1>
        <p className="hero-description">{home.hero.sub}</p>
        <div className="hero-actions">
          <Button href="#access">{home.hero.primaryCta}</Button>
          <a className="quiet-link" href="#preview">
            {home.hero.secondaryCta}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
        <p className="availability">{home.hero.availability}</p>
      </div>
      <div className="site-container">
        <WorkflowPreview locale={locale} />
      </div>
    </section>
  );
}
