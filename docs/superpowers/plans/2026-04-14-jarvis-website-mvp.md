# JARVIS AI Website MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a 5-page Next.js 15 company website for JARVIS AI on `jarvis-ai.vercel.app` within 5 days, satisfying AWS Activate (HK) resubmission requirements.

**Architecture:** Next.js 15 App Router, default Server Components with narrow `"use client"` islands. Tailwind v4 + CSS tokens (no component library). Framer Motion only. Resend-backed waitlist via one API route. Static assets + optimised images via `next/image`. Every source file ≤ 150 LOC, one exported component/util/hook per file, directory-per-section.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, Resend, Zod, `clsx`, `lucide-react`, `next-sitemap`, ESLint, Prettier.

**Source of truth:**
- Full vision: `README.md`
- MVP scope + coding standards: `docs/superpowers/specs/2026-04-14-jarvis-website-mvp-design.md`

---

## Testing Strategy

Pure TDD applied where it earns its keep; visual + type + lint verification where it doesn't.

| Concern | Test style |
|---|---|
| Pure functions (`isEmail`, `classNames`), Zod schemas (`waitlistSchema`), custom hooks with logic (`useCountUp`, `useWaitlistSubmit`) | **Vitest unit tests, TDD** |
| API route (`app/api/waitlist/route.ts`) | **Vitest integration test with mocked Resend** |
| React components | **No render tests for MVP.** Verified by `tsc --noEmit`, ESLint, browser visual check, Lighthouse |
| End-to-end form submission | **Manual test** on preview deploy in Day 4 + Day 5 |

This trades exhaustive component coverage for speed-to-ship. The README spec does not require component-level unit tests, and Lighthouse + manual QA are the real acceptance gates.

---

## Conventions used throughout this plan

- **Shell `cd`** — every `npm`, `npx`, `git` command assumes `cd /Users/hillmanchan/Desktop/jarvis-official-website` has already happened. Do it once per task at the start.
- **Commits** — every task ends with a commit. Use conventional-commits format (`feat:`, `chore:`, `style:`, `test:`, `docs:`, `fix:`).
- **File size rule** — if any file in a step exceeds 150 LOC, stop and split before committing.
- **No comments** in code unless the *why* is non-obvious.
- **Imports** — always use the `@/` alias (configured in tsconfig).

---

# Phase 1 — Foundation (Day 1)

## Task 1: Scaffold Next.js 15 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `postcss.config.mjs`, `eslint.config.mjs` (via scaffold)

- [ ] **Step 1: Run create-next-app**

```bash
cd /Users/hillmanchan/Desktop/jarvis-official-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack --skip-install
```

If prompted "Directory contains files", answer **Yes** to continue.
Expected output: scaffold files created in project root.

- [ ] **Step 2: Verify scaffold files**

```bash
ls -1
```

Expected: `app`, `public`, `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`, `docs`, `Jarvis-demo-screenshot.png`, `Jarvis-demo.mp4`, `README.md`.

- [ ] **Step 3: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app router project"
```

---

## Task 2: Install MVP dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install framer-motion@^11 resend@^4 zod@^3 clsx@^2 lucide-react@latest
```

- [ ] **Step 2: Install dev deps**

```bash
npm install -D prettier prettier-plugin-tailwindcss next-sitemap vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
```

- [ ] **Step 3: Verify install**

```bash
npm ls --depth=0
```

Expected: all packages listed with no UNMET DEPENDENCY errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install MVP runtime and dev dependencies"
```

---

## Task 3: Configure TypeScript strict + Prettier + Vitest

**Files:**
- Modify: `tsconfig.json`
- Create: `.prettierrc.json`, `.prettierignore`, `vitest.config.ts`, `vitest.setup.ts`

- [ ] **Step 1: Tighten tsconfig**

Edit `tsconfig.json`. Inside `compilerOptions`, ensure these are set (the scaffold already includes `strict: true`):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 3: Create `.prettierignore`**

```
.next
node_modules
public
*.mp4
*.png
*.webp
*.avif
package-lock.json
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 5: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Add scripts to `package.json`**

In `package.json`, set the `scripts` block to:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 7: Verify typecheck passes**

```bash
npm run typecheck
```

Expected: exits 0 with no errors.

- [ ] **Step 8: Commit**

```bash
git add tsconfig.json .prettierrc.json .prettierignore vitest.config.ts vitest.setup.ts package.json
git commit -m "chore: configure strict TS, Prettier, Vitest"
```

---

## Task 4: Design tokens + global styles + fonts

**Files:**
- Create: `styles/tokens.css`, `styles/globals.css`, `styles/fonts.css`, `app/fonts.ts`
- Modify: `tailwind.config.ts` (or create if scaffold produced `tailwind.config.js`), `app/layout.tsx`
- Delete: `app/globals.css` (scaffold default)

- [ ] **Step 1: Create `styles/tokens.css`**

```css
:root {
  --bg-void: #060a14;
  --bg-panel: rgba(10, 16, 28, 0.6);
  --bg-panel-hi: rgba(14, 22, 38, 0.8);

  --accent-cyan: rgba(0, 180, 255, 1);
  --accent-cyan-20: rgba(0, 180, 255, 0.2);
  --accent-cyan-60: rgba(0, 180, 255, 0.6);

  --grid-line: rgba(0, 180, 255, 0.08);

  --text-primary: rgba(220, 240, 255, 0.95);
  --text-muted: rgba(160, 190, 220, 0.65);

  --glow-cyan: 0 0 24px rgba(0, 180, 255, 0.45);

  --data-task: rgb(0, 180, 255);
  --data-email: rgb(100, 200, 255);
  --data-cal: rgb(255, 180, 60);
  --data-github: rgb(80, 220, 140);
  --data-notion: rgb(180, 140, 255);
  --data-cron: rgb(80, 220, 200);
}
```

- [ ] **Step 2: Create `styles/globals.css`**

```css
@import "tailwindcss";
@import "./tokens.css";
@import "./fonts.css";

@theme inline {
  --color-bg-void: var(--bg-void);
  --color-panel: var(--bg-panel);
  --color-panel-hi: var(--bg-panel-hi);
  --color-accent: var(--accent-cyan);
  --color-text: var(--text-primary);
  --color-muted: var(--text-muted);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
  --font-display: var(--font-space-grotesk);
}

html,
body {
  background-color: var(--bg-void);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

*:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Create `styles/fonts.css`**

```css
/* Font faces are wired via next/font in app/fonts.ts — this file exists for
   future @font-face additions (e.g., Noto Sans HK when zh-HK ships). */
```

- [ ] **Step 4: Create `app/fonts.ts`**

```ts
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
```

- [ ] **Step 5: Delete scaffold `app/globals.css`**

```bash
rm app/globals.css
```

- [ ] **Step 6: Update `app/layout.tsx` to use new styles + fonts**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JARVIS AI",
  description: "Native macOS AI assistant.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Verify dev build starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: near-black background, scaffold page text visible in white-ish tone. Kill with Ctrl-C.

- [ ] **Step 8: Commit**

```bash
git add styles/ app/fonts.ts app/layout.tsx
git rm --cached -f app/globals.css 2>/dev/null; true
git commit -m "feat: wire design tokens, Tailwind theme, and font loading"
```

---

## Task 5: Content layer — company, metadata, copy

**Files:**
- Create: `content/company.ts`, `content/metadata.ts`, `content/copy.en.ts`

- [ ] **Step 1: Create `content/company.ts`**

```ts
export const company = {
  name: "JARVIS AI",
  tagline: "Native macOS AI assistant.",
  contactEmail: "hillman@hillmanchan.com",
  locationLine: "Hong Kong SAR",
  registrationLine: "Registered entity pending.",
  github: "https://github.com/ChiFungHillmanChan/jarvis-ai-assistant",
  productName: "JARVIS",
  productVersion: "0.1.0",
  foundingYear: 2026,
} as const;
```

- [ ] **Step 2: Create `content/metadata.ts`**

```ts
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jarvis-ai.vercel.app";

export const baseMetadata = {
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    siteName: "JARVIS AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JARVIS AI" }],
  },
  twitter: { card: "summary_large_image" },
} satisfies Metadata;

export const routeMetadata = {
  home: {
    title: "JARVIS AI — Your desktop, operated at the speed of thought",
    description:
      "JARVIS is a native macOS AI assistant that unifies Gmail, Calendar, Notion, GitHub, and Obsidian into one voice-controlled command center. 32 AI tools. Local-first.",
    canonical: "/",
  },
  company: {
    title: "Company · JARVIS AI",
    description:
      "JARVIS AI is a Hong Kong-based startup building native desktop AI agents for engineers and operators.",
    canonical: "/company",
  },
  contact: {
    title: "Contact · JARVIS AI",
    description: "Business contact, beta waitlist, and press inquiries for JARVIS AI.",
    canonical: "/contact",
  },
  privacy: {
    title: "Privacy · JARVIS AI",
    description: "How JARVIS AI handles data. Local-first architecture. No user data on our servers.",
    canonical: "/privacy",
  },
  terms: {
    title: "Terms · JARVIS AI",
    description: "Terms of service for the JARVIS beta.",
    canonical: "/terms",
  },
} as const;

