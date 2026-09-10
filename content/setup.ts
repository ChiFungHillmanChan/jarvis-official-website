import type { Locale } from "@/i18n/routing";

type SetupCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  requirements: { title: string; items: readonly string[] };
  stepsTitle: string;
  steps: readonly { title: string; body: string; prompt?: string; note?: string }[];
  calendar: { title: string; body: string; prompt: string; note: string };
  data: { title: string; paragraphs: readonly string[] };
  next: {
    title: string;
    body: string;
    requestLabel: string;
    downloadLabel: string;
    privacyLabel: string;
    securityLabel: string;
  };
};

const en: SetupCopy = {
  eyebrow: "How it works",
  title: "From your inbox to your next action.",
  intro:
    "JARVIS is a desktop AI assistant for Mac. Connect Gmail and Google Calendar, then ask for help understanding your inbox, preparing replies and planning your day. Here is what you need to get started with the beta.",
  requirements: {
    title: "Before you start",
    items: [
      "A Mac with Apple Silicon and macOS 12 or later.",
      "Beta access and the JARVIS macOS app. Google sign-in may require your account to be added as a beta tester.",
      "Your own AI provider API key. Gemini is the default cloud option; a local Ollama model is an optional alternative.",
      "A Google account for the Gmail and Calendar workflow, and an internet connection for Google services and cloud AI.",
    ],
  },
  stepsTitle: "Your first workflow",
  steps: [
    {
      title: "Request beta access and install JARVIS",
      body: "Join the waitlist to request access. If you already have beta access, use the download page to get the current macOS build. Open JARVIS and follow the onboarding steps.",
      note: "If Google sign-in says your account is blocked or the app is not verified, contact us to check your tester access.",
    },
    {
      title: "Choose where your AI requests run",
      body: "Add your Gemini API key during onboarding or in Settings under API Keys. Cloud requests use your provider account, so its usage limits and charges apply. JARVIS stores provider keys in macOS Keychain.",
      note: "For local text inference, configure a local Ollama endpoint in Settings. Check your provider order and fallbacks: a configured cloud fallback can still receive requests.",
    },
    {
      title: "Connect Gmail and Google Calendar",
      body: "Use the Google connection step during onboarding, or connect later in Settings. Sign in with your beta account and review the permissions. JARVIS can read email, create drafts, manage supported inbox actions and work with calendar events.",
      note: "Connecting Google gives JARVIS the context for these workflows. You can disconnect the account in Settings.",
    },
    {
      title: "Ask for one useful email draft",
      body: "Open chat and give JARVIS a specific task. Start with a sender, a subject or an outcome so you can check the result against the original email.",
      prompt:
        "Find the latest email from Alex about the proposal. Summarize what they need and create a reply draft saying I will send the revised version tomorrow.",
      note: "This is an example prompt. Replace the name and subject with an email in your own inbox.",
    },
    {
      title: "Review the draft in Gmail",
      body: "Open Gmail Drafts and check the recipient, facts, tone and any dates. Edit the reply as needed, then send it from Gmail. JARVIS creates the draft; its AI tools do not send email.",
    },
  ],
  calendar: {
    title: "Turn a follow-up into time on your calendar.",
    body: "Once Google Calendar is connected, you can ask JARVIS to find events or create a time block. Include a date, time and duration so the request is clear.",
    prompt: "Create a 30-minute calendar event tomorrow at 2 pm called Review the proposal.",
    note: "Calendar changes can be carried out when you request them. Check the resulting event in Google Calendar; a separate approval step is not guaranteed for every action.",
  },
  data: {
    title: "Understand where your information goes.",
    paragraphs: [
      "JARVIS stores conversation history, tasks and synced context in a local database on your Mac. Provider API keys and Google refresh tokens are stored in macOS Keychain. Local storage describes where the app keeps its records.",
      "AI processing is separate. Gemini is the default cloud provider, and message content or relevant email context can be sent to the configured provider to answer a request. Connecting Gmail and Calendar also involves communication with Google services.",
      "A local Ollama endpoint is available for local text inference. That setting does not make Google integrations or every voice service work offline. Review the selected providers and fallback settings before choosing how to use the app.",
    ],
  },
  next: {
    title: "Start with a real task from your day.",
    body: "Request beta access and tell us about the email or calendar workflow you want help with. Already a tester? Get the current Mac build and follow the steps above.",
    requestLabel: "Request beta access",
    downloadLabel: "Download for Mac",
    privacyLabel: "Read our privacy policy",
    securityLabel: "Read about security",
  },
};

