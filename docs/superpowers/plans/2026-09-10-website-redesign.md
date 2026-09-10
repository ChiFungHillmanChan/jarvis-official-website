# JARVIS website redesign implementation plan

**Goal:** Help Mac-based, client-facing professionals understand JARVIS and request beta access through a credible bilingual product website.

**Architecture:** Keep Next.js server-rendered localized pages and the existing waitlist API. Use shared localized content, a small interactive workflow illustration, and native HTML disclosures. Add a substantive setup page and maintain canonical/hreflang metadata.

**Design:** White #ffffff, mist #f5f7f8, graphite #182022, slate #596269, deep teal #006b68. Use the macOS system sans-serif stack, generous whitespace, a centered product introduction and large product illustration, then left-aligned workflow explanations. The memorable visual is the workspace example; surrounding design stays quiet. Avoid fake statistics, generated screenshots, floating decorative cards and infrastructure marketing.

**References:** Apple Mac (https://www.apple.com/mac/), Apple Intelligence (https://www.apple.com/apple-intelligence/), ChatGPT overview (https://chatgpt.com/overview/), Raycast AI (https://www.raycast.com/core-features/ai). Adapt clear hierarchy, concrete tasks, product evidence and practical adoption answers, without copying brand assets.

**Product constraints:** Apple Silicon, macOS 12+, beta. Gmail drafts are reviewed/sent by the user; calendar actions can execute when requested. Context is stored locally; default inference uses Gemini with the user's API key, optional local Ollama. Illustrations use explicitly labeled sample data. No unverified savings, testimonials, ratings or universal approval claims.

- [x] Replace home copy in both locales with useful product/workflow/integration/privacy/FAQ content.
- [x] Build responsive landing sections and a clearly labeled interactive workflow example.
- [x] Refresh global navigation, typography, buttons, footer and supporting-page surfaces.
- [x] Add bilingual setup guidance, improve metadata and accurate application schema, include setup route in sitemap.
- [x] Run lint, typecheck, existing tests, production build and route smoke checks.
- [x] Inspect desktop and mobile layouts, bilingual routing, preview switching, FAQ, navigation and form validation in browser.

**Validation:** Existing unit tests protect localization parity, privacy claims, metadata, menu behavior, waitlist validation and download handling. Browser checks cover layout and interactions. No live form submissions are needed for verification. Production deployment follows the user's explicit release authorization.

## Verified result

- 104 tests passed across 15 test files. ESLint and the production TypeScript/build checks passed.
- All 21 production smoke routes passed, including both setup pages, both downloads, robots, sitemap, social image and the expected 404.
- Browser review covered desktop and mobile, English and Traditional Chinese, tab clicks and arrow keys, menu Escape/focus containment behavior, FAQ expansion, and empty-email validation. No live waitlist submission was made.
- Both mobile locales have no horizontal overflow. Canonical URLs retain the configured production domain, https://jarvis-automation.com, with reciprocal language links and x-default.
- The product presentation is explicitly an illustration with sample data: existing screenshots are outdated and unsuitable for the new hero. No invented customer claims, ratings or savings.
- Shared navigation, footer, company and download surfaces follow the new system. Product claims were checked against the desktop source, including cloud fallbacks and separate voice/integration network use.
- The user authorized commit, push and production deployment on 2026-09-10. The release uses the existing GitHub CI/CD workflow; deployment results are reported in the task.

## Research decisions

Apple's product pages demonstrate clear hierarchy and practical adoption details. ChatGPT and Raycast ground capabilities in recognizable tasks. JARVIS applies these principles to email, calendars and follow-ups. It does not use other companies' assets or claim to match their product scope.

Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) support useful visible information, accurate descriptions and descriptive links. The setup guide adds substantive product information rather than generic keyword pages. FAQ content is provided for visitors; no FAQ rich-result promise or manufactured application ratings are added.

## Local runtime

The default /usr/local Node is x64 while installed native dependencies are arm64. Validation used the bundled native Node runtime with its bin directory first in PATH. Stale generated development cache was moved to /private/tmp/jarvis-next-dev-0910. No dependency or lockfile changes were required.
