import type { DeepWiden } from "./copy.types";

export const enHome = {
  hero: {
    label: "AI email workspace for Mac",
    title: "Your email.\nA clearer next step.",
    sub: "Bring your Gmail accounts together. Find the deadlines, understand the context, and check the source with JARVIS.",
    primaryCta: "Request beta access",
    secondaryCta: "Try the demo",
    availability: "Private beta for Apple Silicon Macs.",
  },
  product: {
    title: "The context behind\nevery next step.",
    sub: "A workspace that follows the way you think about work: by client, by project, and by what needs your attention.",
    items: [
      {
        label: "Bring it together",
        title: "Different inboxes.\nThe same project.",
        body: "Sync multiple Gmail accounts to one workspace on your Mac. Search the mail you have synced, then select related messages and group them across inboxes.",
        prompt: "Client launch · 3 emails · 2 inboxes",
        result: "You choose the emails. Gmail stays unchanged.",
        icon: "mail",
      },
      {
        label: "Make it personal",
        title: "Your priorities.\nPart of the brief.",
        body: "Give each group its own instructions. Ask GPT to consider those instructions and your confirmed memories, then follow its references back to the source emails.",
        prompt: "Focus on deadlines. Always include the source.",
        result: "An analysis you can check against the originals.",
        icon: "context",
      },
      {
        label: "Keep the useful details",
        title: "Less repeating.\nMore continuity.",
        body: "Save a fact, preference or commitment with its source. Edit it, mark it done or remove it. Active, relevant memories can inform your next group analysis.",
        prompt: "A Friday update for Alex. Confirmed by you.",
        result: "Your memory. Your decision to keep it.",
        icon: "memory",
      },
    ],
  },
  integrations: {
    title: "Your familiar tools.\nA more connected day.",
    sub: "Beyond the email workspace, the general assistant connects to the tools you already use. Each connection has its own setup.",
    items: [
      { name: "Gmail", description: "Find messages. Draft replies." },
      { name: "Google Calendar", description: "Check and manage events." },
      { name: "Notion", description: "Search and create pages." },
      { name: "GitHub", description: "Catch up on issues and PRs." },
      { name: "Obsidian", description: "Find context in your notes." },
    ],
    note: "Connections are optional. Each service needs its own setup and permissions.",
  },
  setup: {
    title: "At home on your Mac.",
    sub: "Start with the emails and context that matter to you. The setup guide walks you through Gmail, GPT and your first group.",
    steps: [
      {
        title: "Make it yours",
        body: "Install the beta, add your OpenAI API key and choose GPT in the email workspace.",
      },
      {
        title: "Bring your emails together",
        body: "Connect Gmail, sync the messages you need and group related emails across accounts.",
      },
      {
        title: "Take the next step",
        body: "Add your instructions, analyse the group and check the cited source emails.",
      },
    ],
    link: "Read the setup guide",
    requirement: "macOS 12 or later. Apple Silicon (M1 or later).",
  },
  trust: {
    title: "Your workspace.\nClear boundaries.",
    sub: "Privacy starts with knowing where your information goes. Here’s how JARVIS works today.",
    items: [
      {
        title: "Stored on your Mac",
        body: "Your conversations, tasks and synced context are stored in a local database. Service credentials are kept in macOS Keychain.",
      },
      {
        title: "Your choice of AI",
        body: "Use GPT with your OpenAI API key for group analysis. Relevant email content, instructions and memories go to OpenAI. Local storage does not mean offline processing.",
      },
      {
        title: "You stay in control",
        body: "The email workspace reads your Gmail without changing it. You choose the groups and confirm the memories. Group analysis does not send email or change your calendar.",
      },
    ],
    link: "Learn about privacy and security",
  },
  company: {
    title: "Built in Hong Kong.\nMade for your working day.",
    body: "We’re building JARVIS for founders, consultants and small teams who manage client work on a Mac. We’re working with early users to make the everyday details easier to handle.",
    link: "Meet JARVIS AI",
  },
  faq: {
    title: "A few things\nyou might be wondering.",
    contact: "Something else on your mind?",
    contactLink: "Get in touch",
    items: [
      {
        question: "What is JARVIS?",
        answer:
          "JARVIS is a personal AI email workspace and desktop assistant for Mac. Bring multiple Gmail accounts together, group related emails, add your own instructions and ask GPT for analysis with source references. The current version is a private beta.",
      },
      {
        question: "Who is it for?",
        answer:
          "JARVIS is designed for Mac-based founders, consultants, agency owners and other client-facing professionals who spend much of their day in email and meetings. You can use it in English or Cantonese.",
      },
      {
        question: "Which Macs are supported?",
        answer:
          "The current beta requires macOS 12 or later and an Apple Silicon Mac, such as an M1, M2, M3 or later model. Intel Macs, Windows and Linux are not supported by the current release.",
      },
      {
        question: "Do I need my own AI API key?",
        answer:
          "For GPT group analysis, use your own OpenAI API key. Provider usage charges are separate from JARVIS. The email workspace also supports a local model or your own AWS Bedrock configuration. The general assistant has separate AI settings.",
      },
      {
        question: "Does everything stay on my Mac?",
        answer:
          "Synced emails, group instructions and confirmed memories are stored on your Mac. GPT analysis sends the relevant context to OpenAI; Bedrock sends it to AWS. Group analysis results are shown in the app and are not automatically saved as memories. The general assistant, voice services and connected apps have separate data flows.",
      },
      {
        question: "Can JARVIS send emails or change my calendar?",
        answer:
          "The email workspace is read-only: group analysis cannot send emails or change your calendar. The separate general assistant can create Gmail drafts for you to review and send, and can change calendar events when requested. Not every general-assistant action has a separate confirmation step.",
      },
      {
        question: "How do I join the beta, and what does it cost?",
        answer:
          "Request beta access using the form below. We’ll contact you as onboarding places become available. The current beta download is free; paid plans have not been announced. Any usage charges from your chosen AI provider are separate.",
      },
    ],
  },
  access: {
    title: "Make room for\na better working day.",
    sub: "Join the private beta for Mac. Tell us a little about your work, and help shape what JARVIS takes care of next.",
    note: "Already have beta access?",
    download: "Download for Mac",
    contactLinkLabel: "Contact the company",
    privacyNote: "We’ll use your details to respond to your request and send beta updates.",
    privacyLinkLabel: "Privacy policy",
  },
} as const;