export type RouteKey = keyof typeof routeMetadata;
```

- [ ] **Step 3: Create `content/copy.en.ts`**

This file mirrors README §10. Create with the full marketing copy:

```ts
export const copy = {
  hero: {
    h1: "Your desktop, operated at the speed of thought.",
    sub:
      "JARVIS is a native macOS AI assistant that unifies Gmail, Google Calendar, Notion, GitHub, and Obsidian into one voice-controlled command center. 32 AI tools. Local-first. Built for engineers and operators who run their day from the keyboard.",
    primaryCta: "Join the beta waitlist",
    secondaryCta: "Watch the 90-second demo",
  },
  trust: "Shortlisted for AWS Idea Launcher 2026 · Built on Claude + OpenAI · Running on AWS",
  pillars: [
    {
      title: "Voice-first",
      body:
        "Push-to-talk with Cmd+Shift+J. Whisper STT, macOS TTS. Wake-word detection. Your mic drives the 3D sphere in real time.",
    },
    {
      title: "Local-first",
      body:
        "Every conversation, task, and cached message lives in a local SQLite database on your Mac. External services remain the source of truth; nothing is uploaded to our servers.",
    },
    {
      title: "Agentic",
      body:
        "The AI doesn't just answer — it acts. 32 callable tools open apps, run shell commands, archive email, create Notion pages, schedule cron jobs, and search your vault.",
    },
  ],
  features: [
    {
      title: "Interactive 3D Data Sphere",
      body:
        "A real-time holographic particle scene. Color-coded nodes for tasks, email, calendar, GitHub, Notion, and cron jobs orbit a glowing core. Voice amplitude modulates the ring in real time.",
    },
    {
      title: "Voice I/O",
      body:
        "Push-to-talk with Cmd+Shift+J. Whisper API with offline fallback to local whisper.cpp. macOS `say` for TTS with configurable voice and rate.",
    },
    {
      title: "32 AI Tool Functions",
      body:
        "Claude-primary, OpenAI fallback. Native tool calling with multi-step resolution. The model decides, executes, and chains actions before responding.",
    },
    {
      title: "Smart Briefings",
      body:
        "On launch, JARVIS aggregates tasks, calendar, email, and open PRs into a morning briefing. It learns your archive patterns and proposes auto-archive rules after three confirmations.",
    },
    {
      title: "Automation Engine",
      body:
        "Seven built-in cron jobs plus custom jobs generated from natural language. \"Every Monday at 9am check for spam emails\" compiles to a real cron expression with execution history.",
    },
    {
      title: "System Control",
      body:
        "Open apps, run shell commands with a safety blocklist, manage windows, control volume and brightness, take screenshots, read-write clipboard, send native notifications.",
    },
  ],
  stats: [
    { value: 32, label: "AI tool functions" },
    { value: 5, label: "integrated services" },
    { value: 7, label: "built-in cron jobs" },
    { value: 10, label: "MB native binary", suffix: "~" },
    { value: 11, label: "SQLite tables (local)" },
    { value: 0, label: "personal data on our servers" },
  ],
  roadmap: {
    heading: "Migrating to AWS",
    sub: "Next 12 months — cloud surface migrating to AWS for multi-device sync, team features, and lower-latency voice in Hong Kong.",
    services: [
      { name: "Amazon Bedrock", body: "Model routing and fine-tuned assistant agents." },
      { name: "Amazon Transcribe", body: "Streaming STT for latency and data residency." },
      { name: "Amazon Polly", body: "Neural TTS to replace macOS `say`." },
      { name: "AWS Lambda", body: "Serverless backend for sync and webhooks." },
      { name: "Amazon DynamoDB", body: "Encrypted multi-device state sync (opt-in)." },
      { name: "Amazon Cognito", body: "User auth for the cloud sync tier." },
      { name: "Amazon S3", body: "Encrypted artifact storage (already in use)." },
      { name: "Amazon CloudWatch", body: "Observability, alerts, and SLOs." },
    ],
  },
  founder: {
    heading: "Built in Hong Kong",
    body:
      "JARVIS AI is founded in 2026 by Hillman Chan, an AI engineer with two years of AWS production experience. We ship agentic desktop software for operators, engineers, and knowledge workers. Shortlisted for the AWS Idea Launcher 2026 program.",
    cta: "About the company",
  },
  waitlistCta: {
    heading: "Join the beta waitlist",
    sub: "Private beta on macOS. No spam. One launch email.",
    placeholder: "you@company.com",
    submit: "Request access",
    success: "You're on the list. We'll be in touch before launch.",
    errorInvalid: "Please enter a valid email address.",
    errorGeneric: "Something went wrong. Please try again.",
  },
  integrations: ["Gmail", "Google Calendar", "Notion", "GitHub", "Obsidian", "Claude", "OpenAI", "AWS"],
  howItWorks: [
    {
      step: "Capture",
      body:
        "JARVIS syncs your connected services in the background — email every 5 minutes, calendar every 5 minutes, Notion every 10, GitHub every 10.",
    },
    {
      step: "Reason",
      body:
        "Your request — typed or spoken — is enriched with a structured snapshot (pending tasks, unread count, open PRs, today's events) and sent to Claude with access to 32 tools.",
    },
    {
      step: "Act",
      body:
        "The model calls tools, chains steps, and resolves multi-step work before replying. Actions execute directly on your Mac.",
    },
  ],
  company: {
    heading: "Company",
    sub: "A Hong Kong-based AI startup building native desktop agents.",
    sections: [
      {
        title: "Mission",
        body:
          "Operators and engineers deserve an AI that actually operates. JARVIS is the interface layer between your intent and the dozens of apps you already use — turning minutes of clicking into seconds of talking.",
      },
      {
        title: "Founder",
        body:
          "Hillman Chan — Founder & AI Engineer. 22, Hong Kong. Currently AI Engineer at Evoke AI Lab. Two years of AWS production experience. Previously shipped three AI products including a website generator with daily active users.",
      },
      {
        title: "Where we are",
        body:
          "Hong Kong SAR. Registered entity pending. Shortlisted for the AWS Idea Launcher 2026 program, co-organized by AWS and HKSTP.",
      },
    ],
  },
  contact: {
    heading: "Get in touch",
    sub: "Business inquiries, press, and beta access.",
    intro:
      "Email is the fastest path to the founder. For product updates, join the waitlist below.",
  },
  privacy: {
    heading: "Privacy",
    lastUpdated: "Last updated: 2026-04-14",
    sections: [
      {
        title: "Local-first by design",
        body:
          "JARVIS runs as a native macOS application. Your conversation history, tasks, cached email, and integration tokens are stored locally in a SQLite database on your Mac. JARVIS AI (the company) does not operate servers that store your personal data.",
      },
      {
        title: "What we collect on this website",
        body:
          "If you join the waitlist, we collect the email address you provide and the timestamp of your signup. This is used solely to send you beta access information. We do not sell or share waitlist emails.",
      },
      {
        title: "Third-party services you connect in the app",
        body:
          "When you connect Gmail, Google Calendar, Notion, GitHub, or Obsidian inside JARVIS, you authorize the app on your Mac to talk to those services directly. API tokens are encrypted at rest on your machine. They are not transmitted to JARVIS AI.",
      },
      {
        title: "AI providers",
        body:
          "By default, your requests are sent to Anthropic (Claude) and OpenAI as the AI providers. Their privacy policies apply to the content of those requests. As the cloud migration to AWS progresses, users will be able to choose Amazon Bedrock as the primary provider.",
      },
      {
        title: "Contact",
        body: "Questions about this policy: hillman@hillmanchan.com.",
      },
    ],
  },
  terms: {
    heading: "Terms of Service",
    lastUpdated: "Last updated: 2026-04-14",
    sections: [
      {
        title: "Beta software",
        body:
          "JARVIS is provided as beta software during the Activate period. Features may change, break, or be withdrawn. No warranty is provided.",
      },
      {
        title: "Acceptable use",
        body:
          "You will not use JARVIS to violate any law, infringe any right, or harm any system. Shell command execution inside JARVIS carries a blocklist; bypassing that blocklist is at your own risk.",
      },
      {
        title: "Intellectual property",
        body:
          "JARVIS AI retains all rights to the JARVIS software and brand. Content generated via JARVIS belongs to you, subject to the underlying AI providers' terms.",
      },
      {
        title: "Liability",
        body:
          "To the maximum extent permitted by law, JARVIS AI is not liable for any indirect, incidental, or consequential damages arising from your use of the software or this website.",
      },
      {
        title: "Governing law",
        body:
          "These terms are governed by the laws of the Hong Kong Special Administrative Region.",
      },
    ],
  },
} as const;
```

- [ ] **Step 4: Typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat: add company facts, per-route metadata, and EN marketing copy"
```

---

## Task 6: Utilities — classNames, isEmail, prefersReducedMotion

**Files:**
- Create: `lib/utils/classNames.ts`, `lib/utils/classNames.test.ts`
- Create: `lib/utils/isEmail.ts`, `lib/utils/isEmail.test.ts`
- Create: `lib/utils/prefersReducedMotion.ts`

- [ ] **Step 1: Write failing test for `classNames`**

