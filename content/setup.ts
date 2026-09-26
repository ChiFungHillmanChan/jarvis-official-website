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
  title: "Set up JARVIS for your working day.",
  intro:
    "JARVIS is a personal AI assistant for voice, text and connected workflows. The current beta runs on macOS. Start with a conversation, then use this guide to bring related Gmail messages together, add your context and ask the AI you chose for next steps you can check against the sources.",
  requirements: {
    title: "Before you start",
    items: [
      "The current beta requires a Mac with Apple Silicon and macOS 12 or later.",
      "Beta access and the JARVIS macOS app. JARVIS has not yet completed Google verification, so Google shows a warning before you connect an account; step 1 explains how to continue.",
      "An AI you already use: your own API key for OpenAI, Gemini, Claude, Kimi, Qwen or another OpenAI-compatible service, or a local Ollama model with no key. Provider usage is billed separately to your account. Your own AWS Bedrock is another email analysis option.",
      "For the email workflow: one or more Gmail accounts, and an internet connection for Gmail sync and cloud AI.",
    ],
  },
  stepsTitle: "From your first conversation to an email workflow",
  steps: [
    {
      title: "Request beta access and install JARVIS",
      body: "Join the waitlist to request access. If you already have beta access, use the download page to get the current macOS build. Open JARVIS and follow the onboarding steps.",
      note: "JARVIS has not yet completed Google verification. When you connect a Google account, during setup or in the email workspace, Google first shows “Google hasn’t verified this app”. To continue, choose Advanced, then the link to continue to JARVIS, and review the access requested before you allow it. Until verification is complete, only a limited number of Google accounts can connect; if Google refuses the sign-in, contact us.",
    },
    {
      title: "Choose your AI",
      body: "The first setup step asks which AI you use: a local Ollama model, OpenAI, Gemini, Claude, Kimi, Qwen or another OpenAI-compatible service. Enter your key, or pick a local model. JARVIS sends one short test message and saves your choice only if it answers, then checks email analysis with the same AI. Keys are stored in macOS Keychain.",
      note: "JARVIS uses only this AI unless you add others in the advanced settings. You can change it later in Settings → Models, under Your AI. Email analysis can use a different provider in its own settings and does not switch providers automatically on failure.",
    },
    {
      title: "Start a conversation with your assistant",
      body: "Open Assistant and type a request. To use voice, allow microphone access and review the voice settings. You can choose English or Cantonese speech recognition according to your needs.",
      note: "Voice uses cloud speech recognition only when Gemini is your chosen AI; otherwise a speech model on your Mac transcribes it, downloaded once (about 148 MB). Changing the interface language does not change the speech-recognition language.",
    },
    {
      title: "Connect Gmail and sync your messages",
      body: "In the email workspace, choose Connect Gmail account and approve read-only access. Add the accounts you want, then choose Sync for recent mail. To go further back, choose Load 50 older emails in the account settings.",
      note: "While JARVIS is open, new mail may also sync automatically about every five minutes. Local grouping does not change Gmail labels, send replies or delete the original messages. Attachments and full mailbox backup are not supported.",
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
      "The group's emails, instructions and relevant memories are sent for analysis to the AI you chose, using your account; with AWS Bedrock they go to the AWS service you configure. Your local copy remains on your Mac; cloud analysis is not offline processing.",
      "With a local Ollama model, analysis stays on your Mac. JARVIS uses only the AI you chose and does not fall back to another provider automatically. Optional AI email sorting, once you turn it on, also uses that AI, or TypeSafe for classification if you add its key. Google integrations and voice services have separate network use.",
    ],
  },
  next: {
    title: "Start with a real task from your day.",
    body: "Request beta access and tell us which task, inbox or project you want help with. Already a tester? Get the current macOS build and follow the steps above.",
    requestLabel: "Request beta access",
    downloadLabel: "Download for Mac",
    privacyLabel: "Read our privacy policy",
    securityLabel: "Read about security",
  },
};

