import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
export async function HomeInvitation() {
  const locale = await getLocale(); const zh = locale === "zh-HK";
  return <section className="invitation-section" id="access"><div className="site-container invitation-layout"><div><h2>{zh ? "讓 JARVIS 加入\n你的工作日。" : "Make JARVIS part\nof your working day."}</h2><p>{zh ? "告訴我們你希望少花時間處理哪些事情，一起塑造個人 AI 助理的下一步。" : "Tell us what you’d like to spend less time on. Help shape what a personal AI assistant takes care of next."}</p></div><div><Button href={`/${locale}/beta`}>{zh ? "申請 Beta 試用" : "Request beta access"}</Button><p>{zh ? "目前適用於 Apple Silicon Mac。" : "Currently available for Apple Silicon Macs."}</p><Link href={`/${locale}/download`}>{zh ? "已有試用資格？下載目前版本" : "Already have access? Get the current release"}</Link></div></div></section>;
}
