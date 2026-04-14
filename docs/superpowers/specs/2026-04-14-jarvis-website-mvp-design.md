---
title: JARVIS AI Website — MVP Design (AWS Activate Resubmission Slice)
date: 2026-04-14
status: approved
supersedes: none
companion: README.md (full vision, source of truth for copy)
---

# JARVIS AI Website — MVP Design

This document specifies the **5-day MVP slice** of the website defined in `README.md`. The README remains the authoritative source for the full product vision, brand copy, design tokens, and long-term acceptance criteria. This spec narrows scope to what ships **this week** for AWS Activate resubmission and defines the **coding standards** the implementation must follow.

---

## 1. Goal

Ship a live URL on `jarvis-ai.vercel.app` within 5 working days that:

1. Reads unambiguously as **JARVIS AI the company**, not a personal portfolio
2. Presents the JARVIS product with the demo video and brand system from the README
3. Collects waitlist signups through a working `POST /api/waitlist` endpoint
4. Passes Lighthouse Performance ≥ 90, Accessibility 100, SEO ≥ 95 on mobile
5. Is ready to be resubmitted to AWS Startups Hong Kong the same day it goes live

Custom domain registration and zh-HK localisation are explicitly out of scope for v1.

---

## 2. Scope Decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Build scope | **MVP-first (README §13 steps 1–6, 8, 10, 11, 12)** | AWS rejected on "looks like a personal website", not on polish. Unblock first, then iterate. |
| Domain | **`jarvis-ai.vercel.app` for v1**, custom domain configured after acceptance | Registration path for `.hk` / `.com.hk` requires a non-Cloudflare registrar — parallel work, not on critical path. |
| Locales | **EN only**; zh-HK deferred | next-intl + translations are multi-day work. Defer until the submission is accepted. |
| Waitlist backend | **Resend-only** (no Vercel KV, no Turnstile, no Upstash) | Single external service. 30-min setup. Log of signups lives in inbox. |
| Hero | **Static poster + looping demo video + Framer Motion parallax**; R3F sphere deferred | LCP-safe, no WebGL dependency tree. Sphere can drop in behind `next/dynamic` in a later sprint without changing layout. |
| Motion library | **Framer Motion only** | Drop GSAP, ScrollTrigger, Lenis, postprocessing from the MVP dependency set. |
| Analytics | **Vercel Analytics** only | Drop Plausible for now. |
| SEO depth | **Organization + SoftwareApplication JSON-LD, sitemap, robots, per-route metadata** | Enough for rich results + crawl. `VideoObject`, `BreadcrumbList`, per-locale OG deferred. |

---

## 3. Pages (MVP route list)

All routes are EN-only at root, no locale prefix.

| Route | Purpose | Sections |
|---|---|---|
| `/` | Home / marketing landing | Nav · Hero · Trust strip · Pillars · Integrations marquee · Demo · Feature grid · Stats · AWS roadmap teaser · Founder note · Waitlist CTA · Footer |
| `/company` | About the company | Mission · Founder bio · HK presence · AWS Idea Launcher shortlist · Contact pointer |
| `/contact` | Business contact + waitlist form | Contact email · Waitlist form · HK SAR line · GitHub link |
| `/privacy` | Privacy policy | Local-first data stance · Waitlist email handling · Third-party services disclosure · Contact |
| `/terms` | Terms of service | Beta software clauses · IP · Liability limitations · Governing law: HKSAR |

**Deferred routes (post-acceptance):** `/product`, `/how-it-works`, `/roadmap`, `/press`, `/blog/*`, `/en/*`, `/zh-HK/*`.

---

## 4. Homepage Sections — In vs. Out (cut from README §7)

**IN (v1):**

1. HUD Nav — wordmark + nav links + `Join Waitlist` CTA (no language toggle yet)
2. Hero — static poster + looping muted demo video + Framer parallax on floating cyan dots
3. Trust strip — "Shortlisted for AWS Idea Launcher 2026 · Built on Claude + OpenAI · Running on AWS"
4. Three Pillars — Voice-first · Local-first · Agentic
5. Integrations marquee — CSS-only horizontal scroll of Gmail / Calendar / Notion / GitHub / Obsidian / Claude / OpenAI / AWS
6. "See it in action" — full demo video with native HTML5 controls, `preload="none"`
7. Feature deep-dive grid — 6 tiles from README §10.3
8. By the numbers — Framer-animated counters
9. AWS Roadmap teaser — service lockup with short copy (no dedicated roadmap page)
10. Founder note — short bio card linking to `/company`
11. Final waitlist CTA with inline form
12. Footer — company name, HK SAR line, contact email, GitHub link, Privacy + Terms links, © 2026 JARVIS AI

