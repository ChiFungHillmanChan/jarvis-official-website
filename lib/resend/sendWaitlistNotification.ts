import { Resend } from "resend";

interface Params {
  signup: string;
  role?: string;
  painPoint?: string;
}

export async function sendWaitlistNotification({ signup, role, painPoint }: Params): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !to || !from) throw new Error("resend_env_missing");
  const resend = new Resend(apiKey);
  const lines = [
    `A new waitlist signup: ${signup}`,
    `Role: ${role ?? "(not given)"}`,
    `Wants JARVIS to take over: ${painPoint ?? "(not given)"}`,
  ];
  const result = await resend.emails.send({
    from,
    to,
    subject: "JARVIS AI waitlist — new signup",
    text: lines.join("\n"),
  });
  if (result.error) throw new Error(`resend_failed:${result.error.message}`);
  return result.data?.id ?? "";
}
