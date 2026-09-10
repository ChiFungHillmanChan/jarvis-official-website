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
    errorGeneric: "發生錯誤，請稍後再試。",
    roleLabel: "你的工作角色（選填）",
    rolePlaceholder: "你的工作角色（選填）",
    painLabel: "希望 JARVIS 幫你處理的工作（選填）",
    painPlaceholder: "希望 JARVIS 幫你處理甚麼？",
  },
  companyPage: {
    heading: "關於 JARVIS AI",
    sub: "我們是一間香港公司，為你在 Mac 上的日常工作打造 AI 助理。",
    intro:
      "處理客戶工作，總伴隨着待回覆的電郵、待安排的會議和待跟進的細節。我們開發 JARVIS，希望讓你在同一個桌面工作空間處理這些日常事項，把更多心力留給需要你專注的工作。",
    cards: [
      {
        title: "我們為何開發 JARVIS",
        body: "回覆一封電郵，可能要先找出之前的對話、查看行事曆，再記下下一步。我們希望你能透過對話，更容易處理這些互相關連的工作。",
      },
      {
        title: "JARVIS 可以做甚麼",
        body: "JARVIS 可連接 Gmail、Google Calendar 等工具，讓你在 Mac 上透過文字或語音搜尋郵件、準備電郵草稿、管理活動及建立待辦事項。",
      },
      {
        title: "我們為誰而設",
        body: "每天需要處理客戶、電郵及會議的創辦人、顧問和小型團隊。我們先支援 Apple Silicon Mac，並提供英文及廣東話支援。",
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
  privacy: {
    heading: "私隱政策",
    lastUpdated: "最後更新：2026-07-27",
    sections: [
      {
        title: "預設本機儲存",
        body: "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文及已連接服務的憑證，預設會留在用戶裝置內。JARVIS AI 目前並無營運集中式客戶資料平台去儲存這些產品數據。至於模型請求會送去邊度，屬另一回事，下一節另有交代。",
      },
      {
        title: "模型供應商與訊息內容",
        body: "JARVIS 要回應用戶的請求，就要將請求送往模型供應商，因此推理預設並非在本機執行。標準安裝下，該供應商是 Google：其 Gemini API 會收到訊息內容，以及助理被要求處理的電郵、日曆或筆記內容，並以用戶自行提供的 API 金鑰發出請求。本機推理同樣支援，可在「設定」的 Local AI 設定本機 Ollama 端點。交由該端點處理的文字請求會在 Mac 上執行，但已啟用的雲端後備供應商仍可能接收請求。語音服務及已連結應用程式會另行與各自的供應商通訊；選用本機文字推理不代表這些服務可離線運作。只有當用戶自行設定 AWS 憑證並選用 Amazon Bedrock，請求先會送往 Bedrock。JARVIS 會將 Prompt 與回應儲存在用戶裝置上的本機資料庫，JARVIS AI 不會接收，亦不會保留。AI 供應商會按各自的資料政策處理收到的內容。",
      },
      {
        title: "本網站收集的資料",
        body: "如你提交 Beta 試用申請或公司查詢，JARVIS AI 會收集你提供的電郵地址、查詢內容及提交時間。這些資料只會用於回覆查詢及管理 Beta 溝通。",
      },
      {
        title: "第三方服務供應商",
        body: "網站表單提交會透過 Resend 交易電郵服務傳送，付款則由 Stripe 處理；JARVIS AI 從不儲存原始信用卡號碼。至於產品內的模型請求，會交由應用程式中所設定的供應商處理，標準安裝下即 Google。各供應商只會為其受委託的目的處理相關資料，並受其自身已公開發布的資料處理承諾規範。",
      },
      {
        title: "產品整合",
        body: "當用戶在產品內連接 Gmail、Google Calendar、Notion、GitHub 或 Obsidian 等服務時，該等連接屬於本地 macOS 應用程式層面。服務憑證儲存在 macOS Keychain，同步內容則存放於本機 SQLite 資料庫，由 macOS 檔案權限及用戶自行啟用的全磁碟加密保護；資料庫本身沒有獨立的應用程式層加密。已連結服務及所設定的 AI 供應商可能會收到處理請求所需的內容。",
      },
      {
        title: "你的權利",
        body: "你可以要求查閱、更正或刪除 JARVIS AI 持有有關你的個人資料。請電郵至 contact@jarvis-automation.com 提出要求，我們會喺能夠核實你嘅身份之後盡快回覆。你亦可以隨時撤回對 Beta 相關通訊的同意。",
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
        body: "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文以及已連接服務的憑證，都會留在用戶裝置內：產品數據存放於本機 SQLite 資料庫，API 金鑰則存放於 macOS Keychain。JARVIS AI 並無營運任何同步服務或產品後端，所以這些數據不會上載到我哋這邊。至於模型推理喺邊度執行，屬另一回事，下文另有交代。",
      },
      {
        title: "計劃中的 AWS 雲端控制平台",
        body: "現時推出的產品並無雲端同步，因此不會有產品數據送到 JARVIS AI 的基礎設施。選用雲端功能計劃建構於 AWS 亞太（新加坡）區域，屆時會以 Amazon Cognito 處理身份驗證、AWS KMS 客戶管理金鑰 (CMK) 做信封加密、S3 啟用 bucket 級加密及僅限 TLS 存取存放同步數據，並以 DynamoDB 儲存用戶 metadata。相關 stack 已以代碼定義 (AWS CDK)，並按 AWS Well-Architected Framework 審查，但仍未接駁到應用程式。在其中任何一項開始處理客戶數據之前，我哋會先更新本頁。",
      },
      {
        title: "靜態與傳輸加密",
        body: "現時唯一存放產品數據的地方，是用戶裝置上的本機 SQLite 資料庫，由 macOS 檔案權限，以及用戶自行啟用的全磁碟加密保護。API 金鑰與服務憑證存放於 macOS Keychain，不會寫入該資料庫。連接本網站及第三方 API 的網絡流量採用 TLS 1.2 或更高版本。以個人化 data key 加密、再由 AWS KMS 包裝的信封加密，是雲端同步推出後的設計方向；該機制尚未上線，現時亦沒有任何儲存在雲端的客戶數據需要它保護。",
      },
      {
        title: "模型推理喺邊度執行",
        body: "推理預設並非在本機執行。標準安裝下，JARVIS 會將請求送往雲端模型供應商，目前是 Google 的 Gemini API，因此訊息內容，以及請求中包含的電郵、日曆或筆記內容，都會交由 Google 處理。供應商 API 金鑰由用戶自行提供，軟件本身並無內置任何模型憑證。本機推理同樣支援，可在「設定」的 Local AI 設定本機 Ollama 端點。交由該端點處理的文字請求會在 Mac 上執行，但已啟用的雲端後備供應商仍可能接收請求。語音服務及已連結應用程式會另行與各自的供應商通訊；選用本機文字推理不代表這些服務可離線運作。只有當用戶自行設定 AWS 憑證並選用 Amazon Bedrock 處理重型推理，請求先會送往 Bedrock。JARVIS 會將 Prompt 與回應儲存在用戶裝置上的本機資料庫，JARVIS AI 不會接收，亦不會保留。AI 供應商會按各自的資料政策處理收到的內容。",
      },
      {
        title: "審計日誌與監控",
        body: "JARVIS AI 的雲端基礎設施今天並無任何客戶數據，因此現時的監控只涵蓋我們自身的營運：AWS CloudTrail 事件歷史記錄帳戶內的控制平台操作，帳單告警會標示異常開支。在任何雲端功能處理客戶數據之前，我們會先在此頁公布更完整的可觀測性承諾。",
      },
      {
        title: "服務供應商",
        body: "模型請求由應用程式內所設定的供應商處理。標準安裝下，該供應商是 Google：其 Gemini API 會收到訊息內容，以及助理被要求處理的電郵、日曆或筆記內容。本機 Ollama 端點可在 Mac 上處理文字請求，但已啟用的雲端後備供應商仍可能接收請求。語音服務及已連結應用程式會另行與各自的供應商通訊。網站表單提交會透過 Resend 交易電郵服務傳送。付款由 Stripe 處理；JARVIS AI 從不儲存原始信用卡號碼。各供應商受其自身已公開發布的安全及資料處理承諾所規範。",
      },
      {
        title: "存取控制",
        body: "JARVIS AI 是單人營運的公司。AWS 存取只限於用作發佈與基礎設施工作、範圍受限的 IAM 身份，而該等帳戶內亦無任何客戶數據可供任何身份接觸。在雲端功能處理客戶數據之前，我們會先建立並在此公布正式的職權分離安排。",
      },
      {
        title: "通報安全問題",
        body: "如你發現網站或產品有安全問題，請以 [Security] 作為主題前綴，電郵至 contact@jarvis-automation.com。我們目標於 48 小時內確認，並會持續更新進度直至問題解決。",
      },
    ],
  },
  terms: {
    heading: "服務條款",
    lastUpdated: "最後更新：2026-04-14",
    sections: [
      {
        title: "網站用途",
        body: "本網站用於介紹 JARVIS AI 及其產品，並讓訪客申請 Beta 試用或與公司聯絡。你不得濫用本網站，亦不得干擾其正常運作。",
      },
      {
        title: "私人 Beta 存取",
        body: "JARVIS 私人 Beta 的提供方式由 JARVIS AI 自行決定。隨著產品發展，功能、可用性及定價均可能改變。",
      },
      {
        title: "不作保證",
        body: "在法律容許的最大範圍內，本網站及任何 Beta 軟件均按現況提供。JARVIS AI 不保證持續可用，亦不保證適合某一特定用途。",
      },
      {
        title: "知識產權",
        body: "JARVIS AI 及 JARVIS 均屬公司產品與品牌資產。除非另有說明，本網站描述的內容、品牌及軟件均屬 JARVIS AI 所有。",
      },
      {
        title: "適用法律",
        body: "本條款受香港特別行政區法律管轄。",
      },
    ],
  },
  download: {
    eyebrow: "下載",
    title: "JARVIS for macOS",
    subtitle: "為 Apple Silicon Mac 而設的私人 Beta 版本，供個人 Mac 使用。",
    systemRequirements: "需要 macOS 12 或以上，Apple Silicon（M1 或更新）。",
    primaryCta: "下載 macOS 版本",
    fallbackVersion: "0.1.0",
    fallbackCta: "下載 v0.1.0",
    loadingNotes: "正在載入版本記錄...",
    releaseNotesHeading: "更新內容",
    nonMacosTitle: "為你的 Mac 而設",
    nonMacosBody: "JARVIS 目前支援 Apple Silicon Mac。留下電郵，即可接收產品供應資訊及未來更新。",
    joinWaitlist: "接收產品更新",
    fetchError: "未能載入版本資訊。下方的下載連結仍然指向最新版本。",
  },
} as const;
