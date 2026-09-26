# SEO 與 Google Search Console 操作記錄

更新日期：2026-09-24。

## 目前狀態

- 正式網站的程式設定與本輪公開頁面讀取均指向 `https://jarvis-automation.com`。根目錄歷史文件中的 `jarvis-ai.com` 不是本輪採用的 canonical 網域。
- 已為 11 種頁面提供英語及繁體中文中繼資料，共 22 個公開 canonical 網址。新頁面為 `/product`、`/demo` 及 `/beta`，均包含兩種語言。
- Search Console 的 `https://jarvis-automation.com/` URL-prefix property 已通過 HTML file 所有權驗證，介面顯示 **Ownership verified**。
- 使用者提供的 `googlefc719566f35174e8.html` 已部署至正式根路徑並核對回應 `200` 及內容完全一致；Production 的 `GOOGLE_SITE_VERIFICATION` meta 標記亦已生效。兩者均應保留。
- 本輪 SEO 單元檢查：4 個測試檔案、24 項測試通過。這是本機程式驗證，不能用來聲稱 Google 已索引或搜尋排名已提升。

## 頁面與搜尋意圖

| 路徑（各有 `/en`、`/zh-HK`） | 內容用途 | 搜尋意圖假設 |
| --- | --- | --- |
| 首頁 | 說明 JARVIS 是個人 AI 助理 | JARVIS AI、個人 AI 助理 |
| `/product` | 功能、個人背景、使用界線 | AI assistant with memory、語音 AI 助理 |
| `/demo` | 產品示範與使用情境 | JARVIS demo、JARVIS 示範 |
| `/beta` | Beta 申請與需求收集 | JARVIS beta、JARVIS 試用 |
| `/how-it-works` | 設定與 Gmail 工作流程 | JARVIS setup、Gmail AI 整理 |
| `/download` | 現階段 macOS 版本及安裝 | JARVIS Mac download、下載 JARVIS |
| `/company`、`/contact` | 公司及聯絡資料 | JARVIS AI LIMITED、JARVIS 聯絡 |
| `/privacy`、`/terms`、`/security` | 資料處理與使用條款 | JARVIS privacy、JARVIS 安全 |

以上是內容與意圖的對應，沒有把它們當作已驗證搜尋量。以 Search Console 的實際 queries、pages、impressions 與 clicks 再決定後續內容。

## 技術規則

