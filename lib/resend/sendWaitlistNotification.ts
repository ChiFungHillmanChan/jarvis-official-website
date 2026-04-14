import { Resend } from "resend";

interface Params {
  signup: string;
}

export async function sendWaitlistNotification({ signup }: Params): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !to || !from) throw new Error("resend_env_missing");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: "JARVIS AI waitlist — new signup",
    text: `A new waitlist signup: ${signup}`,
  });
  if (result.error) throw new Error(`resend_failed:${result.error.message}`);
  return result.data?.id ?? "";
}
