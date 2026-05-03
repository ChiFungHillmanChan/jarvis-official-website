# JARVIS Official Website

## Role
This is the **public-facing company website** for JARVIS AI. It is the landing page -- not the product itself.
The product lives at `../jarvis-ai-assistant/`.

## Tech Stack
- Next.js 16 (App Router) with React 19
- Tailwind CSS v4
- next-intl for i18n (English + Traditional Chinese)
- Resend for waitlist confirmation emails
- Deployed on Vercel

## Quick Start
```bash
npm install
npm run dev
```

## Structure
```
app/              # Next.js App Router (i18n via [locale] segment)
  [locale]/       # Locale-specific pages (home, company, contact, privacy, terms, security)
  api/waitlist/   # Waitlist signup API route
components/       # React components
  layout/         # Nav, Footer
  sections/       # Page sections (hero, demo, waitlist, trust, etc.)
  seo/            # JSON-LD structured data
  ui/             # Reusable UI primitives
content/          # Marketing copy, translations, metadata
lib/              # Constants, utils, validation, email (Resend)
i18n/             # next-intl routing and request config
public/           # Static assets (demo videos, favicons, OG image)
```

## Key Rules
- Corporate voice only ("We build...", never "I built...").
- Product descriptions must match actual capabilities in `../jarvis-ai-assistant/`.
- See AGENTS.md for Next.js 16 specific guidance -- APIs may differ from training data.
- No emojis in UI, code, or output.