`content/metadata.ts` 產生各頁獨立 title、description、canonical、Open Graph 及 Twitter card。繁體中文頁 canonical 指向自身；兩種語言互相提供 `hreflang`，`x-default` 指向英語版本。Next.js 以 `metadataBase` 將相對連結輸出成完整網址；正式環境的 `NEXT_PUBLIC_SITE_URL` 必須是正式網域，不得填入臨時預覽網址。Google 要求 alternate 包含自身、相互對應及完整 URL。[Google 多語言頁面指引](https://developers.google.com/search/docs/specialty/international/localized-versions)

`lib/constants/routes.ts` 是可索引頁面清單，`app/sitemap.ts` 從同一清單產生 sitemap。付款成功／取消頁及 API 不在清單內；付款結果頁保留 `noindex`。`robots.txt` 允許抓取公開頁面並宣告 sitemap，只封鎖 `/api/`。不要另外封鎖付款頁抓取，否則搜尋引擎可能讀不到頁面的 `noindex`。

Sitemap 不填入每次建置時間作為 `lastmod`，也沒有用 `priority` 或 `changefreq` 製造更新訊號。只有日後能追溯至頁面實質更新的日期才適合加入 `lastmod`。[Google sitemap 指引](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

JSON-LD 使用 Organization、WebSite、WebPage／AboutPage／ContactPage、BreadcrumbList 及 SoftwareApplication。軟件版本跟隨 `public/latest.json`，作業系統描述目前提供的版本。沒有虛構 offers、評分、評論或 VideoObject；因此不宣稱符合軟件應用程式複合式搜尋結果資格。Google 的該項資格要求售價及評分或評論，不能為通過檢查而補上不存在的資料。[Google 軟件應用程式結構化資料](https://developers.google.com/search/docs/appearance/structured-data/software-app)

## 維護與重做 Search Console 驗證的步驟

1. 在現有 Google 帳戶開啟 [Search Console](https://search.google.com/search-console)，使用本輪已驗證的 URL-prefix property `https://jarvis-automation.com/`。
2. 本輪使用 HTML file 驗證。保持 `public/googlefc719566f35174e8.html` 與 Google 原檔一致並由正式根網址提供，勿改名、翻譯或套用網站版型。
3. 若改用 HTML tag，將 `content` 值存入 Vercel 正式環境的 `GOOGLE_SITE_VERIFICATION`，部署後核對首頁 `<head>`，再按 **Verify**。目前 HTML file 及環境變數均已生效，應保留；Google 會定期重查所有權。
4. 在 **Sitemaps** 提交 `https://jarvis-automation.com/sitemap.xml`，保存實際提交時間、讀取狀態及 discovered pages 數量。只看到輸入網址或提交按鈕，不能記錄為成功。
5. 使用 **URL Inspection** 檢查英語及繁體中文首頁，再檢查兩種語言的 product、demo、beta。確認即時測試可抓取、沒有 `noindex`、使用者指定 canonical 正確；對重要的新頁面提交 **Request indexing**。Google 選擇的 canonical 要等實際索引資料更新後才可判斷。
6. 記錄每一步的實際結果。Sitemap 提交或索引要求不保證收錄時間、排名或流量。

HTML tag 只適用於 URL-prefix property。若日後需要一次涵蓋所有協定及子網域，可在現有 DNS 管理權限下另設 Domain property；該類 property 要用 Google 指定的 DNS 記錄驗證，不使用本環境變數。[Google 所有權驗證](https://support.google.com/webmasters/answer/9008080?hl=en)

## 發佈後檢查與衡量

- 檢查所有 sitemap URL 回傳 `200`，canonical／hreflang 與 sitemap 一致，付款回傳頁維持 `noindex`，未知路徑回傳 `404`。
- 以 [Rich Results Test](https://search.google.com/test/rich-results) 核對可支援的結構化資料；將缺少真實商業資料造成的資格限制與 JSON 語法錯誤分開處理。
- 首次部署後保留基準日期。定期查看 **Page indexing**、**Sitemaps**、**Performance**、**Core Web Vitals**；資料不足時記錄「尚無資料」，不要換算成零問題或成效提升。
- Performance 分開查看品牌詞與非品牌詞、英語與繁體中文頁面、國家與裝置。優先檢查有曝光但點擊低的 title／description，再參考 Beta 表單的實際有效申請評估內容是否帶來合適用戶。
- 新增頁面或語言時，同步修改路由清單、中繼資料、頁面 JSON-LD、站內連結及對應測試。持續以當時可下載版本核對功能聲稱。

## 重跑本機 SEO 檢查

本機系統 Node 是 x64，而現有依賴為 arm64；使用已安裝的 Node 22：

```sh
/Users/hillmanchan/.nvm/versions/node/v22.22.0/bin/node node_modules/vitest/vitest.mjs run content/metadata.test.ts app/sitemap.test.ts lib/seo/pageJsonLd.test.ts components/seo/jsonLd.test.tsx
```

完整發佈驗收還包括 production build、實際 HTML smoke、雙語頁面與社交圖片視覺檢查；結果應在部署報告中另行記錄。

## 2026-09-24 本輪正式部署與 Google 操作

- 正式部署 `dpl_BMGWdwxZpmEmwcwE1oUcQW3VZBJc` 已 READY 並綁定 `https://jarvis-automation.com`。
- Google 所有權已透過使用者提供的 HTML 驗證檔確認成功。
- Sitemap 包含 22 個雙語公開頁，HTTP `200`、`application/xml`、XML 解析、canonical／hreflang 及 robots 宣告均通過正式讀取核對。
- Google 顯示 **Sitemap submitted successfully**，其後狀態已更新為 **Success**，類型 **Sitemap**，最後讀取日期 **24 Sept 2026**，**Discovered pages: 22**。首次短暫出現的 **Couldn't fetch** 已消失，沒有修改 XML 或重複提交。
- `/en` 及 `/zh-HK` 兩個首頁的既有索引皆顯示 **URL is on Google / Page is indexed**。新版的 **Request indexing** 已分別收到 **Indexing requested**，進入抓取佇列；不能由此推定新版內容已完成重抓。
- 新增的雙語 product、demo 及 beta 頁面已逐頁收到 **Indexing requested**，合計連同兩個首頁共 8 頁。product 檢查時為 **URL is unknown to Google**，demo／beta 為 **Discovered – currently not indexed**；提交成功不等於已完成索引。

| 已提交網址 | 本輪可見結果 |
| --- | --- |
| `/en`、`/zh-HK` | 既有頁已索引；新版更新要求均為 Indexing requested |
| `/en/product`、`/zh-HK/product` | 索引要求均為 Indexing requested |
| `/en/demo`、`/zh-HK/demo` | 索引要求均為 Indexing requested |
| `/en/beta`、`/zh-HK/beta` | 索引要求均為 Indexing requested |

完整部署及資料庫證據見 `WEBSITE_REDESIGN_2026-09-24.md`。
