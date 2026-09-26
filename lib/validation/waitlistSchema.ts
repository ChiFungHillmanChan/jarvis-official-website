import { z } from "zod";
import { PRIVACY_VERSION, TERMS_VERSION } from "@/lib/waitlist/policy";

export const waitlistSchema = z.object({
  privacyAccepted: z.literal(true),
  termsAccepted: z.literal(true),
  privacyVersion: z.literal(PRIVACY_VERSION),
  termsVersion: z.literal(TERMS_VERSION),
  locale: z.enum(["en", "zh-HK"]).optional(),
  email: z.string().trim().toLowerCase().email().max(254),
  // Optional qualification fields. Empty strings normalise to undefined so the
  // notification email only carries answers the visitor actually gave.
  role: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined)),
  painPoint: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
