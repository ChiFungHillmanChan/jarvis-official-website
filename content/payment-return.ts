import type { Metadata } from "next";
import { buildOpenGraph, buildTwitter } from "@/content/metadata";
import { localePath } from "@/lib/i18n/localePath";

export type PaymentReturnState = "success" | "cancel";

export function getPaymentReturnCopy(locale: string, state: PaymentReturnState) {
  const chinese = locale === "zh-HK";
  const common = chinese
    ? {
        eyebrow: "JARVIS 帳戶",
        nextHeading: "返回 App 核對方案",
        next: "請返回已開啟的 JARVIS App，以伺服器確認方案。若狀態尚未更新，請稍候，然後在「設定 → 帳戶」選擇「重新整理」。",
        caution: "請先核對方案狀態及 Stripe 的付款紀錄，不要重複付款。",
        home: "返回首頁",
        download: "下載 JARVIS for Mac",
      }
    : {
        eyebrow: "JARVIS account",
        nextHeading: "Return to the app to check your plan",
        next: "Return to the JARVIS app already open on your Mac to confirm your plan with the server. If the status has not updated, wait a moment, then choose Refresh in Settings → Account.",
        caution: "First check your plan status and your Stripe payment records. Do not pay again while the status is being confirmed.",
        home: "Back to homepage",
        download: "Download JARVIS for Mac",
      };
  const result = state === "success"
    ? chinese
      ? { title: "付款流程已返回", description: "你已從 Stripe 返回 JARVIS 網站。此頁面不會確認付款或方案是否生效；請以 App 從伺服器取得的狀態為準。" }
      : { title: "Payment flow returned", description: "You have returned from Stripe to the JARVIS website. This page does not confirm payment or plan activation; use the status the app receives from the server." }
    : chinese
      ? { title: "你已離開付款頁面", description: "你已從 Stripe 付款頁面返回。此頁面無法判斷交易結果；如曾提交付款資料，請核對方案狀態及 Stripe 的付款紀錄。" }
      : { title: "You left checkout", description: "You have returned from the Stripe checkout page. This page cannot determine the transaction outcome. If you submitted payment details, check your plan status and your Stripe payment records." };
  return { ...common, ...result };
}

export function paymentReturnMetadata(locale: string, state: PaymentReturnState): Metadata {
  const copy = getPaymentReturnCopy(locale, state);
  const route = { title: `${copy.title} · JARVIS`, description: copy.description, canonical: `/payment/${state}` };
  return {
    title: route.title,
    description: route.description,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: {
      canonical: localePath(locale, route.canonical),
      languages: {
        en: localePath("en", route.canonical),
        "zh-HK": localePath("zh-HK", route.canonical),
        "x-default": localePath("en", route.canonical),
      },
    },
    openGraph: buildOpenGraph(locale, route),
    twitter: buildTwitter(route),
  };
}