const zhHk: SetupCopy = {
  eyebrow: "使用指南",
  title: "從收件箱，走到下一步行動。",
  intro:
    "JARVIS 是為 Mac 打造的桌面 AI 助理。連接 Gmail 和 Google Calendar 後，你可以請它整理電郵重點、準備回覆及安排日程。以下是開始使用 Beta 版本所需的準備和步驟。",
  requirements: {
    title: "開始之前",
    items: [
      "一部配備 Apple Silicon、執行 macOS 12 或以上版本的 Mac。",
      "Beta 使用資格及 JARVIS macOS 應用程式。你的 Google 帳戶可能需要先加入測試者名單，才能登入。",
      "你自己的 AI 供應商 API 金鑰。Gemini 是預設雲端選項，你也可以選擇設定本機 Ollama 模型。",
      "用於 Gmail 和 Calendar 工作流程的 Google 帳戶，以及連接 Google 服務和雲端 AI 所需的網絡。",
    ],
  },
  stepsTitle: "你的第一個工作流程",
  steps: [
    {
      title: "申請 Beta 資格並安裝 JARVIS",
      body: "加入候補名單以申請試用。如果你已有 Beta 使用資格，可以前往下載頁取得目前的 macOS 版本。開啟 JARVIS，然後按照首次設定指引操作。",
      note: "如果 Google 登入顯示帳戶受限制或應用程式尚未驗證，請聯絡我們確認你的測試者資格。",
    },
    {
      title: "選擇 AI 請求的處理方式",
      body: "在首次設定時輸入 Gemini API 金鑰，或稍後到 Settings 的 API Keys 加入。雲端請求使用你的供應商帳戶，適用於該帳戶的用量限制及收費。JARVIS 會將金鑰儲存在 macOS Keychain。",
      note: "如需本機文字推理，可在 Settings 設定本機 Ollama 端點。請檢查供應商次序及後備選項：已設定的雲端後備供應商仍可能接收請求。",
    },
    {
      title: "連接 Gmail 和 Google Calendar",
      body: "在首次設定的 Google 連接步驟中登入，或稍後到 Settings 連接。使用已獲 Beta 資格的 Google 帳戶，並細閱授權權限。JARVIS 可以讀取電郵、建立草稿、執行支援的收件箱操作及處理日曆活動。",
      note: "Google 連接會為這些工作流程提供所需內容。你可以在 Settings 中中斷帳戶連接。",
    },
    {
      title: "請 JARVIS 準備一封實用的電郵草稿",
      body: "開啟聊天並提出具體要求。提供寄件人、主旨或預期結果，方便你對照原本的電郵核實內容。",
      prompt:
        "找出 Alex 最近關於提案的電郵，整理他的要求，並建立回覆草稿，告訴他我會在明天寄出修訂版本。",
      note: "這是一個示範指令。請將姓名和主旨換成你收件箱中的實際電郵內容。",
    },
    {
      title: "到 Gmail 檢查草稿",
      body: "開啟 Gmail 草稿，檢查收件人、內容、語氣及日期。按需要修改後，再從 Gmail 寄出。JARVIS 負責建立草稿；其 AI 工具不會寄出電郵。",
    },
  ],
  calendar: {
    title: "在日曆上，為跟進工作留出時間。",
    body: "連接 Google Calendar 後，你可以請 JARVIS 查找活動或建立工作時段。清楚列出日期、時間及長度，讓要求更明確。",
    prompt: "在明天下午 2 時建立一個 30 分鐘的日曆活動，名稱是「檢查提案」。",
    note: "JARVIS 可以在你提出要求後執行日曆變更。請到 Google Calendar 檢查建立的活動；並非每項操作都會另設批准步驟。",
  },
  data: {
    title: "清楚了解資料的去向。",
    paragraphs: [
      "JARVIS 將對話記錄、任務及同步內容儲存在 Mac 的本機資料庫。供應商 API 金鑰和 Google 更新權杖則儲存在 macOS Keychain。本機儲存指的是應用程式保留記錄的位置。",
      "AI 處理是另一回事。Gemini 是預設雲端供應商，訊息及相關電郵內容可能會傳送至所選供應商，以回應你的要求。連接 Gmail 和 Calendar 也需要與 Google 服務通訊。",
      "你可以設定本機 Ollama 端點進行文字推理，但這不代表 Google 整合或所有語音服務都能離線運作。使用前，請檢查已選擇的供應商及後備設定。",
    ],
  },
  next: {
    title: "由今天的一項實際工作開始。",
    body: "申請 Beta 試用，並告訴我們你希望改善的電郵或日曆工作流程。如果你已是測試者，可以下載目前的 Mac 版本，按以上步驟開始使用。",
    requestLabel: "申請 Beta 試用",
    downloadLabel: "下載 Mac 版本",
    privacyLabel: "閱讀私隱政策",
    securityLabel: "了解安全措施",
  },
};

const byLocale: Record<Locale, SetupCopy> = { en, "zh-HK": zhHk };

export function getSetupCopy(locale: string): SetupCopy {
  return byLocale[locale as Locale] ?? en;
}