**OUT (deferred):**

- GSAP pinned 3-step "How it works" scroll sequence
- Language toggle (EN / 繁)
- R3F WebGL holographic sphere
- ASCII-art animated footer wordmark
- Per-timestamp demo chapters

---

## 5. Tech Stack

### 5.1 Runtime dependencies

```json
{
  "next": "15.x",
  "react": "19.x",
  "react-dom": "19.x",
  "tailwindcss": "4.x",
  "framer-motion": "11.x",
  "resend": "4.x",
  "zod": "3.x",
  "clsx": "2.x",
  "lucide-react": "latest"
}
```

### 5.2 Dev dependencies

```json
{
  "typescript": "5.x",
  "eslint": "9.x",
  "eslint-config-next": "15.x",
  "prettier": "3.x",
  "prettier-plugin-tailwindcss": "latest",
  "next-sitemap": "4.x",
  "@types/react": "19.x",
  "@types/node": "latest"
}
```

### 5.3 Tooling

- TypeScript **strict** mode
- ESLint with `next/core-web-vitals` + `@typescript-eslint/recommended`
- Prettier + `prettier-plugin-tailwindcss` for class ordering
- Import sort enforced via ESLint rule
- `tsc --noEmit` runs in CI before build

---

## 6. Coding Standards (user-mandated)

This section is a hard contract for the implementation. Every PR must comply.

### 6.1 File granularity

- **One exported component per file.** File name matches the export in `PascalCase.tsx`.
- **One exported utility per file.** No catch-all `utils.ts`. Each utility in `camelCase.ts` with a matching name.
- **One exported hook per file.** `useThing.ts` contains and exports only `useThing`.
- **Constants co-locate with their one consumer** when used by only one file. Shared constants go in `lib/constants/<topic>.ts` — one topic per file.
- **Types** live next to the file that owns them. Cross-cutting types go in `lib/types/<topic>.ts`. No project-wide `types.ts` dumping ground.

### 6.2 Size caps

- **Target:** ≤ 80 lines of code per file (excluding imports and blank lines)
- **Hard cap:** ≤ 150 LOC per file. If a file exceeds 150 LOC, split it before the PR lands.
- **Component functions:** ≤ 60 LOC of JSX per component. If larger, extract subcomponents into sibling files in the same feature folder.

### 6.3 Directory-per-feature layout

Each homepage section gets its own folder under `components/sections/<section>/`. The folder contains the section component, its subcomponents, its data, and its types. Nothing from a section's folder is imported by another section's folder — sections communicate only through shared `ui/` primitives and `content/` data.

Example for the Pillars section:

```
components/sections/pillars/
├── Pillars.tsx              # public section export (orchestrator only)
├── PillarCard.tsx           # single card presentation
├── PillarIcon.tsx           # icon wrapper
├── pillars.data.ts          # the 3 pillar objects
└── pillars.types.ts         # local types
```

Same pattern for: `hero/`, `nav/`, `footer/`, `trust-strip/`, `integrations-marquee/`, `demo/`, `feature-grid/`, `stats/`, `roadmap-teaser/`, `founder-note/`, `waitlist-cta/`.

### 6.4 Shared primitives (`components/ui/`)

Reusable UI primitives live in `components/ui/`, one per file. MVP set:

- `Button.tsx`
- `GlassPanel.tsx`
- `CornerBrackets.tsx`
- `SectionHeading.tsx`
- `Wordmark.tsx`
- `ExternalLink.tsx`
- `ReducedMotionGate.tsx` — renders children or a static fallback based on `prefers-reduced-motion`

No barrel `index.ts` file for `ui/`. Consumers import directly from the file (`import { Button } from "@/components/ui/Button"`). This keeps tree-shaking explicit and avoids the "import-anything from one line" anti-pattern.

