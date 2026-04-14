# JARVIS AI Website — Handoff to Hillman

> Status as of 2026-04-14: **MVP complete (Tasks 1–31 of the implementation plan).** All code shipped, tested, and committed on `main`. What remains is operational work that needs your hands on the wheel.

## What's done

- 5 routes: `/`, `/company`, `/contact`, `/privacy`, `/terms` — all static, all on-brand
- `/api/waitlist` POST endpoint with Zod validation + Resend dispatch (notification + confirmation)
- Sitemap, robots, Organization + SoftwareApplication JSON-LD
- 19 passing tests; ESLint clean (zero warnings); TypeScript strict; production build emits 9 routes
- Hero with looping muted demo video + static poster + Framer parallax dots
- Reduced-motion fallback via `useSyncExternalStore`
- Captions placeholder VTT (real captions = a Day 5 follow-up)
- Optimized assets in `public/`: AVIF + WebP screenshot, WebM + MP4 hero loops, OG image, favicon, SVG icon

Latest commit: `60cd90d`.

---

## What you need to do — in order

### 1. Get a Resend API key (5 minutes)

The waitlist form needs this to actually send email.

1. Sign up free at https://resend.com (no credit card)
2. Visit https://resend.com/api-keys → **Create API Key** → copy the `re_xxxxxxxx` value
3. (Optional, for production) Verify your domain in Resend → **Domains** → add the domain you'll use, paste the SPF + DKIM DNS records into your DNS provider. Until then, leave `WAITLIST_FROM=onboarding@resend.dev` (Resend's sandbox sender — works immediately, no DNS setup).

### 2. Create `.env.local` (1 minute)

In the project root:

```bash
cd /Users/hillmanchan/Desktop/jarvis-official-website
cat > .env.local <<'EOF'
RESEND_API_KEY=re_paste_yours_here
CONTACT_EMAIL=hillman@hillmanchan.com
WAITLIST_FROM=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

`.env.local` is gitignored — it never gets committed.

### 3. Run the dev server + smoke test (5 minutes)

```bash
npm run dev
```

Open http://localhost:3000 and walk through:

- **Home** — hero video loops, scroll triggers stat counters, integrations marquee scrolls, all 6 feature tiles render, founder note links to `/company`
- **Click "Join the beta waitlist"** — you should jump to the waitlist section
- **Enter your own email + submit** — success message appears; check your inbox for the confirmation; check `hillman@hillmanchan.com` for the notification
- **Visit `/company`, `/contact`, `/privacy`, `/terms`** — each renders with nav + footer
- **Press Tab from the top** — every interactive element gets a visible cyan focus ring

### 4. Deploy to Vercel (15 minutes)

```bash
npx vercel login         # one-time
npx vercel link          # accept defaults; project name "jarvis-official-website"
```

Add env vars (run each, paste the value when prompted):

```bash
npx vercel env add RESEND_API_KEY production
npx vercel env add CONTACT_EMAIL production         # hillman@hillmanchan.com
npx vercel env add WAITLIST_FROM production         # onboarding@resend.dev
npx vercel env add NEXT_PUBLIC_SITE_URL production  # https://jarvis-ai.vercel.app
```

Deploy a preview to verify, then promote:

```bash
npx vercel              # preview URL printed — test it
npx vercel --prod       # production URL printed
```

### 5. Lighthouse audit (10 minutes)

In Chrome DevTools → Lighthouse → **Mobile** → run on every route:

- /
- /company
- /contact
- /privacy
- /terms

Targets: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO ≥ 95.

If any score regresses below target, the most likely fixes are:
- LCP slow → confirm `HeroPoster` keeps `priority` and the WebP loads first
- CLS bumps → wrap the demo video in a fixed `aspect-video` box
- A11y miss → check colour contrast on `--text-muted` against the active background

### 6. Rich Results Test (2 minutes)

Visit https://search.google.com/test/rich-results → paste your production URL → confirm `Organization` and `SoftwareApplication` are detected without errors.

### 7. Reply to AWS Startups HK

Use the draft from the implementation plan §Task 36, with the new URL inserted. Send it the same day the production URL goes live.

---

## Things explicitly deferred (post-Activate roadmap)

These are tracked in `docs/superpowers/specs/2026-04-14-jarvis-website-mvp-design.md` §15 and remain valuable but are NOT on the AWS resubmission critical path.

- R3F holographic hero sphere
- GSAP-pinned "How it works" scroll sequence
- Lenis smooth scroll
- next-intl + zh-HK translations + hreflang + per-locale OG
- Custom domain (try `jarvis.tools`, `jarvisagent.ai`, or `jarvis.com.hk` via Namecheap/HKDNR)
- Vercel KV waitlist store + Upstash rate limiting
- Cloudflare Turnstile on waitlist + contact
- `VideoObject` + `BreadcrumbList` JSON-LD
- `@vercel/og` runtime OG image generation
- `/product`, `/how-it-works`, `/roadmap`, `/press`, `/blog/*` routes
- Press kit PDF + vector logo lockup
- Plausible analytics
- ASCII-art animated footer wordmark
- Founder photo
- Real captions for the demo video (replace `public/jarvis-demo.vtt` placeholder)
- Updated HK street address in footer once BR issues

---

## Knowing the codebase

- `app/` — routes, layout, API
- `components/sections/<name>/` — each homepage section is a self-contained folder with its component + subcomponents + data + types. Same applies to `components/layout/nav/` and `components/layout/footer/`.
- `components/ui/` — shared primitives (Button, GlassPanel, etc.). One component per file. No barrel `index.ts`.
- `content/` — all marketing copy, company facts, per-route metadata. **Source of truth** for any text you'd want to edit.
- `lib/utils/`, `lib/constants/`, `lib/seo/`, `lib/resend/`, `lib/validation/` — one exported function/value per file.
- `styles/` — `tokens.css` (CSS variables), `globals.css` (Tailwind + theme + reduced-motion + marquee keyframes), `fonts.css` (placeholder for future @font-face additions).
- `public/` — optimized assets only.

To change copy: edit `content/copy.en.ts`. To add a section: create a new folder under `components/sections/<name>/` and import it in `app/page.tsx`. To add a route: drop a `app/<name>/page.tsx` plus an entry in `lib/constants/routes.ts` and `content/metadata.ts`.

## Useful commands

```bash
npm run dev          # local dev with Turbopack
npm run build        # production build (also runs typecheck)
npm test             # run all Vitest tests
npx eslint .         # lint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write all files
```