Create `lib/utils/classNames.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { classNames } from "./classNames";

describe("classNames", () => {
  it("joins truthy strings with spaces", () => {
    expect(classNames("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(classNames("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("handles conditional objects", () => {
    expect(classNames("base", { active: true, disabled: false })).toBe("base active");
  });

  it("returns empty string when no truthy inputs", () => {
    expect(classNames(false, null, undefined)).toBe("");
  });
});
```

- [ ] **Step 2: Run test (must fail)**

```bash
npm test -- lib/utils/classNames.test.ts
```

Expected: FAIL with "Cannot find module './classNames'".

- [ ] **Step 3: Implement `classNames`**

Create `lib/utils/classNames.ts`:

```ts
import { clsx, type ClassValue } from "clsx";

export function classNames(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
```

- [ ] **Step 4: Run test (must pass)**

```bash
npm test -- lib/utils/classNames.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Write failing test for `isEmail`**

Create `lib/utils/isEmail.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { isEmail } from "./isEmail";

describe("isEmail", () => {
  it("accepts a normal email", () => {
    expect(isEmail("hello@example.com")).toBe(true);
  });

  it("accepts plus-addressing", () => {
    expect(isEmail("a.b+tag@example.co.uk")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(isEmail("hello.example.com")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("rejects whitespace", () => {
    expect(isEmail("   ")).toBe(false);
  });

  it("rejects overly long input", () => {
    expect(isEmail("a".repeat(300) + "@b.com")).toBe(false);
  });
});
```

- [ ] **Step 6: Run test (must fail)**

```bash
npm test -- lib/utils/isEmail.test.ts
```

Expected: FAIL with module not found.

- [ ] **Step 7: Implement `isEmail`**

Create `lib/utils/isEmail.ts`:

```ts
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

export function isEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_PATTERN.test(trimmed);
}
```

- [ ] **Step 8: Run test (must pass)**

```bash
npm test -- lib/utils/isEmail.test.ts
```

Expected: PASS (6 tests).

- [ ] **Step 9: Implement `prefersReducedMotion`**

Create `lib/utils/prefersReducedMotion.ts`:

```ts
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

No unit test — trivial wrapper around `matchMedia`, exercised by integration behaviour.

- [ ] **Step 10: Commit**

```bash
git add lib/utils/
git commit -m "feat: add classNames, isEmail, prefersReducedMotion utilities with tests"
```

---

## Task 7: Shared constants

**Files:**
- Create: `lib/constants/routes.ts`, `lib/constants/spacing.ts`, `lib/constants/site.ts`, `lib/constants/social.ts`

- [ ] **Step 1: Create `lib/constants/routes.ts`**

```ts
export const routes = {
  home: "/",
  company: "/company",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const navRoutes = [
  { label: "Company", href: routes.company },
  { label: "Contact", href: routes.contact },
] as const;

export const footerLegalRoutes = [
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;
```

- [ ] **Step 2: Create `lib/constants/spacing.ts`**

```ts
export const section = {
  paddingY: "py-24 md:py-32",
  paddingX: "px-6 md:px-10",
  gap: "gap-10 md:gap-16",
  maxWidth: "max-w-6xl",
} as const;

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;
```

- [ ] **Step 3: Create `lib/constants/site.ts`**

```ts
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://jarvis-ai.vercel.app";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}
```

- [ ] **Step 4: Create `lib/constants/social.ts`**

```ts
import { company } from "@/content/company";

export const social = {
  github: company.github,
} as const;
```

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add lib/constants/
git commit -m "feat: add route, spacing, site, and social constants"
```

---

## Task 8: UI primitives — Button, GlassPanel, CornerBrackets, SectionHeading, Wordmark, ExternalLink, ReducedMotionGate

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/GlassPanel.tsx`, `components/ui/CornerBrackets.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Wordmark.tsx`, `components/ui/ExternalLink.tsx`, `components/ui/ReducedMotionGate.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import { classNames } from "@/lib/utils/classNames";

type Variant = "primary" | "ghost";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center rounded-sm px-5 py-3 font-mono text-sm uppercase tracking-[0.18em] transition-colors duration-150";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-cyan)] text-[color:var(--bg-void)] hover:bg-[var(--accent-cyan-60)] shadow-[var(--glow-cyan)]",
  ghost:
    "border border-[var(--accent-cyan-60)] text-[color:var(--accent-cyan)] hover:bg-[var(--accent-cyan-20)]",
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  children,
  className,
  ariaLabel,
}: ButtonProps) {
  const merged = classNames(base, styles[variant], className);
  if (href) {
    return (
      <Link href={href} className={merged} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={merged} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create `components/ui/GlassPanel.tsx`**

```tsx
import { classNames } from "@/lib/utils/classNames";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={classNames(
        "relative rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] p-6 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/CornerBrackets.tsx`**

```tsx
import { classNames } from "@/lib/utils/classNames";

interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
}

export function CornerBrackets({ children, className }: CornerBracketsProps) {
  return (
    <div className={classNames("relative inline-flex items-center px-3 py-1", className)}>
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[var(--accent-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[var(--accent-cyan)]" />
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/ui/SectionHeading.tsx`**

```tsx
import { classNames } from "@/lib/utils/classNames";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, sub, className, align = "left" }: SectionHeadingProps) {
  return (
    <div className={classNames(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--accent-cyan)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {sub ? (
        <p className="mt-4 max-w-2xl text-base text-[color:var(--text-muted)] md:text-lg">{sub}</p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 5: Create `components/ui/Wordmark.tsx`**

```tsx
import Link from "next/link";
import { company } from "@/content/company";
import { routes } from "@/lib/constants/routes";

export function Wordmark() {
  return (
    <Link
      href={routes.home}
      className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.25em] text-[color:var(--text-primary)]"
      aria-label={`${company.name} — home`}
    >
      <span className="text-[color:var(--accent-cyan)]">[</span>
      <span>{company.name}</span>
      <span className="text-[color:var(--accent-cyan)]">]</span>
    </Link>
  );
}
```

- [ ] **Step 6: Create `components/ui/ExternalLink.tsx`**

```tsx
import { classNames } from "@/lib/utils/classNames";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "text-[color:var(--accent-cyan)] underline underline-offset-4 hover:text-[color:var(--text-primary)]",
        className,
      )}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 7: Create `components/ui/ReducedMotionGate.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

interface ReducedMotionGateProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export function ReducedMotionGate({ children, fallback }: ReducedMotionGateProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <>{reduced ? fallback : children}</>;
}
```

- [ ] **Step 8: Typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 9: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI primitives (Button, GlassPanel, CornerBrackets, headings, wordmark, reduced-motion gate)"
```

---

## Task 9: Layout — Nav

**Files:**
- Create: `components/layout/nav/Nav.tsx`, `NavLinks.tsx`, `NavCta.tsx`, `nav.data.ts`

- [ ] **Step 1: Create `components/layout/nav/nav.data.ts`**

```ts
import { navRoutes } from "@/lib/constants/routes";

export const navLinks = navRoutes;
```

- [ ] **Step 2: Create `components/layout/nav/NavLinks.tsx`**

```tsx
import Link from "next/link";
import { navLinks } from "./nav.data";

export function NavLinks() {
  return (
    <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.22em] md:flex">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Create `components/layout/nav/NavCta.tsx`**

```tsx
import { Button } from "@/components/ui/Button";

export function NavCta() {
  return (
    <Button href="#waitlist" variant="primary" className="hidden md:inline-flex">
      Join waitlist
    </Button>
  );
}
```

- [ ] **Step 4: Create `components/layout/nav/Nav.tsx`**

```tsx
import { Wordmark } from "@/components/ui/Wordmark";
import { NavLinks } from "./NavLinks";
import { NavCta } from "./NavCta";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.6)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Wordmark />
        <NavLinks />
        <NavCta />
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add components/layout/nav/
git commit -m "feat: add sticky navigation with wordmark, links, and CTA"
```

---

## Task 10: Layout — Footer

**Files:**
- Create: `components/layout/footer/Footer.tsx`, `FooterLinks.tsx`, `FooterLegal.tsx`, `footer.data.ts`

- [ ] **Step 1: Create `components/layout/footer/footer.data.ts`**

```ts
import { footerLegalRoutes } from "@/lib/constants/routes";

export const legalLinks = footerLegalRoutes;
```

- [ ] **Step 2: Create `components/layout/footer/FooterLegal.tsx`**

```tsx
import Link from "next/link";
import { legalLinks } from "./footer.data";

export function FooterLegal() {
  return (
    <ul className="flex gap-6 font-mono text-xs uppercase tracking-[0.22em]">
      {legalLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-primary)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Create `components/layout/footer/FooterLinks.tsx`**

```tsx
import { ExternalLink } from "@/components/ui/ExternalLink";
import { social } from "@/lib/constants/social";
import { company } from "@/content/company";

export function FooterLinks() {
  return (
    <ul className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.22em]">
      <li>
        <ExternalLink href={social.github} className="no-underline">
          GitHub
        </ExternalLink>
      </li>
      <li>
        <a
          href={`mailto:${company.contactEmail}`}
          className="text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
        >
          {company.contactEmail}
        </a>
      </li>
    </ul>
  );
}
```

- [ ] **Step 4: Create `components/layout/footer/Footer.tsx`**

```tsx
import { Wordmark } from "@/components/ui/Wordmark";
import { company } from "@/content/company";
import { FooterLinks } from "./FooterLinks";
import { FooterLegal } from "./FooterLegal";

export function Footer() {
  return (
    <footer className="border-t border-[var(--grid-line)] mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Wordmark />
          <FooterLinks />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--grid-line)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
            {company.name} · {company.locationLine} · {company.registrationLine}
          </p>
          <FooterLegal />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          © {company.foundingYear} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add components/layout/footer/
git commit -m "feat: add site footer with legal links and contact"
```

---

## Task 11: Root layout + stub routes

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/page.tsx` (replace), `app/company/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import { Nav } from "@/components/layout/nav/Nav";
import { Footer } from "@/components/layout/footer/Footer";
import { baseMetadata, routeMetadata } from "@/content/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: routeMetadata.home.title,
    template: "%s · JARVIS AI",
  },
  description: routeMetadata.home.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace `app/page.tsx` with stub**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Home (sections land in Day 2)</h1>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/company/page.tsx` stub**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.company.title,
  description: routeMetadata.company.description,
  alternates: { canonical: routeMetadata.company.canonical },
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Company</h1>
    </div>
  );
}
```

- [ ] **Step 4: Create `app/contact/page.tsx` stub**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.contact.title,
  description: routeMetadata.contact.description,
  alternates: { canonical: routeMetadata.contact.canonical },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Contact</h1>
    </div>
  );
}
```

- [ ] **Step 5: Create `app/privacy/page.tsx` stub**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.privacy.title,
  description: routeMetadata.privacy.description,
  alternates: { canonical: routeMetadata.privacy.canonical },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Privacy</h1>
    </div>
  );
}
```

- [ ] **Step 6: Create `app/terms/page.tsx` stub**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";

export const metadata: Metadata = {
  title: routeMetadata.terms.title,
  description: routeMetadata.terms.description,
  alternates: { canonical: routeMetadata.terms.canonical },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h1 className="font-display text-4xl">Terms</h1>
    </div>
  );
}
```

