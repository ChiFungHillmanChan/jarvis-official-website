import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(254),
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
