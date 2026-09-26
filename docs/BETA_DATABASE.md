# Beta 申請資料庫

更新日期：2026-09-24。此文件描述本輪實作；正式環境是否已設定及通過實測，須以本次部署紀錄為準。

## 收集流程

`POST /api/waitlist` 驗證電郵、可選職位／困難描述、語言，以及私隱聲明與條款的明確確認。兩份文件版本均為 `2026-09-24`，定義於 `lib/waitlist/policy.ts`。未確認或版本過期時回傳 `400 consent_required`。

有效申請先寫入 AWS DynamoDB，才可回傳成功。缺少資料庫設定、權限不足、超時或儲存失敗，一律回傳 `503 storage_unavailable`，容許重試，不會因記憶體內已有相同地址而誤報成功。蜜罐欄位有值的機械式提交會被丟棄。

資料表以修整空格及小寫化後的 `email` 作唯一分割鍵。條件寫入 `attribute_not_exists(email)` 在資料庫內原子執行；同時請求、多個 Vercel 執行個體及重新部署不會產生第二筆相同地址記錄。重複提交不覆寫原有答案、審批狀態或首次確認紀錄。地址擁有人如需更正資料，應透過聯絡渠道處理。

| 欄位                                   | 用途                                 |
| -------------------------------------- | ------------------------------------ |
| `email`                                | 申請人聯絡地址、唯一鍵               |
| `role`、`painPoint`                    | 申請人自願提供的背景及需求           |
| `locale`                               | `en` 或 `zh-HK`，可省略              |
| `createdAt`                            | 伺服器 UTC 收件時間                  |
| `privacyAcceptedAt`、`termsAcceptedAt` | 本次提交的確認時間                   |
| `privacyVersion`、`termsVersion`       | 提交時確認的文件版本                 |
| `status`                               | 初始為 `pending`，不代表已批出存取權 |
| `source`、`schemaVersion`              | `website-beta` 及資料格式版本 `1`    |

資料庫不儲存 IP、User-Agent、瀏覽器指紋或宣傳訂閱同意。操作錯誤只記錄固定錯誤代碼，不輸出申請內容或供應商錯誤物件。

通知與確認郵件是補充功能，預設停用；只有 `WAITLIST_EMAILS_ENABLED=true` 才會在首次成功寫入後嘗試發送。郵件失敗不影響已保存申請；目前沒有郵件重試佇列。不要以收到郵件作為唯一驗收證據，應核對資料庫。

## AWS 與 Vercel 設定

`infra/waitlist.yaml` 建立專用 DynamoDB 表、Vercel team OIDC provider 及寫入 role。預設只信任 `hillmans-projects-ef63d7ca` 團隊、`jarvis-official-website` 專案的 `production` token，role 只可對指定表執行 `dynamodb:PutItem`，不能讀取、掃描或刪除申請。

表採按用量計費，啟用時間點還原及刪除保護；刪除 CloudFormation stack 仍保留表。儲存及備份可能產生 AWS 用量費用。DynamoDB 本身提供靜態加密；區域由部署參數決定，本專案部署指令使用新加坡 `ap-southeast-1`。

```sh
aws cloudformation validate-template --template-body file://infra/waitlist.yaml --profile jarvis-deploy --region ap-southeast-1
aws cloudformation deploy --stack-name jarvis-website-beta --template-file infra/waitlist.yaml --capabilities CAPABILITY_IAM --profile jarvis-deploy --region ap-southeast-1
aws cloudformation describe-stacks --stack-name jarvis-website-beta --query 'Stacks[0].Outputs' --profile jarvis-deploy --region ap-southeast-1
```

將 outputs 對應至 Vercel **Production** 環境：`WaitlistTableName` → `WAITLIST_TABLE_NAME`、`AwsRegion` → `AWS_REGION`、`AwsRoleArn` → `AWS_ROLE_ARN`。另外設定 `WAITLIST_EMAILS_ENABLED=false`。專案 Security 的 OIDC issuer 必須使用 Team 模式。更新環境變數後重新部署。