### 6.5 No redundancy

- If the same ≥ 5-line block appears twice, extract to `components/ui/` or `lib/`.
- Brand copy lives in `content/` once and is imported by sections. Never inline marketing strings in JSX.
- Design tokens live in `styles/tokens.css` (CSS variables) and `tailwind.config.ts` — never hardcoded hex in components.
- Icon sizes, section paddings, and other spacing constants live in `lib/constants/spacing.ts` — never magic numbers in JSX.

### 6.6 Server vs. client boundaries

- Default to **Server Components**. Add `"use client"` only to files that use hooks, refs, Framer motion components, or browser APIs.
- Animated subcomponents are isolated into their own `"use client"` files so the parent section can stay on the server.
- The waitlist form is a client component; the page hosting it is a server component.

### 6.7 Naming

- Components: `PascalCase`
- Files for components: `PascalCase.tsx`
- Files for utilities/hooks/types/data: `camelCase.ts` (or `<topic>.data.ts` / `<topic>.types.ts`)
- Folders: `kebab-case`
- CSS custom properties: `--kebab-case`

### 6.8 Comments

Follow the project-wide rule: no comments unless the *why* is non-obvious. No section banners, no file headers, no JSDoc on internal components.

---

## 7. Project Structure

```
/
├── app/
│   ├── layout.tsx                     # root layout, fonts, JSON-LD Organization, <Nav/>, <Footer/>
│   ├── page.tsx                       # home composition only
│   ├── company/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/
│       └── waitlist/
│           └── route.ts               # POST handler only
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── GlassPanel.tsx
│   │   ├── CornerBrackets.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Wordmark.tsx
│   │   ├── ExternalLink.tsx
│   │   └── ReducedMotionGate.tsx
│   ├── layout/
│   │   ├── nav/
│   │   │   ├── Nav.tsx
│   │   │   ├── NavLinks.tsx
│   │   │   ├── NavCta.tsx
│   │   │   └── nav.data.ts
│   │   └── footer/
│   │       ├── Footer.tsx
│   │       ├── FooterLinks.tsx
│   │       ├── FooterLegal.tsx
│   │       └── footer.data.ts
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroHeadline.tsx
│   │   │   ├── HeroCtas.tsx
│   │   │   ├── HeroPoster.tsx
│   │   │   ├── HeroVideo.tsx
│   │   │   └── HeroParallax.tsx
│   │   ├── trust-strip/
│   │   │   ├── TrustStrip.tsx
│   │   │   └── trust-strip.data.ts
│   │   ├── pillars/
│   │   │   ├── Pillars.tsx
│   │   │   ├── PillarCard.tsx
│   │   │   ├── PillarIcon.tsx
│   │   │   ├── pillars.data.ts
│   │   │   └── pillars.types.ts
│   │   ├── integrations-marquee/
│   │   │   ├── IntegrationsMarquee.tsx
│   │   │   ├── IntegrationChip.tsx
│   │   │   └── integrations.data.ts
│   │   ├── demo/
│   │   │   ├── Demo.tsx
│   │   │   └── DemoVideo.tsx
│   │   ├── feature-grid/
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── FeatureTile.tsx
│   │   │   ├── FeatureIcon.tsx
│   │   │   ├── features.data.ts
│   │   │   └── features.types.ts
│   │   ├── stats/
│   │   │   ├── Stats.tsx
│   │   │   ├── StatCounter.tsx
│   │   │   ├── useCountUp.ts
│   │   │   └── stats.data.ts
│   │   ├── roadmap-teaser/
│   │   │   ├── RoadmapTeaser.tsx
│   │   │   ├── AwsServiceBadge.tsx
│   │   │   └── roadmap.data.ts
│   │   ├── founder-note/
│   │   │   └── FounderNote.tsx
│   │   └── waitlist-cta/
│   │       ├── WaitlistCta.tsx
│   │       ├── WaitlistForm.tsx
│   │       ├── WaitlistSuccess.tsx
│   │       └── useWaitlistSubmit.ts
│   └── seo/
│       ├── OrganizationJsonLd.tsx
│       └── SoftwareApplicationJsonLd.tsx
├── content/
│   ├── copy.en.ts                     # all marketing strings (mirrors README §10)
│   ├── metadata.ts                    # per-route <title> + description
│   └── company.ts                     # company name, email, HK line, GitHub URL
├── lib/
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── spacing.ts
│   │   ├── site.ts                    # NEXT_PUBLIC_SITE_URL helper
│   │   └── social.ts
│   ├── seo/
│   │   ├── buildOrganizationJsonLd.ts
│   │   ├── buildSoftwareApplicationJsonLd.ts
│   │   └── defaultMetadata.ts
│   ├── resend/
│   │   ├── sendWaitlistNotification.ts
│   │   └── sendWaitlistConfirmation.ts
│   ├── validation/
│   │   └── waitlistSchema.ts          # zod schema, one export
│   └── utils/
│       ├── classNames.ts              # thin wrapper around clsx
│       ├── prefersReducedMotion.ts
│       └── isEmail.ts
├── public/
│   ├── jarvis-demo.mp4
│   ├── jarvis-demo.webm               # generated at build time
│   ├── jarvis-demo-poster.jpg         # derived from screenshot
│   ├── jarvis-demo-screenshot.webp
│   ├── jarvis-demo-screenshot.avif
│   ├── og-image.png                   # 1200x630 static
│   ├── favicon.ico
│   └── icon.svg
├── styles/
│   ├── globals.css                    # Tailwind base + custom resets
│   ├── tokens.css                     # CSS variables from README §5.1
│   └── fonts.css                      # @font-face declarations
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-04-14-jarvis-website-mvp-design.md
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── .env.example
├── package.json
└── README.md                          # existing full-vision spec, kept as-is
```

