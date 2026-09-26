# 法律頁資料核對紀錄

核對日期：2026-09-24。政策及條款版本：`2026-09-24`。

本紀錄說明政策文案的程式依據、外部來源及未完成的營運核實，不構成法律意見或法規認證。法律頁以 `content/legal.ts` 為共同來源，由 `components/legal/LegalDocument.tsx` 顯示繁體中文及英文。網站已存在的註冊公司資料繼續由 `content/company.ts` 提供；本輪沒有創造新公司名稱或自行更改登記資料。

## 已核對的資料流程

| 項目 | 程式或配置依據 | 法律頁表達 |
| --- | --- | --- |
| 公司身份 | `content/company.ts`、`content/company.test.ts` | JARVIS AI LIMITED、現有公司編號、商業登記號碼、註冊地址及聯絡電郵 |
| 申請資料 | `lib/validation/waitlistSchema.ts`、`lib/waitlist/store.ts`、`app/api/waitlist/route.ts`；詳見 `docs/BETA_DATABASE.md` | 電郵、選填職務及工作困難、語言、時間、狀態、政策與條款版本及確認時間；沒有 IP 或 user-agent 的申請欄位 |
| 資料庫 | 本輪 Beta 資料庫實作及部署配置 | Amazon DynamoDB、新加坡區域、資料庫備份；正式部署狀態以主工作任務驗收為準 |
| 電郵 | `lib/resend/` 及 `WAITLIST_EMAILS_ENABLED` | 只有啟用通知時才使用 Resend；提交成功不依賴確認信 |
| 防濫用 | `lib/ratelimit/waitlistLimiter.ts` | 暫時處理 IP 與電郵地址；不把記憶體限流描述為完善的跨執行個體保護 |
| 網站分析 | `app/[locale]/layout.tsx` 的 Vercel Analytics | 訪問流量資料；未發現自訂事件傳送申請內容 |
| 語言 Cookie | `i18n/routing.ts` 的 `localeCookie: false` | 不聲稱使用語言 Cookie |
| 本機紀錄 | 產品 `src-tauri/src/db.rs`、`mail/store.rs`、`security/keychain.rs` | SQLite 與 Keychain 分開；SQLite 沒有額外應用程式層加密 |
| 電郵權限 | 產品 `src-tauri/src/mail/sync.rs` | `gmail.readonly`；與一般 Google 連接分開 |
| 一般 Google 連接 | 產品 `src-tauri/src/commands/google_auth.rs` | `gmail.modify`、`calendar`、`userinfo.profile` |
| 雲端電郵分析 | 產品 `src/pages/EmailPage.tsx`、`mail/openai.rs`、`mail/analysis.rs` | 指示、群組郵件及有效記憶會傳送；需要設定中的確認；無自動跨供應商後備 |
| OpenAI 儲存選項 | 產品 `src-tauri/src/mail/openai.rs` | `store: false` 不等同供應商零保留 |
| 一般聊天 | 產品 `src-tauri/src/ai/mod.rs` 及產品指引 | 預設 Gemini；設定及後備供應商可能收到相關內容 |
| 郵件草稿及外部操作 | 產品 `src-tauri/src/ai/tools.rs` | 一般助理建立 Gmail 草稿；不能把所有工具概括為唯讀，日曆工具能改動資料 |
| 語音輸入 | 產品 `src-tauri/src/voice/mod.rs`、`voice/transcribe.rs` | 有 Gemini key 時語音指令可送 Google；Whisper 為本機後備 |
| 語音輸出 | 產品 `src-tauri/src/voice/tts_router.rs`、`voice/minimax.rs` | MiniMax 收到朗讀文字；macOS 及本機 CosyVoice 是本機選項 |
| 本機診斷紀錄 | 產品 `src-tauri/src/voice/transcribe.rs` | 本機 log 可含轉錄文字，因此沒有聲稱完全不記錄內容 |
| 刪除與斷線 | 產品 `src-tauri/src/mail/sync.rs`、`mail/store.rs` | 斷線保留副本；刪除帳戶移除其郵件及來源記憶；Google 原信保留 |

## 政策設計

- Beta 表格只要求處理申請的確認及條款接受，不把申請等同一般推廣同意。
- 不聲稱已完成 Google OAuth 驗證、CASA、GDPR 或其他認證。
- 不保證所有資料只在本機、不保證端到端加密、不保證零供應商保留。
- 保留期間按目的、未完事項及法定責任說明，沒有虛構未落地的自動刪除日數。
- 撤回及刪除要求使用現有聯絡電郵；清楚區分公司伺服器紀錄、本機副本及使用者自己的供應商帳戶。
- 香港法律及公司身份沿用現有網站依據；條款保留不可排除的法定權利，沒有新增賠償上限、強制仲裁或與 Beta 申請綑綁的收費。
- 移除舊安全頁未核實的 AWS 未來架構敘述及 48 小時回覆承諾。
- 條款、政策及供應商來源有可點擊連結；長文設有目錄及各段錨點。

