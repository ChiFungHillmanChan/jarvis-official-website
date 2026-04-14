# JARVIS AI — Official Company Website Spec

Source of truth for the `jarvis-official-website` project. Generated 2026-04-14 for AWS Activate (HK/GCR) application compliance — the submitted URL must function as an **official company website** for **JARVIS AI**, not a personal portfolio.

Deployment targets: **Vercel** (primary) + **GitHub** (source + GitHub Pages mirror).

---

## 1. Assets Already in This Directory

| File | Use |
|------|-----|
| `Jarvis-demo-screenshot.png` | Hero still / OG image / fallback poster for the video |
| `Jarvis-demo.mp4` | Autoplay-muted hero background + full demo in "See it in action" section |

Both must be copied into `public/` (or `/static/`) at build time and optimized:
- Screenshot → generate `.webp` + `.avif` derivatives + 1x/2x responsive variants
- Video → transcode to `.webm` (VP9) and `.mp4` (H.264) for cross-browser autoplay; ≤ 6 MB for hero loop, full demo loaded on user click only

---

## 2. Project Summary (for every page, keep verbatim where noted)

**JARVIS AI** is a Hong Kong-based AI startup building native desktop AI agents. The flagship product, **JARVIS**, is a macOS AI assistant (Rust + React via Tauri v2) that unifies Gmail, Google Calendar, Notion, GitHub, and Obsidian into a single voice-controlled command center. It ships **32 AI tool functions**, wake-word detection, smart scheduling, auto-archiving email, and a real-time 3D data sphere — all running as a ~10 MB native binary with a local SQLite store.

- **Status:** v0.1.0 MVP complete, private beta
- **Founder:** Hillman Chan — Founder & AI Engineer (22, Hong Kong). Currently AI Engineer at Evoke AI Lab. 2 years AWS production experience.
- **Cloud roadmap:** Migrating voice + backend sync to AWS — Bedrock (inference), Transcribe (STT), Polly (TTS), Lambda + API Gateway (serverless), DynamoDB (cloud sync), Cognito (auth), S3 (storage, already in use), CloudWatch (observability).
- **Current AWS spend:** ~$5 / month. **6-month projection:** ~$500 / month.
- **Programs:** Shortlisted for **AWS Idea Launcher 2026** (co-organized by AWS and HKSTP). Interview 2026-04-13.

---

## 3. Why This Website Must Look Like a Company

AWS Startups Hong Kong rejected the previous submission (`hillmanchan.com`) because it read as a personal portfolio. The new site must unambiguously identify:

1. A named legal entity — **"JARVIS AI"** — in the header, footer, and `<title>`
2. A product — **"JARVIS for macOS"** — with version, pricing tier (Beta / Waitlist), download/join CTA
3. Company pages — About, Team, Contact, Legal (Privacy, Terms), Press Kit
4. Business contact — `hillman@hillmanchan.com` (or a future `@jarvis-ai.com`) + Hong Kong mailing address once BR is issued
5. Company schema markup — `Organization` and `SoftwareApplication` JSON-LD (see §8)

No first-person pronouns ("I built…") anywhere in marketing copy. Voice is corporate-plural ("We build…", "Our platform…").

---

## 4. Tech Stack (for the website, not the product)

| Concern | Choice | Why |
|---------|--------|-----|
| Framework | **Next.js 15 (App Router)** on **Vercel** | SSR + image optimization + edge caching + first-class i18n. Non-negotiable for SEO. |
| Language | TypeScript strict | Matches existing codebase conventions |
| Styling | **Tailwind CSS v4** + CSS variables | Rapid holographic theming; design tokens mirror the product |
| 3D / Animation | **React Three Fiber** (`@react-three/fiber` + `drei` + `postprocessing`) | WebGL scene for the hero sphere, Bloom + ChromaticAberration + FXAA |
| Motion | **Framer Motion** + **GSAP ScrollTrigger** | Scroll-linked section reveals, parallax, timeline pinning |
| Extras | `lenis` smooth scroll, `canvas-confetti` for waitlist success, `lucide-react` for line icons | |
| i18n | **next-intl** (route-based: `/en`, `/zh-HK`) | SSR-safe, works with App Router, proper `hreflang` |
| Forms | Vercel serverless route → Resend (email) + optional Vercel KV for waitlist | |
| Analytics | Vercel Analytics + Plausible (privacy-friendly, cookie-less) | |
| SEO | `next-sitemap`, `next-seo`, JSON-LD via `<Script type="application/ld+json">` | |
| CMS (optional) | MDX in `/content/` — no headless CMS needed at this stage | |

