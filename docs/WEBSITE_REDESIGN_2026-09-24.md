# 官網改版部署與驗收記錄

日期：2026-09-24。

## 正式版本

正式網站：[JARVIS](https://jarvis-automation.com)。

Vercel Production 部署：`dpl_BMGWdwxZpmEmwcwE1oUcQW3VZBJc`，狀態 READY，已由正式網域提供服務。Beta 申請已連接正式 DynamoDB，並完成真實 HTTP 與資料庫核對。

先前預覽：[英文預覽](https://jarvis-official-website-1vde30b0p-hillmans-projects-ef63d7ca.vercel.app/en)，部署 `dpl_8tNtms3vtaJM6gHeuL7GTDsJQySh`。該預覽沿用專案的存取保護，可能需要登入原 Vercel 帳戶；它不是目前正式版本。

## 已完成

- 品牌由電郵工作區改為個人 AI 助理；macOS 明確列為目前 Beta 的供應平台，未宣稱其他平台已推出。
- 首頁改為簡潔雙欄版面，新增產品、示範、Beta 獨立頁；保留英文及繁體中文。
- 32 秒四幕程式示範：選擇相關郵件、個人指示、附來源分析、一般助理草稿；支援播放、暫停、章節選擇及重播，背景分頁不消耗播放時間。
- 完善雙語私隱政策、使用條款、安全說明及頁內目錄，列明本機／供應商／網站資料流程。
- Beta 表格要求私隱確認及條款接受。後端先持久化再成功；DynamoDB 條件寫入避免同時重複申請，錯誤不記錄個資。通知電郵預設停用。
- 22 個雙語 canonical URL，逐頁 metadata、hreflang、JSON-LD、分享圖、robots 及 sitemap；付款回跳頁維持 noindex。
- 下載頁、主導覽及頁尾的申請入口指向獨立 Beta 頁。

## 已取得的驗收證據

- 本機完整測試已重跑：22 個檔案、177 項通過。
- ESLint 通過；TypeScript 通過；git diff --check 通過。
- 本機與 Vercel production build 均成功。
- 33 個本機路由檢查通過，包括 22 個公開雙語頁、付款回跳、404、sitemap、robots 及分享圖。
- 實際瀏覽器檢視桌面首頁、390px 手機首頁、繁體中文申請表、繁體條款及英文私隱頁；沒有橫向溢出。
- 實際點選示範第三幕及來源郵件，確認內容切換和焦點正確。
- 本機真實 HTTP POST 在沒有資料庫設定時回傳 503 storage_unavailable，沒有虛報申請成功。
- 正式網站的 22 個公開 canonical 頁面、metadata、hreflang、robots、sitemap 及 www 轉址通過 HTTP 檢查。
- 正式公開 API 在未確認政策時回傳 `400`；並行提交同一個合成申請成功後，以 DynamoDB 強一致性讀取核對原子寫入、確認版本及去重。
- 驗收只清理該次限定的合成記錄，沒有修改真實申請。`WAITLIST_EMAILS_ENABLED=false`，沒有發送驗收郵件。
- Google 驗證檔在正式根網址回傳 `200`，內容與使用者提供的 HTML 原檔完全一致；Search Console 已確認 HTML file 所有權驗證成功。

本機指令須使用 ARM Node：`PATH=/Users/hillmanchan/.nvm/versions/node/v22.22.0/bin:$PATH`。預設 x64 Node 與已安裝的 native dependencies 不相容。

## AWS 部署與授權記錄

首次 `jarvis-website-beta` CloudFormation 部署被自動審批攔截，理由是建立持久 AWS 資源及 IAM／OIDC 存取會改變安全界線，需要使用者明確批准。使用者其後明確批准下列範圍，才重新執行；CloudFormation 現已成功部署。

已批准並完成的範圍：

- 現有 AWS 帳戶、新加坡 ap-southeast-1。
- 專用 on-demand DynamoDB 表 `jarvis-website-beta-production`，有 PITR、刪除保護及 Retain。
- Vercel team `hillmans-projects-ef63d7ca`、project `jarvis-official-website`、production environment 的精確 OIDC trust。
- 專用角色只可對該表 `dynamodb:PutItem`，不能讀取其他 AWS 資料。
- AWS 按用量收費；不建立長期 access key。

部署範本：`infra/waitlist.yaml`；操作及驗證：`docs/BETA_DATABASE.md`。Vercel Production 已設定 `WAITLIST_TABLE_NAME`、`AWS_REGION`、`AWS_ROLE_ARN` 及 `WAITLIST_EMAILS_ENABLED=false`。正式請求使用上述 OIDC trust 與專用 `PutItem` 角色，不使用長期 AWS access key。

受保護 Vercel 預覽的 CLI POST 測試也曾被自動審批拒絕，理由是自動 protection bypass 未獲明確批准。沒有重試 bypass 或修改預覽存取保護；最初使用本機 HTTP 測試，正式部署後則直接透過公開網址完成 API 與資料庫驗收。

## Search Console 的實際狀態

- 已在現有 Google 帳戶建立 URL-prefix property：`https://jarvis-automation.com/`。
- 已取得 HTML meta verification token，並存入原 Vercel 專案 Production 的 `GOOGLE_SITE_VERIFICATION`。
- 使用者提供的驗證檔已放於 `public/googlefc719566f35174e8.html`，正式網址為 `https://jarvis-automation.com/googlefc719566f35174e8.html`。本輪以 **HTML file** 方式完成所有權驗證。
- `https://jarvis-automation.com/sitemap.xml` 已提交並成功讀取。Search Console 最新顯示 **Success**、類型 **Sitemap**、最後讀取日期 **24 Sept 2026**、**Discovered pages 22**。首次列表的 **Couldn't fetch** 屬暫態，後續已轉為成功。
- URL Inspection 顯示 `/en` 與 `/zh-HK` 兩個既有首頁均為 **URL is on Google / Page indexed**；兩頁的更新索引要求均收到 **Indexing requested**。
- 雙語 product、demo、beta 共 6 個新頁已逐頁提交索引要求，全部收到 **Indexing requested**。連同兩個首頁，本輪共完成 8 頁的索引要求；新增頁面的後續收錄由 Google 處理。
- 沒有將 sitemap 的 22 個 discovered pages 當作 22 頁全部已收錄，也沒有聲稱搜尋排名或流量已提升。
- DNS 由 Cloudflare 代管；沒有改動 DNS。Cloudflare 沒有現成登入工作階段。
- 後續操作參考 `docs/SEO_SEARCH_CONSOLE.md`；本節以實際驗證與提交結果為準。

## 後續搜尋觀察

正式發佈、資料庫驗收、GSC 所有權驗證、sitemap 提交與成功讀取均已完成，8 個重點頁面的索引要求均已取得 Google 確認。

待 Google 處理新增及更新頁面後，再記錄 Page indexing、Google 選擇的 canonical 及 Performance 資料。這些是後續搜尋觀察，不是本輪部署阻礙；沒有資料時如實記錄，不作收錄時間或成效保證。

改動保留在工作目錄，沒有 commit 或 push。原先已有的付款頁與 smoke-route 修改沒有移除。產品的現有資料處理限制及政策核對詳見 `docs/LEGAL_POLICY_VERIFICATION.md`。

## 同日示範圖示修正

使用者回報第三幕的 JARVIS 圖示被拉長。正式頁重現為寬 25px、高約 177px：`.film-answer` 的 flex 預設拉伸配合圖片 `height:auto`，使圖示跟隨整段答案高度。只在該答案列加入 `align-items:flex-start`，保留原圖示及播放行為。

中英文首頁及示範頁，在 1280px 桌面與 390px 手機視窗共 8 個組合，圖示均為 25×25px，沒有橫向溢出；既有 8 項播放測試通過。正式修正部署 `dpl_FBgS1UyLc8kXMSGrTtDoRJjEfRqu` 已 READY 並綁定原網域，建置與 TypeScript 檢查通過。刷新正式繁體中文首頁後再次量度為 25×25px，並完成視覺核對。
