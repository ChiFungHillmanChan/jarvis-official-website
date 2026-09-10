import type { DeepWiden } from "./copy.types";

export const enHome = {
  hero: {
    label: "Your AI assistant for Mac",
    title: "A little less busywork.\nA lot more headspace.",
    sub: "Bring your inbox, calendar and next steps together. JARVIS helps you find what matters, draft the reply and get on with your day.",
    primaryCta: "Request beta access",
    secondaryCta: "Explore JARVIS",
    availability: "For Apple Silicon Macs. Currently in private beta.",
  },
  preview: {
    label: "A closer look at your day",
    caption: "Illustrative workflows using sample data. The beta interface may differ.",
    tabsLabel: "Explore example workflows",
    sidebarTitle: "Your workspace",
    sidebarItems: ["Assistant", "Inbox", "Calendar", "Tasks"],
    footer: "On your Mac",
    input: "Ask JARVIS to help with your day…",
    sample: "Example conversation",
    connected: "Connected to your work",
    tabs: [
      {
        label: "Draft a reply",
        title: "One less email to think about.",
        prompt: "Draft a reply to Alex confirming we received the project brief.",
        response: "Here’s a draft for you to review in Gmail.",
        cardLabel: "Gmail draft",
        cardTitle: "Re: Website project brief",
        recipient: "To: Alex Morgan",
        body: "Hi Alex,\n\nThanks for sending over the brief. We’ve received it and will review the details before our next call.\n\nSpeak soon,",
        status: "Ready for your review",
        detail: "You review and send the email in Gmail.",
      },
      {
        label: "Check your calendar",
        title: "Know what’s coming next.",
        prompt: "What’s on my calendar tomorrow?",
        response: "You have two events on your calendar tomorrow.",
        cardLabel: "Google Calendar",
        cardTitle: "Tomorrow’s schedule",
        recipient: "Tuesday, 15 September",
        body: "09:30 – 10:00\nProject check-in\n\n14:00 – 15:00\nClient discovery call",
        status: "Your schedule, in one place",
        detail: "Ask about events from the calendar you connect.",
      },
      {
        label: "Get a briefing",
        title: "Start with the bigger picture.",
        prompt: "Give me a quick briefing for today.",
        response: "Here’s a summary of your schedule and approaching deadlines.",
        cardLabel: "Daily briefing",
        cardTitle: "A clear place to start",
        recipient: "Email, calendar and tasks",
        body: "Your next meeting is the project check-in at 09:30.\n\nThere are unread messages in your inbox.\n\nThe proposal follow-up task is due today.",
        status: "Bring your next steps into focus",
        detail: "Briefings draw on the context available in your workspace.",
      },
    ],
  },
  product: {
    title: "From “I should”\nto “taken care of”.",
    sub: "For the work between the work. The replies, calendar checks and follow-ups that fill your day.",
    items: [
      {
        label: "Email, with a head start",
        title: "Find the thread.\nGet the reply going.",
        body: "Search your Gmail, catch up on a conversation and ask for a reply draft without starting from a blank page. JARVIS prepares the words. You review and send them in Gmail.",
        prompt: "Find the latest email about the proposal.",
        result: "Find messages, read threads and prepare drafts.",
        icon: "mail",
      },
      {
        label: "A clearer schedule",
        title: "Make time for\nwhat comes next.",
        body: "Check upcoming meetings, create a planning block or reschedule an event through a conversation. JARVIS works with the Google Calendar you connect, so you can plan with the right context.",
        prompt: "Move my planning block to 3 pm.",
        result: "Calendar changes can run when you request them.",
        icon: "calendar",
      },
      {
        label: "Follow-through, built in",
        title: "Keep the next step\nfrom slipping away.",
        body: "Turn a loose end into a task with a deadline. Start with a concise briefing of your schedule, unread email and approaching deadlines, then choose what to tackle first.",
        prompt: "Add a follow-up task for Friday.",
        result: "Create tasks with priorities and due dates.",
        icon: "check",
      },
    ],
  },
  integrations: {
    title: "Your familiar tools.\nA more connected day.",
    sub: "Connect the services you use. Bring their context into one conversation on your Mac.",
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
    sub: "Talk or type. JARVIS brings your connected context into a desktop workspace, with support for English and Cantonese.",
    steps: [
      {
        title: "Make it yours",
        body: "Install the beta, choose an AI provider and connect the tools you want to use.",
      },
      {
        title: "Ask in your own words",
        body: "Find an email, check your schedule or add a follow-up. Use text or voice.",
      },
      {
        title: "Take the next step",
        body: "Review email drafts in Gmail and keep track of your tasks and calendar changes.",
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
        body: "The default setup uses Google Gemini with your API key. Requests and relevant context go to that provider. An optional local model is available through Ollama.",
      },
      {
        title: "Email drafts stay drafts",
        body: "JARVIS prepares replies for you to review and send in Gmail. Calendar and other supported actions can run when you request them.",
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
          "JARVIS is a desktop AI assistant for Mac. It connects to tools such as Gmail and Google Calendar so you can find information, draft replies, manage events and create tasks through text or voice. It is currently in private beta.",
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
          "Yes, the default cloud setup uses your own Google Gemini API key. Provider usage and any associated costs are separate from JARVIS. You can also configure an optional local model through Ollama; its performance depends on your Mac and the model you choose.",
      },
      {
        question: "Does everything stay on my Mac?",
        answer:
          "Your conversations and synced context are stored on your Mac, but inference is not local by default. With the default Gemini setup, your request and relevant email, calendar or note content are sent to Google. Ollama can process text requests locally, but enabled cloud fallbacks may still receive requests. Voice services and connected apps have separate network use; review their settings too.",
      },
      {
        question: "Can JARVIS send emails or change my calendar?",
        answer:
          "JARVIS creates Gmail drafts; you review and send the messages yourself. Calendar events can be created, rescheduled or removed when you ask. There is not a universal approval step for every action, and sending calendar invitations is not supported.",
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
    label: "你的 Mac AI 助理",
    title: "少一點瑣事。\n多一點思考空間。",
    sub: "讓收件匣、行事曆和下一步，回到同一個工作空間。JARVIS 助你找出重點、草擬回覆，專心處理手上的工作。",
    primaryCta: "申請 Beta 試用",
    secondaryCta: "探索 JARVIS",
    availability: "適用於 Apple Silicon Mac，現正進行私人 Beta 測試。",
  },
  preview: {
    label: "看看 JARVIS 如何融入你的一天",
    caption: "以下為使用示例資料的工作流程示意，Beta 版本介面或有不同。",
    tabsLabel: "探索工作流程示例",
    sidebarTitle: "你的工作空間",
    sidebarItems: ["助理", "收件匣", "行事曆", "待辦事項"],
    footer: "在你的 Mac 上",
    input: "讓 JARVIS 幫你處理今天的工作…",
    sample: "對話示例",
    connected: "連結你的日常工作",
    tabs: [
      {
        label: "草擬回覆",
        title: "少一封需要費心的電郵。",
        prompt: "幫我回覆 Alex，確認已收到項目簡介。",
        response: "這是回覆草稿，你可以在 Gmail 檢閱。",
        cardLabel: "Gmail 草稿",
        cardTitle: "Re: 網站項目簡介",
        recipient: "收件人：Alex Morgan",
        body: "Alex 你好，\n\n謝謝你傳來項目簡介。我們已經收到，會在下次通話前仔細閱讀內容。\n\n到時再談，",
        status: "等待你檢閱",
        detail: "由你在 Gmail 檢閱並傳送電郵。",
      },
      {
        label: "查看行事曆",
        title: "下一個安排，一目了然。",
        prompt: "明天的行事曆有甚麼安排？",
        response: "你明天的行事曆有兩個活動。",
        cardLabel: "Google Calendar",
        cardTitle: "明天的安排",
        recipient: "9 月 15 日，星期二",
        body: "09:30 – 10:00\n項目進度會議\n\n14:00 – 15:00\n客戶需求會議",
        status: "同一處掌握所有安排",
        detail: "查看你已連結行事曆中的活動。",
      },
      {
        label: "取得每日簡報",
        title: "先掌握今天的全貌。",
        prompt: "給我一份今天的簡短工作摘要。",
        response: "以下是你的行程及即將到期的待辦事項。",
        cardLabel: "每日簡報",
        cardTitle: "讓今天有個清晰的開始",
        recipient: "電郵、行事曆及待辦事項",
        body: "下一個會議是 09:30 的項目進度會議。\n\n你的收件匣有未讀郵件。\n\n提案跟進事項將於今天到期。",
        status: "清楚掌握下一步",
        detail: "簡報會根據工作空間中可用的資料整理。",
      },
    ],
  },
  product: {
    title: "從「記得要做」，\n到「已經處理」。",
    sub: "回覆電郵、查看安排、跟進客戶。讓每天穿插在重要工作之間的小事，更容易處理。",
    items: [
      {
        label: "回覆電郵，更易起步",
        title: "找到對話，\n開始寫好回覆。",
        body: "搜尋 Gmail、了解對話內容，再請 JARVIS 草擬回覆，毋須每次從空白頁開始。JARVIS 準備文字，由你在 Gmail 檢閱及傳送。",
        prompt: "找出關於提案的最新一封電郵。",
        result: "搜尋郵件、閱讀對話、準備草稿。",
        icon: "mail",
      },
      {
        label: "行程安排，更加清晰",
        title: "為下一步，\n安排好時間。",
        body: "透過對話查看會議、新增專注時段或調整活動時間。JARVIS 會使用你已連結的 Google Calendar，讓你掌握安排再作計劃。",
        prompt: "把我的計劃時段改到下午 3 點。",
        result: "行事曆變更可在你提出要求時直接執行。",
        icon: "calendar",
      },
      {
        label: "每個跟進，都有著落",
        title: "下一步，\n不再輕易遺忘。",
        body: "把未完的工作變成有截止日期的待辦事項。先透過簡短摘要掌握行程、未讀郵件及即將到期的工作，再決定從哪件事開始。",
        prompt: "新增一個星期五跟進的待辦事項。",
        result: "建立附有優先次序及截止日期的待辦事項。",
        icon: "check",
      },
    ],
  },
  integrations: {
    title: "熟悉的工具，\n更連貫的工作。",
    sub: "連結你常用的服務，在 Mac 上的一段對話中掌握所需資料。",
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
    sub: "用文字，或直接開口。JARVIS 把已連結的資料帶到桌面工作空間，支援英文及廣東話。",
    steps: [
      { title: "設定你的工作空間", body: "安裝 Beta 版本、選擇 AI 供應商，再連結你想使用的工具。" },
      {
        title: "用自己的方式提出要求",
        body: "搜尋電郵、查看行程或新增跟進事項，可使用文字或語音。",
      },
      { title: "完成下一步", body: "在 Gmail 檢閱電郵草稿，並掌握待辦事項及行事曆變更。" },
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
        body: "預設設定使用你的 API 金鑰連接 Google Gemini，要求及相關內容會傳送至該供應商。你亦可透過 Ollama 設定本機模型。",
      },
      {
        title: "電郵草稿始終是草稿",
        body: "JARVIS 準備回覆，由你在 Gmail 檢閱並傳送。行事曆及其他支援的操作可在你提出要求時執行。",
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
          "JARVIS 是 Mac 桌面 AI 助理，可連接 Gmail、Google Calendar 等工具，讓你透過文字或語音搜尋資料、草擬回覆、管理活動及建立待辦事項。產品現正進行私人 Beta 測試。",
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
          "需要。預設雲端設定使用你自己的 Google Gemini API 金鑰，供應商用量及相關費用與 JARVIS 分開計算。你亦可透過 Ollama 設定本機模型；表現取決於你的 Mac 及所選模型。",
      },
      {
        question: "所有資料都會留在我的 Mac 嗎？",
        answer:
          "對話及同步內容儲存在你的 Mac，但推理預設並非在本機執行。使用預設 Gemini 設定時，你的要求及相關電郵、行事曆或筆記內容會傳送至 Google。Ollama 可在本機處理文字請求，但已啟用的雲端後備供應商仍可能接收請求。語音服務及已連結應用程式會各自使用網絡，亦需檢查相關設定。",
      },
      {
        question: "JARVIS 可以傳送電郵或更改行事曆嗎？",
        answer:
          "JARVIS 會建立 Gmail 草稿，由你自行檢閱及傳送。當你提出要求時，JARVIS 可新增、改期或移除行事曆活動。並非每項操作都有獨立確認步驟，目前亦不支援傳送行事曆邀請。",
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