**No UI component library.** Design tokens and components are bespoke to protect the holographic aesthetic, same discipline used in the product.

---

## 5. Visual Direction — "Future Tech, Animation-Heavy"

Pull the product's holographic language forward into a marketing context. The site must feel like an extension of the app, not a generic landing page.

### 5.1 Design Tokens (mirror the product exactly)

```css
--bg-void:        #060a14;   /* near-black base */
--bg-panel:       rgba(10, 16, 28, 0.6);
--bg-panel-hi:    rgba(14, 22, 38, 0.8);
--accent-cyan:    rgba(0, 180, 255, 1);
--accent-cyan-20: rgba(0, 180, 255, 0.2);
--accent-cyan-60: rgba(0, 180, 255, 0.6);
--grid-line:      rgba(0, 180, 255, 0.08);
--text-primary:   rgba(220, 240, 255, 0.95);
--text-muted:     rgba(160, 190, 220, 0.65);
--glow-cyan:      0 0 24px rgba(0, 180, 255, 0.45);

/* data palette (matches product sphere) */
--data-task:    rgb(0, 180, 255);
--data-email:   rgb(100, 200, 255);
--data-cal:     rgb(255, 180, 60);
--data-github:  rgb(80, 220, 140);
--data-notion:  rgb(180, 140, 255);
--data-cron:    rgb(80, 220, 200);
```

- **Type:** JetBrains Mono (labels, nav, numbers, code), Inter (body), Space Grotesk (display headings — optional upgrade over Inter for hero)
- **Grain / scanlines:** subtle 2px noise overlay at 4% opacity, animated 1px horizontal scan every 8s
- **Chrome:** translucent glassmorphism panels with 1px cyan borders, corner brackets `[  ]` on key CTAs, HUD tick marks on section edges
- **No emojis anywhere** (project-wide rule — enforced)

### 5.2 Animation Budget per Section

| Section | Animation |
|---------|-----------|
| Hero | Fullscreen WebGL holographic sphere (R3F). Particle field, 6 colored orbiting nodes (one per data type), bloom glow, subtle camera drift. Mouse parallax on desktop, static hero image fallback on low-end / reduced-motion. Muted looping demo video fades in behind sphere after 1.5s. |
| Nav | Sticky, frosted, cyan underline animates with `layoutId` on active route. |
| Feature grid | Cards reveal on scroll with staggered `y: 40 → 0, opacity 0 → 1`, border glow traces on hover. |
| Integrations strip | Infinite horizontal marquee of logo chips (Gmail, Calendar, Notion, GitHub, Obsidian, Claude, OpenAI, AWS). |
| "How it works" | Pinned 3-step scroll-driven sequence: capture → reason → act. Canvas/SVG morph between states. |
| Demo | Full-width rounded-corner video player with custom cyan scrubber; autoplay on viewport intersect, pauses off-screen. |
| Stats | Counter animations (32 tools, 5 integrations, 7 cron jobs, ~10 MB binary, 11 SQLite tables). |
| Roadmap / AWS | Vertical timeline with cyan connecting line drawing as user scrolls; AWS service icons appear as nodes. |
| Footer | ASCII-art "JARVIS" wordmark in cyan, terminal cursor blink, horizon gradient. |

### 5.3 Accessibility Non-Negotiables

- Respect `prefers-reduced-motion` — swap R3F scene for a static hero still, disable marquees/parallax
- AA contrast on all text (`--text-primary` on `--bg-void` passes; test all muted variants)
- Video has captions track (generate from transcript), keyboard-accessible player
- All interactive elements keyboard-focusable with visible cyan focus ring
- Language toggle is a `<button>` with `aria-pressed`, route changes announced via `aria-live="polite"` wrapper

