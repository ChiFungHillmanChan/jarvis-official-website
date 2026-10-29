// The one email rule shared by the form and /api/waitlist, so the browser never
// accepts an address the server will refuse. This is the pattern zod 3.25's
// z.string().email() applies; it is copied here rather than imported so the
// client bundle does not carry zod. isEmail.test.ts checks it against zod.
export const EMAIL_PATTERN =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
export const MAX_EMAIL_LENGTH = 254;