const zhHk: SetupCopy = {
  eyebrow: "使用指南",
  title: "為日常工作設定你的 JARVIS。",
  intro:
    "JARVIS 是支援語音、文字及連接服務的個人 AI 助理，目前 Beta 適用於 macOS。先從一次對話開始，再依照本指南整理相關 Gmail 郵件、加入你的背景，並請你選擇的 AI 提出可以對照來源核對的下一步。",
  requirements: {
    title: "開始之前",
    items: [
      "目前 Beta 需要一部配備 Apple Silicon、執行 macOS 12 或以上版本的 Mac。",
      "Beta 使用資格及 JARVIS macOS 應用程式。JARVIS 尚未完成 Google 驗證，連接帳戶前 Google 會先顯示警告；第 1 步說明如何繼續。",
      "你已在使用的 AI：OpenAI、Gemini、Claude、Kimi、Qwen 或其他兼容 OpenAI 格式服務的 API 密鑰，或無須密鑰的本機 Ollama 模型。供應商用量另行計入你的帳戶。電郵分析亦可選擇你自己的 AWS Bedrock。",
      "進行電郵工作流程需要一個或多個 Gmail 帳戶，以及同步 Gmail 及使用雲端 AI 所需的網絡連線。",
    ],
  },
  stepsTitle: "從第一次對話到電郵工作流程",
  steps: [
    {
      title: "申請 Beta 資格並安裝 JARVIS",
      body: "加入候補名單以申請試用。如果你已有 Beta 使用資格，可以前往下載頁取得目前的 macOS 版本。開啟 JARVIS，然後按照首次設定指引操作。",
      note: "JARVIS 尚未完成 Google 驗證。在設定導引或電郵工作區連接 Google 帳戶時，Google 會先顯示應用程式未經驗證的警告。如要繼續，請選擇「進階」（Advanced），再選擇前往 JARVIS 的連結，並在允許前核對所要求的存取權限。完成驗證前，可連接的 Google 帳戶數目有限；如 Google 拒絕登入，請聯絡我們。",
    },
    {
      title: "選擇你的 AI",
      body: "首次設定的第一步會問你使用哪一個 AI：本機 Ollama 模型、OpenAI、Gemini、Claude、Kimi、Qwen 或其他兼容 OpenAI 格式的服務。輸入你的密鑰，或選擇本機模型。JARVIS 會先傳送一句簡短訊息測試，成功後才儲存，並以同一個 AI 確認電郵分析可用。密鑰儲存於 macOS Keychain。",
      note: "除非你在進階設定加入其他供應商，JARVIS 只會使用這一個 AI；之後可在「設定 → 模型」的「你的 AI」更換。電郵分析可在其設定中另選供應商，失敗時不會自動轉用其他供應商。",
    },
    {
      title: "開始與助理對話",
      body: "開啟「AI 助理」並輸入要求。使用語音時，請允許麥克風存取並檢查語音設定；你可以按需要選擇英文或廣東話語音辨識。",
      note: "只有當你選擇的 AI 是 Gemini 時，語音才會使用雲端辨識；否則由此 Mac 上的語音模型轉錄，只需下載一次（約 148 MB）。切換介面語言不會更改語音辨識語言。",
    },
    {
      title: "連接 Gmail，同步需要的郵件",
      body: "在電郵工作區按「連接 Gmail 帳戶」，授權唯讀存取。逐一加入你想使用的帳戶，再按「同步」取得最近的郵件；如需較早的郵件，可在帳戶設定按「載入 50 封較舊郵件」。",
      note: "JARVIS 開啟期間，新郵件亦可能約每五分鐘自動同步。本機分組不會更改 Gmail 標籤、寄信或刪除原信；目前未支援附件下載或完整信箱備份。",
    },
    {
      title: "選取郵件分組，加入你的指示",
      body: "為客戶、項目或申請建立群組，選取不同 Gmail 信箱的相關郵件加入。寫下你希望分析重點關注的問題、限期與細節。",
      prompt:
        "列出需要我回覆的問題與已確認限期，區分必要行動及可選建議，並引用原信。",
      note: "郵件與指示由你選擇；JARVIS 不會自動將新郵件加入這些群組。",
    },
    {
      title: "分析群組，開啟來源核對",
      body: "按「分析此群組」，閱讀結果，再開啟引用的原信，核對重要日期、金額與承諾。分析會提出下一步建議，不會寄信或更改日曆。",
      note: "分析最多使用最近 50 封郵件正文，並設有總輸入上限。App 會顯示未納入的郵件數量；引用有效不代表模型一定理解正確。",
    },
    {
      title: "儲存你已確認的背景",
      body: "將想保留的事實、偏好或承諾新增為群組記憶，可以附上來源郵件、設定到期日、標記完成、修改或刪除。模型不會自行儲存記憶。",
      note: "郵件、群組、指示與記憶會保留在這部 Mac。分析結果目前只保留於頁面，重開 App 後需要重新分析。",
    },
  ],
  calendar: {
    title: "需要回覆草稿或安排日曆？",
    body: "JARVIS 的一般助理使用獨立的 Google 連接與 AI 設定。在聊天中，你可以要求建立 Gmail 草稿，自行檢閱及寄出，或要求新增日曆活動。這些功能與以上群組分析分開。",
    prompt: "在明天下午 2 時建立一個 30 分鐘的日曆活動，名稱是「檢查提案」。",
    note: "電郵群組與記憶不會自動帶入一般聊天。日曆變更可在你提出要求後執行，並非每項操作都另設批准步驟；請到 Google Calendar 檢查結果。",
  },
  data: {
    title: "清楚了解資料的去向。",
    paragraphs: [
      "同步郵件文字、群組、指示與記憶儲存於 Mac 的本機 SQLite 資料庫，資料庫沒有獨立的應用層加密。API 密鑰與 Google refresh token 則儲存於 macOS Keychain。工作區屬於這部 Mac，未支援跨裝置同步。",
      "群組郵件、個人指示與有效記憶會透過你的帳戶傳送至你選擇的 AI 分析；選擇 AWS Bedrock 則傳送至你設定的 AWS 服務。本機副本仍然保留，但雲端分析並非離線處理。",
      "使用本機 Ollama 模型時，分析留在你的 Mac。JARVIS 只使用你選擇的 AI，不會自動轉用其他供應商。開啟 AI 自動整理後，整理亦使用該 AI；如你加入 TypeSafe 密鑰，則由 TypeSafe 負責分類。Google 整合及部分語音服務亦會連接網絡。",
    ],
  },
  next: {
    title: "由今天的一項實際工作開始。",
    body: "申請 Beta 試用，告訴我們你希望在哪項工作、信箱或項目上獲得協助。如果你已是測試者，可以下載目前的 macOS 版本，按以上步驟開始。",
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