Total MVP file count (excluding config + public assets): approximately **70–80 source files**, each well under 150 LOC.

---

## 8. Waitlist API Contract

### 8.1 Request

```
POST /api/waitlist
Content-Type: application/json

{ "email": "user@example.com" }
```

### 8.2 Validation (`lib/validation/waitlistSchema.ts`)

```ts
export const waitlistSchema = z.object({
  email: z.string().email().max(254).toLowerCase().trim(),
});
```

### 8.3 Handler behaviour (`app/api/waitlist/route.ts`)

1. Parse JSON. On parse error → 400 `{ error: "invalid_body" }`.
2. Validate against `waitlistSchema`. On fail → 400 `{ error: "invalid_email" }`.
3. Call `sendWaitlistNotification({ signup })` — sends notification to `CONTACT_EMAIL`.
4. Call `sendWaitlistConfirmation({ to: signup })` — sends confirmation to signer.
5. On Resend failure → log to Vercel, return 500 `{ error: "send_failed" }`.
6. On success → 200 `{ ok: true }`.

No persistent storage. Each send returns a Resend message ID that is logged.

### 8.4 Environment variables

```
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=hillman@hillmanchan.com
WAITLIST_FROM=onboarding@resend.dev          # until custom domain verified
NEXT_PUBLIC_SITE_URL=https://jarvis-ai.vercel.app
```

`.env.example` checked in with placeholders. `.env.local` in `.gitignore`.

### 8.5 Client hook (`components/sections/waitlist-cta/useWaitlistSubmit.ts`)

One exported hook that returns `{ submit, status, error }` where `status` ∈ `idle | submitting | success | error`.

---

## 9. SEO (MVP minimum)

### 9.1 Per-route metadata

`content/metadata.ts` exports a `metadata` record keyed by route. Each page's `generateMetadata` reads from it.

### 9.2 JSON-LD

- `components/seo/OrganizationJsonLd.tsx` — rendered in `app/layout.tsx`
- `components/seo/SoftwareApplicationJsonLd.tsx` — rendered in `app/page.tsx` only
- Both consume builders from `lib/seo/` and emit `<script type="application/ld+json">`

### 9.3 Sitemap & robots

- `app/sitemap.ts` emits all 5 routes with `changeFrequency: "monthly"`, `priority` scaled to importance
- `app/robots.ts` emits allow-all + sitemap URL

### 9.4 OG image

Static `public/og-image.png`, 1200×630, generated once from `Jarvis-demo-screenshot.png` with a `JARVIS AI` wordmark overlay. Committed to repo. Referenced in `defaultMetadata.ts`.

### 9.5 Canonicals

Each page exports a canonical URL through its `metadata.alternates.canonical`.

