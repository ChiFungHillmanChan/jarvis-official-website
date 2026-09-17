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
        body: "JARVIS 將幾個 Gmail 帳戶集中到 Mac 工作區，支援跨信箱分組、個人指示、GPT 分析同由你確認嘅記憶。一般助理亦支援電郵草稿、日曆活動同待辦事項，並使用獨立連接同設定。",
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
    lastUpdated: "最後更新：2026-09-11",
    sections: [
      {
        title: "預設本機儲存",
        body: "JARVIS 以原生 macOS 應用程式形式運作。對話紀錄、任務、快取上下文及已連接服務的憑證，預設會留在用戶裝置內。JARVIS AI 目前並無營運集中式客戶資料平台去儲存這些產品數據。至於模型請求會送去邊度，屬另一回事，下一節另有交代。",
      },
      {
        title: "一般助理：模型供應商同訊息內容",
        body: "一般聊天會將請求送往已設定嘅模型供應商，因此推理預設並非在本機執行。預設雲端供應商係 Google：Gemini API 會收到訊息，以及請求中包含嘅電郵、日曆或筆記內容，使用用戶自己提供嘅 API key。本機推理同樣支援，可喺 Settings 嘅 Local AI 設定本機 Ollama 端點，但已啟用嘅雲端後備供應商仍可能接收請求。語音服務同已連結應用程式會另行與各自供應商通訊；本機文字推理唔代表全部服務離線。只有用戶設定 AWS 憑證並選用 Amazon Bedrock，請求先會送往 Bedrock。一般聊天記錄存喺用戶裝置嘅本機資料庫，JARVIS AI 唔會集中儲存。AI 供應商按各自資料政策處理內容。電郵工作區使用獨立設定，詳見下一節。",
      },
      {
        title: "電郵工作區、GPT 同記憶",
        body: "電郵工作區以唯讀權限連接 Gmail。同步郵件文字、群組、個人指示同用戶建立嘅記憶儲存喺呢部 Mac，未支援跨裝置同步。揀 OpenAI GPT 時，群組郵件、指示同有效記憶會使用你嘅 API key 傳到 OpenAI；揀 AWS Bedrock 時，內容會傳到你設定嘅 AWS 服務。雲端分析需要喺「分析設定」確認呢個資料用途，用量費用計入你嘅供應商帳戶。亦可選合適嘅本機 Ollama 模型。電郵分析失敗唔會自動轉用其他供應商。記憶由你建立同管理，模型唔會代你儲存。分析結果目前只留喺頁面，重開 App 後需要重新產生。中斷 Gmail 連接會保留本機副本；明確刪除帳戶會移除該帳戶本機郵件同以佢哋為來源嘅記憶，唔會刪除 Gmail 原信。雲端請求仍受供應商資料政策規範。",
      },
      {
        title: "本網站收集的資料",
        body: "如你提交 Beta 試用申請或公司查詢，JARVIS AI 會收集你提供的電郵地址、查詢內容及提交時間。這些資料只會用於回覆查詢及管理 Beta 溝通。",
      },
      {
        title: "第三方服務供應商",
        body: "網站表單透過 Resend 交易電郵服務傳送。Stripe 付款整合仍處於測試模式，付費方案未正式推出；JARVIS AI 唔會儲存原始信用卡號碼。產品模型請求交畀所選供應商：相應電郵分析模式使用 OpenAI 或 AWS；一般聊天使用自己設定嘅供應商，預設為 Google Gemini。供應商按各自公開資料政策處理內容。",
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
    lastUpdated: "最後更新：2026-09-11",
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
        title: "一般助理嘅模型處理位置",
        body: "一般聊天嘅推理預設並非在本機執行。預設供應商為 Google Gemini API，會收到訊息同請求中包含嘅電郵、日曆或筆記內容。API key 由用戶提供，軟件冇內置模型憑證。本機推理同樣支援，可喺 Settings 嘅 Local AI 設定本機 Ollama 端點，但已啟用嘅雲端後備供應商仍可能接收請求。語音同已連結服務另行與各自供應商通訊。只有用戶設定 AWS 憑證並選用 Bedrock，請求先會送往 AWS。一般聊天記錄存喺用戶裝置，JARVIS AI 唔會集中儲存。電郵工作區有獨立設定，唔會繼承呢條後備路徑。",
      },
      {
        title: "電郵工作區權限同分析",
        body: "電郵工作區只用 Gmail 唯讀權限。同步由用戶啟動，分組只留喺本機，唔會更改 Gmail 標籤。分析冇寄信、日曆或其他操作工具。揀 OpenAI GPT 時，群組郵件、指示同有效記憶會使用你嘅 API key 傳到 OpenAI；揀 AWS Bedrock 時，則傳到你設定嘅 AWS 服務。雲端模式需要喺「分析設定」確認呢個資料用途，分析失敗唔會自動轉用其他供應商。合適嘅本機 Ollama 模型亦可喺 Mac 分析。郵件副本、群組同記憶保留喺本機；分析結果目前只留喺頁面。記憶由用戶建立同管理。引用檢查會核對來源編號，但唔保證答案事實正確；重要資料仍需對照原信。雲端請求受各供應商資料政策規範。",
      },
      {
        title: "審計日誌與監控",
        body: "JARVIS AI 的雲端基礎設施今天並無任何客戶數據，因此現時的監控只涵蓋我們自身的營運：AWS CloudTrail 事件歷史記錄帳戶內的控制平台操作，帳單告警會標示異常開支。在任何雲端功能處理客戶數據之前，我們會先在此頁公布更完整的可觀測性承諾。",
      },
      {
        title: "服務供應商",
        body: "模型請求由所選供應商處理。OpenAI GPT 同 AWS Bedrock 電郵分析會將群組郵件、指示同有效記憶傳到相應服務。一般聊天預設用 Google Gemini，並有獨立供應商同後備設定。語音同已連結服務另行與各自供應商通訊。網站表單透過 Resend 傳送。Stripe 付款整合仍處於測試模式，付費方案未正式推出；JARVIS AI 唔會儲存原始信用卡號碼。供應商安全同資料處理方式以各自公開政策為準。",
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
