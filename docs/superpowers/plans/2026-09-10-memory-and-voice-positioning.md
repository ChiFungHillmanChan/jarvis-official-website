# Memory and voice website positioning plan

**Status:** Planned next iteration; no repositioning changes are included in the current visual redesign release.

**Goal:** Make visitors understand JARVIS as a personal Mac assistant that remembers useful details they share and lets them work through voice. Email, calendars and notes demonstrate that value.

**User direction:** Memory and voice are the primary product focus. This supersedes the older Gmail-first positioning in the workspace's marketing documents. This plan covers the official website; it does not authorize a redesign of the desktop memory or speech architecture.

**Architecture:** Retain the current Next.js, next-intl and shared design system. Replace the homepage story and demonstration, add substantive memory and voice feature pages in both languages, and align metadata, setup guidance and privacy explanations. Use actual beta footage for proof.

**Tech stack:** Next.js 16.2.3, React 19, TypeScript, next-intl, existing CSS tokens and Vercel hosting.

## 1. Positioning

**Category:** A personal AI assistant for Mac, with memory and voice.

**Core promise:** JARVIS remembers details you share, so useful context can carry into later conversations. Speak or type to turn that context into practical help.

**Recommended headline:**

> An assistant that remembers.
> Ready when you speak.

**Supporting copy:**

> Tell JARVIS what matters. Save useful details for future conversations, then use your voice to plan your day, find information and take the next step on your Mac.

**Traditional Chinese direction:**

> 記得你交代的事。
> 開口，就能接著做。

> 把重要資料告訴 JARVIS，讓之後的對話有據可循。用語音安排一天、搜尋資料，或處理下一步工作。

These are proposed copy lines to refine against recorded product behavior, not claims that should be published before the demonstration passes.

**Primary CTA:** Request beta access / 申請 Beta 試用.

**Secondary CTA:** Watch memory and voice in action / 看看記憶與語音如何配合.

**Audience:** People who want a personal assistant on their Mac, with initial examples for founders, consultants and professionals managing client work. Avoid implying shared team memory, admin controls or multi-user collaboration.

## 2. Evidence and claim boundaries

| Area              | Verified foundation                                                                           | Safe website language                                                        | Do not imply                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Persistent memory | SQLite `user_memory`; remember, list and forget tools; stored facts included in later prompts | “Remembers useful details you share across conversations.”                   | Perfect recall of every chat, unlimited memory, semantic search of all history, continuous background learning      |
| Memory controls   | Users can ask to list and forget saved facts                                                  | “Ask what JARVIS remembers, or ask it to forget a saved detail.”             | A dedicated visual memory editor, conflict-resolution UI, or complete erasure of provider logs/history              |
| Voice input       | Push-to-talk and spoken requests; optional wake-word path                                     | “Speak your request, or type when you prefer.”                               | Always-listening reliability, full-duplex interruption, instant or guaranteed low-latency responses                 |
| Spoken responses  | Interactive response playback uses installed macOS voices                                     | “Hear responses using the voices available on your Mac.”                     | Human-indistinguishable speech, live voice cloning, or interactive cloud speech providers not connected to playback |
| Language          | English and Cantonese input paths/settings exist                                              | “English and Cantonese voice input,” after recording both successfully       | Every model obeys the language preference, perfect code-switching or a unique language advantage                    |
| Memory privacy    | Saved facts are stored locally and included in model prompts                                  | “Stored on your Mac. Shared with the AI provider when needed for a request.” | Memory never leaves the device when cloud inference is used                                                         |

Technical evidence is in the product repository: `src-tauri/src/ai/tools.rs` (memory tools and prompt injection), `src-tauri/src/ai/system_prompt_static.md`, `src-tauri/src/ai/local/prompt_inject.rs`, `src-tauri/src/voice/commands.rs`, `src-tauri/src/voice/wake_commands.rs`, `src-tauri/src/voice/tts.rs`, and `src-tauri/src/voice/transcribe.rs`.

