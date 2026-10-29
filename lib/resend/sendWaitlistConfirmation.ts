import { Resend } from "resend";
import type { WaitlistInput } from "@/lib/validation/waitlistSchema";

interface Params {
  to: string;
  locale?: WaitlistInput["locale"];
}

const COPY = {
  en: {
    subject: "Welcome to the JARVIS beta waitlist",
    text:
      "Thanks for joining the JARVIS beta waitlist. We'll be in touch before launch with access details.\n\n— JARVIS AI",
  },
  "zh-HK": {
    subject: "歡迎加入 JARVIS Beta 候補名單",
    text: "感謝你加入 JARVIS Beta 候補名單。我們會在推出前與你聯絡，並告知使用詳情。\n\n— JARVIS AI",
  },
} as const;

export async function sendWaitlistConfirmation({ to, locale = "en" }: Params): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !from) throw new Error("resend_env_missing");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to, ...COPY[locale] });
  if (result.error) throw new Error(`resend_failed:${result.error.message}`);
  return result.data?.id ?? "";
}
