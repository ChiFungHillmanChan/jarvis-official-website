import { enLegal } from "./legal";
import { enHome } from "./home";
export const copy = {
  home: enHome,
  stats: [
    { value: 0, label: "company servers storing product data" },
    { value: 5, label: "core integrations" },
    { value: 7, label: "automation jobs" },
    { value: 17, label: "MB signed installer", suffix: "~" },
    { value: 1, label: "flagship macOS product" },
  ],
  waitlistCta: {
    placeholder: "you@company.com",
    submit: "Request access",
    success: "Your request has been received. We will be in touch as the beta opens.",
    errorInvalid: "Please enter a valid email address.",
    errorGeneric: "Something went wrong. Please try again.",
    roleLabel: "Your role (optional)",
    rolePlaceholder: "Your role (optional)",
    painLabel: "What could JARVIS help with? (optional)",
    painPlaceholder: "What could JARVIS help with?",
  },
  companyPage: {
    heading: "About JARVIS AI",
    sub: "We’re a Hong Kong company building a personal AI assistant for everyday work.",
    intro:
      "Client work comes with emails to answer, meetings to arrange and details to follow up. We’re building JARVIS to help you handle those everyday jobs in one desktop workspace, so more of your attention can go to the work that needs you.",
    cards: [
      {
        title: "Why we’re building JARVIS",
        body: "A reply can mean finding an earlier email, checking your calendar and remembering the next step. We want those connected jobs to be easier to handle through a conversation.",
      },
      {
        title: "What JARVIS does",
        body: "JARVIS brings Gmail accounts into a workspace on your Mac, with cross-inbox groups, personal instructions, GPT analysis and memories you confirm. Its general assistant also supports email drafts, calendar events and tasks through separate connections and settings.",
      },
      {
        title: "Who we’re building for",
        body: "Founders, consultants and small teams who spend their days working with clients, email and meetings. The current beta supports Apple Silicon Macs, with an English and Traditional Chinese interface and Cantonese voice support.",
      },
    ],
    principlesHeading: "What matters to us",
    principles: [
      "Make everyday jobs easier: finding the right message, preparing a reply and keeping track of the next step.",
      "Be clear about what the assistant can do, which services it connects to and where your information goes.",
      "Build with early users, using their real working days to decide what to improve next.",
    ],
    closing:
      "JARVIS is currently in private beta. If your day involves client emails, meetings and follow-ups, we’d like to hear what takes up your time and how we could help.",
  },
  contactPage: {
    heading: "Contact JARVIS AI",
    sub: "Business inquiries, beta access requests, and company introductions.",
    intro:
      "Email is the clearest way to reach the company. Use the beta access form if you want product updates or private beta consideration.",
    directHeading: "Direct contact",
    directBody:
      "For partnerships, investor conversations, media requests, or product introductions, contact the company directly.",
    inquiryHeading: "Good reasons to reach out",
    inquiryItems: [
      "Private beta access for teams or individual operators",
      "Partnership and integration conversations",
      "Press or interview requests",
      "Company introductions and investor outreach",
    ],
    accessHeading: "Request beta access",
    accessSub: "We review requests for the private macOS beta and reply as capacity opens.",
    privacyNote:
      "By submitting your email, you agree that JARVIS AI may use it to reply to your request and send beta-related updates.",
    privacyLinkLabel: "Privacy Policy",
  },
  privacy: enLegal.privacy,
  security: enLegal.security,
  terms: enLegal.terms,
  download: {
    eyebrow: "Download",
    title: "JARVIS for macOS",
    subtitle: "The current beta release for Apple Silicon Macs.",
    systemRequirements: "Requires macOS 12 or later, Apple Silicon (M1 or later).",
    primaryCta: "Download for macOS",
    loadingNotes: "Loading release notes...",
    releaseNotesHeading: "What's new",
    nonMacosTitle: "Currently available for macOS",
    nonMacosBody:
      "JARVIS currently supports Apple Silicon Macs. Leave your email to hear about product availability and future updates.",
    joinWaitlist: "Get product updates",
    fetchError:
      "Could not load the release details. The download below still points to the most recent build.",
  },
} as const;