---

## 6. Information Architecture

```
/                      → Home (hero + pitch + demo + integrations + CTA)
/product               → Deep feature tour (voice, tools, 3D sphere, automations)
/how-it-works          → Architecture + tech stack + privacy model
/roadmap               → Public roadmap including AWS migration plan
/company               → About, mission, founder bio, HK presence
/contact               → Business contact, waitlist form, press inquiries
/privacy               → Privacy policy (local-first data claim, API token handling)
/terms                 → Terms of service
/press                 → Logo kit, screenshots, founder photo, one-pager PDF
/blog/*                → (optional, MDX) launch notes, engineering deep dives
```

All routes served at `/en/…` and `/zh-HK/…` with `/` 302-redirecting via `Accept-Language`. Default locale: `en`.

---

## 7. Homepage Section-by-Section

1. **HUD Nav** — `JARVIS AI` wordmark (left), nav links (Product, How it works, Roadmap, Company), language toggle `EN / 繁`, `Join Waitlist` primary CTA (right).
2. **Hero** — Headline, sub, dual CTA, WebGL sphere, demo video layered behind.
   - **EN headline:** "Your desktop, operated at the speed of thought."
   - **EN sub:** "JARVIS unifies your email, calendar, notes, and code into one voice-controlled AI agent. Native macOS. Local-first. 32 AI tools."
   - **zh-HK headline:** 「用思考嘅速度操控你部電腦。」
   - **zh-HK sub:** 「JARVIS 將電郵、日曆、筆記同程式碼整合為一個語音 AI 助手。原生 macOS，本地優先，32 個 AI 工具。」
   - CTAs: `Join Beta Waitlist` (primary), `Watch 90-second demo` (ghost, scrolls to demo).
3. **Trust strip** — "Shortlisted for AWS Idea Launcher 2026 · Built on Claude + OpenAI · Running on AWS"
4. **Pillars (3-up)** — Voice-first, Local-first, Agentic.
5. **Integrations marquee** — Gmail, Google Calendar, Notion, GitHub, Obsidian, Claude, OpenAI, AWS.
6. **"See it in action"** — Full demo video + timestamped chapters.
7. **Feature deep-dive grid** — 6 tiles (3D Data Sphere / Voice I-O / Tool Execution / Smart Briefings / Cron Automations / System Control).
8. **How it works (pinned scroll)** — 3-step cinematic.
9. **By the numbers** — Animated counters.
10. **AWS Roadmap teaser** — Bedrock / Transcribe / Polly / Lambda / DynamoDB / Cognito lockup, link to `/roadmap`.
11. **Founder note** — Short bio card, HK flag micro-icon (line-art, not emoji), link to `/company`.
12. **Final CTA + Waitlist form** — email capture → Resend → Vercel KV.
13. **Footer** — Company name, HK address placeholder (update after BR issuance), contact email, social links (GitHub, LinkedIn), legal links, `© 2026 JARVIS AI`.

---

## 8. SEO Plan (must be best-in-class)

### 8.1 On-page

- Unique `<title>` (≤ 60 chars) and `<meta description>` (≤ 155 chars) per route, per locale
- Semantic HTML: one `<h1>` per page, logical heading tree, `<nav>`, `<main>`, `<article>`, `<footer>`
- Internal linking: hero CTAs → product, product → how-it-works, how-it-works → roadmap
- Descriptive anchor text (never "click here")
- Image `alt` text in the active locale; decorative images `alt=""`

### 8.2 Technical

- **Core Web Vitals targets:** LCP < 2.0s, INP < 200ms, CLS < 0.05. Test on Vercel Speed Insights + Lighthouse CI.
- Preconnect to `fonts.gstatic.com`, preload hero poster image
- Hero video: `preload="none"` for full demo, `preload="metadata"` for looped background
- Ship R3F scene behind `next/dynamic` with `ssr: false` and a static poster fallback — do not block LCP with WebGL
- Static generation for every marketing route; ISR only for blog
- `robots.txt` allowing all, pointing to `sitemap.xml`
- `sitemap.xml` generated per-locale with `<xhtml:link rel="alternate" hreflang="…">` entries
- Canonical URLs per locale; `hreflang` pairs for `en`, `zh-HK`, `x-default`
- HTTPS-only, HSTS via Vercel defaults

