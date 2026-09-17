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
    "Bring related email from your Gmail accounts into one workspace on your Mac. Group the messages, explain what matters to you, then use GPT to find next steps you can check against the original emails. Here is how to start with the private beta.",
  requirements: {
    title: "Before you start",
    items: [
      "A Mac with Apple Silicon and macOS 12 or later.",
      "Beta access and the JARVIS macOS app. Google sign-in may require your account to be added as a beta tester.",
      "Your own OpenAI API key for the GPT workflow below. Provider usage is billed separately to your account. Local Ollama and your own AWS Bedrock are other email analysis options.",
      "One or more Gmail accounts, and an internet connection for Gmail sync and cloud AI.",
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
      title: "Choose GPT for your email analysis",
      body: "Save your OpenAI API key in Settings, then open the email workspace and choose OpenAI GPT in Analysis settings. Review and confirm which content will be sent: the group's emails, instructions and relevant memories. JARVIS stores your API key in macOS Keychain.",
      note: "Email analysis has its own provider selection and does not automatically switch providers on failure. General chat and voice have separate settings.",
    },
    {
      title: "Connect Gmail and sync your messages",
      body: "In the email workspace, choose Connect Gmail account and approve read-only access. Add the accounts you want, then sync recent mail. Each sync loads up to 50 messages; choose Load older emails to continue.",
      note: "You start each sync. Local grouping does not change Gmail labels, send replies or delete the original messages. Attachments and full mailbox backup are not supported.",
    },
    {
      title: "Group related messages and add your instructions",
      body: "Create a group for a client, project or application. Select the relevant messages across your Gmail accounts and add them to the group. Write instructions for the questions, deadlines and details you want the analysis to focus on.",
      prompt:
        "List the questions I need to answer and any confirmed deadlines. Separate required actions from optional suggestions, and cite the original emails.",
      note: "You choose the messages and instructions. JARVIS does not automatically sort new mail into these groups.",
    },
    {
      title: "Analyse the group and check the sources",
      body: "Choose Analyse this group. Read the result, then open its source emails to check important dates, amounts and commitments. The analysis proposes next steps; it does not send email or change your calendar.",
      note: "Analysis includes up to the latest 50 message bodies and has an overall input limit. The app shows omitted messages. A valid citation does not guarantee that the model understood the email correctly.",
    },
    {
      title: "Save the context you have confirmed",
      body: "Add a group memory for a fact, preference or commitment you want to keep. You can attach a source email, set an expiry date, mark it done, edit it or delete it. The model does not save memories by itself.",
      note: "Emails, groups, instructions and memories persist on this Mac. Analysis results currently stay in the page session; run the analysis again after reopening the app.",
    },
  ],
  calendar: {
    title: "Need a draft or time on your calendar?",
    body: "JARVIS also has a general assistant with its own Google connection and AI settings. In chat, you can request a Gmail draft to review and send yourself, or ask for a calendar event. These are separate from the email group analysis above.",
    prompt: "Create a 30-minute calendar event tomorrow at 2 pm called Review the proposal.",
    note: "Email groups and their memories are not automatically shared with general chat. Calendar changes can run when you request them; a separate approval step is not guaranteed for every action. Check the resulting event in Google Calendar.",
  },
  data: {
    title: "Understand where your information goes.",
    paragraphs: [
      "Synced email text, groups, instructions and memories are stored in a local SQLite database on your Mac. The database has no separate application-level encryption. Provider API keys and Google refresh tokens are stored in macOS Keychain. This is a workspace on one Mac, without cross-device sync.",
      "When you choose GPT, the group's emails, instructions and relevant memories are sent to OpenAI for analysis using your API account. With AWS Bedrock they go to the AWS service you configure. Your local copy remains on your Mac; cloud analysis is not offline processing.",
      "Email analysis can also use a supported local Ollama model, without automatically falling back to cloud AI. General chat uses its own provider order, with Gemini as its default cloud option and optional fallbacks. Google integrations and voice services have separate network use.",
    ],
  },
  next: {
    title: "Start with a real task from your day.",
    body: "Request beta access and tell us which inbox or project is hardest to keep up with. Already a tester? Get the current Mac build and follow the steps above.",
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
    "將幾個 Gmail 帳戶嘅相關電郵，集中到 Mac 上同一個工作區。先分組、交代你重視嘅背景，再用 GPT 整理可以對照原信核對嘅下一步。以下係私人 Beta 嘅開始方法。",
  requirements: {
    title: "開始之前",
    items: [
      "一部配備 Apple Silicon、執行 macOS 12 或以上版本的 Mac。",
      "Beta 使用資格及 JARVIS macOS 應用程式。你的 Google 帳戶可能需要先加入測試者名單，才能登入。",
      "以下 GPT 流程需要你自己嘅 OpenAI API key，供應商用量另行計入你嘅帳戶。電郵分析亦可選本機 Ollama 或你自己嘅 AWS Bedrock。",
      "一個或多個 Gmail 帳戶，以及同步 Gmail 同使用雲端 AI 所需嘅網絡。",
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
      title: "選擇 GPT 分析電郵",
      body: "喺 Settings 儲存 OpenAI API key，再打開電郵工作區，喺「分析設定」揀 OpenAI GPT。閱讀並確認會傳送嘅內容：群組郵件、個人指示同有效記憶。JARVIS 會將 API key 存喺 macOS Keychain。",
      note: "電郵分析有獨立供應商設定，失敗唔會自動轉用其他供應商。一般聊天同語音有各自設定。",
    },
    {
      title: "連接 Gmail，同步需要嘅郵件",
      body: "喺電郵工作區按「連接 Gmail 帳戶」，授權唯讀存取。逐個加入你想用嘅帳戶，再按「同步最近郵件」。每次最多載入 50 封；按「載入更舊郵件」繼續。",
      note: "每次同步由你啟動。本機分組唔會更改 Gmail 標籤、寄信或刪除原信；目前未支援附件下載或完整信箱備份。",
    },
    {
      title: "選信分組，加入你嘅指示",
      body: "為客戶、項目或申請建立群組，跨 Gmail 信箱揀相關郵件加入。寫低你想分析重點關注嘅問題、限期同細節。",
      prompt:
        "列出要我回覆嘅問題同已確認限期，分清必要行動同可選建議，並引用原信。",
      note: "郵件同指示由你揀；JARVIS 唔會自動將新郵件分入呢啲群組。",
    },
    {
      title: "分析群組，打開來源核對",
      body: "按「分析呢個群組」，閱讀結果，再打開引用原信，核對重要日期、金額同承諾。分析會提出下一步建議，唔會寄信或更改日曆。",
      note: "分析最多使用最近 50 封郵件正文，並設總輸入上限。App 會顯示未納入郵件數量；引用有效唔代表模型一定理解正確。",
    },
    {
      title: "儲存你確認過嘅背景",
      body: "將想保留嘅事實、偏好或承諾新增為群組記憶，可以附上來源郵件、設定到期日、標記完成、修改或刪除。模型唔會自行儲存記憶。",
      note: "郵件、群組、指示同記憶會保留喺呢部 Mac。分析結果目前只留喺頁面，重開 App 後要再按分析。",
    },
  ],
  calendar: {
    title: "需要回覆草稿，或者安排日曆？",
    body: "JARVIS 亦有一般助理，使用獨立 Google 連接同 AI 設定。喺聊天中，你可以要求建立 Gmail 草稿，自行檢閱及寄出，或者要求新增日曆活動。呢啲功能同以上群組分析分開。",
    prompt: "在明天下午 2 時建立一個 30 分鐘的日曆活動，名稱是「檢查提案」。",
    note: "電郵群組同記憶唔會自動帶入一般聊天。日曆變更可喺你提出要求後執行，唔係每項操作都另設批准步驟；請到 Google Calendar 檢查結果。",
  },
  data: {
    title: "清楚了解資料的去向。",
    paragraphs: [
      "同步郵件文字、群組、指示同記憶會存喺 Mac 嘅本機 SQLite 資料庫，資料庫冇獨立應用層加密。API key 同 Google refresh token 則存喺 macOS Keychain。工作區屬於呢部 Mac，未支援跨裝置同步。",
      "揀 GPT 時，群組郵件、個人指示同有效記憶會透過你嘅 API 帳戶傳到 OpenAI 分析；揀 AWS Bedrock 則傳到你設定嘅 AWS 服務。本機副本仍然保留，但雲端分析唔係離線處理。",
      "電郵分析亦支援合適嘅本機 Ollama 模型，唔會自動轉用雲端。一般聊天有獨立供應商次序，預設雲端選項為 Gemini，並可設定後備供應商。Google 整合同語音服務各自有網絡使用。",
    ],
  },
  next: {
    title: "由今天的一項實際工作開始。",
    body: "申請 Beta 試用，話畀我哋知邊個信箱或項目最難跟得貼。如果你已經係測試者，可以下載目前 Mac 版本，按以上步驟開始。",
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
