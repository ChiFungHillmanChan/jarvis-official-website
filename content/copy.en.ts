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
        body: "JARVIS brings Gmail accounts into a workspace on your Mac, with cross-inbox groups, personal instructions, GPT analysis and memories you confirm. Its general assistant also supports email drafts, calendar events and tasks through separate connections and settings.",
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
    lastUpdated: "Last updated: 2026-09-11",
    sections: [
      {
        title: "Who this policy is from",
        body: "This website and the JARVIS application are operated by JARVIS AI LIMITED, a company incorporated in Hong Kong with limited liability (Company No. 81247037, Business Registration No. 81247037-000-09-26-7), registered office Unit 1806, 18/F., 9 Wing Hong Street, Cheung Sha Wan, Hong Kong. References to \"JARVIS AI\" in this policy mean that company. It is the data user responsible for the personal data described below, and can be reached at contact@jarvis-automation.com.",
      },

      {
        title: "Local storage by default",
        body: "JARVIS runs as a native macOS application. Conversation history, tasks, cached context, and connected service credentials are intended to remain on the user's device by default. JARVIS AI does not currently operate a customer data platform for storing this product data centrally. Where model requests are sent is a separate question, answered in the next section.",
      },
      {
        title: "General assistant: model providers and message content",
        body: "General chat sends requests to its configured model provider, so inference is not local by default. Its default cloud provider is Google: the Gemini API receives message text and relevant email, calendar, or note content included in a request, using an API key the user supplies. Local inference is supported through a local Ollama endpoint configured in Settings under Local AI, but enabled cloud fallbacks may still receive requests. Voice services and connected apps communicate with their own providers separately; selecting local text inference does not make them offline. Amazon Bedrock is used only if the user configures AWS credentials and selects it. General chat history is stored in the local database on the user's device; JARVIS AI does not centrally store it. AI providers handle the content sent to them under their own data policies. The email workspace has separate settings, described below.",
      },
      {
        title: "Email workspace, GPT and memories",
        body: "The email workspace connects Gmail accounts with read-only access. Synced email text, groups, personal instructions and user-created memories are stored on this Mac, without cross-device sync. When you choose OpenAI GPT, the group's emails, instructions and relevant active memories are sent to OpenAI using your API key. If you choose AWS Bedrock, that content goes to your configured AWS service. Cloud analysis requires confirmation of this data use in Analysis settings, and provider usage is billed to your account. A supported local Ollama model is also available. Email analysis does not automatically fall back to another provider. The model does not save memories on your behalf; you create and manage them. Analysis results currently remain in the page session and must be generated again after reopening the app. Disconnecting Gmail keeps local copies; explicitly deleting the account removes its local emails and memories sourced from them, without deleting Gmail originals. Provider data policies still apply to cloud requests.",
      },
      {
        title: "Information collected on this website",
        body: "If you submit a beta access request or company inquiry, JARVIS AI collects the email address and request details you provide, together with the submission time. This information is used only to respond to your inquiry and manage beta access communication.",
      },
      {
        title: "Third-party service providers",
        body: "Website form submissions are delivered through Resend, a transactional email provider. The Stripe payment integration is in test mode; paid plans have not launched, and JARVIS AI does not store raw card numbers. Product model requests go to the selected provider: OpenAI or AWS for the corresponding email analysis mode, and the configured provider for general chat, whose default is Google Gemini. Provider data handling is governed by its own published policies.",
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
    lastUpdated: "Last updated: 2026-09-11",
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
        title: "Where general assistant inference runs",
        body: "For general chat, inference is not local by default. Its default provider is Google's Gemini API, which receives message text and relevant email, calendar, or note content included in the request. API keys are supplied by the user; no model credentials are bundled with the software. Local inference is supported through a local Ollama endpoint configured in Settings under Local AI, but enabled cloud fallbacks may still receive requests. Voice services and connected apps communicate with their own providers separately. Amazon Bedrock is used only when the user configures AWS credentials and selects it. General chat history is stored on the user's device; JARVIS AI does not centrally store it. The email workspace uses its own settings and does not inherit this fallback chain.",
      },
      {
        title: "Email workspace permissions and processing",
        body: "Gmail access in the email workspace is read-only. Sync is started by the user; groups are local and do not change Gmail labels. Analysis has no email-sending, calendar or other action tools. In OpenAI GPT mode, group emails, instructions and relevant active memories go to OpenAI using your API key; in AWS Bedrock mode, they go to your configured AWS service. Cloud modes require acknowledgement of this data use in Analysis settings. Email analysis does not automatically change providers after a failure. A supported local Ollama model can process the analysis on your Mac. Copies of emails, groups and memories remain local, while analysis results currently remain only in the page session. Memories are created and managed by the user. Citation checks verify source references, but do not guarantee that an answer is factually correct; check important details against the original email. Each cloud provider's data policies still apply.",
      },
      {
        title: "Audit logging and monitoring",
        body: "No customer data lives in JARVIS AI cloud infrastructure today, so monitoring currently covers our own operations: AWS CloudTrail event history records control-plane actions in our accounts, and billing alerts flag anomalous spend. Fuller observability commitments will be published here before any cloud feature handles customer data.",
      },
      {
        title: "Service providers",
        body: "Model requests are processed by the selected provider. OpenAI GPT and AWS Bedrock email analysis send the group's emails, instructions and relevant memories to the corresponding service. General chat defaults to Google Gemini and has its own provider and fallback settings. Voice services and connected apps communicate with their providers separately. Website form submissions are delivered through Resend. The Stripe payment integration is in test mode; paid plans have not launched, and JARVIS AI does not store raw card numbers. Provider security and data handling are governed by each provider's published policies.",
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
        title: "Who you are contracting with",
        body: "This website and the JARVIS application are provided by JARVIS AI LIMITED, a company incorporated in Hong Kong with limited liability (Company No. 81247037, Business Registration No. 81247037-000-09-26-7), registered office Unit 1806, 18/F., 9 Wing Hong Street, Cheung Sha Wan, Hong Kong. References to \"JARVIS AI\" in these terms mean that company.",
      },

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