不需要把 AWS access key 或 secret key 上傳至 Vercel。Vercel 環境缺少 `AWS_ROLE_ARN` 會拒絕保存；本機可省略 role，使用標準 AWS SDK credential chain，例如具該表權限的 `AWS_PROFILE`。

Preview 如需收集測試資料，應使用獨立表／role，將 `VercelEnvironment=preview`，並以 `ExistingOidcProviderArn` 重用 team provider，不要讓 Preview 寫入正式申請表。

## 驗證

單元測試使用模擬 AWS transport，驗證 API 流程、競爭條件、儲存失敗後重試、重新啟動後去重、郵件失敗及私隱欄位。這些測試不證明正式 AWS／Vercel 已連接。

```sh
npm test -- app/api/waitlist/route.test.ts lib/validation/waitlistSchema.test.ts lib/ratelimit/waitlistLimiter.test.ts scripts/verify-waitlist.test.ts
```

正式連線驗收使用 `scripts/verify-waitlist.mjs`：先拒絕沒有確認的提交，再並行提交同一個隨機 `example.invalid` 測試地址，以強一致性讀取確認資料確實存在，最後只刪除該測試記錄。腳本不列出真實申請人資料。執行身份須有測試表的 `GetItem`／`DeleteItem` 權限；Vercel 寫入 role 本身不具備這些權限。

**執行前確認部署的郵件開關為 false**。`WAITLIST_SMOKE_EMAILS_DISABLED=true` 是操作員對此設定的確認，腳本不會自行改變遠端開關。

```sh
AWS_PROFILE=jarvis-deploy AWS_REGION=ap-southeast-1 WAITLIST_TABLE_NAME=jarvis-website-beta-production WAITLIST_SMOKE_BASE_URL=https://jarvis-automation.com WAITLIST_SMOKE_EMAILS_DISABLED=true node scripts/verify-waitlist.mjs
```

如部署設有 Vercel protection，可另以環境變數提供 `VERCEL_AUTOMATION_BYPASS_SECRET`；不要把秘密值放入指令歷史或報告。

## 維運及保留

申請用途只限審核、邀請及必要測試聯絡，不會自動加入宣傳名單。按私隱聲明處理查閱、更正及刪除要求；資料保留以用途所需期間為限。此版本沒有自動到期刪除或自動審批功能，管理者須定期檢視不再需要的記錄，亦須將備份保留納入刪除處理流程。

現有 IP／收件地址限流仍屬單一執行個體的記憶體保護；資料庫去重可跨執行個體，但不等於分散式限流。Production 應在 Vercel Firewall 為 `/api/waitlist` 設定按 IP 限流，以涵蓋所有執行個體。

技術依據：[AWS PutItem 條件寫入](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)、[Vercel AWS OIDC](https://vercel.com/docs/oidc/aws)、[Vercel OIDC SDK](https://vercel.com/docs/oidc/reference)。

## 2026-09-24 正式驗收

使用者明確批准後，CloudFormation `jarvis-website-beta` 已建立成功。表 `jarvis-website-beta-production` 為 ACTIVE、PAY_PER_REQUEST，位於 ap-southeast-1，啟用刪除保護。Vercel Production 已設定表名、區域、專用 OIDC role，並保持 `WAITLIST_EMAILS_ENABLED=false`。正式部署為 `dpl_BMGWdwxZpmEmwcwE1oUcQW3VZBJc`，已連到 `https://jarvis-automation.com`。

已對正式 `/api/waitlist` 執行真實端到端腳本：缺少確認回 400；兩個同地址並行有效請求均成功；DynamoDB 強一致性 GetItem 確認記錄、狀態、語言及政策版本；只清理該次隨機 example.invalid 測試記錄，再確認不存在。沒有列出或修改真實申請人資料，沒有發送電郵，沒有使用 Vercel protection bypass。
