import { EMAIL_PATTERN, MAX_EMAIL_LENGTH } from "@/lib/validation/email";

export function isEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_PATTERN.test(trimmed);
}