export const zhHome: DeepWiden<typeof enHome> = {
  hero: {
    label: "Mac 上的 AI 電郵工作區",
    title: "理清電郵，\n看清下一步。",
    sub: "集中你的 Gmail 帳戶，讓 JARVIS 整理限期、理解背景，每個重點都有來源可核對。",
    primaryCta: "申請 Beta 試用",
    secondaryCta: "試用示範",
    availability: "適用於 Apple Silicon Mac，現正進行私人 Beta 測試。",
  },
  product: {
    title: "每個下一步，\n都有背景可循。",
    sub: "按客戶、按項目、按你關心的事情整理，讓工作區跟上你的思考方式。",
    items: [
      {
        label: "集中所需內容",
        title: "不同信箱，\n同一個項目。",
        body: "在 Mac 的同一個工作區同步多個 Gmail，搜尋已同步的郵件，再跨信箱選取相關內容，加入同一個群組。",
        prompt: "客戶發佈項目 · 3 封郵件 · 2 個信箱",
        result: "郵件由你選擇，Gmail 內容不會改動。",
        icon: "mail",
      },
      {
        label: "按你的方式處理",
        title: "你的重點，\n也是分析的重點。",
        body: "為每個群組寫下專屬指示，讓 GPT 參考指示及你已確認的記憶進行分析，再跟隨引用核對來源原信。",
        prompt: "留意截止日期，每次附上來源。",
        result: "每份分析，都可以返回原信核對。",
        icon: "context",
      },
      {
        label: "保留有用細節",
        title: "少一點重複，\n多一點連貫。",
        body: "儲存附有來源的事實、偏好或承諾。你可以修改、標記完成或刪除，讓有效而相關的記憶協助下次群組分析。",
        prompt: "星期五向 Alex 更新進度，已由你確認。",
        result: "你的記憶，由你決定是否保留。",
        icon: "memory",
      },
    ],
  },
  integrations: {
    title: "熟悉的工具，\n更連貫的工作。",
    sub: "電郵工作區以外，一般助理亦可連接你常用的工具，每項連接均有獨立設定。",
    items: [
      { name: "Gmail", description: "搜尋郵件，草擬回覆。" },
      { name: "Google Calendar", description: "查看及管理活動。" },
      { name: "Notion", description: "搜尋及建立頁面。" },
      { name: "GitHub", description: "掌握 Issue 和 PR。" },
      { name: "Obsidian", description: "從筆記中找出所需資料。" },
    ],
    note: "所有連結均屬自選，每項服務需獨立設定及授權。",
  },
  setup: {
    title: "為你的 Mac 而設。",
    sub: "從你關心的郵件和背景開始。設定指南會帶你連接 Gmail、選擇 GPT，並建立第一個群組。",
    steps: [
      {
        title: "設定你的工作空間",
        body: "安裝 Beta、加入你的 OpenAI API 金鑰，並在電郵工作區選擇 GPT。",
      },
      {
        title: "集中你的郵件",
        body: "連接 Gmail、同步需要的郵件，再跨信箱選信分組。",
      },
      { title: "完成下一步", body: "加入個人指示、分析群組，再核對引用的來源原信。" },
    ],
    link: "閱讀設定指南",
    requirement: "需要 macOS 12 或以上，以及 Apple Silicon（M1 或更新）晶片。",
  },
  trust: {
    title: "你的工作空間，\n清晰的資料界線。",
    sub: "了解資料會傳送到哪裡，是保障私隱的第一步。以下是 JARVIS 目前的運作方式。",
    items: [
      {
        title: "資料儲存在 Mac",
        body: "對話、待辦事項及同步內容儲存在本機資料庫。服務憑證則存放於 macOS 鑰匙圈。",
      },
      {
        title: "AI 供應商，由你選擇",
        body: "使用你的 OpenAI API 金鑰，以 GPT 分析群組。相關郵件、指示及記憶會傳送至 OpenAI。本機儲存不等於離線處理。",
      },
      {
        title: "決定權始終在你手上",
        body: "電郵工作區只讀取 Gmail，不會改動內容。群組由你選擇，記憶由你確認。群組分析不會寄信或更改行事曆。",
      },
    ],
    link: "了解私隱及安全措施",
  },
  company: {
    title: "在香港建立，\n為每天的工作而設。",
    body: "我們為使用 Mac 處理客戶工作的創辦人、顧問及小型團隊開發 JARVIS，並與早期用戶一起，讓日常細節更容易處理。",
    link: "認識 JARVIS AI",
  },
  faq: {
    title: "你可能想知道的事。",
    contact: "還有其他問題？",
    contactLink: "聯絡我們",
    items: [
      {
        question: "JARVIS 是甚麼？",
        answer:
          "JARVIS 是 Mac 個人化 AI 電郵工作區及桌面助理，可集中多個 Gmail、將相關郵件分組、加入個人指示，再讓 GPT 產生附來源引用的分析。目前版本正進行私人 Beta 測試。",
      },
      {
        question: "JARVIS 適合誰使用？",
        answer:
          "JARVIS 為使用 Mac 的創辦人、顧問、代理公司負責人及其他客戶服務專業人士而設，尤其適合經常處理電郵和會議的工作。你可使用英文或廣東話。",
      },
      {
        question: "支援哪些 Mac？",
        answer:
          "目前的 Beta 版本需要 macOS 12 或以上，以及配備 Apple Silicon 晶片的 Mac，例如 M1、M2、M3 或更新的型號。目前版本不支援 Intel Mac、Windows 或 Linux。",
      },
      {
        question: "我需要自己的 AI API 金鑰嗎？",
        answer:
          "使用 GPT 群組分析需要你自己的 OpenAI API 金鑰，供應商用量費用與 JARVIS 分開計算。電郵工作區亦支援本機模型或你自己的 AWS Bedrock 設定；一般助理有獨立 AI 設定。",
      },
      {
        question: "所有資料都會留在我的 Mac 嗎？",
        answer:
          "已同步郵件、群組指示及已確認記憶儲存在 Mac。GPT 分析會將相關背景傳送至 OpenAI；Bedrock 會傳送至 AWS。群組分析結果在 App 顯示，不會自動儲存為記憶。一般助理、語音服務及連接的應用程式另有資料流程。",
      },
      {
        question: "JARVIS 可以傳送電郵或更改行事曆嗎？",
        answer:
          "電郵工作區屬唯讀：群組分析不能寄信或更改行事曆。獨立的一般助理可以建立 Gmail 草稿，由你檢閱及傳送，亦可按要求更改行事曆活動。一般助理並非每項操作都有獨立確認步驟。",
      },
      {
        question: "如何加入 Beta？費用是多少？",
        answer:
          "請使用下方表格申請試用。我們會在有名額時聯絡你安排入門。現有 Beta 版本可免費下載，付費計劃尚未公布。所選 AI 供應商的用量費用另計。",
      },
    ],
  },
  access: {
    title: "為更好的工作日，\n留一點空間。",
    sub: "申請 Mac 私人 Beta 試用。告訴我們你的工作情況，一起決定 JARVIS 下一步可以幫忙處理甚麼。",
    note: "已取得 Beta 試用資格？",
    download: "下載 Mac 版本",
    contactLinkLabel: "聯絡公司",
    privacyNote: "我們會使用你提供的資料回覆申請及發送 Beta 更新。",
    privacyLinkLabel: "私隱政策",
  },
};
