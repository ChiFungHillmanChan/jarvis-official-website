const en = {
  label: "Illustrative demo · sample data", title: "A client launch, brought into focus.",
  play: "Play demo", pause: "Pause demo", replay: "Replay demo", chapters: "Demo chapters",
  previous: "Previous scene", next: "Next scene", status: "Scene", duration: "32-second walkthrough",
  workspace: "Atlas launch", assistant: "Personal assistant", you: "You", source: "Source", draft: "Draft for review",
  scenes: [
    { title: "Choose the context", subtitle: "Bring related messages from two inboxes into a group you create.", prompt: "One project. Two inboxes. A few details to connect.", caption: "Select the relevant emails. Grouping happens in your local workspace.", kind: "context" },
    { title: "Set your priorities", subtitle: "Give the group instructions that reflect how you work.", prompt: "What needs my attention before the launch? Focus on deadlines and cite the original emails.", caption: "Your instructions and confirmed memories give the analysis useful context.", kind: "prompt" },
    { title: "See the next steps", subtitle: "Get a concise answer with references you can check.", prompt: "What needs my attention before the launch?", caption: "GPT receives the selected context when you choose cloud analysis. Check important details against the sources.", kind: "answer" },
    { title: "Prepare a thoughtful reply", subtitle: "Use the connected general assistant to prepare a draft.", prompt: "Draft a reply to Alex confirming that I’ll send the revised proposal on Friday.", caption: "Drafting uses the separately configured general assistant. You review and send the email in Gmail.", kind: "draft" },
  ],
  emails: [
    { person: "Alex Chen", inbox: "Work Gmail", subject: "Launch proposal", text: "Could you send the revised proposal by Friday? We need it before Monday’s review.", initial: "AC" },
    { person: "Sam Lee", inbox: "Studio Gmail", subject: "Design review", text: "The design review is Monday at 10:00. Please bring the updated proposal.", initial: "SL" },
  ],
  memoryLabel: "A preference you confirmed", memory: "Keep client updates concise and include the next step.",
  instructionLabel: "Group instructions", answerTitle: "Two things to prepare",
  actions: ["Send Alex the revised proposal by Friday.", "Bring the updated proposal to Monday’s 10:00 design review."],
  draftSubject: "Re: Launch proposal", draftBody: "Hi Alex,\n\nI’ll send the revised proposal by Friday, ahead of Monday’s review.\n\nBest,\nJordan",
  draftNote: "Prepared for your review. Nothing has been sent.",
};
type DemoCopy = { [K in keyof typeof en]: (typeof en)[K] };
const zh: DemoCopy = {
  label: "情境示範 · 使用虛構資料", title: "整理客戶項目，看清下一步。",
  play: "播放示範", pause: "暫停示範", replay: "重播示範", chapters: "示範章節",
  previous: "上一幕", next: "下一幕", status: "場景", duration: "32 秒操作示範",
  workspace: "Atlas 發佈項目", assistant: "個人助理", you: "你", source: "來源", draft: "待檢閱草稿",
  scenes: [
    { title: "選擇相關內容", subtitle: "將兩個信箱的相關郵件，放入你建立的群組。", prompt: "同一個項目，兩個信箱，幾個需要連起來的細節。", caption: "由你選擇相關郵件，分組只儲存在本機工作區。", kind: "context" },
    { title: "寫下你的重點", subtitle: "為群組加入符合你工作方式的個人指示。", prompt: "發佈前有哪些事情需要跟進？請留意截止日期，並附上來源郵件。", caption: "你的指示和已確認記憶，為分析提供所需背景。", kind: "prompt" },
    { title: "掌握下一步", subtitle: "取得精簡分析，並按引用核對來源。", prompt: "發佈前有哪些事情需要跟進？", caption: "選用雲端分析時，相關背景會傳送至 GPT。重要細節仍需核對原信。", kind: "answer" },
    { title: "準備合適的回覆", subtitle: "透過已連接的一般助理，準備電郵草稿。", prompt: "草擬回覆給 Alex，確認我會在星期五寄出修訂提案。", caption: "草擬回覆使用另行設定的一般助理。由你在 Gmail 檢閱及寄出郵件。", kind: "draft" },
  ],
  emails: [
    { person: "Alex Chen", inbox: "工作 Gmail", subject: "發佈提案", text: "可以在星期五前寄出修訂提案嗎？我們需要在星期一的會議前收到。", initial: "AC" },
    { person: "Sam Lee", inbox: "工作室 Gmail", subject: "設計檢閱", text: "設計檢閱安排在星期一上午 10 時，請帶同更新後的提案。", initial: "SL" },
  ],
  memoryLabel: "由你確認的偏好", memory: "客戶更新保持精簡，並列出下一步。",
  instructionLabel: "群組指示", answerTitle: "兩件需要準備的事",
  actions: ["在星期五前向 Alex 寄出修訂提案。", "帶同更新提案，參與星期一上午 10 時的設計檢閱。"],
  draftSubject: "回覆：發佈提案", draftBody: "Alex 你好：\n\n我會在星期五寄出修訂提案，讓大家在星期一的會議前檢閱。\n\nJordan",
  draftNote: "草稿已準備供你檢閱，並未寄出。",
};
export function getDemoCopy(locale: string) { return locale === "zh-HK" ? zh : en; }