---

## 10. Performance Targets

- **LCP** < 2.0s on 4G mobile
- **CLS** < 0.05
- **INP** < 200ms
- Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO ≥ 95

### 10.1 Specific budgets

- Hero poster image ≤ 120 KB (AVIF) / ≤ 180 KB (WebP) served via `next/image`
- Looping hero video ≤ 4 MB WebM / ≤ 6 MB MP4, `preload="metadata"`, `autoplay muted playsinline loop`
- Full demo video uses `preload="none"`, loads on user play
- Total JS shipped to homepage < 180 KB gzipped
- Framer Motion chunked per-component via dynamic import where possible
- Fonts subsetted via `next/font` with `display: "swap"`

---

## 11. Accessibility

- `prefers-reduced-motion: reduce` → `ReducedMotionGate` swaps animated components for static equivalents (still image for hero, no marquee animation, no counter animation, no parallax)
- All interactive elements keyboard-focusable with visible cyan focus ring matching `--accent-cyan`
- Video has a `<track kind="captions">` pointing to `public/jarvis-demo.vtt` (captions file generated from transcript on Day 5 — see §13)
- Colour contrast AA on all text — validated via Lighthouse and manual `--text-muted` check
- One `<h1>` per page
- Form inputs have associated `<label>` elements; errors surfaced via `aria-live="polite"`

---

## 12. Content Source of Truth

- **Copy (EN):** `content/copy.en.ts` mirrors README §10 verbatim
- **Company facts:** `content/company.ts` — name, contact email, HK line, GitHub URL, version
- **Metadata:** `content/metadata.ts` — per-route title + description
- **Data files per section:** each section's `*.data.ts` reads from `content/` where applicable, never hardcodes marketing copy

Any string change lands in `content/` first. No JSX literal strings for marketing copy.

---

## 13. Build Order (5 days)

### Day 1 — Foundation

1. `npx create-next-app@latest` with TS + Tailwind + ESLint + App Router + `src/` disabled
2. Install Framer Motion, Resend, zod, clsx, lucide-react, next-sitemap
3. Write `styles/tokens.css`, `styles/globals.css`, `styles/fonts.css`; wire fonts via `next/font`
4. Add `tailwind.config.ts` mapping CSS vars to Tailwind tokens
5. Write `components/ui/*` primitives (7 files)
6. Write `components/layout/nav/*` and `components/layout/footer/*`
7. Stub all 5 routes rendering only `<Nav/>` + placeholder + `<Footer/>`
8. `content/company.ts`, `content/metadata.ts`, `content/copy.en.ts`
9. Copy + optimise assets into `public/`; generate AVIF + WebP + poster frame
10. Deploy preview to Vercel

### Day 2 — Home top-of-page

1. `sections/hero/*` — static poster, video layer, parallax dots, CTAs
2. `sections/trust-strip/*`
3. `sections/pillars/*`
4. `sections/integrations-marquee/*` — CSS-only animation
5. `sections/feature-grid/*`
6. Mobile QA of what shipped, Lighthouse pass

### Day 3 — Home bottom + content pages

1. `sections/demo/*` — full demo video with HTML5 controls
2. `sections/stats/*` — counters with `useCountUp`
3. `sections/roadmap-teaser/*`
4. `sections/founder-note/*`
5. `sections/waitlist-cta/*` (form scaffold, not wired yet)
6. `/company` page content
7. `/contact` page content

### Day 4 — Legal + backend + SEO

1. `/privacy` content (drafted)
2. `/terms` content (drafted, HKSAR governing law)
3. `lib/validation/waitlistSchema.ts`
4. `lib/resend/sendWaitlistNotification.ts` and `lib/resend/sendWaitlistConfirmation.ts`
5. `app/api/waitlist/route.ts`
6. `useWaitlistSubmit.ts` + wire form
7. `components/seo/*` JSON-LD components
8. `app/sitemap.ts`, `app/robots.ts`, `next-sitemap.config.js`
9. Generate `public/og-image.png`
10. End-to-end waitlist test on preview deploy

### Day 5 — QA, polish, ship

