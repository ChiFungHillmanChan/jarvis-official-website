import type { DeepWiden } from "./copy.types";

const en = {
  title: "JARVIS email workspace example",
  workspace: "Email workspace",
  sampleLabel: "Sample data",
  accountsLabel: "Gmail accounts",
  accounts: ["Work Gmail", "Personal Gmail"],
  groupsLabel: "Groups",
  group: "Client launch",
  groupDetail: "2 emails across 2 inboxes",
  localLabel: "Stored on your Mac",
  instructionsLabel: "Your instructions",
  instructions: "Show confirmed deadlines and what needs my reply.",
  analysisLabel: "Here’s what needs your attention.",
  modelLabel: "GPT analysis",
  actions: [
    { text: "Send the revised proposal by 24 September.", sourceId: 12 },
    { text: "Reply to Maya with your preferred review time.", sourceId: 18 },
  ],
  sourceLabel: "Mail",
  memoryLabel: "Memory you confirmed",
  memory: "Keep the launch plan within HK$8,000.",
  sourceHeading: "Original email",
  fromLabel: "From",
  inboxLabel: "Inbox",
  backLabel: "Back to analysis",
  hint: "Select a source to read the email.",
  sources: [
    {
      id: 12,
      subject: "Launch proposal — next revision",
      from: "Alex Chen",
      account: "Work Gmail",
      body: "Thanks for the first proposal. Please send the revised version by 24 September. Keep the launch plan within our HK$8,000 budget. We’ll confirm the launch date after reviewing it.",
    },
    {
      id: 18,
      subject: "A time to review the proposal",
      from: "Maya Wong",
      account: "Personal Gmail",
      body: "I can review the proposal on 25 September at either 10 am or 3 pm. Please reply with the time that works for you. I haven’t sent a calendar invitation yet.",
    },
  ],
} as const;

type WorkspacePreviewCopy = DeepWiden<typeof en>;

const zhHk: WorkspacePreviewCopy = {
  title: "JARVIS 電郵工作區示例",
  workspace: "電郵工作區",
  sampleLabel: "示例資料",
  accountsLabel: "Gmail 信箱",
  accounts: ["工作 Gmail", "個人 Gmail"],
  groupsLabel: "群組",
  group: "客戶發佈項目",
  groupDetail: "2 個信箱，共 2 封郵件",
  localLabel: "儲存在你的 Mac",
  instructionsLabel: "你的指示",
  instructions: "列出已確認限期，同埋需要我回覆嘅事項。",
  analysisLabel: "有兩件事需要你跟進。",
  modelLabel: "GPT 分析",
  actions: [
    { text: "9 月 24 日前，交回修訂提案。", sourceId: 12 },
    { text: "回覆 Maya，確認你方便嘅審閱時間。", sourceId: 18 },
  ],
  sourceLabel: "郵件",
  memoryLabel: "你確認過的記憶",
  memory: "發佈計劃預算不超過 HK$8,000。",
  sourceHeading: "原始郵件",
  fromLabel: "寄件人",
  inboxLabel: "信箱",
  backLabel: "返回分析",
  hint: "按來源，打開原信核對。",
  sources: [
    {
      id: 12,
      subject: "發佈提案：下一輪修訂",
      from: "Alex Chen",
      account: "工作 Gmail",
      body: "謝謝你嘅初步提案。請喺 9 月 24 日前交回修訂版本，發佈計劃預算維持喺 HK$8,000 以內。我哋會喺審閱後再確認發佈日期。",
    },
    {
      id: 18,
      subject: "安排提案審閱時間",
      from: "Maya Wong",
      account: "個人 Gmail",
      body: "我喺 9 月 25 日上午 10 時或者下午 3 時都可以審閱提案。請回覆你方便嘅時間。我仲未發出日曆邀請。",
    },
  ],
};

export function getWorkspacePreviewCopy(locale: string): WorkspacePreviewCopy {
  return locale === "zh-HK" ? zhHk : en;
}
