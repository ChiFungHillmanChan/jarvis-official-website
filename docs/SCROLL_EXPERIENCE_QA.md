# 官網簡潔首頁及 SEO 驗收

日期：2026-09-11。範圍只限 `jarvis-official-website`。

呢份文件沿用原有檔名，方便保留文件連結。先前嘅 3D 展示方案已被用戶最新指示取代；本輪最終範圍係移除 3D，保留 SEO，改用簡潔首頁同產品工作流程示例。唔應按舊版本嘅描述重新加入模型、長捲動舞台或章節切換。

## 最新範圍

- 首頁直接介紹 JARVIS 電郵工作區，提供產品詳情同 Beta 申請入口。
- 用清晰產品介面示例說明多 Gmail、群組、個人指示及來源記憶；示例資料要標明，唔冒認係用戶真實信箱或已執行嘅外部操作。
- 移除首頁 3D 元件、模型渲染、長 sticky 捲動區、專用文案及樣式，以及只供模型使用嘅 Three.js 依賴同測試。
- 保留英／繁體產品詳情、設定指南、私隱、安全說明同申請表流程。

## 保留嘅 SEO 及產品內容

全 16 個公開頁面共用 metadata builder，統一 canonical、hreflang、OG／Twitter 同 sitemap。結構化資料包括 WebSite、WebPage／AboutPage／ContactPage、BreadcrumbList 同 localized SoftwareApplication。未核實售價唔寫入 structured data；原有 robots 規則保留。

產品文案區分本機電郵工作區同一般助理。之前同日已核對公開 v0.2.0 manifest GET，以及版本 DMG、updater 同 latest DMG alias HEAD 回應；冇下載 binary 或操作真實信箱。呢項發布資訊核對唔代表今次首頁修改已部署。

申請表保留清晰 labels、必填／選填提示、重複提交保護、提交中 disabled、invalid email focus 同可重試錯誤。

## 最終版本驗證狀態

以下係移除 3D 後最終版本嘅整合結果。之前模型版本嘅驗收唔當作本輪證據。

| 驗證項目 | 本輪狀態 |
| --- | --- |
| TypeScript typecheck | `npm run typecheck` 通過 |
| ESLint | `npm run lint` 通過 |
| Unit tests | `npm test`：18 個檔案、119 項通過 |
| Production build | `npm run build` 成功 |
| 21 路由 smoke，包括 16 個公開頁面 SEO | `npm run test:smoke` 全部通過 |
| 英文桌面首頁 | 1280×720：首頁、示例、來源 #18 Maya 同返回操作正常 |
| 繁體窄視窗首頁 | 395×715：示例及來源 #12 Alex 正確；文件寬 380px，viewport 含 scrollbar 為 395px，冇橫向溢出 |
| 3D 移除 | 瀏覽器 canvas 數量為 0；active source、測試／smoke 未見相關殘留；`npm ls` 冇 Three.js，package／lockfile 依賴同 HEAD 一致 |

Smoke 已核對標題、description、canonical、語言對應、OG／Twitter、H1、main、JSON-LD、sitemap 同 404；唔依賴已移除嘅模型或捲動進度。

## 範圍及限制

今輪冇發出真實申請電郵。表單成功、失敗及重複提交行為用模擬網絡回應驗證；實際對外寄送唔係本輪驗收內容。

產品示例同來源郵件全部係合成資料；記憶只作展示，冇建立真實記憶、連接信箱或執行外部操作。

未提交 Search Console，未聲稱搜尋排名、流量或 Core Web Vitals 分數已提升。未 commit、push 或部署。

## 參考

- [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google 多語頁面](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [最新實作範圍](superpowers/plans/2026-09-11-scroll-experience-seo.md)
