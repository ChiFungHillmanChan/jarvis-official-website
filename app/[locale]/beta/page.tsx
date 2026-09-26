import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { getCopyFor } from "@/content/getCopy";
import { getUiFor } from "@/content/ui";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}): Promise<Metadata> { const {locale} = await params; return buildPageMetadata(locale,"beta"); }
export default async function BetaPage({params}: {params: Promise<{locale:string}>}) {
  const {locale} = await params; setRequestLocale(locale); const zh = locale === "zh-HK";
  const {waitlistCta: copy} = getCopyFor(locale); const ui = getUiFor(locale);
  return <div className="site-container beta-page"><PageJsonLd locale={locale} routeKey="beta" /><div className="beta-layout"><div><header className="wide-page-intro"><p className="product-label">{zh ? "加入早期用戶" : "Help shape what comes next"}</p><h1>{zh ? "你的工作日，\n多一位幫手。" : "Your day.\nWith a little help."}</h1><p>{zh ? "申請試用 JARVIS 個人 AI 助理。告訴我們你最想改善的日常工作，我們會按試用名額聯絡你。" : "Request access to the JARVIS personal AI assistant. Tell us what you’d like help with, and we’ll be in touch as onboarding places open."}</p></header><div className="beta-expectations"><h2>{zh ? "申請前須知" : "Before you join"}</h2><ul><li>{zh ? "目前版本需要 Apple Silicon Mac 及 macOS 12 或以上。" : "The current beta requires an Apple Silicon Mac and macOS 12 or later."}</li><li>{zh ? "雲端 AI 使用你自己的 API 金鑰，供應商用量費用另計。" : "Cloud AI uses your own API key. Provider usage is billed separately."}</li><li>{zh ? "申請不代表已獲試用資格，也不會建立付費訂閱。" : "A request does not guarantee access or start a paid subscription."}</li></ul><Link className="text-link" href={`/${locale}/how-it-works`}>{zh ? "先了解設定流程" : "See what setup involves"}</Link></div></div>
    <div className="beta-form-panel"><h2>{zh ? "申請 Beta 試用" : "Request beta access"}</h2><p>{zh ? "只需電郵及政策確認；其餘資料可選填。請勿提交敏感個人資料。" : "Your email and policy acknowledgement are required. Everything else is optional. Please leave out sensitive personal information."}</p><WaitlistForm locale={locale} placeholder={copy.placeholder} submitLabel={copy.submit} submittingLabel={ui.waitlist.submitting} successMessage={copy.success} errorInvalid={copy.errorInvalid} errorGeneric={copy.errorGeneric} emailLabel={ui.contact.emailInputLabel} roleLabel={copy.roleLabel} rolePlaceholder={copy.rolePlaceholder} painLabel={copy.painLabel} painPlaceholder={copy.painPlaceholder} /></div>
  </div></div>;
}