The website serves v0.1.2 while the working product source is v0.1.3. Validate the exact downloadable beta used in the demo. Do not use newer source code alone as evidence for released behavior.

## 3. Homepage structure

1. **Memory + voice introduction.** Lead with the core promise, beta CTA and a real demonstration. Keep Mac compatibility and availability visible.
2. **One connected demonstration.** Show a spoken request to remember a detail, start a fresh conversation, and recall it. Show the saved fact and visible result. Give the video a useful caption and transcript.
3. **Memory pillar: “You shouldn’t have to start from zero.”** Explain saved preferences, project context and personal details, using concrete examples that the beta actually supports. Clearly distinguish saved facts from a full searchable conversation history.
4. **Voice pillar: “Say what you need.”** Show push-to-talk, a visible transcript and a spoken response. Provide text controls and captions. Present wake word as optional only after it passes release validation.
5. **Memory applied to work.** Show a saved reply preference used in a draft, a reminder created by voice, and remembered project context used in a later conversation. These remain recorded examples, not performance guarantees.
6. **Control and privacy.** Explain save/list/forget, local storage, provider access to memory, and the difference between deleting a saved fact and clearing conversation history.
7. **Connected tools.** Keep Gmail, Calendar, Notion, GitHub and Obsidian as supporting capabilities. Move the integration strip below the two primary pillars.
8. **FAQ and beta signup.** Answer memory scope, memory deletion, microphone behavior, supported languages, local/cloud processing, Mac requirements and provider setup.

Preserve the current white/graphite/deep-teal design. Make the recorded interaction the main visual. Avoid decorative brain diagrams, fake waveforms presented as real audio, and generated product screenshots.

## 4. Demonstration brief

Record with a fresh demo account and synthetic personal data. Keep original recordings; edit for clarity without concealing failures or making response timing look faster than it is.

### Hero: one detail, two conversations

1. Press push-to-talk and say: “Remember that I want short answers.”
2. Show the transcript and the successful saved-memory result.
3. Start a new chat. Say: “What have I asked you to remember about your answers?”
4. Show the recalled fact and spoken response.
5. Ask JARVIS to list its saved facts, then forget that specific fact. Verify that it is gone from the list.

Record this flow separately in English and Cantonese. The scripts are acceptance probes; exact words can change to match natural usage, but an unsuccessful request cannot be represented as a successful capability.

### Supporting examples

- **Preference:** Save a preference for concise replies; later draft a response and show the actual result in Gmail. Review/send remains the user's action.
- **Project context:** Save a synthetic project fact; in a new conversation ask JARVIS to recall it. Avoid claiming it can reconstruct an entire project's history.
- **Voice action:** Create a follow-up task with a due date and show the task result. Keep calendar editing distinct from Gmail draft approval behavior.

If the complete flow cannot be recorded on the current downloadable beta, keep the labelled illustration temporarily and describe the scope honestly. Release the needed product fix before advertising that stronger behavior.

## 5. Product validation required before stronger claims

These are concrete release checks, not new feature promises:

- [ ] Confirm remember → New Chat → recall → list → forget on the exact beta build, using text and push-to-talk separately.
- [ ] Verify that memory requests in clean user turns work reliably; current source includes a safety rule that can reject memory writes after external context is attached. Preserve that safety boundary and resolve false-positive behavior before claiming seamless memory.
- [ ] Confirm current memory recall limits and what happens as the stored fact list grows. The present implementation injects stored facts into prompts; it is not relevance-ranked retrieval.
- [ ] Check whether a supposedly forgotten detail remains in conversation history; explain the distinction in the memory FAQ.
- [ ] Verify microphone start/stop states, denied-microphone handling, transcription errors and a working manual stop path.
- [ ] Record English and Cantonese input and spoken output on the supported providers. Do not promise consistent output-language preference until confirmed.
- [ ] Verify whether the optional wake-word experience is reliable enough to feature. Keep push-to-talk as the default demonstration.
- [ ] Confirm memory and voice data flow for cloud and local configurations, including enabled cloud fallbacks.

