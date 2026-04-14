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
        "32 個工具，覆蓋溝通、排程與系統控制",
        "今天以本地優先為基礎，未來加入 AWS 雲端同步能力",
      ],
      imageAlt: "JARVIS for macOS 產品介面預覽",
    },
    trust: {
      eyebrow: "快速了解",
      title: "先把公司訊號講清楚。",
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
        "JARVIS 的設計目標，是令使用者感受到一個安靜而有秩序的工作空間，而不是一堆功能堆疊。網站亦應先清楚傳達這一點。",
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
          body: "由具備 AWS 生產環境經驗、推出過多款 AI 產品的核心工程團隊營運，以香港為基地。",
        },
      ],
    },
    demo: {
      eyebrow: "產品預覽",
      title: "看看目前的 macOS 版本。",
      sub:
        "簡短產品示範用來支持公司的產品故事，而不喧賓奪主。",
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
    { value: 32, label: "個 AI 工具" },
    { value: 5, label: "項核心整合" },
    { value: 7, label: "項自動化工作" },
    { value: 10, label: "MB 原生執行檔", suffix: "~" },
    { value: 0, label: "項用戶資料存放在公司伺服器" },
    { value: 1, label: "個專注的 macOS 產品" },
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
    lastUpdated: "最後更新：2026-04-14",
    sections: [
      {
        title: "本地優先的產品設計",
        body:
          "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文及已連接服務的憑證，預設會留在用戶裝置內。JARVIS AI 目前並無營運集中式客戶資料平台去儲存這些產品數據。",
      },
      {
        title: "本網站收集的資料",
        body:
          "如你提交 Beta 試用申請或公司查詢，JARVIS AI 會收集你提供的電郵地址、查詢內容及提交時間。這些資料只會用於回覆查詢及管理 Beta 溝通。",
      },
      {
        title: "第三方服務供應商",
        body:
          "網站表單提交可能會透過交易電郵及內部通知服務供應商處理。該等服務供應商只會為了傳送你所要求的通訊而處理相關資料。",
      },
      {
        title: "產品整合",
        body:
          "當用戶在產品內連接 Gmail、Google Calendar、Notion、GitHub 或 Obsidian 等服務時，該等連接屬於本地 macOS 應用程式層面。除非日後用戶主動選擇啟用雲端功能，否則相關憑證與上下文預期會以加密形式保留在裝置內。",
      },
      {
        title: "聯絡",
        body: "如對本政策有任何疑問，可電郵至 contact@jarvis-automation.com。",
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
} as const;