### 8.3 Structured data (JSON-LD)

Emit on every page:

- `Organization` — `name: "JARVIS AI"`, `url`, `logo`, `sameAs: [github, linkedin]`, `address` (Hong Kong), `contactPoint`
- `WebSite` — with `potentialAction: SearchAction` if search is added later
- `SoftwareApplication` (on home + product) — `name: "JARVIS"`, `operatingSystem: "macOS"`, `applicationCategory: "ProductivityApplication"`, `offers: { price: "0", priceCurrency: "USD" }` during beta
- `BreadcrumbList` on every non-home page
- `VideoObject` on the demo section — `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`

### 8.4 Social

- Open Graph + Twitter Card per locale — use `Jarvis-demo-screenshot.png` as base, overlay `JARVIS AI` wordmark + locale-specific headline generated at build time via `@vercel/og`
- `og:locale`, `og:locale:alternate`

### 8.5 Keywords (target, don't stuff)

Primary: `macOS AI assistant`, `voice AI desktop`, `local-first AI agent`, `Gmail Notion GitHub AI agent`, `JARVIS AI`, `Tauri AI app`.
zh-HK: `香港 AI 助手`, `桌面 AI 助理`, `本地 AI 代理`, `語音 AI 助手`, `macOS AI 助手`.

---

## 9. Internationalization (zh-HK + en)

- Use **next-intl** with messages at `/messages/en.json` and `/messages/zh-HK.json`
- Route strategy: always-prefix (`/en/...`, `/zh-HK/...`) for clean hreflang
- Language toggle in header persists choice in a cookie (`NEXT_LOCALE`); respect `Accept-Language` on first visit
- Use **繁體中文（香港）** — Traditional Chinese with Hong Kong idiom:
  - 「軟件」not 「软件」
  - 「電郵」not 「邮件」
  - 「日曆」or 「日程」for calendar
  - Proper nouns stay English: Gmail, Notion, GitHub, Obsidian, AWS, Claude, OpenAI, macOS, Tauri
- Numbers and dates: `Intl.DateTimeFormat('zh-HK')` — never hardcode format
- Copy file structure: one namespace per page (`home`, `product`, `howItWorks`, `roadmap`, `company`, `contact`, `common`) to keep bundles small via `unstable_setRequestLocale`
- Font loading: subset JetBrains Mono + Inter + **Noto Sans HK** (for zh-HK) — load zh-HK font only on zh-HK routes

---

## 10. Copy — Source of Truth (EN)

> **Paste these verbatim into the `en` message files.** Keep this section authoritative; `zh-HK` translations live in a separate translator worksheet before being committed.

### 10.1 Hero

- **H1:** Your desktop, operated at the speed of thought.
- **Sub:** JARVIS is a native macOS AI assistant that unifies Gmail, Google Calendar, Notion, GitHub, and Obsidian into one voice-controlled command center. 32 AI tools. Local-first. Built for engineers and operators who run their day from the keyboard.
- **Primary CTA:** Join the beta waitlist
- **Secondary CTA:** Watch the 90-second demo

### 10.2 Pillars

1. **Voice-first.** Push-to-talk with Cmd+Shift+J. Whisper STT, macOS TTS. Wake-word detection. Your mic drives the 3D sphere in real time.
2. **Local-first.** Every conversation, task, and cached message lives in a local SQLite database on your Mac. External services remain the source of truth; nothing is uploaded to our servers.
3. **Agentic.** The AI doesn't just answer — it acts. 32 callable tools open apps, run shell commands, archive email, create Notion pages, schedule cron jobs, and search your vault.

### 10.3 Features (6 tiles)

