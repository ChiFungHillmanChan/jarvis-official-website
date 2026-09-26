import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { getDemoCopy } from "@/content/product-demo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { ProductDemo } from "@/components/sections/demo/ProductDemo";
import { WorkflowPreview } from "@/components/sections/home/WorkflowPreview";
import { HomeInvitation } from "@/components/sections/home/HomeInvitation";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}): Promise<Metadata> { const {locale} = await params; return buildPageMetadata(locale,"demo"); }
export default async function DemoPage({params}: {params: Promise<{locale:string}>}) {
  const {locale} = await params; setRequestLocale(locale); const zh = locale === "zh-HK"; const copy = getDemoCopy(locale);
  return <><PageJsonLd locale={locale} routeKey="demo" /><div className="site-container demo-page"><header className="wide-page-intro"><p className="product-label">{zh ? "觀看 JARVIS 如何幫忙" : "A working day with JARVIS"}</p><h1>{zh ? "從零散資訊，\n到清晰的下一步。" : "From loose ends\nto a clear next step."}</h1><p>{zh ? "32 秒看一個客戶項目如何整理。你可以播放、暫停，或直接選擇想看的章節。" : "Follow a client project in 32 seconds. Play the walkthrough, pause at any point or choose a chapter."}</p></header><div className="demo-full"><ProductDemo locale={locale} /></div>
    <section className="demo-transcript"><h2>{zh ? "示範中的工作流程" : "The workflow in this demo"}</h2><ol>{copy.scenes.map(scene => <li key={scene.title}><h3>{scene.title}</h3><p>{scene.subtitle}</p><p>{scene.caption}</p></li>)}</ol></section>
    <section className="demo-explore"><h2>{zh ? "親自核對一個來源。" : "Try checking a source yourself."}</h2><p>{zh ? "選擇下方分析的來源按鈕，查看示範原信。這是互動情境示範，不會連接你的 Gmail。" : "Select a source in the analysis below to read the sample email. This interactive example does not connect to your Gmail."}</p><WorkflowPreview locale={locale} /></section>
  </div><HomeInvitation /></>;
}
