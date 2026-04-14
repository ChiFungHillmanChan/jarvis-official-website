import type { copy as enCopy } from "./copy.en";

export const copy: typeof enCopy = {
  sections: {
    pillars: {
      eyebrow: "核心原則",
      title: "語音．本地．代理。",
      sub: "產品圍繞三項承諾打造——不是宣傳標語。",
    },
    features: {
      eyebrow: "產品",
      title: "JARVIS 隨機附帶",
      sub: "32 個 AI 工具函數、五項服務整合、實時 3D 全息數據球——全部裝在約 10 MB 的原生執行檔。",
    },
    stats: {
      eyebrow: "數據一覽",
      title: "0.1.0 版本裡有甚麼",
    },
    demo: {
      eyebrow: "觀看",
      title: "看 JARVIS 實際運作",
      sub: "90 秒。語音、工具呼叫、3D 數據球，以及晨間簡報。",
    },
    preview: {
      eyebrow: "介面",
      title: "一塊玻璃．整合所有渠道。",
      sub: "電郵、日曆、Notion、GitHub、Obsidian 以及代理自身的語音，全部匯聚於單一本地介面。無需切換分頁，無需重新建立上下文。",
      labels: {
        tl: "模組 · 檢視",
        tr: "渲染 · 原生",
        bl: "資料 · 本地",
        br: "延遲 · <60ms",
      },
    },
    hud: {
      telemetry: {
        tl: ["J.A.R.V.I.S", "v0.1.0 · BETA"],
        tr: ["系統 · 上線", "延遲 · 42ms"],
        bl: ["已載入 32 個工具", "已同步 5 項服務"],
        br: ["記憶 · 11 表", "代理 · 就緒"],
      },
      status: "正在初始化代理 · 校準感知 · 等候輸入",
    },
  },
  hero: {
    h1: "以思考的速度操控你的桌面。",
    sub: "原生 macOS AI 助理——32 個工具、五項整合、一個語音操控指揮中心。本地優先。為工程師而設。",
    primaryCta: "加入 Beta 等候名單",
    secondaryCta: "觀看 90 秒示範",
  },
  trust:
    "入圍 AWS Idea Launcher 2026 · 採用 Claude + OpenAI · 運行於 AWS",
  pillars: [
    {
      title: "語音優先",
      body:
        "按 Cmd+Shift+J 隨按隨講。Whisper STT、macOS TTS，配合喚醒詞偵測。你的咪高峰即時驅動 3D 數據球。",
    },
    {
      title: "本地優先",
      body:
        "每一段對話、每一項任務、每一則快取訊息都儲存於你 Mac 上的本地 SQLite 資料庫。外部服務仍然是真相來源；沒有任何資料上傳到我們的伺服器。",
    },
    {
      title: "代理式",
      body:
        "AI 不只回答——它會行動。32 個可呼叫工具能開啟應用程式、執行 shell 指令、封存電郵、建立 Notion 頁面、排程 cron 工作、以及搜尋你的知識庫。",
    },
  ],
  features: [
    {
      title: "互動式 3D 數據球",
      body:
        "實時全息粒子場景。任務、電郵、日曆、GitHub、Notion 及 cron 工作各自以不同顏色的節點圍繞發光核心運行。語音振幅即時調整環形動效。",
    },
    {
      title: "語音輸入輸出",
      body:
        "按 Cmd+Shift+J 隨按隨講。採用 Whisper API，可回落至本地 whisper.cpp。macOS `say` 負責 TTS，可調整聲線及語速。",
    },
    {
      title: "32 個 AI 工具函數",
      body:
        "以 Claude 為主、OpenAI 作備援。原生工具呼叫支援多步驟解析。模型先行決策、執行、串連多步動作，然後才作回應。",
    },
    {
      title: "智能簡報",
      body:
        "啟動時,JARVIS 會整合任務、日曆、電郵及開啟中的 PR,生成晨間簡報。它會學習你的封存習慣,並在三次確認後提出自動封存規則。",
    },
    {
      title: "自動化引擎",
      body:
        "七項內置 cron 工作,再加上以自然語言生成的自訂工作。例如「每星期一朝九點檢查垃圾郵件」會編譯為真正的 cron 表達式,並保留執行紀錄。",
    },
    {
      title: "系統操控",
      body:
        "開啟應用程式、執行 shell 指令（附安全封鎖清單）、管理視窗、調整音量及亮度、擷取畫面、讀寫剪貼簿,以及發送原生通知。",
    },
  ],
  stats: [
    { value: 32, label: "個 AI 工具函數" },
    { value: 5, label: "項整合服務" },
    { value: 7, label: "項內置 cron 工作" },
    { value: 10, label: "MB 原生執行檔", suffix: "~" },
    { value: 11, label: "個本地 SQLite 表" },
    { value: 0, label: "項個人資料存放在我們的伺服器" },
  ],
  roadmap: {
    heading: "遷移至 AWS",
    sub: "未來 12 個月——雲端部分將遷移至 AWS,支援多裝置同步、團隊功能,並為香港區提供更低延遲的語音體驗。",
    services: [
      { name: "Amazon Bedrock", body: "模型路由及微調的助理代理。" },
      { name: "Amazon Transcribe", body: "串流 STT,兼顧延遲與資料落地。" },
      { name: "Amazon Polly", body: "神經網絡 TTS,取代 macOS `say`。" },
      { name: "AWS Lambda", body: "無伺服器後端,處理同步及 webhook。" },
      { name: "Amazon DynamoDB", body: "加密的多裝置狀態同步（可選啟用）。" },
      { name: "Amazon Cognito", body: "雲端同步層的使用者認證。" },
      { name: "Amazon S3", body: "加密的產物儲存（已在使用）。" },
      { name: "Amazon CloudWatch", body: "可觀測性、警報及 SLO。" },
    ],
  },
  founder: {
    heading: "在香港構建",
    body:
      "JARVIS AI 由 Hillman Chan 於 2026 年在香港創立。他是一位擁有兩年 AWS 生產環境經驗的 AI 工程師。我們為操作者、工程師及知識工作者打造代理式桌面軟件。入圍 AWS Idea Launcher 2026 計劃。",
    cta: "了解公司",
  },
  waitlistCta: {
    heading: "加入 Beta 等候名單",
    sub: "macOS 私人 Beta。無垃圾郵件,只有一封上線通知。",
    placeholder: "you@company.com",
    submit: "申請使用",
    success: "你已成功登記。我們會於上線前與你聯絡。",
    errorInvalid: "請輸入有效的電郵地址。",
    errorGeneric: "發生錯誤,請再試一次。",
  },
  integrations: ["Gmail", "Google Calendar", "Notion", "GitHub", "Obsidian", "Claude", "OpenAI", "AWS"],
  howItWorks: [
    {
      step: "擷取",
      body:
        "JARVIS 會在背景同步你已連接的服務——電郵每 5 分鐘、日曆每 5 分鐘、Notion 每 10 分鐘、GitHub 每 10 分鐘。",
    },
    {
      step: "推理",
      body:
        "你的請求——無論是打字還是講話——都會附加一份結構化快照（待辦任務、未讀數、開啟中的 PR、今日行程）,再送到 Claude,並授權它使用 32 個工具。",
    },
    {
      step: "行動",
      body:
        "模型會呼叫工具、串連步驟,在回覆之前解決多步任務。所有動作直接在你的 Mac 上執行。",
    },
  ],
  company: {
    heading: "公司",
    sub: "一間總部位於香港的 AI 初創,專注打造原生桌面代理。",
    sections: [
      {
        title: "使命",
        body:
          "操作者與工程師應得一個真正能夠「操作」的 AI。JARVIS 是你意圖與日常使用數十款應用程式之間的介面層——把幾分鐘的點擊,變成幾秒鐘的對話。",
      },
      {
        title: "創辦人",
        body:
          "Hillman Chan——創辦人兼 AI 工程師。22 歲,香港人。現任 Evoke AI Lab 的 AI 工程師。擁有兩年 AWS 生產環境經驗。過往已推出三款 AI 產品,包括一個擁有每日活躍用戶的網站生成器。",
      },
      {
        title: "我們身在何處",
        body:
          "香港特別行政區。公司註冊進行中。入圍由 AWS 聯同香港科技園合辦的 AWS Idea Launcher 2026 計劃。",
      },
    ],
  },
  contact: {
    heading: "聯絡我們",
    sub: "商業查詢、傳媒及 Beta 試用申請。",
    intro:
      "電郵是聯絡創辦人最直接的途徑。如欲接收產品更新,請於下方加入等候名單。",
  },
  privacy: {
    heading: "私隱政策",
    lastUpdated: "最後更新：2026-04-14",
    sections: [
      {
        title: "本地優先的設計",
        body:
          "JARVIS 以原生 macOS 應用程式運行。你的對話紀錄、任務、已快取的電郵及整合授權,全部儲存於你 Mac 上的本地 SQLite 資料庫。JARVIS AI（公司）並不營運任何儲存你個人資料的伺服器。",
      },
      {
        title: "本網站收集甚麼資料",
        body:
          "如你加入等候名單,我們會收集你提供的電郵地址及登記時間。這些資料僅用於向你發送 Beta 存取資訊。我們不會出售或分享等候名單上的電郵。",
      },
      {
        title: "你在應用程式內連接的第三方服務",
        body:
          "當你在 JARVIS 內連接 Gmail、Google Calendar、Notion、GitHub 或 Obsidian 時,即授權你 Mac 上的應用程式直接與該等服務通訊。API 憑證以加密方式儲存在你的裝置上,不會傳送至 JARVIS AI。",
      },
      {
        title: "AI 服務供應商",
        body:
          "預設情況下,你的請求會送往 Anthropic（Claude）及 OpenAI 作 AI 處理。該等供應商的私隱政策適用於其處理的內容。當 AWS 雲端遷移完成後,用戶可選擇 Amazon Bedrock 作為主要供應商。",
      },
      {
        title: "聯絡",
        body: "有關本政策的查詢：contact@jarvis-automation.com。",
      },
    ],
  },
  terms: {
    heading: "服務條款",
    lastUpdated: "最後更新：2026-04-14",
    sections: [
      {
        title: "Beta 軟件",
        body:
          "JARVIS 於 Activate 計劃期間以 Beta 軟件形式提供。功能可能會變更、失效或被撤下。我們不提供任何擔保。",
      },
      {
        title: "可接受使用",
        body:
          "你不得利用 JARVIS 違反任何法律、侵犯任何權利或危害任何系統。JARVIS 內的 shell 指令執行設有封鎖清單;繞過該清單的風險由你自行承擔。",
      },
      {
        title: "知識產權",
        body:
          "JARVIS AI 保留 JARVIS 軟件及品牌的所有權利。透過 JARVIS 生成的內容歸你所有,惟須遵守相關 AI 供應商的條款。",
      },
      {
        title: "責任限制",
        body:
          "在法律容許的最大範圍內,JARVIS AI 對因使用本軟件或本網站而引致的任何間接、附帶或衍生損失概不負責。",
      },
      {
        title: "適用法律",
        body:
          "本條款受香港特別行政區法律管轄。",
      },
    ],
  },
} as const;
