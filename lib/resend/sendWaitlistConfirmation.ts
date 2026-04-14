import { Resend } from "resend";

interface Params {
  to: string;
}

export async function sendWaitlistConfirmation({ to }: Params): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !from) throw new Error("resend_env_missing");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: "Welcome to the JARVIS beta waitlist",
    text:
      "Thanks for joining the JARVIS beta waitlist. We'll be in touch before launch with access details.\n\n— JARVIS AI",
  });
  if (result.error) throw new Error(`resend_failed:${result.error.message}`);
  return result.data?.id ?? "";
}
