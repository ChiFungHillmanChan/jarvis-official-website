export const copy = {
  sections: {
    pillars: {
      eyebrow: "Principles",
      title: "Voice. Local. Agentic.",
      sub: "Three commitments the product is built around — not marketing copy.",
    },
    features: {
      eyebrow: "Product",
      title: "What JARVIS ships with",
      sub: "32 AI tool functions, five integrations, and a real-time holographic data sphere — all on a ~10 MB native binary.",
    },
    stats: {
      eyebrow: "By the numbers",
      title: "What's in the 0.1.0 binary",
    },
    demo: {
      eyebrow: "Watch",
      title: "See JARVIS in action",
      sub: "90 seconds. Voice, tool calls, the 3D data sphere, and the morning briefing.",
    },
    preview: {
      eyebrow: "Interface",
      title: "One glass. Every channel.",
      sub: "Mail, calendar, Notion, GitHub, Obsidian, and the agent's own voice converge on a single local surface. No tab-chasing. No context loss.",
      labels: {
        tl: "MODULE · VIEW",
        tr: "RENDER · NATIVE",
        bl: "DATA · LOCAL",
        br: "LATENCY · <60ms",
      },
    },
    hud: {
      telemetry: {
        tl: ["J.A.R.V.I.S", "v0.1.0 · BETA"],
        tr: ["SYS · ONLINE", "LAT · 42ms"],
        bl: ["32 TOOLS LOADED", "5 SERVICES SYNCED"],
        br: ["MEM · 11 TBL", "AGENT · READY"],
      },
      status: "INITIALIZING AGENT · CALIBRATING SENSES · AWAITING INPUT",
    },
  },
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
