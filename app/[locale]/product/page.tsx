import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/content/metadata";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";
import { HomeProduct } from "@/components/sections/home/HomeProduct";
import { HomeAudience } from "@/components/sections/home/HomeAudience";
import { HomeInvitation } from "@/components/sections/home/HomeInvitation";
import { Button } from "@/components/ui/Button";
export async function generateMetadata({params}: {params: Promise<{locale:string}>}): Promise<Metadata> { const {locale} = await params; return buildPageMetadata(locale,"product"); }
export default async function ProductPage({params}: {params: Promise<{locale:string}>}) {
  const {locale} = await params; setRequestLocale(locale); const zh = locale === "zh-HK";
  const items = zh ? [
    ["電郵與來源背景", "在同一個工作區同步多個 Gmail。你選擇相關郵件並建立群組，讓 GPT 根據指示分析內容，再返回來源核對。", "群組分析屬唯讀，不會替你寄信或更改行事曆。"],
    ["行事曆與日常待辦", "一般助理可以查看及管理已連接的 Google Calendar 活動，亦可協助建立和管理待辦事項。", "需要獨立連接及授權。並非每項一般助理操作都有額外確認步驟。"],
    ["電郵草稿", "請一般助理為客戶更新、後續跟進或會議安排準備 Gmail 草稿，再由你檢閱、修改及寄出。", "助理準備草稿，寄出前由你作最後決定。"],
    ["文字、語音與個人指示", "用文字或語音提出要求。在電郵群組加入個人指示，並保留由你確認、附有來源的事實和偏好。", "介面支援英文及繁體中文，另有廣東話語音支援。語音和 AI 服務有獨立資料流程。"],
  ] : [
    ["Email and source context", "Sync multiple Gmail accounts in one workspace. Choose related emails, create a group and ask GPT to analyse it with your instructions. Return to the sources to check the details.", "Group analysis is read-only. It does not send email or change calendar events."],
    ["Calendar and everyday tasks", "The general assistant can check and manage events in a connected Google Calendar, and help you create and manage tasks.", "Separate setup and permissions are required. Not every general-assistant action has an additional confirmation step."],
    ["Email drafts", "Ask the general assistant to prepare Gmail drafts for client updates, follow-ups or meeting arrangements. Review, edit and send them yourself.", "The assistant prepares a draft. You make the final decision to send."],
    ["Text, voice and personal instructions", "Ask by text or voice. Add instructions to an email group and keep useful facts and preferences as memories you confirm, with their sources.", "English and Traditional Chinese interface, with Cantonese voice support. Voice and AI services have separate data flows."],
  ];
  return <><PageJsonLd locale={locale} routeKey="product" /><SoftwareApplicationJsonLd locale={locale} />
    <header className="site-container wide-page-intro"><p className="product-label">{zh ? "JARVIS 的功能" : "Meet JARVIS"}</p><h1>{zh ? "一位個人助理，\n協助工作中的大小事。" : "One personal assistant.\nThe details, connected."}</h1><p>{zh ? "連接你選擇的工具，將資訊整理成可以跟進的下一步。從目前的 macOS Beta 開始。" : "Connect the tools you choose and turn useful context into a next step. Start with the current macOS beta."}</p><div className="page-actions"><Button href={`/${locale}/beta`}>{zh ? "申請 Beta 試用" : "Request beta access"}</Button><Link className="text-link" href={`/${locale}/demo`}>{zh ? "觀看產品示範" : "See it in action"}</Link></div></header>
    <section className="site-container capability-rows" aria-label={zh ? "目前功能" : "Current capabilities"}>{items.map(([title,body,note]) => <article key={title}><h2>{title}</h2><div><p>{body}</p><p className="capability-note">{note}</p></div></article>)}</section>
    <HomeProduct /><HomeAudience />
    <section className="page-shell product-availability"><h2>{zh ? "目前版本與使用要求" : "What’s available today"}</h2><p>{zh ? "目前為私人 Beta，需要 macOS 12 或以上及 Apple Silicon。Windows、Linux 和 Intel Mac 尚未支援，未有其他平台的推出日期。" : "The current private beta requires macOS 12 or later and Apple Silicon. Windows, Linux and Intel Macs are not supported; release dates for other platforms have not been announced."}</p><p>{zh ? "雲端 AI 使用你自己的 API 金鑰，用量費用由供應商另行計算。同步內容儲存在本機；選用雲端分析時，相關內容會傳送至已設定的供應商。" : "Cloud AI uses your own API key, with provider usage billed separately. Synced content is stored locally; cloud analysis sends relevant context to the provider you configure."}</p><div className="setup-links"><Link href={`/${locale}/how-it-works`}>{zh ? "閱讀設定指南" : "Read the setup guide"}</Link><Link href={`/${locale}/privacy`}>{zh ? "了解資料處理" : "Understand data handling"}</Link></div></section><HomeInvitation />
  </>;
}