## 6. Website implementation passes

### Pass A: establish the two-pillar story

**Files:** `content/home.ts`, `components/sections/home/HomeHero.tsx`, `HomeProduct.tsx`, `HomeDemo.tsx`, `HomeAudience.tsx`, `WorkflowPreview.tsx`, `app/[locale]/page.tsx`, `styles/globals.css`.

- [ ] Replace the Gmail-first introduction with the approved memory/voice positioning in both locales.
- [ ] Restructure the primary feature section into two substantial pillars, each with a concrete example and clear supported scope.
- [ ] Move integrations below the pillars and keep email/calendar examples concise.
- [ ] Replace the main illustrative workflow with the verified recording once available; use an honest labelled preview while the recording is pending.

**Acceptance:** In a five-second review, a new visitor can identify both memory and voice without scrolling into the setup section. No visible example advertises an unverified feature.

### Pass B: useful feature and setup content

**New files:** `content/features.ts`, `app/[locale]/memory/page.tsx`, `app/[locale]/voice/page.tsx`.

**Modify:** `content/setup.ts`, `app/[locale]/how-it-works/page.tsx`, navigation/footer labels, `content/copy.en.ts`, `content/copy.zh-hk.ts`, `content/metadata.ts`, `lib/constants/routes.ts`, `app/sitemap.ts`, `lib/seo/buildSoftwareApplicationJsonLd.ts`, `app/manifest.ts`, `app/social-image.png/route.tsx`.

- [ ] Memory page: what is saved, persistence across new chats, examples, list/forget controls, limitations and provider data flow.
- [ ] Voice page: push-to-talk steps, transcript/reply interaction, language support, microphone requirements and local/cloud speech boundaries.
- [ ] Setup guide: first voice request and first saved memory before introducing optional service connections.
- [ ] Align page titles, descriptions, sharing image, application schema and internal links with memory/voice positioning.
- [ ] Use “AI assistant for Mac”, “AI assistant with memory” and “voice assistant for Mac” naturally. These are intent hypotheses, not researched search-volume claims. Validate demand using Search Console after publication.

**Acceptance:** Both pages contain firsthand product guidance and equivalent English/Traditional Chinese content; canonical/hreflang, sitemap and navigation all resolve to the correct locale.

### Pass C: proof, accessibility and conversion

**Files:** new demonstration component under `components/sections/home/`, optimized recordings/posters/captions in `public/`, existing waitlist components, metadata/copy tests and `scripts/smoke-routes.mjs`.

- [ ] Publish edited, captioned recordings with no personal account information; include text transcripts and playback controls. No autoplay audio.
- [ ] Respect reduced motion and keyboard access. Keep images and video from blocking the introductory content.
- [ ] Extend existing claim and locale tests to cover memory scope, deletion limits, voice processing and feature routes.
- [ ] Track beta conversion and demo engagement using the existing analytics capability; events must not contain voice recordings, message text, memory facts, email addresses or API keys.
- [ ] Run tests, lint, production build, route smoke checks, and mobile/desktop review in both languages.

**Acceptance:** Visitors can request access without watching the video; interactive media works with keyboard/captions; privacy wording matches the exact released build.

## 7. What success means

- People describe JARVIS as a remembering, voice-enabled personal assistant rather than only an email tool.
- The demo visibly proves continuity between conversations.
- The two feature pages answer practical adoption questions without inflating capabilities.
- Evaluate qualified beta requests per landing-page visitor against the current design. Treat the initial comparison as directional because traffic sources may change.
- Ask new beta users which memory or voice workflow brought them in, and use that evidence to choose the next product improvement.

## 8. Immediate sequence

1. Publish the already-reviewed visual redesign.
2. Validate and record the memory/voice workflow on the actual beta.
3. Implement Pass A, then Pass B and Pass C as a coherent second release.
4. Review the actual preview and recordings before shipping the new claims.

No new product pricing, infrastructure changes or desktop feature implementation are part of this website plan.