1. Lighthouse mobile + desktop on all 5 routes; fix any regression
2. `prefers-reduced-motion` manual QA
3. Keyboard-only navigation sweep
4. Mobile Safari video autoplay check (iOS quirks)
5. Rich Results Test on `/` (Organization + SoftwareApplication)
6. Captions file `jarvis-demo.vtt` generated from transcript
7. Promote preview to production on `jarvis-ai.vercel.app`
8. Send URL back to AWS Startups Hong Kong

---

## 14. Acceptance Criteria

- [ ] Site reads as a **company** (not personal portfolio) within 3s of first paint
- [ ] All 5 routes render with no console errors
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO ≥ 95
- [ ] Demo video autoplays muted + playsinline on iOS Safari, pauses off-screen, respects `prefers-reduced-motion`
- [ ] Full demo video plays on user interaction with captions track attached and keyboard controls
- [ ] Waitlist form submits → notification email arrives at `hillman@hillmanchan.com` → confirmation arrives at the signup address
- [ ] `Organization` + `SoftwareApplication` JSON-LD validate in Google Rich Results Test
- [ ] No emojis anywhere in UI, metadata, or copy
- [ ] Privacy + Terms live; company email + HK SAR line visible in footer
- [ ] Every source file ≤ 150 LOC; no file exports more than one component/hook/util
- [ ] No hardcoded marketing strings in JSX — all copy from `content/`
- [ ] `tsc --noEmit` passes; `eslint .` passes with zero warnings
- [ ] Production URL `jarvis-ai.vercel.app` resolves over HTTPS with valid certificate
- [ ] AWS Activate resubmission email sent with the new URL

---

## 15. Explicitly Deferred (post-acceptance roadmap)

The following are valuable but **not on the critical path for AWS resubmission**. They become a v1.1 sprint after the Activate account is approved.

- R3F holographic hero sphere
- GSAP-pinned "How it works" scroll sequence
- Lenis smooth scroll
- next-intl + zh-HK translations + hreflang + per-locale OG
- Custom domain (`jarvis-ai.hk` or alt) with Resend domain verification
- Vercel KV waitlist store + rate limiting via `@upstash/ratelimit`
- Cloudflare Turnstile on waitlist and contact
- `VideoObject` and `BreadcrumbList` JSON-LD
- `@vercel/og` runtime OG image generation
- `/product`, `/how-it-works`, `/roadmap`, `/press`, `/blog/*` routes
- Press kit PDF + logo lockup vector
- Plausible analytics
- ASCII-art animated footer wordmark
- Founder photo shoot
- Business Registration cert + updated HK street address in footer

---

## 16. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| iOS Safari blocks video autoplay | Serve a looping WebM + MP4 with `muted playsinline autoplay loop`; fall back to static poster if `canplay` never fires within 3s |
| Lighthouse Performance < 90 on mobile | Hero video `preload="metadata"` only, hero poster as AVIF via `next/image`, font `display: "swap"`, no R3F shipped |
| Resend free tier throttles | Free tier allows 100 emails/day, 3000/month — plenty for beta launch; upgrade trigger = sustained > 50 signups/day |
| Looks corporate but AWS still flags | Unlikely given copy + pages + JSON-LD; if flagged, add `/product` page from deferred list within 48h |
| BR certificate still missing at resubmission | Current email to AWS already disclosed this; website footer uses "Registered entity pending" without claiming otherwise |
| File-per-function discipline slips under deadline pressure | Lint rule (`max-lines`) + PR template checklist referencing §6 caps |

---

## 17. Open Items (non-blocking)

1. **Logo/wordmark** — v1 defaults to text-only `JARVIS` in JetBrains Mono with corner brackets + optional `src-tauri/icons/icon.png` in nav. Commission a vector lockup post-acceptance.
2. **Resend from-address** — use `onboarding@resend.dev` during dev. Replace with `hello@<custom-domain>` after domain + Resend domain verification (week 2).
3. **Privacy policy clauses** — MVP uses a plain-language draft written against the local-first architecture; consider solicitor review before the startup incorporates.
4. **Terms of service jurisdiction** — draft specifies HKSAR; confirmed by Hillman at approval time.

---

## 18. Change Log

| Date | Author | Change |
|---|---|---|
| 2026-04-14 | Claude (brainstorm session) | Initial spec derived from `README.md`, scope narrowed to MVP-A + waitlist-B + user-mandated file granularity standards |