- [ ] **Step 7: Build + visual check**

```bash
npm run build
```

Expected: `Generated successfully` with all 5 static routes emitted.

```bash
npm run dev
```

Visit `/`, `/company`, `/contact`, `/privacy`, `/terms`. Expected: each shows the nav, the stub heading, and the footer. No console errors. Kill dev with Ctrl-C.

- [ ] **Step 8: Commit**

```bash
git add app/
git commit -m "feat: wire root layout with nav + footer and stub all 5 routes"
```

---

## Task 12: Copy + optimise assets into public/

**Files:**
- Create: `public/jarvis-demo.mp4`, `public/jarvis-demo-poster.jpg`, `public/jarvis-demo-screenshot.webp`, `public/jarvis-demo-screenshot.avif`, `public/og-image.png`, `public/icon.svg`, `public/favicon.ico`

- [ ] **Step 1: Check ffmpeg and sharp-cli availability**

```bash
ffmpeg -version | head -1
```

If not installed: `brew install ffmpeg`.

```bash
npx --yes sharp-cli --version
```

(sharp-cli is run via `npx` on demand; no install step required.)

- [ ] **Step 2: Copy and rename MP4 to public/**

```bash
cp Jarvis-demo.mp4 public/jarvis-demo.mp4
```

- [ ] **Step 3: Generate poster frame from the video (first clear frame at 2s)**

```bash
ffmpeg -y -ss 00:00:02 -i public/jarvis-demo.mp4 -frames:v 1 -q:v 2 public/jarvis-demo-poster.jpg
```

Expected: `public/jarvis-demo-poster.jpg` created, ~150–300 KB.

- [ ] **Step 4: Generate WebM alternative for hero loop**

```bash
ffmpeg -y -i public/jarvis-demo.mp4 -c:v libvpx-vp9 -b:v 1M -an -t 8 public/jarvis-demo-loop.webm
ffmpeg -y -i public/jarvis-demo.mp4 -c:v libx264 -preset slow -crf 28 -movflags +faststart -an -t 8 public/jarvis-demo-loop.mp4
```

Expected: two small looping files ≤ 6 MB each.

- [ ] **Step 5: Generate AVIF + WebP derivatives of the screenshot**

```bash
npx --yes sharp-cli -i Jarvis-demo-screenshot.png -o public/jarvis-demo-screenshot.webp -f webp --webp-quality 82
npx --yes sharp-cli -i Jarvis-demo-screenshot.png -o public/jarvis-demo-screenshot.avif -f avif --avif-quality 60
```

Expected: two derivative files, both < 500 KB.

- [ ] **Step 6: Create OG image as a copy of the screenshot, resized to 1200×630**

```bash
npx --yes sharp-cli -i Jarvis-demo-screenshot.png -o public/og-image.png --resize 1200,630 --fit cover
```

Expected: `public/og-image.png` at 1200×630, < 400 KB.

- [ ] **Step 7: Create placeholder favicon and icon**

```bash
npx --yes sharp-cli -i Jarvis-demo-screenshot.png -o public/favicon.ico --resize 32,32 --fit cover -f png
```

Create `public/icon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#060a14"/>
  <text x="16" y="22" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#00B4FF">J</text>
</svg>
```

- [ ] **Step 8: Verify assets**

```bash
ls -lh public/
```

Expected: poster, loop.webm, loop.mp4, full mp4, screenshot.webp, screenshot.avif, og-image.png, favicon.ico, icon.svg all present and sized reasonably.

- [ ] **Step 9: Commit**

```bash
git add public/
git commit -m "chore: copy and optimise hero assets (video, poster, AVIF, WebP, OG, favicon)"
```

---

# Phase 2 — Home top-of-page (Day 2)

## Task 13: Hero section

**Files:**
- Create: `components/sections/hero/Hero.tsx`, `HeroHeadline.tsx`, `HeroCtas.tsx`, `HeroPoster.tsx`, `HeroVideo.tsx`, `HeroParallax.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `HeroHeadline.tsx`**

```tsx
import { copy } from "@/content/copy.en";

export function HeroHeadline() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
        {copy.hero.h1}
      </h1>
      <p className="mt-6 max-w-2xl text-base text-[color:var(--text-muted)] md:text-lg">
        {copy.hero.sub}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create `HeroCtas.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy.en";

export function HeroCtas() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button href="#waitlist" variant="primary">
        {copy.hero.primaryCta}
      </Button>
      <Button href="#demo" variant="ghost">
        {copy.hero.secondaryCta}
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: Create `HeroPoster.tsx`**

```tsx
import Image from "next/image";

export function HeroPoster() {
  return (
    <div className="absolute inset-0 -z-20 opacity-40">
      <Image
        src="/jarvis-demo-screenshot.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(6,10,20,0.5)] via-transparent to-[color:var(--bg-void)]" />
    </div>
  );
}
```

- [ ] **Step 4: Create `HeroVideo.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void el.play().catch(() => {});
          else el.pause();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 mix-blend-screen"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/jarvis-demo-poster.jpg"
      aria-hidden="true"
    >
      <source src="/jarvis-demo-loop.webm" type="video/webm" />
      <source src="/jarvis-demo-loop.mp4" type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 5: Create `HeroParallax.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

const dots = [
  { cx: "12%", cy: "24%", size: 6, delay: 0 },
  { cx: "78%", cy: "18%", size: 4, delay: 0.4 },
  { cx: "30%", cy: "78%", size: 5, delay: 0.9 },
  { cx: "66%", cy: "62%", size: 3, delay: 1.3 },
];

export function HeroParallax() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[color:var(--accent-cyan)]"
          style={{
            left: d.cx,
            top: d.cy,
            width: d.size,
            height: d.size,
            boxShadow: "var(--glow-cyan)",
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Create `Hero.tsx`**

```tsx
import { ReducedMotionGate } from "@/components/ui/ReducedMotionGate";
import { HeroHeadline } from "./HeroHeadline";
import { HeroCtas } from "./HeroCtas";
import { HeroPoster } from "./HeroPoster";
import { HeroVideo } from "./HeroVideo";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroPoster />
      <ReducedMotionGate fallback={null}>
        <HeroVideo />
        <HeroParallax />
      </ReducedMotionGate>
      <div className="mx-auto max-w-6xl px-6 py-32 md:px-10 md:py-40">
        <HeroHeadline />
        <HeroCtas />
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Update `app/page.tsx` to render Hero**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 8: Visual check**

```bash
npm run dev
```

Visit `/`. Expected: full-bleed hero with dim screenshot background, drifting cyan dots (if motion allowed), muted video looping in background, headline + 2 CTAs above. Kill dev.

- [ ] **Step 9: Commit**

```bash
git add components/sections/hero/ app/page.tsx
git commit -m "feat: home hero with static poster, looping video, and parallax dots"
```

---

## Task 14: Trust strip

**Files:**
- Create: `components/sections/trust-strip/TrustStrip.tsx`, `trust-strip.data.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `trust-strip.data.ts`**

```ts
import { copy } from "@/content/copy.en";

export const trust = copy.trust;
```

- [ ] **Step 2: Create `TrustStrip.tsx`**

```tsx
import { trust } from "./trust-strip.data";

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.6)]">
      <p className="mx-auto max-w-6xl px-6 py-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)] md:px-10">
        {trust}
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Add to `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustStrip } from "@/components/sections/trust-strip/TrustStrip";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/trust-strip/ app/page.tsx
git commit -m "feat: trust strip below hero"
```

---

## Task 15: Pillars section

**Files:**
- Create: `components/sections/pillars/Pillars.tsx`, `PillarCard.tsx`, `PillarIcon.tsx`, `pillars.data.ts`, `pillars.types.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `pillars.types.ts`**

```ts
export type PillarIconKey = "voice" | "local" | "agentic";

export interface Pillar {
  title: string;
  body: string;
  icon: PillarIconKey;
}
```

- [ ] **Step 2: Create `pillars.data.ts`**

```ts
import { copy } from "@/content/copy.en";
import type { Pillar, PillarIconKey } from "./pillars.types";

const icons: PillarIconKey[] = ["voice", "local", "agentic"];

export const pillars: Pillar[] = copy.pillars.map((p, i) => ({
  title: p.title,
  body: p.body,
  icon: icons[i] ?? "voice",
}));
```

- [ ] **Step 3: Create `PillarIcon.tsx`**

```tsx
import { Mic, HardDrive, Zap } from "lucide-react";
import { iconSize } from "@/lib/constants/spacing";
import type { PillarIconKey } from "./pillars.types";

const map = {
  voice: Mic,
  local: HardDrive,
  agentic: Zap,
} as const;

export function PillarIcon({ icon }: { icon: PillarIconKey }) {
  const Cmp = map[icon];
  return <Cmp size={iconSize.lg} strokeWidth={1.5} className="text-[color:var(--accent-cyan)]" />;
}
```

- [ ] **Step 4: Create `PillarCard.tsx`**

```tsx
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PillarIcon } from "./PillarIcon";
import type { Pillar } from "./pillars.types";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <GlassPanel>
      <PillarIcon icon={pillar.icon} />
      <h3 className="mt-5 font-display text-2xl">{pillar.title}</h3>
      <p className="mt-3 text-[color:var(--text-muted)]">{pillar.body}</p>
    </GlassPanel>
  );
}
```

- [ ] **Step 5: Create `Pillars.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { PillarCard } from "./PillarCard";
import { pillars } from "./pillars.data";

export function Pillars() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Principles"
          title="Voice. Local. Agentic."
          sub="Three commitments the product is built around — not marketing copy."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <PillarCard key={p.title} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add to `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustStrip } from "@/components/sections/trust-strip/TrustStrip";
import { Pillars } from "@/components/sections/pillars/Pillars";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
    </>
  );
}
```

- [ ] **Step 7: Typecheck + commit**

```bash
npm run typecheck
git add components/sections/pillars/ app/page.tsx
git commit -m "feat: pillars section (voice/local/agentic)"
```

---

## Task 16: Integrations marquee

**Files:**
- Create: `components/sections/integrations-marquee/IntegrationsMarquee.tsx`, `IntegrationChip.tsx`, `integrations.data.ts`
- Modify: `styles/globals.css`, `app/page.tsx`

- [ ] **Step 1: Create `integrations.data.ts`**

```ts
import { copy } from "@/content/copy.en";

export const integrations = [...copy.integrations, ...copy.integrations];
```

- [ ] **Step 2: Create `IntegrationChip.tsx`**

```tsx
export function IntegrationChip({ name }: { name: string }) {
  return (
    <span className="mx-6 inline-flex items-center gap-3 whitespace-nowrap rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] px-5 py-2 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-primary)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)] shadow-[var(--glow-cyan)]" />
      {name}
    </span>
  );
}
```

- [ ] **Step 3: Create `IntegrationsMarquee.tsx`**

```tsx
import { integrations } from "./integrations.data";
import { IntegrationChip } from "./IntegrationChip";

export function IntegrationsMarquee() {
  return (
    <section
      className="border-y border-[var(--grid-line)] py-8 overflow-hidden"
      aria-label="Integrations"
    >
      <div className="marquee flex">
        {integrations.map((name, i) => (
          <IntegrationChip key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add marquee keyframes to `styles/globals.css`**

Append to the end of the file:

```css
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee {
  animation: marquee-scroll 40s linear infinite;
  width: max-content;
}

@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
}
```

- [ ] **Step 5: Add to `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustStrip } from "@/components/sections/trust-strip/TrustStrip";
import { Pillars } from "@/components/sections/pillars/Pillars";
import { IntegrationsMarquee } from "@/components/sections/integrations-marquee/IntegrationsMarquee";

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: { canonical: routeMetadata.home.canonical },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
      <IntegrationsMarquee />
    </>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/sections/integrations-marquee/ styles/globals.css app/page.tsx
git commit -m "feat: css-only integrations marquee"
```

---

## Task 17: Feature grid

**Files:**
- Create: `components/sections/feature-grid/FeatureGrid.tsx`, `FeatureTile.tsx`, `FeatureIcon.tsx`, `features.data.ts`, `features.types.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `features.types.ts`**

```ts
export type FeatureIconKey =
  | "sphere"
  | "voice"
  | "tools"
  | "briefing"
  | "automation"
  | "system";

export interface Feature {
  title: string;
  body: string;
  icon: FeatureIconKey;
}
```

- [ ] **Step 2: Create `features.data.ts`**

```ts
import { copy } from "@/content/copy.en";
import type { Feature, FeatureIconKey } from "./features.types";

const order: FeatureIconKey[] = ["sphere", "voice", "tools", "briefing", "automation", "system"];

export const features: Feature[] = copy.features.map((f, i) => ({
  title: f.title,
  body: f.body,
  icon: order[i] ?? "sphere",
}));
```

- [ ] **Step 3: Create `FeatureIcon.tsx`**

```tsx
import { Orbit, Mic, Wrench, Sun, Timer, Terminal } from "lucide-react";
import { iconSize } from "@/lib/constants/spacing";
import type { FeatureIconKey } from "./features.types";

const map = {
  sphere: Orbit,
  voice: Mic,
  tools: Wrench,
  briefing: Sun,
  automation: Timer,
  system: Terminal,
} as const;

export function FeatureIcon({ icon }: { icon: FeatureIconKey }) {
  const Cmp = map[icon];
  return <Cmp size={iconSize.md} strokeWidth={1.5} className="text-[color:var(--accent-cyan)]" />;
}
```

- [ ] **Step 4: Create `FeatureTile.tsx`**

```tsx
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FeatureIcon } from "./FeatureIcon";
import type { Feature } from "./features.types";

export function FeatureTile({ feature }: { feature: Feature }) {
  return (
    <GlassPanel className="h-full">
      <div className="flex items-center gap-3">
        <FeatureIcon icon={feature.icon} />
        <h3 className="font-display text-xl">{feature.title}</h3>
      </div>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">{feature.body}</p>
    </GlassPanel>
  );
}
```

- [ ] **Step 5: Create `FeatureGrid.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { FeatureTile } from "./FeatureTile";
import { features } from "./features.data";

export function FeatureGrid() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Product"
          title="What JARVIS ships with"
          sub="32 AI tool functions, five integrations, and a real-time holographic data sphere — all on a ~10 MB native binary."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureTile key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add to `app/page.tsx`**

Append `<FeatureGrid />` after `<IntegrationsMarquee />`:

```tsx
import { FeatureGrid } from "@/components/sections/feature-grid/FeatureGrid";

// inside HomePage JSX, after <IntegrationsMarquee />:
<FeatureGrid />
```

- [ ] **Step 7: Typecheck + commit**

```bash
npm run typecheck
git add components/sections/feature-grid/ app/page.tsx
git commit -m "feat: 6-tile feature grid"
```

---

# Phase 3 — Home bottom + content pages (Day 3)

## Task 18: Demo section

**Files:**
- Create: `components/sections/demo/Demo.tsx`, `DemoVideo.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `DemoVideo.tsx`**

```tsx
export function DemoVideo() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-[var(--accent-cyan-20)]">
      <video
        className="h-auto w-full"
        controls
        preload="none"
        poster="/jarvis-demo-poster.jpg"
        playsInline
      >
        <source src="/jarvis-demo.mp4" type="video/mp4" />
        <track kind="captions" src="/jarvis-demo.vtt" srcLang="en" label="English" default />
        Your browser does not support video.
      </video>
    </div>
  );
}
```

- [ ] **Step 2: Create `Demo.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { DemoVideo } from "./DemoVideo";

export function Demo() {
  return (
    <section id="demo" className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading
          eyebrow="Watch"
          title="See JARVIS in action"
          sub="90 seconds. Voice, tool calls, the 3D data sphere, and the morning briefing."
        />
        <div className="mt-10">
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create placeholder captions file**

Create `public/jarvis-demo.vtt`:

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
JARVIS — native macOS AI assistant.

00:00:05.000 --> 00:00:15.000
Voice-controlled. Local-first. Agentic.
```

Real captions are generated in Day 5 QA.

- [ ] **Step 4: Add to `app/page.tsx`**

Append `<Demo />` after `<FeatureGrid />`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/demo/ public/jarvis-demo.vtt app/page.tsx
git commit -m "feat: demo video section with captions placeholder"
```

---

## Task 19: Stats counters

**Files:**
- Create: `components/sections/stats/Stats.tsx`, `StatCounter.tsx`, `useCountUp.ts`, `useCountUp.test.ts`, `stats.data.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write failing test for `useCountUp`**

Create `components/sections/stats/useCountUp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("starts at 0 when active is false", () => {
    const { result } = renderHook(() => useCountUp({ target: 42, active: false, durationMs: 10 }));
    expect(result.current).toBe(0);
  });

  it("reaches target when active flips to true", async () => {
    const { result, rerender } = renderHook(
      ({ active }) => useCountUp({ target: 10, active, durationMs: 10 }),
      { initialProps: { active: false } },
    );
    expect(result.current).toBe(0);
    rerender({ active: true });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 60));
    });
    expect(result.current).toBe(10);
  });
});
```

- [ ] **Step 2: Run test (must fail)**

```bash
npm test -- components/sections/stats/useCountUp.test.ts
```

Expected: FAIL with module not found.

- [ ] **Step 3: Implement `useCountUp.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

interface Options {
  target: number;
  active: boolean;
  durationMs?: number;
}

export function useCountUp({ target, active, durationMs = 1200 }: Options): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);

  return value;
}
```

- [ ] **Step 4: Run test (must pass)**

```bash
npm test -- components/sections/stats/useCountUp.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 5: Create `stats.data.ts`**

```ts
import { copy } from "@/content/copy.en";

export const stats = copy.stats;
```

- [ ] **Step 6: Create `StatCounter.tsx`**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useCountUp } from "./useCountUp";

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ value, label, suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const n = useCountUp({ target: value, active });

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-[color:var(--accent-cyan)] md:text-6xl">
        {suffix}
        {n}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `Stats.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { StatCounter } from "./StatCounter";
import { stats } from "./stats.data";

export function Stats() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="By the numbers" title="What's in the 0.1.0 binary" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} suffix={"suffix" in s ? s.suffix : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Add to `app/page.tsx`** — append `<Stats />` after `<Demo />`.

- [ ] **Step 9: Commit**

```bash
git add components/sections/stats/ app/page.tsx
git commit -m "feat: animated stats counters"
```

---

## Task 20: Roadmap teaser

**Files:**
- Create: `components/sections/roadmap-teaser/RoadmapTeaser.tsx`, `AwsServiceBadge.tsx`, `roadmap.data.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `roadmap.data.ts`**

```ts
import { copy } from "@/content/copy.en";

export const roadmap = copy.roadmap;
```

- [ ] **Step 2: Create `AwsServiceBadge.tsx`**

```tsx
interface Props {
  name: string;
  body: string;
}

export function AwsServiceBadge({ name, body }: Props) {
  return (
    <li className="rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent-cyan)]">
        {name}
      </p>
      <p className="mt-2 text-sm text-[color:var(--text-muted)]">{body}</p>
    </li>
  );
}
```

- [ ] **Step 3: Create `RoadmapTeaser.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { AwsServiceBadge } from "./AwsServiceBadge";
import { roadmap } from "./roadmap.data";

export function RoadmapTeaser() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Cloud roadmap" title={roadmap.heading} sub={roadmap.sub} />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.services.map((s) => (
            <AwsServiceBadge key={s.name} name={s.name} body={s.body} />
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add to `app/page.tsx`** — append `<RoadmapTeaser />` after `<Stats />`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/roadmap-teaser/ app/page.tsx
git commit -m "feat: AWS cloud roadmap teaser"
```

---

## Task 21: Founder note

**Files:**
- Create: `components/sections/founder-note/FounderNote.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `FounderNote.tsx`**

```tsx
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { section } from "@/lib/constants/spacing";
import { routes } from "@/lib/constants/routes";
import { copy } from "@/content/copy.en";

export function FounderNote() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <GlassPanel>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--accent-cyan)]">
            {copy.founder.heading}
          </p>
          <p className="mt-4 text-base text-[color:var(--text-primary)] md:text-lg">
            {copy.founder.body}
          </p>
          <Link
            href={routes.company}
            className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--accent-cyan)] hover:text-[color:var(--text-primary)]"
          >
            {copy.founder.cta} →
          </Link>
        </GlassPanel>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** — append `<FounderNote />` after `<RoadmapTeaser />`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/founder-note/ app/page.tsx
git commit -m "feat: founder note card"
```

---

## Task 22: Waitlist CTA (form scaffold, wiring in Day 4)

**Files:**
- Create: `components/sections/waitlist-cta/WaitlistCta.tsx`, `WaitlistForm.tsx`, `WaitlistSuccess.tsx`, `useWaitlistSubmit.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `useWaitlistSubmit.ts`** (stub — real implementation in Day 4)

```ts
"use client";

import { useState } from "react";
import { copy } from "@/content/copy.en";
import { isEmail } from "@/lib/utils/isEmail";

type Status = "idle" | "submitting" | "success" | "error";

export function useWaitlistSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string) {
    setError(null);
    if (!isEmail(email)) {
      setStatus("error");
      setError(copy.waitlistCta.errorInvalid);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(copy.waitlistCta.errorGeneric);
    }
  }

  return { submit, status, error };
}
```

- [ ] **Step 2: Create `WaitlistSuccess.tsx`**

```tsx
import { copy } from "@/content/copy.en";

export function WaitlistSuccess() {
  return (
    <p className="font-mono text-sm uppercase tracking-[0.22em] text-[color:var(--accent-cyan)]">
      {copy.waitlistCta.success}
    </p>
  );
}
```

- [ ] **Step 3: Create `WaitlistForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy.en";
import { useWaitlistSubmit } from "./useWaitlistSubmit";
import { WaitlistSuccess } from "./WaitlistSuccess";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const { submit, status, error } = useWaitlistSubmit();

  if (status === "success") return <WaitlistSuccess />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit(email);
      }}
      className="flex flex-col gap-3 sm:flex-row"
      noValidate
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        autoComplete="email"
        placeholder={copy.waitlistCta.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-sm border border-[var(--accent-cyan-20)] bg-[var(--bg-panel)] px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
      />
      <Button type="submit" variant="primary">
        {status === "submitting" ? "…" : copy.waitlistCta.submit}
      </Button>
      <p className="min-h-[1.25rem] font-mono text-xs text-[color:var(--accent-cyan)]" aria-live="polite">
        {error ?? ""}
      </p>
    </form>
  );
}
```

- [ ] **Step 4: Create `WaitlistCta.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { section } from "@/lib/constants/spacing";
import { copy } from "@/content/copy.en";
import { WaitlistForm } from "./WaitlistForm";

export function WaitlistCta() {
  return (
    <section id="waitlist" className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Access"
          title={copy.waitlistCta.heading}
          sub={copy.waitlistCta.sub}
          align="center"
        />
        <div className="mt-10">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add to `app/page.tsx`** — append `<WaitlistCta />` after `<FounderNote />`.

- [ ] **Step 6: Commit**

```bash
git add components/sections/waitlist-cta/ app/page.tsx
git commit -m "feat: waitlist CTA section with form (API wired in Day 4)"
```

---

## Task 23: Company page

**Files:**
- Modify: `app/company/page.tsx`

- [ ] **Step 1: Replace `app/company/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: routeMetadata.company.title,
  description: routeMetadata.company.description,
  alternates: { canonical: routeMetadata.company.canonical },
};

export default function CompanyPage() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Company" title={copy.company.heading} sub={copy.company.sub} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.company.sections.map((s) => (
            <GlassPanel key={s.title}>
              <h2 className="font-display text-xl">{s.title}</h2>
              <p className="mt-3 text-sm text-[color:var(--text-muted)]">{s.body}</p>
            </GlassPanel>
          ))}
        </div>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]">
          Get in touch —{" "}
          <Link href={routes.contact} className="text-[color:var(--accent-cyan)]">
            contact
          </Link>
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/company/page.tsx
git commit -m "feat: company page with mission, founder, and HK presence"
```

---

## Task 24: Contact page

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { company } from "@/content/company";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WaitlistForm } from "@/components/sections/waitlist-cta/WaitlistForm";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata: Metadata = {
  title: routeMetadata.contact.title,
  description: routeMetadata.contact.description,
  alternates: { canonical: routeMetadata.contact.canonical },
};

export default function ContactPage() {
  return (
    <section className={`${section.paddingY} ${section.paddingX}`}>
      <div className={`mx-auto ${section.maxWidth}`}>
        <SectionHeading eyebrow="Contact" title={copy.contact.heading} sub={copy.contact.sub} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <GlassPanel>
            <h2 className="font-display text-xl">Business contact</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">{copy.contact.intro}</p>
            <ul className="mt-5 space-y-2 font-mono text-sm">
              <li>
                <span className="text-[color:var(--text-muted)]">Email · </span>
                <a
                  className="text-[color:var(--accent-cyan)]"
                  href={`mailto:${company.contactEmail}`}
                >
                  {company.contactEmail}
                </a>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">GitHub · </span>
                <ExternalLink href={company.github}>{company.github.replace("https://", "")}</ExternalLink>
              </li>
              <li>
                <span className="text-[color:var(--text-muted)]">Location · </span>
                <span>{company.locationLine}</span>
              </li>
            </ul>
          </GlassPanel>
          <GlassPanel>
            <h2 className="font-display text-xl">Join the waitlist</h2>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">
              Private beta on macOS. No spam. One launch email.
            </p>
            <div className="mt-5">
              <WaitlistForm />
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: contact page with business info and waitlist form"
```

---

# Phase 4 — Legal + backend + SEO (Day 4)

## Task 25: Privacy page

**Files:**
- Modify: `app/privacy/page.tsx`

- [ ] **Step 1: Replace `app/privacy/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: routeMetadata.privacy.title,
  description: routeMetadata.privacy.description,
  alternates: { canonical: routeMetadata.privacy.canonical },
};

export default function PrivacyPage() {
  return (
    <article className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Legal" title={copy.privacy.heading} sub={copy.privacy.lastUpdated} />
        <div className="mt-12 space-y-10">
          {copy.privacy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-3 text-[color:var(--text-muted)]">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "feat: privacy policy page"
```

---

## Task 26: Terms page

**Files:**
- Modify: `app/terms/page.tsx`

- [ ] **Step 1: Replace `app/terms/page.tsx`**

```tsx
import type { Metadata } from "next";
import { routeMetadata } from "@/content/metadata";
import { copy } from "@/content/copy.en";
import { section } from "@/lib/constants/spacing";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: routeMetadata.terms.title,
  description: routeMetadata.terms.description,
  alternates: { canonical: routeMetadata.terms.canonical },
};

export default function TermsPage() {
  return (
    <article className={`${section.paddingY} ${section.paddingX}`}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Legal" title={copy.terms.heading} sub={copy.terms.lastUpdated} />
        <div className="mt-12 space-y-10">
          {copy.terms.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-3 text-[color:var(--text-muted)]">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/terms/page.tsx
git commit -m "feat: terms of service page"
```

---

## Task 27: Waitlist validation schema

**Files:**
- Create: `lib/validation/waitlistSchema.ts`, `lib/validation/waitlistSchema.test.ts`

- [ ] **Step 1: Write failing test**

Create `lib/validation/waitlistSchema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { waitlistSchema } from "./waitlistSchema";

describe("waitlistSchema", () => {
  it("accepts a valid email and lowercases it", () => {
    const parsed = waitlistSchema.parse({ email: "Hello@Example.COM" });
    expect(parsed.email).toBe("hello@example.com");
  });

  it("trims whitespace", () => {
    const parsed = waitlistSchema.parse({ email: "  a@b.com  " });
    expect(parsed.email).toBe("a@b.com");
  });

  it("rejects missing @", () => {
    const result = waitlistSchema.safeParse({ email: "hello.example.com" });
    expect(result.success).toBe(false);
  });

  it("rejects overly long email", () => {
    const result = waitlistSchema.safeParse({ email: "a".repeat(250) + "@b.com" });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test (must fail)**

```bash
npm test -- lib/validation/waitlistSchema.test.ts
```

Expected: FAIL with module not found.

- [ ] **Step 3: Implement `waitlistSchema.ts`**

```ts
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(254),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
```

- [ ] **Step 4: Run test (must pass)**

```bash
npm test -- lib/validation/waitlistSchema.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/validation/
git commit -m "feat: add Zod schema for waitlist email validation"
```

---

## Task 28: Resend helpers

**Files:**
- Create: `lib/resend/sendWaitlistNotification.ts`, `lib/resend/sendWaitlistConfirmation.ts`, `.env.example`

- [ ] **Step 1: Create `.env.example`**

```
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=hillman@hillmanchan.com
WAITLIST_FROM=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=https://jarvis-ai.vercel.app
```

- [ ] **Step 2: Create `sendWaitlistNotification.ts`**

```ts
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
```

- [ ] **Step 3: Create `sendWaitlistConfirmation.ts`**

```ts
import { Resend } from "resend";

interface Params {
  to: string;
}

export async function sendWaitlistConfirmation({ to }: Params): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM;
  if (!apiKey || !from) throw new Error("resend_env_missing");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: "Welcome to the JARVIS beta waitlist",
    text:
      "Thanks for joining the JARVIS beta waitlist. We'll be in touch before launch with access details.\n\n— JARVIS AI",
  });
  if (result.error) throw new Error(`resend_failed:${result.error.message}`);
  return result.data?.id ?? "";
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/resend/ .env.example
git commit -m "feat: Resend helpers for waitlist notification and confirmation"
```

---

## Task 29: Waitlist API route

**Files:**
- Create: `app/api/waitlist/route.ts`, `app/api/waitlist/route.test.ts`

- [ ] **Step 1: Write failing test**

Create `app/api/waitlist/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/resend/sendWaitlistNotification", () => ({
  sendWaitlistNotification: vi.fn().mockResolvedValue("notif-id"),
}));
vi.mock("@/lib/resend/sendWaitlistConfirmation", () => ({
  sendWaitlistConfirmation: vi.fn().mockResolvedValue("conf-id"),
}));

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test";
    process.env.CONTACT_EMAIL = "ops@example.com";
    process.env.WAITLIST_FROM = "hello@example.com";
  });

  it("returns 200 for a valid email", async () => {
    const res = await POST(makeRequest({ email: "good@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_email");
  });

  it("returns 400 for malformed body", async () => {
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_body");
  });
});
```

- [ ] **Step 2: Run test (must fail)**

```bash
npm test -- app/api/waitlist/route.test.ts
```

Expected: FAIL with module not found.

- [ ] **Step 3: Implement `route.ts`**

```ts
import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validation/waitlistSchema";
import { sendWaitlistNotification } from "@/lib/resend/sendWaitlistNotification";
import { sendWaitlistConfirmation } from "@/lib/resend/sendWaitlistConfirmation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    await sendWaitlistNotification({ signup: parsed.data.email });
    await sendWaitlistConfirmation({ to: parsed.data.email });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Run test (must pass)**

```bash
npm test -- app/api/waitlist/route.test.ts
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add app/api/waitlist/
git commit -m "feat: POST /api/waitlist with Zod validation and Resend dispatch"
```

---

## Task 30: JSON-LD components

**Files:**
- Create: `lib/seo/buildOrganizationJsonLd.ts`, `lib/seo/buildSoftwareApplicationJsonLd.ts`, `components/seo/OrganizationJsonLd.tsx`, `components/seo/SoftwareApplicationJsonLd.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Create `buildOrganizationJsonLd.ts`**

```ts
import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [company.github],
    address: { "@type": "PostalAddress", addressCountry: "HK", addressRegion: "Hong Kong SAR" },
    contactPoint: {
      "@type": "ContactPoint",
      email: company.contactEmail,
      contactType: "business",
    },
  };
}
```

- [ ] **Step 2: Create `buildSoftwareApplicationJsonLd.ts`**

```ts
import { company } from "@/content/company";
import { siteUrl } from "@/lib/constants/site";

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: company.productName,
    operatingSystem: "macOS",
    applicationCategory: "ProductivityApplication",
    softwareVersion: company.productVersion,
    url: siteUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: company.name },
  };
}
```

- [ ] **Step 3: Create `OrganizationJsonLd.tsx`**

```tsx
import Script from "next/script";
import { buildOrganizationJsonLd } from "@/lib/seo/buildOrganizationJsonLd";

export function OrganizationJsonLd() {
  return (
    <Script
      id="ld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
    />
  );
}
```

- [ ] **Step 4: Create `SoftwareApplicationJsonLd.tsx`**

```tsx
import Script from "next/script";
import { buildSoftwareApplicationJsonLd } from "@/lib/seo/buildSoftwareApplicationJsonLd";

export function SoftwareApplicationJsonLd() {
  return (
    <Script
      id="ld-software-application"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareApplicationJsonLd()) }}
    />
  );
}
```

- [ ] **Step 5: Wire into `app/layout.tsx`**

Inside the `<body>` — add before `<Nav />`:

```tsx
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

// ...inside <body>:
<OrganizationJsonLd />
<Nav />
```

- [ ] **Step 6: Wire into `app/page.tsx`**

Add at the top of the returned fragment:

```tsx
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";

// ...at top of returned fragment:
<SoftwareApplicationJsonLd />
```

- [ ] **Step 7: Commit**

```bash
git add lib/seo/ components/seo/ app/layout.tsx app/page.tsx
git commit -m "feat: JSON-LD Organization + SoftwareApplication"
```

---

## Task 31: Sitemap + robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";
import { routes } from "@/lib/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(routes).map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Build + verify**

```bash
npm run build
```

Expected: build completes and log mentions `sitemap.xml` + `robots.txt`.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: sitemap and robots.txt"
```

---

## Task 32: End-to-end form submission check (manual)

**Files:**
- Modify: `.env.local` (not committed)

- [ ] **Step 1: Create `.env.local`**

```bash
cat > .env.local <<'EOF'
RESEND_API_KEY=<paste your Resend test key>
CONTACT_EMAIL=hillman@hillmanchan.com
WAITLIST_FROM=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

Hillman: obtain a Resend API key at https://resend.com/api-keys (free tier is fine). Paste it in place of `<paste your Resend test key>`.

- [ ] **Step 2: Run dev + submit form**

```bash
npm run dev
```

Open `http://localhost:3000`, scroll to the waitlist section, enter your own email, submit.

Expected:
- Browser: success message appears under the form (`You're on the list. We'll be in touch before launch.`)
- Inbox at `hillman@hillmanchan.com`: arrival of "JARVIS AI waitlist — new signup"
- Submitter inbox: arrival of "Welcome to the JARVIS beta waitlist"

Kill dev with Ctrl-C.

- [ ] **Step 3: Commit (no changes — docs only)**

No commit needed. Record outcome in day log.

---

# Phase 5 — QA, polish, ship (Day 5)

## Task 33: Lighthouse audit + fixes

**Files:**
- Modify: whichever files surface Lighthouse issues

- [ ] **Step 1: Build production bundle**

```bash
npm run build && npm run start
```

Leave running; open a second terminal.

- [ ] **Step 2: Run Lighthouse mobile on all 5 routes**

In Chrome DevTools → Lighthouse → Mobile → Performance + Accessibility + Best Practices + SEO. Run against:

- http://localhost:3000/
- http://localhost:3000/company
- http://localhost:3000/contact
- http://localhost:3000/privacy
- http://localhost:3000/terms

Target: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO ≥ 95.

- [ ] **Step 3: Fix regressions until targets met**

Common fixes:
- Missing `alt=""` → add
- Missing `<meta name="viewport">` → already in default layout, verify
- LCP too slow → ensure hero poster is `priority` and hero video `preload="metadata"`
- Contrast fails → adjust `--text-muted` opacity
- Missing `lang` on `<html>` → already set in layout; verify

- [ ] **Step 4: Kill production server and commit fixes (if any)**

```bash
git add .
git commit -m "chore: Lighthouse regression fixes to hit mobile targets"
```

If no fixes were needed, skip the commit.

---

## Task 34: Reduced-motion + keyboard + Rich Results check

**Files:**
- None (QA only; fixes committed per finding)

- [ ] **Step 1: Test `prefers-reduced-motion`**

In Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce. Reload `/`.

Expected:
- Hero: static poster only, no video, no floating dots
- Integrations: no horizontal marquee motion
- Stats: counters show end value immediately (or render as static)

Fix any violations and commit.

- [ ] **Step 2: Keyboard-only sweep**

Tab from top of page through all interactive elements. Every focused element must have a visible cyan focus ring.

Fix any missing focus rings by ensuring the element inherits the `*:focus-visible` rule (no `outline: none` overrides).

- [ ] **Step 3: Rich Results Test**

Visit https://search.google.com/test/rich-results. Paste `https://<preview-url>/` (use a Vercel preview deploy — see Task 35 — once live). Expected: `Organization` and `SoftwareApplication` both detected without errors.

Record the preview URL used and the result; run the test only after Task 35 deploys a preview.

- [ ] **Step 4: Commit any QA fixes**

```bash
git add .
git commit -m "fix: reduced-motion and focus ring polish"
```

Skip if no changes.

---

## Task 35: Deploy to Vercel + custom subdomain

**Files:**
- Create: `.gitignore` additions (if needed)

- [ ] **Step 1: Verify `.env.local` is gitignored**

```bash
grep -q "^\.env\*\.local$" .gitignore || printf "\n.env*.local\n" >> .gitignore
git diff .gitignore
```

If diff non-empty:

```bash
git add .gitignore
git commit -m "chore: ignore .env*.local"
```

- [ ] **Step 2: Log in to Vercel CLI**

```bash
npx vercel login
```

Follow prompts.

- [ ] **Step 3: Link project**

```bash
npx vercel link
```

Accept defaults. Project name: `jarvis-official-website`.

- [ ] **Step 4: Add environment variables to Vercel**

```bash
npx vercel env add RESEND_API_KEY production
npx vercel env add CONTACT_EMAIL production
npx vercel env add WAITLIST_FROM production
npx vercel env add NEXT_PUBLIC_SITE_URL production
```

For `NEXT_PUBLIC_SITE_URL`, enter `https://jarvis-ai.vercel.app` (or the production URL Vercel assigns, if different).

- [ ] **Step 5: Deploy preview**

```bash
npx vercel
```

Expected: a preview URL is printed. Open it and exercise every page + submit the waitlist form.

- [ ] **Step 6: Promote to production**

```bash
npx vercel --prod
```

Expected: production URL printed (e.g. `https://jarvis-official-website.vercel.app`).

- [ ] **Step 7: Set custom Vercel alias**

In the Vercel dashboard → Project → Settings → Domains, add `jarvis-ai.vercel.app` as a project alias if not already assigned. If unavailable, record the actual production URL in a note.

- [ ] **Step 8: Final end-to-end check on production**

Submit the waitlist form on production. Verify both emails arrive.

- [ ] **Step 9: Push the main branch to GitHub (if remote configured)**

```bash
git log --oneline | head -20
```

If a `github.com/ChiFungHillmanChan/jarvis-official-website` remote should exist:

```bash
git remote add origin git@github.com:ChiFungHillmanChan/jarvis-official-website.git
git push -u origin main
```

Only run the remote add if `git remote -v` is empty. Hillman confirms the remote exists before pushing.

---

## Task 36: Send resubmission to AWS Startups HK

**Files:**
- None (email task)

- [ ] **Step 1: Draft reply to AWS**

Reply to the AWS Startups Hong Kong thread with:

> Subject: RE: AWS Activate Application — Additional Information Required
>
> Dear AWS Activate Team,
>
> Thank you for the clarification. I've addressed both items:
>
> 1. **Website:** The JARVIS AI official company website is now live at **https://jarvis-ai.vercel.app** (replace with actual URL). It includes dedicated company, contact, privacy, and terms pages, a working beta waitlist, a product demo, and the AWS migration roadmap.
>
> 2. **AWS account (GCR):** I will create a new AWS account using a Hong Kong billing address this week and reply with the new 12-digit AWS ID for the Activate credits assignment.
>
> The HK Business Registration is pending incorporation, which I previously flagged. Please let me know if the updated website and forthcoming HK AWS account are sufficient to proceed.
>
> Best regards,
> Hillman Chan
> Founder & AI Engineer, JARVIS AI

- [ ] **Step 2: Send and record outcome**

Hillman sends from his own Gmail. No code change.

---

## Task 37: Archive plan

**Files:**
- None

- [ ] **Step 1: Final acceptance sweep**

Run through every checkbox in `docs/superpowers/specs/2026-04-14-jarvis-website-mvp-design.md` §14 and mark which are satisfied. For any that aren't, open a follow-up task in the TaskList.

- [ ] **Step 2: Tag a v1 release**

```bash
git tag -a v0.1.0 -m "JARVIS AI website MVP — AWS Activate resubmission"
git push origin v0.1.0   # only if remote configured
```

---

# Self-Review (done by plan author)

**Spec coverage check:**

- §1 Goal — Tasks 1–37 cover 5 live routes + resubmission
- §2 Scope decisions — locked by Tasks 1–4 (Framer only, Resend only, EN only, no R3F, no KV)
- §3 Pages — Tasks 11, 23–26 implement all 5 routes
- §4 Homepage sections — Tasks 13–22 cover all "IN" sections
- §5 Tech stack — Tasks 1–3 install and configure
- §6 Coding standards — enforced by file granularity in every task; no barrel files created
- §7 Project structure — Tasks 1–31 land every listed file
- §8 Waitlist API contract — Tasks 27–29 implement validation + Resend + route with tests
- §9 SEO — Tasks 30–31 implement JSON-LD + sitemap + robots; OG image created in Task 12
- §10 Performance — Task 33 is the audit
- §11 Accessibility — Task 34 is the audit
- §12 Content source of truth — Task 5 centralises all strings
- §13 Build order — matches Phase 1–5 split
- §14 Acceptance criteria — Tasks 33–36 cover each line
- §15 Deferred items — none implemented (correct)
- §16 Risks & mitigations — preload/poster in Task 13, captions placeholder in Task 18, reduced-motion in Task 34
- §17 Open items — flagged in Tasks 12 (logo placeholder), 28 (Resend from-address)

**Placeholder scan:**

- Task 18 references a placeholder captions file; real captions generated in Task 34 QA — acceptable, documented
- Task 32 requires a Resend API key from Hillman — real external credential, correctly flagged as a manual step
- Task 35 requires Hillman to confirm GitHub remote before push — gated correctly
- Task 36 is a human email send — correctly scoped

No TODOs, no "add appropriate error handling", no "similar to Task N" references.

**Type consistency:**

- `waitlistSchema` parses `{ email }` → API route uses `parsed.data.email` ✓
- `useWaitlistSubmit` returns `{ submit, status, error }` → `WaitlistForm` destructures identically ✓
- `useCountUp({ target, active, durationMs })` → `StatCounter` passes the same shape ✓
- `Feature`, `Pillar`, `PillarIconKey`, `FeatureIconKey` types match their data files ✓
- `routeMetadata[key].canonical` → used identically in every page ✓

**File-count sanity:** 37 numbered tasks producing roughly 70 source files, each well under 150 LOC. Compliant with spec §6.2.

---

# Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-14-jarvis-website-mvp.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints

Which approach?
