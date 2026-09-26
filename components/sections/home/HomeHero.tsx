import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getCopy } from "@/content/getCopy";
import { Button } from "@/components/ui/Button";
import { ProductDemo } from "@/components/sections/demo/ProductDemo";

export async function HomeHero() {
  const { home } = await getCopy();
  const locale = await getLocale();
  return (
    <section className="assistant-hero site-container" aria-labelledby="hero-heading">
      <div className="assistant-hero-copy">
        <p className="product-label">{home.hero.label}</p>
        <h1 id="hero-heading">{home.hero.title}</h1>
        <p className="hero-description">{home.hero.sub}</p>
        <div className="hero-actions">
          <Button href={`/${locale}/beta`}>{home.hero.primaryCta}</Button>
          <Link className="quiet-link" href={`/${locale}/demo`}>{home.hero.secondaryCta}</Link>
        </div>
        <p className="availability">{home.hero.availability}</p>
        <div className="hero-capabilities"><span>{locale === "zh-HK" ? "電郵與背景" : "Email & context"}</span><span>{locale === "zh-HK" ? "行事曆與待辦" : "Calendar & tasks"}</span><span>{locale === "zh-HK" ? "文字與語音" : "Text & voice"}</span></div>
      </div>
      <ProductDemo locale={locale} />
    </section>
  );
}
