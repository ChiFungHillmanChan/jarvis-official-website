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
    sub: "We’re a Hong Kong company building an AI assistant for the everyday work on your Mac.",
    intro:
      "Client work comes with emails to answer, meetings to arrange and details to follow up. We’re building JARVIS to help you handle those everyday jobs in one desktop workspace, so more of your attention can go to the work that needs you.",
    cards: [
      {
        title: "Why we’re building JARVIS",
        body: "A reply can mean finding an earlier email, checking your calendar and remembering the next step. We want those connected jobs to be easier to handle through a conversation.",
      },
      {
        title: "What JARVIS does",
        body: "JARVIS connects to tools such as Gmail and Google Calendar. It helps you find messages, prepare email drafts, manage events and create tasks using text or voice on your Mac.",
      },
      {
        title: "Who we’re building for",
        body: "Founders, consultants and small teams who spend their days working with clients, email and meetings. We start with Apple Silicon Macs, with support for English and Cantonese.",
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
  privacy: {
    heading: "Privacy Policy",
    lastUpdated: "Last updated: 2026-07-27",
    sections: [
      {
        title: "Local storage by default",
        body: "JARVIS runs as a native macOS application. Conversation history, tasks, cached context, and connected service credentials are intended to remain on the user's device by default. JARVIS AI does not currently operate a customer data platform for storing this product data centrally. Where model requests are sent is a separate question, answered in the next section.",
      },
      {
        title: "Model providers and message content",
        body: "JARVIS answers a request by sending it to a model provider, so inference is not local by default. On a standard install that provider is Google: its Gemini API receives the message text and any email, calendar, or note content the assistant is asked to work with, sent under an API key the user supplies. Local inference is supported through a local Ollama endpoint configured in Settings under Local AI. Text requests handled by that endpoint are processed on the Mac, but enabled cloud fallbacks may still receive requests. Voice services and connected apps communicate with their own providers separately; selecting local text inference does not make them offline. Amazon Bedrock is used only if the user configures AWS credentials and selects it. JARVIS stores prompts and responses in the local database on the user's device; JARVIS AI does not receive or retain them. AI providers handle the content sent to them under their own data policies.",
      },
      {
        title: "Information collected on this website",
        body: "If you submit a beta access request or company inquiry, JARVIS AI collects the email address and request details you provide, together with the submission time. This information is used only to respond to your inquiry and manage beta access communication.",
      },
      {
        title: "Third-party service providers",
        body: "Website form submissions are delivered through Resend, a transactional email provider, and payments are processed by Stripe; JARVIS AI never stores raw card numbers. Inside the product, model requests go to the provider configured in the application, which on a standard install is Google. Each provider processes data only for the purpose it is engaged for, under its own published data processing commitments.",
      },
      {
        title: "Product integrations",
        body: "When a user connects third-party services such as Gmail, Google Calendar, Notion, GitHub, or Obsidian inside the product, those connections are made for the local macOS application. Service credentials are stored in macOS Keychain. Synced context is stored in a local SQLite database protected by macOS file permissions and any full-disk encryption the user has enabled; the database does not have separate application-level encryption. Connected services and configured AI providers may receive the content needed for a request.",
      },
      {
        title: "Your rights",
        body: "You can request access to, correction of, or deletion of any personal data JARVIS AI holds about you. Email contact@jarvis-automation.com with your request; we reply once we can verify you are the person the data relates to. You may also withdraw your consent to beta-related communications at any time.",
      },
      {
        title: "Contact",
        body: "Questions about this policy can be sent to contact@jarvis-automation.com.",
      },
    ],
  },
  security: {
    heading: "Security",
    lastUpdated: "Last updated: 2026-07-27",
    sections: [
      {
        title: "Local storage by default",
        body: "JARVIS runs as a native macOS application. Conversation history, tasks, cached context, and credentials for connected services stay on the user's device: product data is held in a local SQLite database, and API keys are held in the macOS Keychain. JARVIS AI operates no sync service and no product backend, so none of this data is uploaded to us. Where model inference runs is a separate question, answered below.",
      },
      {
        title: "Planned AWS cloud control plane",
        body: "The shipped product has no cloud sync, so no product data reaches JARVIS AI infrastructure today. Optional cloud features are planned on AWS in the Asia-Pacific (Singapore) region and would use Amazon Cognito for authentication, AWS KMS customer-managed keys (CMK) for envelope encryption, S3 with bucket-level encryption and TLS-only access for sync data, and DynamoDB for user metadata. Those stacks are defined as code (AWS CDK) and reviewed against the AWS Well-Architected Framework, but they are not connected to the application. This page will be updated before any of them handles customer data.",
      },
      {
        title: "Encryption at rest and in transit",
        body: "The only store of product data today is the local SQLite database on the user's device, protected by macOS file permissions and by whatever full-disk encryption the user has enabled. API keys and service credentials are kept in the macOS Keychain rather than in that database. Network traffic to this website and to third-party APIs uses TLS 1.2 or higher. Envelope encryption with a per-user data key wrapped by AWS KMS is the design for synced content once cloud sync ships; it is not in production, and there is no cloud-stored customer data to which it applies.",
      },
      {
        title: "Where model inference runs",
        body: "Inference is not local by default. On a standard install JARVIS sends the request to a cloud model provider, currently Google's Gemini API, so Google processes the message text and any email, calendar, or note content included in that request. The provider API key is supplied by the user; no model credentials are bundled with the software. Local inference is supported through a local Ollama endpoint configured in Settings under Local AI. Text requests handled by that endpoint are processed on the Mac, but enabled cloud fallbacks may still receive requests. Voice services and connected apps communicate with their own providers separately; selecting local text inference does not make them offline. Amazon Bedrock is used only when the user configures AWS credentials and selects it for heavier inference. JARVIS stores prompts and completions in the local database on the user's device; JARVIS AI does not receive or retain them. AI providers handle the content sent to them under their own data policies.",
      },
      {
        title: "Audit logging and monitoring",
        body: "No customer data lives in JARVIS AI cloud infrastructure today, so monitoring currently covers our own operations: AWS CloudTrail event history records control-plane actions in our accounts, and billing alerts flag anomalous spend. Fuller observability commitments will be published here before any cloud feature handles customer data.",
      },
      {
        title: "Service providers",
        body: "Model requests are processed by the providers configured in the application. On a standard install that provider is Google: its Gemini API receives the message text and any email, calendar, or note content the assistant is asked to work with. A local Ollama endpoint can process text requests on the Mac, but enabled cloud fallbacks may still receive requests. Voice services and connected apps communicate with their own providers separately. Website form submissions are delivered through Resend, a transactional email provider. Payments are processed by Stripe; JARVIS AI never stores raw card numbers. Each provider is bound by its own published security and data processing commitments.",
      },
      {
        title: "Access controls",
        body: "JARVIS AI is a single-operator company. AWS access is limited to scoped IAM identities used for release and infrastructure work, and there is no customer data in those accounts for any identity to reach. Formal role separation will be introduced, and documented here, before cloud features handle customer data.",
      },
      {
        title: "Reporting a security concern",
        body: "If you believe you have found a security issue with the website or the product, please email contact@jarvis-automation.com with [Security] in the subject line. We aim to acknowledge reports within 48 hours and keep reporters informed until the issue is resolved.",
      },
    ],
  },
  terms: {
    heading: "Terms of Service",
    lastUpdated: "Last updated: 2026-04-14",
    sections: [
      {
        title: "Website use",
        body: "This website is provided to describe JARVIS AI and its products, and to allow visitors to request beta access or contact the company. You may not misuse the site or interfere with its operation.",
      },
      {
        title: "Private beta access",
        body: "Access to the JARVIS private beta is offered at JARVIS AI's discretion. Features, availability, and pricing may change as the product develops.",
      },
      {
        title: "No warranty",
        body: "The website and any beta software are provided on an as-is basis to the maximum extent permitted by law. JARVIS AI does not guarantee uninterrupted availability or fitness for a particular purpose.",
      },
      {
        title: "Intellectual property",
        body: "JARVIS AI and JARVIS are company product and brand assets. Except where otherwise stated, the content, branding, and software described on this site remain the property of JARVIS AI.",
      },
      {
        title: "Governing law",
        body: "These terms are governed by the laws of the Hong Kong Special Administrative Region.",
      },
    ],
  },
  download: {
    eyebrow: "Download",
    title: "JARVIS for macOS",
    subtitle: "The private beta for Apple Silicon Macs. For use on your personal Mac.",
    systemRequirements: "Requires macOS 12 or later, Apple Silicon (M1 or later).",
    primaryCta: "Download for macOS",
    fallbackVersion: "0.1.0",
    fallbackCta: "Download v0.1.0",
    loadingNotes: "Loading release notes...",
    releaseNotesHeading: "What's new",
    nonMacosTitle: "Made for your Mac",
    nonMacosBody:
      "JARVIS currently supports Apple Silicon Macs. Leave your email to hear about product availability and future updates.",
    joinWaitlist: "Get product updates",
    fetchError:
      "Could not load the release details. The download below still points to the most recent build.",
  },
} as const;
