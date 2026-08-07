// In-process fixed-window limiter for the public waitlist endpoint.
//
// Honest limitation, and it is a hard one: this state lives in the memory of a
// single serverless instance. Vercel runs several instances and recycles idle
// ones, so a caller who parallelises across instances -- or simply waits for a
// cold start or a redeploy -- gets a fresh budget and is not bound by these
// counters at all. Nothing in this file can fix that; a per-process counter
// cannot rate-limit a horizontally scaled function. That applies to the
// per-address cap below as much as to the per-IP one.
//
// REQUIRED BEFORE LAUNCH: configure a Vercel WAF rate-limit rule on
// /api/waitlist (Firewall -> Rate Limiting, keyed on IP). That is the only
// control that sees every request, and it rejects at the edge before the
// function bills. A shared store (Vercel KV / Upstash) is the alternative if
// per-address state ever has to survive an instance. Until one of those is in
// place, treat this module as a floor that raises the cost of abuse, not as a
// limit anyone can rely on.

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

// Two budgets, because two different things need protecting and one number
// cannot do both jobs.
//
// The per-IP budget protects the endpoint, and one public IP is an entire
// office, campus, conference venue or mobile carrier NAT. It has to absorb a
// demo-day burst from a shared network without cutting the room off, so it sits
// well above any plausible legitimate burst. The ceiling is chosen so one
// abusive IP cannot exhaust a 100/day transactional email quota on its own:
// DAILY_LIMIT signups cost at most 2 * DAILY_LIMIT sends.
/** Requests accepted from one IP inside a fixed hour window. */
export const HOURLY_LIMIT = 15;
/** Requests accepted from one IP inside a fixed day window. */
export const DAILY_LIMIT = 40;

// The per-destination budget protects the person being mailed. This endpoint
// sends a confirmation to whatever address the caller supplies, so the abuse to
// stop is using it to mail-bomb a third party from our own domain -- and a
// generous per-IP budget makes that worse, not better. This cap is keyed on the
// normalised destination address rather than the sender, so spreading the same
// attack over many IPs does not raise it: one inbox receives at most this many
// confirmations per day no matter who asks. It is deliberately small; a real
// person needs one.
/** Confirmation emails one inbox may receive inside a fixed day window. */
export const ADDRESS_DAILY_LIMIT = 3;

/** How long an address counts as already signed up, so it is not mailed twice. */
export const DUPLICATE_WINDOW_MS = DAY_MS;

// Upper bounds on retained state. Once exceeded, the oldest keys are dropped.
const MAX_TRACKED_IPS = 5000;
const MAX_TRACKED_EMAILS = 5000;
// Expired keys are cleared on a timer rather than on every request.
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

interface IpWindows {
  hourStart: number;
  hourCount: number;
  dayStart: number;
  dayCount: number;
}

interface AddressWindow {
  dayStart: number;
  sends: number;
}

const ipWindows = new Map<string, IpWindows>();
// Keyed on the exact address, for "you already signed up".
const emailsSeen = new Map<string, number>();
// Keyed on the normalised address, for "this inbox has had its quota".
const addressSends = new Map<string, AddressWindow>();
let lastSweep = 0;

export type WaitlistGate =
  | { allowed: true }
  | { allowed: false; reason: "rate_limited" | "duplicate" };

/**
 * Vercel sets x-forwarded-for to a comma-separated chain whose first entry is
 * the original client; later entries are appended by proxies.
 */
export function clientIpFrom(headers: Headers): string {
  const first = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (first) return first;
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}

// Providers that document ignoring dots in the local part, where two spellings
// are the same mailbox rather than two people.
const DOTLESS_LOCAL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

/**
 * Collapses the spellings of one address that all deliver to the same inbox, so
 * a mail-bomber cannot mint a fresh budget per variant.
 *
 * RATE-LIMIT KEY ONLY. The mail still goes to the address exactly as the
 * visitor typed it and the founder notification still reports that address;
 * this value never leaves the limiter.
 *
 * The three decisions, deliberately:
 * - Case is folded. Domains are case-insensitive, and every mainstream provider
 *   treats the local part that way too.
 * - "+" sub-addressing is stripped. Gmail, Outlook, iCloud, Fastmail and Proton
 *   all deliver victim+anything@ to victim@, which is the cheapest bypass of a
 *   per-address cap. Worst case on a provider that does not support it: two
 *   genuinely different addresses share one budget of ADDRESS_DAILY_LIMIT.
 * - Dots are stripped in the local part for Gmail and googlemail ONLY, where
 *   ignoring them is documented provider behaviour, and those two domains share
 *   one key because they are one mailbox. Everywhere else a dot is significant
 *   -- first.last@ and firstlast@ are different people -- so stripping it
 *   globally would merge strangers into a single budget and silently drop their
 *   signups.
 */
export function normalizeAddressKey(email: string): string {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at === trimmed.length - 1) return trimmed;

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  // `|| local` keeps "+tag@host" style addresses distinct from each other
  // instead of collapsing every one of them onto an empty local part.
  const base = local.split("+")[0] || local;

  if (DOTLESS_LOCAL_DOMAINS.has(domain)) {
    return `${base.split(".").join("")}@gmail.com`;
  }
  return `${base}@${domain}`;
}

function exactAddressKey(email: string): string {
  return email.trim().toLowerCase();
}

