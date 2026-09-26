# JARVIS 個人 AI 助理官網改版

**目標：** 讓訪客理解 JARVIS 的用途、觀看程式示範、閱讀政策，並成功提交可持久保存的 Beta 申請。

**架構：** 沿用 Next.js 16、next-intl 及 Vercel，保留英文和繁體中文。新增 product、demo、beta 頁面。伺服器頁面提供可索引內容，互動僅用於示範播放器及表格。

**設計：** 白色 #ffffff、淡藍灰 #f3f6fa、深藍 #17283c、灰藍 #526277、靛藍 #3558d4。沿用系統字體，標題以大小與留白建立層次。首頁左側介紹個人 AI 助理，右側以可播放的工作情境示範作焦點；其餘區域使用簡潔文字及功能列。移除首頁冗長重複說明，讓詳細內容各有獨立頁面。

**界線：** 目前僅提供 Apple Silicon macOS Beta，不宣稱 Windows 已推出；示範明確標示虛構資料。使用者的付款頁未提交改動保留。產品資料不因網站申請而上載。Google 索引結果不作排名保證。

- [x] 品牌與導覽：更新首頁及中英文文案，新增產品、示範、Beta 頁。
- [x] 示範播放器：分段、播放／暫停、重播、手動章節、鍵盤操作，尊重減少動態效果設定。
- [x] Beta 程式與模擬測試：明確條款／私隱確認，資料庫原子寫入與去重，失敗不得回覆成功；通知電郵獨立於持久化。
- [x] 政策：核對產品資料流與供應商，完善私隱、使用條款和安全頁。
- [x] SEO 程式與 GSC 設定準備：各頁 metadata、canonical、hreflang、sitemap、結構化資料、分享圖與 GSC 驗證。
- [x] 本機與預覽驗證：單元測試、lint、typecheck、production build、路由檢查與桌面／手機瀏覽器驗收。
- [x] 正式資料庫：取得使用者明確批准後完成 CloudFormation、DynamoDB 及 production 專用 OIDC／PutItem 角色，設定 Vercel 正式環境；通知電郵停用。
- [x] 正式發佈及入庫驗收：Vercel 部署 `dpl_BMGWdwxZpmEmwcwE1oUcQW3VZBJc` 已由 `https://jarvis-automation.com` 提供服務；公開 API 的政策確認拒絕、並行申請、DynamoDB 強一致性讀取、去重及限定合成記錄清理通過。
- [x] 正式 SEO 核對：22 個 canonical 頁面、metadata、hreflang、robots、sitemap 及 www 轉址通過 HTTP 檢查；完整 177 項測試重跑通過。
- [x] GSC 所有權驗證：使用者提供的 HTML 驗證檔正式上線，檔案內容與原檔一致，Google HTML file 驗證成功。
- [x] GSC 提交與讀取核實：sitemap 顯示 Success、類型 Sitemap、最後讀取 24 Sept 2026、發現 22 個頁面；首次 Couldn't fetch 已轉為成功。
- [x] GSC 索引操作：兩個既有首頁 `/en`、`/zh-HK` 已在 Google 索引中，兩頁更新索引要求及雙語 product、demo、beta 共 6 個新頁的索引要求，合計 8 頁均收到 Indexing requested。新增頁面的後續收錄屬 Google 處理，不作本輪完成條件或排名保證。

實際驗收與授權經過見 `docs/WEBSITE_REDESIGN_2026-09-24.md`。AWS 首次自動審批拒絕已在取得使用者明確批准後安全解決；受保護預覽的 bypass 沒有重試，正式驗收使用公開網址。正式網站、資料庫及 GSC 設定與提交已完成；後續觀察 Google 的新增頁面收錄及搜尋資料，不把發現 22 個頁面寫成全部已收錄。