1. **Interactive 3D Data Sphere** — A real-time holographic particle scene. Color-coded nodes for tasks, email, calendar, GitHub, Notion, and cron jobs orbit a glowing core. Voice amplitude modulates the ring in real time.
2. **Voice I/O** — Push-to-talk with Cmd+Shift+J. Whisper API with offline fallback to local whisper.cpp. macOS `say` for TTS with configurable voice and rate.
3. **32 AI Tool Functions** — Claude-primary, OpenAI fallback. Native tool calling with multi-step resolution. The model decides, executes, and chains actions before responding.
4. **Smart Briefings** — On launch, JARVIS aggregates tasks, calendar, email, and open PRs into a morning briefing. It learns your archive patterns and proposes auto-archive rules after three confirmations.
5. **Automation Engine** — Seven built-in cron jobs plus custom jobs generated from natural language. "Every Monday at 9am check for spam emails" compiles to a real cron expression with execution history.
6. **System Control** — Open apps, run shell commands with a safety blocklist, manage windows, control volume and brightness, take screenshots, read-write clipboard, send native notifications.

### 10.4 How it works (3 steps)

1. **Capture.** JARVIS syncs your connected services in the background — email every 5 minutes, calendar every 5 minutes, Notion every 10, GitHub every 10.
2. **Reason.** Your request — typed or spoken — is enriched with a structured snapshot (pending tasks, unread count, open PRs, today's events) and sent to Claude with access to 32 tools.
3. **Act.** The model calls tools, chains steps, and resolves multi-step work before replying. Actions execute directly on your Mac.

### 10.5 By the numbers

- **32** AI tool functions
- **5** integrated services
- **7** built-in cron jobs
- **~10 MB** native binary
- **11** SQLite tables, all local
- **0** personal data uploaded to JARVIS AI servers

### 10.6 AWS Roadmap (next 12 months)

Migrating the cloud-facing surface to AWS to support multi-device sync, team features, and lower-latency voice in Hong Kong.

- **Amazon Bedrock** — model routing + fine-tuned assistant agents
- **Amazon Transcribe** — streaming STT to replace OpenAI Whisper for latency + data residency
- **Amazon Polly** — neural TTS to replace macOS `say` for richer voices
- **AWS Lambda + API Gateway** — serverless backend for sync and webhooks
- **Amazon DynamoDB** — encrypted multi-device state sync (opt-in)
- **Amazon Cognito** — user auth for the cloud sync tier
- **Amazon S3** — encrypted artifact storage (already in use)
- **Amazon CloudWatch** — observability, alerts, and SLOs

### 10.7 Company / Founder

JARVIS AI is a Hong Kong-based startup founded in 2026 by Hillman Chan, an AI engineer with two years of AWS production experience. The team ships agentic desktop software for operators, engineers, and knowledge workers. We are a shortlisted applicant for the AWS Idea Launcher 2026 program.

**Business contact:** hillman@hillmanchan.com
**Location:** Hong Kong SAR (registered entity pending)
**GitHub:** github.com/ChiFungHillmanChan/jarvis-ai-assistant

---

## 11. Forms, Backends, and Ops

### 11.1 Waitlist

- `POST /api/waitlist` — Next.js route handler on Vercel
- Validates email with `zod`, rate-limits via `@upstash/ratelimit` (Vercel KV)
- Writes `{ email, locale, referrer, ts }` to Vercel KV list + sends confirmation email via **Resend**
- Honeypot field + Turnstile (Cloudflare) for bot protection

### 11.2 Contact

- Same pattern, routes to `hillman@hillmanchan.com` via Resend

### 11.3 Env vars (Vercel Project Settings)

```
RESEND_API_KEY
TURNSTILE_SECRET
KV_REST_API_URL
KV_REST_API_TOKEN
NEXT_PUBLIC_SITE_URL=https://jarvis-ai.com  # or final domain
NEXT_PUBLIC_PLAUSIBLE_DOMAIN
```

---

## 12. Deployment Plan

### 12.1 GitHub

- Repo: `github.com/ChiFungHillmanChan/jarvis-official-website` (public, MIT-licensed)
- Branches: `main` (production), `preview/*` (feature work)
- Required status checks: `build`, `typecheck`, `lint`, `lighthouse-ci`
- Conventional Commits; PR template references this spec

### 12.2 Vercel

- Framework preset: Next.js
- Production domain: `jarvis-ai.com` (register) — until then, `jarvis-ai.vercel.app`
- Preview deployments on every PR
- Image optimization: on (AVIF + WebP)
- Analytics + Speed Insights: on

### 12.3 GitHub Pages mirror (optional, static export)

- `next build && next export` pipeline on tag `v*`, artifact deployed to `gh-pages` branch
- Keep as backup/read-only; Vercel is canonical

---

## 13. Build Order (recommended)

1. Scaffold Next.js 15 + Tailwind + next-intl + base layout + nav + footer
2. Token system, font loading (EN + zh-HK subsets), reduced-motion baseline
3. Home hero: static version first (image + gradient), pass Lighthouse
4. Add R3F sphere behind `next/dynamic` with reduced-motion guard
5. Integrations marquee + pillars + feature grid + stats
6. Demo video section with chapters and custom scrubber
7. How-it-works pinned scroll (GSAP ScrollTrigger)
8. Roadmap + Company + Contact + Legal routes
9. i18n messages for `/en` and `/zh-HK`, verify hreflang
10. SEO: sitemap, robots, JSON-LD, OG image generator
11. Forms + Resend + KV rate limit + Turnstile
12. Analytics, Lighthouse CI, Speed Insights, deploy to Vercel
13. Connect custom domain, submit to Google Search Console, validate zh-HK + en in Search Console

---

## 14. Acceptance Criteria

- [ ] `jarvis-ai.vercel.app` (or final domain) loads in under 2s on fast 3G with LCP < 2.0s
- [ ] Reads unambiguously as a **company** website — not a personal portfolio — within 3 seconds of first paint
- [ ] Both `/en` and `/zh-HK` are fully translated, with correct `hreflang` pairs and per-locale OG images
- [ ] Lighthouse (mobile + desktop): **≥ 95** Performance, **100** Accessibility, **100** Best Practices, **100** SEO
- [ ] Valid JSON-LD for `Organization` + `SoftwareApplication` + `VideoObject` (verified via Google Rich Results Test)
- [ ] Hero video autoplays muted on desktop and mobile, pauses off-screen, respects `prefers-reduced-motion`
- [ ] Full demo video playable with captions and keyboard controls
- [ ] Waitlist form submits and confirmation email arrives from `@jarvis-ai.com` (or transitional domain)
- [ ] No emojis anywhere in UI, meta, or copy
- [ ] Legal pages live (Privacy, Terms), contact and company details visible in footer
- [ ] Resubmitted AWS Activate application with the new URL receives acceptance or further defined requirements

---

## 15. Open Items / Decisions Needed from Hillman

1. Final domain (`jarvis-ai.com`? `jarvisai.hk`? something else) — register before launch
2. Company email forwarding (`hillman@jarvis-ai.com` → personal) — set up on domain registrar
3. Logo / wordmark — use existing icon in `src-tauri/icons/icon.png` or commission new vector lockup
4. Press kit content — one-pager PDF, founder photo, 3 product screenshots (beyond the demo frame)
5. Hong Kong registered address — confirm placeholder vs. HKSTP / incubator address once BR is issued
6. Pricing — beta free / waitlist only, or announce an early-bird tier on launch?
7. Blog — launch with at least one post explaining the AWS migration plan to strengthen the Activate narrative?

---

## 16. Quick Links (for the build team)

- Product repo: `github.com/ChiFungHillmanChan/jarvis-ai-assistant`
- Product README (feature source of truth): `<repo>/README.md`
- Design language reference: `<repo>/src/styles/global.css`, `<repo>/src/components/3d/`
- AWS Activate program: https://pages.awscloud.com/HK-Startup-Activate.html
- Vercel docs (App Router i18n): https://vercel.com/docs
- next-intl App Router guide: https://next-intl-docs.vercel.app/docs/getting-started/app-router
- React Three Fiber: https://r3f.docs.pmnd.rs
