# JARVIS 官網簡潔首頁及 SEO 實作範圍

更新：2026-09-11。呢份文件保留原有檔名；原本嘅 3D 捲動展示方案已被用戶最新指示取代。

## 最新目標

移除首頁 3D，保留已改善嘅 SEO，用簡潔介紹同產品介面示例說明 JARVIS 嘅實際用途。用戶唔再需要模型、長 sticky 舞台、章節切換或隨捲動替換內容。

首頁要清楚展示多 Gmail 工作區、電郵分組、個人指示、附引用分析同由用戶確認嘅記憶。示例使用合成資料並清楚標示，唔連接或修改真實信箱。後續詳情、指南、Beta 申請同其他公開頁面繼續可用。

## 實作範圍

1. 用簡潔 `HomeHero` 同產品工作流程示例取代原本展示。
2. 移除專用 experience 元件、文案、樣式、模型 controller tests，以及 Three.js／型別依賴。
3. 保留統一 metadata、canonical、hreflang、sitemap、robots、OG 同 JSON-LD；首頁仍有單一清晰 H1。
4. 保留英／繁體產品描述、設定及資料處理界線，唔將本機儲存寫成離線雲端推論。
5. 保留申請表無障礙、提交狀態、重複提交防護及錯誤重試。
6. 對最終版本重新執行 typecheck、lint、unit tests、production build、SEO route smoke，同英／繁體桌面及窄視窗瀏覽器驗收。

## 驗收界線

本輪最終版本已通過 typecheck、lint、18 個測試檔案／119 項測試、production build 同 21 路由 smoke；16 個公開頁面嘅 SEO 已核對。英文 1280×720 同繁體 395×715 瀏覽器已驗首頁、合成來源郵件同返回操作；冇橫向溢出，canvas 數量為 0。Three.js 依賴已移除。

示例資料全部係合成內容，記憶只作展示。詳細證據同驗收界線見 [官網驗收報告](../../SCROLL_EXPERIENCE_QA.md)。

只改官網，冇操作真實郵件、API key 或桌面產品；提供本機可檢閱版本，未 commit、push 或部署。