function sweep(now: number): void {
  for (const [ip, windows] of ipWindows) {
    if (now - windows.dayStart >= DAY_MS) ipWindows.delete(ip);
  }
  for (const [email, seenAt] of emailsSeen) {
    if (now - seenAt >= DUPLICATE_WINDOW_MS) emailsSeen.delete(email);
  }
  for (const [key, window] of addressSends) {
    if (now - window.dayStart >= DAY_MS) addressSends.delete(key);
  }
}

function enforceBound<T>(map: Map<string, T>, max: number): void {
  while (map.size > max) {
    const oldest = map.keys().next();
    if (oldest.done) return;
    map.delete(oldest.value);
  }
}

/**
 * Counts one attempt from `ip` for `email` and reports whether it may proceed.
 * A "duplicate" verdict means the address already went through inside the
 * window, so nothing new should be sent to it.
 *
 * Only an attempt that passes every gate is counted. Counting one that is then
 * rejected inflates the windows and makes the limits stricter than advertised:
 * blind retries against an hour-long throttle would eat the day budget and turn
 * it into a day-long one.
 *
 * An `allowed` verdict takes a hold on the address: the caller owns it until
 * the signup is actually captured. If the capture fails the caller must call
 * `releaseWaitlistAddress`, otherwise the visitor's retry is misread as a
 * duplicate and the lead is lost.
 */
export function checkWaitlistAttempt(
  ip: string,
  email: string,
  now: number = Date.now(),
): WaitlistGate {
  if (now - lastSweep >= SWEEP_INTERVAL_MS) {
    lastSweep = now;
    sweep(now);
  }

  const exact = exactAddressKey(email);
  const key = normalizeAddressKey(email);

  const windows = ipWindows.get(ip);
  if (windows) {
    if (now - windows.hourStart >= HOUR_MS) {
      windows.hourStart = now;
      windows.hourCount = 0;
    }
    if (now - windows.dayStart >= DAY_MS) {
      windows.dayStart = now;
      windows.dayCount = 0;
    }
    if (windows.hourCount >= HOURLY_LIMIT || windows.dayCount >= DAILY_LIMIT) {
      return { allowed: false, reason: "rate_limited" };
    }
  }

  const seenAt = emailsSeen.get(exact);
  if (seenAt !== undefined && now - seenAt < DUPLICATE_WINDOW_MS) {
    return { allowed: false, reason: "duplicate" };
  }

  const address = addressSends.get(key);
  if (address) {
    if (now - address.dayStart >= DAY_MS) {
      address.dayStart = now;
      address.sends = 0;
    }
    if (address.sends >= ADDRESS_DAILY_LIMIT) {
      return { allowed: false, reason: "rate_limited" };
    }
  }

  // Past every gate, so this attempt is the one that turns into mail. Count it.
  if (windows) {
    windows.hourCount += 1;
    windows.dayCount += 1;
  } else {
    ipWindows.set(ip, { hourStart: now, hourCount: 1, dayStart: now, dayCount: 1 });
    enforceBound(ipWindows, MAX_TRACKED_IPS);
  }

  emailsSeen.set(exact, now);
  enforceBound(emailsSeen, MAX_TRACKED_EMAILS);

  if (address) {
    address.sends += 1;
  } else {
    addressSends.set(key, { dayStart: now, sends: 1 });
    enforceBound(addressSends, MAX_TRACKED_EMAILS);
  }

  return { allowed: true };
}

/**
 * Drops the holds taken by an `allowed` verdict -- both the duplicate hold and
 * the destination's send count -- so the address can be submitted again
 * immediately. Called when the signup was not captured after all: no mail went
 * out, so neither hold should stand. A hold that outlives a failed capture
 * blocks the retry the visitor was just told to make.
 */
export function releaseWaitlistAddress(email: string): void {
  emailsSeen.delete(exactAddressKey(email));

  const key = normalizeAddressKey(email);
  const address = addressSends.get(key);
  if (!address) return;
  address.sends -= 1;
  if (address.sends <= 0) addressSends.delete(key);
}

/**
 * Seconds until this attempt would be inside quota again, for the Retry-After
 * header on a 429. Every window that is currently over its limit is considered
 * -- the day cap can outlast the hour cap, and the destination cap can outlast
 * both -- because a caller told to retry too early only burns more of it.
 */
export function retryAfterSecondsFor(
  ip: string,
  email: string,
  now: number = Date.now(),
): number {
  const waits: number[] = [];

  const windows = ipWindows.get(ip);
  if (windows) {
    if (windows.hourCount >= HOURLY_LIMIT) waits.push(windows.hourStart + HOUR_MS - now);
    if (windows.dayCount >= DAILY_LIMIT) waits.push(windows.dayStart + DAY_MS - now);
  }

  const address = addressSends.get(normalizeAddressKey(email));
  if (address && address.sends >= ADDRESS_DAILY_LIMIT) {
    waits.push(address.dayStart + DAY_MS - now);
  }

  if (waits.length === 0) return 1;
  return Math.max(1, Math.ceil(Math.max(...waits) / 1000));
}

/** Drops all counters. Tests call this so cases stay order-independent. */
export function resetWaitlistLimiter(): void {
  ipWindows.clear();
  emailsSeen.clear();
  addressSends.clear();
  lastSweep = 0;
}
