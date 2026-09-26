import { zhLegal } from "./legal";
import { zhHome } from "./home";
import type { copy as enCopy } from "./copy.en";
import type { DeepWiden } from "./copy.types";

export const copy: DeepWiden<typeof enCopy> = {
  home: zhHome,
  stats: [
    { value: 0, label: "部公司伺服器儲存產品數據" },
    { value: 5, label: "項核心整合" },
    { value: 7, label: "項自動化工作" },
    { value: 17, label: "MB 簽署安裝檔", suffix: "~" },
    { value: 1, label: "個旗艦 macOS 產品" },
  ],
  waitlistCta: {
    placeholder: "you@company.com",
    submit: "申請試用",
    success: "我們已收到你的申請，Beta 開放時會再與你聯絡。",
    errorInvalid: "請輸入有效的電郵地址。",
    errorGeneric: "未能儲存申請。請稍後重試，或直接聯絡我們。",
    roleLabel: "你的工作角色（選填）",
    rolePlaceholder: "你的工作角色（選填）",
    painLabel: "希望 JARVIS 幫你處理的工作（選填）",
    painPlaceholder: "希望 JARVIS 幫你處理甚麼？",
  },
  companyPage: {
    heading: "關於 JARVIS AI",
    sub: "我們是一間香港公司，為日常工作打造個人 AI 助理。",
    intro:
      "處理客戶工作，總伴隨着待回覆的電郵、待安排的會議和待跟進的細節。我們開發 JARVIS，希望讓你在同一個桌面工作空間處理這些日常事項，把更多心力留給需要你專注的工作。",
    cards: [
      {
        title: "我們為何開發 JARVIS",
        body: "回覆一封電郵，可能要先找出之前的對話、查看行事曆，再記下下一步。我們希望你能透過對話，更容易處理這些互相關連的工作。",
      },
      {
        title: "JARVIS 可以做甚麼",
        body: "JARVIS 協助你整理電郵、行事曆和待辦事項。你可以跨 Gmail 帳戶分組、加入個人指示，再取得附來源的 GPT 分析；一般助理亦可使用獨立連接和設定準備電郵草稿及管理活動。",
      },
      {
        title: "我們為誰而設",
        body: "每天需要處理客戶、電郵及會議的創辦人、顧問和小型團隊。目前的 Beta 支援 Apple Silicon Mac；介面提供英文及繁體中文，另有廣東話語音支援。",
      },
    ],
    principlesHeading: "我們重視的事",
    principles: [
      "讓日常工作更容易處理：找出所需郵件、準備回覆，以及記下下一步。",
      "清楚說明助理可以做甚麼、連接哪些服務，以及你的資料會傳送到哪裡。",
      "與早期用戶一起開發，根據他們的實際工作情況，決定下一步改善甚麼。",
    ],
    closing:
      "JARVIS 現正進行私人 Beta 測試。如果你每天都要處理客戶電郵、會議和跟進事項，我們很想了解哪些工作最花時間，以及我們可以如何幫忙。",
  },
  contactPage: {
    heading: "聯絡 JARVIS AI",
    sub: "商業查詢、Beta 試用申請，以及公司介紹。",
    intro:
      "電郵是聯絡公司的最直接方式。如果你想獲得產品更新或加入私人 Beta 考慮名單，可使用下方申請表。",
    directHeading: "直接聯絡",
    directBody: "如屬合作、投資者交流、媒體查詢或產品介紹，請直接聯絡公司。",
    inquiryHeading: "適合聯絡我們的情況",
    inquiryItems: [
      "團隊或個人的私人 Beta 試用申請",
      "合作與整合洽談",
      "媒體或訪問邀請",
      "公司介紹及投資者接洽",
    ],
    accessHeading: "申請 Beta 試用",
    accessSub: "我們會審視 macOS 私人 Beta 的申請，並按名額逐步回覆。",
    privacyNote:
      "提交電郵即表示你同意 JARVIS AI 可使用你的資料回覆申請，並發送與 Beta 相關的更新。",
    privacyLinkLabel: "私隱政策",
  },
  privacy: zhLegal.privacy,
  security: zhLegal.security,
  terms: zhLegal.terms,
  download: {
    eyebrow: "下載",
    title: "JARVIS for macOS",
    subtitle: "目前的私人 Beta 版本適用於 Apple Silicon Mac。",
    systemRequirements: "需要 macOS 12 或以上，Apple Silicon（M1 或更新）。",
    primaryCta: "下載 macOS 版本",
    loadingNotes: "正在載入版本記錄...",
    releaseNotesHeading: "更新內容",
    nonMacosTitle: "目前提供 macOS 版本",
    nonMacosBody: "JARVIS 目前支援 Apple Silicon Mac。留下電郵，即可接收產品供應資訊及未來更新。",
    joinWaitlist: "接收產品更新",
    fetchError: "未能載入版本資訊。下方的下載連結仍然指向最新版本。",
  },
} as const;