## 官方來源

以下來源於 2026-09-24 查閱；條款可能更改，之後新增供應商或變更資料用途時應重新核對。

1. [PCPD 常見問題](https://www.pcpd.org.hk/english/faqs/faqs.html)：收集目的、查閱與更正程序，以及一般 40 日期限。
2. [PCPD《直接促銷指引》](https://www.pcpd.org.hk/english/resources_centre/publications/files/GN_DM_e.pdf)：直接促銷的告知、同意及停止使用要求。申請相關服務訊息與另行推廣分開。
3. [PCPD 個人資料保留說明](https://www.pcpd.org.hk/english/news_events/media_enquiry/enquiry_20190808.html)：保留不應超過目的所需期間，目的完成後應在切實可行範圍內盡快刪除。
4. [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)：透明披露及 Limited Use。
5. [Google Workspace user data policy](https://developers.google.com/workspace/workspace-api-user-data-developer-policy)：面向使用者的用途、轉移、人工查閱及通用模型訓練限制；政策頁不能代替產品內的清晰提示及同意。
6. [Gemini API 條款](https://ai.google.dev/gemini-api/terms)：免費及付費服務的資料使用安排不同；免費服務限制提交私人、敏感或機密內容。
7. [OpenAI API 資料控制](https://developers.openai.com/api/docs/guides/your-data)：回應儲存與濫用監測保留並非同一控制。
8. [Amazon Bedrock 資料保護](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html)及[保留安排](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)：模型、區域及帳戶設定可能影響保留；沒有採用籠統的「AWS 永不儲存」表述。
9. [Vercel Web Analytics 私隱說明](https://vercel.com/docs/analytics/privacy-policy)：收集欄位、彙總分析及不使用第三方 Cookie 的安排。
10. [Resend 私隱政策](https://resend.com/legal/privacy-policy)：電郵服務相關處理。
11. [Google 第三方連接管理](https://support.google.com/accounts/answer/13533235)：撤銷連接的操作說明。

## 尚待營運或產品核實的事實

這些是實際營運責任及產品限制，不是新增批准步驟，也不表示只改政策文字即可解決。

1. **Google 資料與供應商設定。** 一般助理可將 Google 內容送往已配置的 Gemini 及後備供應商，未見強制確認付費 Gemini 項目或適當資料使用設定的程式。免費 Gemini 可能允許人工審閱及模型改善，與 Google Workspace 的 Limited Use 限制存在衝突風險。政策寫明限制及設定差異，但產品仍需對私隱提示、同意及所有啟用路徑作配置與實測核對，不能宣稱已通過完整合規審查。
2. **資料保留執行。** 申請資料庫目前沒有自動 TTL。營運者需按政策執行目的審查、撤回／刪除處理及備份中的刪除限制；還原備份時應重新套用已完成的刪除要求。現有資料庫管理流程見 `docs/BETA_DATABASE.md`。
3. **備份及供應商紀錄。** 本輪沒有自行保證 Vercel、公司信箱或 Resend 的統一保留日數。需要以實際帳戶合約、log 設定及備份設定回覆個別要求。
4. **公司資料來源。** 名稱、編號及地址沿用既有已建立的公司資料和測試，本輪沒有另行取得公司註冊處證明或核實聯絡信箱收件。
5. **產品與網站版本。** 文字依現有產品程式及交接說明撰寫；網站部署與手機／桌面頁面視覺驗收由主工作任務整合執行。這份筆記不代表桌面產品已重新發行。

## 本輪檢查

- 指定法律檔案 ESLint 通過。
- `git diff --check` 通過。
- 使用 Codex 內置 ARM Node 執行現有 `content/company.test.ts`，9 項通過。
- 首次全站 `npm run typecheck` 被並行修改中的 `components/sections/demo/ProductDemo.tsx` 阻擋（`scene` 可能未定義），法律檔案未報錯；已回報主工作任務，由其整合後重跑。
- 系統預設 Node 是 x64，直接以 `npx vitest` 執行會缺少 `@rolldown/binding-darwin-x64`。改用 `/Users/hillmanchan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` 後，既有測試正常執行；沒有為此刪除或重裝專案依賴。
