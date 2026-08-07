import type { copy as enCopy } from "./copy.en";
import type { DeepWiden } from "./copy.types";

export const copy: DeepWiden<typeof enCopy> = {
  home: {
    hero: {
      eyebrow: "JARVIS AI",
      title: "為營運者與工程師而設的桌面 AI。",
      sub:
        "JARVIS 是一款原生 macOS 助理，把電郵、日曆、筆記、GitHub 以及系統操作整合成一個專注的工作介面。香港打造。本地優先。",
      primaryCta: "申請 Beta 試用",
      secondaryCta: "查看公司資料",
      summaryLabel: "目前版本",
      summaryTitle: "JARVIS for macOS",
      summaryBadge: "私人 Beta",
      summaryBody:
        "面向專業人士的私人 Beta 軟件，為經常在桌面環境處理溝通、排程與執行工作的人提供單一指揮介面。",
      bullets: [
        "原生 macOS 產品，現正進行私人 Beta",
        "桌面、電郵、日曆、筆記與程式碼工具，統一於同一指令介面",
        "今天以本地優先為基礎，未來加入 AWS 雲端同步能力",
      ],
      imageAlt: "JARVIS for macOS 產品介面預覽",
    },
    trust: {
      eyebrow: "快速了解",
      title: "我哋係邊個，喺度做緊乜。",
      items: [
        {
          title: "公司",
          body: "以香港為基地的桌面 AI 軟件初創，專注為營運者與工程師打造產品。",
        },
        {
          title: "產品",
          body: "JARVIS for macOS 是公司的旗艦產品，現正進行私人 Beta。",
        },
        {
          title: "平台",
          body: "今天以裝置本地運作為主，未來會以 AWS 提供選擇性同步與語音基礎設施。",
        },
      ],
    },
    product: {
      eyebrow: "產品",
      title: "把原本分散於五六個應用程式的工作，收斂到一個專注介面。",
      sub:
        "JARVIS 的設計目標，是令使用者感受到一個安靜而有秩序的工作空間，而不是一堆功能堆疊。",
      imageCaption: "產品預覽",
      items: [
        {
          title: "統一日常上下文",
          body: "把電郵、日曆、筆記、程式碼上下文與桌面操作集中在一起，減少來回切換分頁與視窗。",
        },
        {
          title: "語音與鍵盤操作",
          body: "以自然語言觸發工作流程、查詢上下文或執行操作，同時維持在原生 macOS 環境內工作。",
        },
        {
          title: "本地優先架構",
          body: "對話紀錄、任務與已連接的上下文預設留在裝置內，只有在真正帶來價值時才引入雲端服務。",
        },
      ],
    },
    audience: {
      eyebrow: "適用對象",
      title: "為習慣用鍵盤管理工作的人而設。",
      sub:
        "產品面向需要快速掌握上下文、低摩擦執行操作，以及比瀏覽器分頁更高控制力的技術與營運使用者。",
      groups: [
        {
          title: "營運者",
          body: "用 JARVIS 在同一層指令介面管理 inbox、日曆、跟進事項與重複性桌面工作。",
        },
        {
          title: "工程師",
          body: "把 GitHub、筆記、任務與系統操作留在同一桌面工作流程中，而不是分散在多個視窗。",
        },
        {
          title: "創辦人與管理者",
          body: "當工作同時涉及溝通、規劃與執行時，更快由上下文走到下一步行動。",
        },
      ],
    },
    company: {
      eyebrow: "公司",
      title: "產品網站背後，亦有清晰的公司定位。",
      sub:
        "JARVIS AI 是以香港為基地的 AI 軟件初創，2026 年啟動，現階段專注於產品驗證、私人 Beta 用戶招募，以及首批以 AWS 為基礎的雲端服務部署。",
      cards: [
        {
          title: "產品焦點",
          body: "JARVIS for macOS 是公司的旗艦產品，為營運者與工程師打造的桌面 AI 助理，現正進行私人 Beta。",
        },
        {
          title: "AWS 雲端藍圖",
          body: "計劃採用 Bedrock、Transcribe、Polly、Lambda、DynamoDB、Cognito、S3 與 CloudWatch 建立選擇性同步、語音與可觀測性能力。",
        },
        {
          title: "團隊",
          body: "由一位具備 AWS 生產環境經驗、推出過多款 AI 產品的工程師創立及營運，以香港為基地。",
        },
      ],
    },
    demo: {
      eyebrow: "產品預覽",
      title: "看看目前的 macOS 版本。",
      sub:
        "短片示範 JARVIS 如何把電郵、日曆、筆記與系統操作匯聚到一個專注的介面。",
    },
    access: {
      eyebrow: "申請",
      title: "申請 Beta 試用，或直接開始商務對話。",
      sub:
        "如果你想加入產品試用，請使用等候名單。若屬合作、媒體或商務查詢，請直接聯絡公司。",
      contactLead: "商業聯絡",
      contactLinkLabel: "聯絡公司",
      privacyNote:
        "提交電郵即表示你同意 JARVIS AI 可使用你的資料回覆申請，並發送與 Beta 相關的更新。",
      privacyLinkLabel: "私隱政策",
    },
  },
  stats: [
    { value: 0, label: "部公司伺服器儲存產品數據" },
    { value: 5, label: "項核心整合" },
    { value: 7, label: "項自動化工作" },
    { value: 10, label: "MB 原生執行檔", suffix: "~" },
    { value: 1, label: "個旗艦 macOS 產品" },
  ],
  waitlistCta: {
    placeholder: "you@company.com",
    submit: "申請試用",
    success: "我們已收到你的申請，Beta 開放時會再與你聯絡。",
    errorInvalid: "請輸入有效的電郵地址。",
    errorGeneric: "發生錯誤，請稍後再試。",
  },
  companyPage: {
    heading: "關於 JARVIS AI",
    sub: "JARVIS AI 是一間位於香港的 AI 軟件初創，專注打造為營運者與工程師而設的桌面 AI 軟件。",
    intro:
      "公司的目標，是令桌面工作更直接。與其再疊加更多瀏覽器分頁，JARVIS AI 正在打造一個原生指令介面，幫助使用者以更低摩擦由上下文走到行動。",
    cards: [
      {
        title: "我們在做甚麼",
        body: "JARVIS for macOS 是公司的旗艦產品：一款把溝通、規劃、筆記與執行整合起來的桌面 AI 助理。",
      },
      {
        title: "我們在哪裡營運",
        body: "公司以香港為基地，現階段專注於私人 Beta 用戶招募、產品迭代與公司基礎建設工作。",
      },
      {
        title: "我們如何看待雲端",
        body: "產品今天以本地優先為核心。AWS 服務將用於選擇性的同步、語音基礎設施、可觀測性與未來的多裝置工作流程。",
      },
    ],
    principlesHeading: "營運原則",
    principles: [
      "先把產品做得有用，再追求更大的野心。",
      "只有在真正改善產品時才使用雲端，而不是削弱本地控制權。",
      "以清晰方式呈現公司：乾淨訊息、直接聯絡方式，以及清楚可見的法律頁面。",
    ],
    closing:
      "JARVIS AI 現正與早期用戶、公司合作夥伴，以及 AWS 方向的基礎設施規劃同步推進，協助產品走向更成熟的私人 Beta 階段。",
  },
  contactPage: {
    heading: "聯絡 JARVIS AI",
    sub: "商業查詢、Beta 試用申請，以及公司介紹。",
    intro:
      "電郵是聯絡公司的最直接方式。如果你想獲得產品更新或加入私人 Beta 考慮名單，可使用下方申請表。",
    directHeading: "直接聯絡",
    directBody:
      "如屬合作、投資者交流、媒體查詢或產品介紹，請直接聯絡公司。",
    inquiryHeading: "適合聯絡我們的情況",
    inquiryItems: [
      "團隊或個人的私人 Beta 試用申請",
      "合作與整合洽談",
      "媒體或訪問邀請",
      "公司介紹及投資者接洽",
    ],
    accessHeading: "申請 Beta 試用",
    accessSub:
      "我們會審視 macOS 私人 Beta 的申請，並按名額逐步回覆。",
    privacyNote:
      "提交電郵即表示你同意 JARVIS AI 可使用你的資料回覆申請，並發送與 Beta 相關的更新。",
    privacyLinkLabel: "私隱政策",
  },
  privacy: {
    heading: "私隱政策",
    lastUpdated: "最後更新：2026-07-27",
    sections: [
      {
        title: "預設本機儲存",
        body:
          "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文及已連接服務的憑證，預設會留在用戶裝置內。JARVIS AI 目前並無營運集中式客戶資料平台去儲存這些產品數據。至於模型請求會送去邊度，屬另一回事，下一節另有交代。",
      },
      {
        title: "模型供應商與訊息內容",
        body:
          "JARVIS 要回應用戶的請求，就要將請求送往模型供應商，因此推理預設並非在本機執行。標準安裝下，該供應商是 Google：其 Gemini API 會收到訊息內容，以及助理被要求處理的電郵、日曆或筆記內容，並以用戶自行提供的 API 金鑰發出請求。本機推理同樣支援，可在「設定」的 Local AI 開啟，開啟後請求會留在裝置內。只有當用戶自行設定 AWS 憑證並選用 Amazon Bedrock，請求先會送往 Bedrock。Prompt 與回應只會儲存在用戶裝置上的本機資料庫，JARVIS AI 不會接收，亦不會保留。",
      },
      {
        title: "本網站收集的資料",
        body:
          "如你提交 Beta 試用申請或公司查詢，JARVIS AI 會收集你提供的電郵地址、查詢內容及提交時間。這些資料只會用於回覆查詢及管理 Beta 溝通。",
      },
      {
        title: "第三方服務供應商",
        body:
          "網站表單提交會透過 Resend 交易電郵服務傳送，付款則由 Stripe 處理；JARVIS AI 從不儲存原始信用卡號碼。至於產品內的模型請求，會交由應用程式中所設定的供應商處理，標準安裝下即 Google。各供應商只會為其受委託的目的處理相關資料，並受其自身已公開發布的資料處理承諾規範。",
      },
      {
        title: "產品整合",
        body:
          "當用戶在產品內連接 Gmail、Google Calendar、Notion、GitHub 或 Obsidian 等服務時，該等連接屬於本地 macOS 應用程式層面。除非日後用戶主動選擇啟用雲端功能，否則相關憑證與上下文預期會以加密形式保留在裝置內。",
      },
      {
        title: "你的權利",
        body:
          "你可以要求查閱、更正或刪除 JARVIS AI 持有有關你的個人資料。請電郵至 contact@jarvis-automation.com 提出要求，我們會喺能夠核實你嘅身份之後盡快回覆。你亦可以隨時撤回對 Beta 相關通訊的同意。",
      },
      {
        title: "聯絡",
        body: "如對本政策有任何疑問，可電郵至 contact@jarvis-automation.com。",
      },
    ],
  },
  security: {
    heading: "安全",
    lastUpdated: "最後更新：2026-07-27",
    sections: [
      {
        title: "預設本機儲存",
        body:
          "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文以及已連接服務的憑證，都會留在用戶裝置內：產品數據存放於本機 SQLite 資料庫，API 金鑰則存放於 macOS Keychain。JARVIS AI 並無營運任何同步服務或產品後端，所以這些數據不會上載到我哋這邊。至於模型推理喺邊度執行，屬另一回事，下文另有交代。",
      },
      {
        title: "計劃中的 AWS 雲端控制平台",
        body:
          "現時推出的產品並無雲端同步，因此不會有產品數據送到 JARVIS AI 的基礎設施。選用雲端功能計劃建構於 AWS 亞太（新加坡）區域，屆時會以 Amazon Cognito 處理身份驗證、AWS KMS 客戶管理金鑰 (CMK) 做信封加密、S3 啟用 bucket 級加密及僅限 TLS 存取存放同步數據，並以 DynamoDB 儲存用戶 metadata。相關 stack 已以代碼定義 (AWS CDK)，並按 AWS Well-Architected Framework 審查，但仍未接駁到應用程式。在其中任何一項開始處理客戶數據之前，我哋會先更新本頁。",
      },
      {
        title: "靜態與傳輸加密",
        body:
          "現時唯一存放產品數據的地方，是用戶裝置上的本機 SQLite 資料庫，由 macOS 檔案權限，以及用戶自行啟用的全磁碟加密保護。API 金鑰與服務憑證存放於 macOS Keychain，不會寫入該資料庫。連接本網站及第三方 API 的網絡流量採用 TLS 1.2 或更高版本。以個人化 data key 加密、再由 AWS KMS 包裝的信封加密，是雲端同步推出後的設計方向；該機制尚未上線，現時亦沒有任何儲存在雲端的客戶數據需要它保護。",
      },
      {
        title: "模型推理喺邊度執行",
        body:
          "推理預設並非在本機執行。標準安裝下，JARVIS 會將請求送往雲端模型供應商，目前是 Google 的 Gemini API，因此訊息內容，以及請求中包含的電郵、日曆或筆記內容，都會交由 Google 處理。供應商 API 金鑰由用戶自行提供，軟件本身並無內置任何模型憑證。本機推理同樣支援，可在「設定」的 Local AI 開啟，開啟後請求會留在裝置內。只有當用戶自行設定 AWS 憑證並選用 Amazon Bedrock 處理重型推理，請求先會送往 Bedrock。Prompt 與回應只會儲存在用戶裝置上的本機資料庫，JARVIS AI 不會接收，亦不會保留。",
      },
      {
        title: "審計日誌與監控",
        body:
          "AWS CloudTrail 會記錄所有 AWS 帳戶嘅控制平台操作。CloudWatch 告警會通知團隊異常帳單、錯誤率及存取模式。生產環境變更紀錄保留最少 90 日。",
      },
      {
        title: "服務供應商",
        body:
          "模型請求由應用程式內所設定的供應商處理。標準安裝下，該供應商是 Google：其 Gemini API 會收到訊息內容，以及助理被要求處理的電郵、日曆或筆記內容。若用戶啟用本機模型，相關請求則會留在裝置內。網站表單提交會透過 Resend 交易電郵服務傳送。付款由 Stripe 處理；JARVIS AI 從不儲存原始信用卡號碼。各供應商受其自身已公開發布的安全及資料處理承諾所規範。",
      },
      {
        title: "存取控制",
        body:
          "生產 AWS 存取依最低權限 IAM 模型管制，任何人手 session 均強制使用多重認證。日常營運身份無權刪除加密金鑰或生產數據；刪除路徑須通過獨立並具審計嘅角色。",
      },
      {
        title: "通報安全問題",
        body:
          "如你發現網站或產品有安全問題，請以 [Security] 作為主題前綴，電郵至 contact@jarvis-automation.com。我們目標於 48 小時內確認，並會持續更新進度直至問題解決。",
      },
    ],
  },
  terms: {
    heading: "服務條款",
    lastUpdated: "最後更新：2026-04-14",
    sections: [
      {
        title: "網站用途",
        body:
          "本網站用於介紹 JARVIS AI 及其產品，並讓訪客申請 Beta 試用或與公司聯絡。你不得濫用本網站，亦不得干擾其正常運作。",
      },
      {
        title: "私人 Beta 存取",
        body:
          "JARVIS 私人 Beta 的提供方式由 JARVIS AI 自行決定。隨著產品發展，功能、可用性及定價均可能改變。",
      },
      {
        title: "不作保證",
        body:
          "在法律容許的最大範圍內，本網站及任何 Beta 軟件均按現況提供。JARVIS AI 不保證持續可用，亦不保證適合某一特定用途。",
      },
      {
        title: "知識產權",
        body:
          "JARVIS AI 及 JARVIS 均屬公司產品與品牌資產。除非另有說明，本網站描述的內容、品牌及軟件均屬 JARVIS AI 所有。",
      },
      {
        title: "適用法律",
        body:
          "本條款受香港特別行政區法律管轄。",
      },
    ],
  },
  download: {
    eyebrow: "下載",
    title: "JARVIS for macOS",
    subtitle: "為 Apple Silicon 而設。v0.1 階段限個人 Mac 使用。",
    systemRequirements: "需要 macOS 12 或以上，Apple Silicon（M1 或更新）。",
    primaryCta: "下載 macOS 版本",
    fallbackVersion: "0.1.0",
    fallbackCta: "下載 v0.1.0",
    loadingNotes: "正在載入版本記錄...",
    releaseNotesHeading: "更新內容",
    nonMacosTitle: "暫時只支援 macOS",
    nonMacosBody: "Windows 同 Linux 版本喺 roadmap 裡面。加入 waitlist 我哋會通知你。",
    joinWaitlist: "加入 waitlist",
    fetchError: "未能載入版本資訊。下面嘅下載連結仍然指向最新版本。",
  },
} as const;
