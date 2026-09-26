import { company } from "@/content/company";

export type LegalSection = {
  id: string;
  title: string;
  body: string;
  links?: readonly { label: string; href: string }[];
};

export type LegalPageCopy = {
  heading: string;
  lastUpdated: string;
  summary: string;
  sections: readonly LegalSection[];
};

type LegalCopy = Record<"privacy" | "terms" | "security", LegalPageCopy>;

const contactLink = { label: company.contactEmail, href: `mailto:${company.contactEmail}` };
const googlePolicy = "https://developers.google.com/terms/api-services-user-data-policy";
const workspacePolicy = "https://developers.google.com/workspace/workspace-api-user-data-developer-policy";

export const enLegal: LegalCopy = {
  privacy: {
    heading: "Privacy Policy",
    lastUpdated: "Last updated: 26 September 2026 · Version 2026-09-26",
    summary: "How we handle website applications, information on your Mac and content sent to connected services.",
    sections: [
      {
        id: "responsibility",
        title: "1. Who is responsible",
        body: `This policy covers the JARVIS website, beta applications and JARVIS, our AI personal assistant currently available for macOS. They are operated by ${company.legalName}, a Hong Kong company with limited liability (Company No. ${company.companyNumber}; Business Registration No. ${company.businessRegistrationNumber}). Our registered office is ${company.registeredAddress}.\n\nWe are the data user for personal data we collect to operate the website and beta programme. Contact our privacy contact at ${company.contactEmail} or write to the registered office, marked “Privacy”. This policy also explains data processed by the desktop application and your chosen providers; local storage and cloud processing are separate.`,
        links: [contactLink],
      },
      {
        id: "website-data",
        title: "2. Beta applications and contact requests",
        body: "When you apply, we collect your email address, any optional role and workflow information you provide, language preference, submission time, application status, and the time and versions of your privacy acknowledgement and terms acceptance. We use these records to review applications, manage invitations, prevent duplicate applications and contact you about participation. An email address and the required acknowledgements are necessary to process an online application; optional answers are not required.\n\nIf you email us, we receive your address, message and any attachments you choose to send. We use them to respond, provide support and investigate reported problems. Please do not include passwords, API keys or other people’s private messages unless they are necessary and you are authorised to share them.\n\nApplying does not subscribe you to general marketing. Application, invitation and necessary beta service messages are limited to the programme you requested. You can withdraw your application or ask us to stop these messages by contacting us. Any future unrelated marketing requires a separate choice.",
      },
      {
        id: "website-services",
        title: "3. Website hosting, storage and analytics",
        body: "Vercel hosts the website and processes network information, such as your IP address and request details, to deliver and protect it. The form uses your IP address and email address temporarily to limit abuse; the beta application record does not include your IP address or browser user-agent. Beta application records, including the application source and record-format version, are stored in Amazon DynamoDB in the AWS Asia Pacific (Singapore) region, with database backups.\n\nWhere application email notifications are enabled, Resend processes email addresses and message content to deliver confirmations and internal application notifications; those notifications also reach our company mailbox. A successful application is saved in the database even if no confirmation email is sent.\n\nThe website includes Vercel Web Analytics to understand page traffic. It processes information such as page URL, referrer, approximate location, browser, operating system and device type. Vercel describes this as aggregate analytics without advertising cookies or persistent visitor tracking across websites. We do not send application answers or email addresses as custom analytics events. The website does not set a language-preference cookie or use advertising cookies.",
        links: [
          { label: "Vercel analytics privacy information", href: "https://vercel.com/docs/analytics/privacy-policy" },
          { label: "Resend privacy policy", href: "https://resend.com/legal/privacy-policy" },
          { label: "AWS privacy notice", href: "https://aws.amazon.com/privacy/" },
        ],
      },
      {
        id: "desktop-storage",
        title: "4. Information stored on your Mac",
        body: "Depending on the features you use, JARVIS stores conversations, tasks, connected-service context, email copies, groups, personal instructions, preferences and confirmed memories in a local SQLite database. API keys and connection credentials are stored using macOS Keychain. Local diagnostic logs may also contain operational details or transcribed text. These local records are not uploaded to a JARVIS cloud workspace, and the current email workspace does not provide cross-device sync.\n\nThe local database has no separate application-level encryption. Its protection depends on your Mac’s account permissions, device security and any disk encryption you enable. Data you send to AI or connected services leaves the device as described below. Data you voluntarily send to support is also received by us.",
      },
      {
        id: "google-access",
        title: "5. Google connections and their permissions",
        body: "The email workspace requests Gmail read-only access (gmail.readonly) to retrieve your account address, message metadata and email text for local reading, organisation and analysis. Synchronisation runs when you start it and may also run automatically, about every five minutes, while JARVIS is open. It does not send mail or change Gmail labels. Attachments are not downloaded by this workspace.\n\nThe separate general-assistant Google connection requests Gmail read/modify access (gmail.modify), Calendar access and basic profile information. It supports reading and organising email, saving drafts, calendar operations and displaying your name. While JARVIS is open, this connection syncs recent email and calendar events in the background about every five minutes. This connection has broader permissions than the email workspace. The assistant’s email tool creates a draft in Gmail for you to review; it does not send the draft. Review the Google consent screen for the connection you enable.",
      },
      {
        id: "ai-processing",
        title: "6. AI analysis, provider choice and voice",
        body: "General assistant requests contain your prompt, relevant conversation or connected-service context, and local JARVIS records a request needs, such as email follow-ups and your task list. They go to the provider configured in the application. The default general-assistant route uses Google Gemini; enabled alternatives or fallbacks can include OpenAI, Anthropic, Amazon Bedrock and local models. A local model selection does not, by itself, disable enabled cloud fallbacks or separate voice services.\n\nThe email workspace has separate analysis settings. If you select OpenAI or Amazon Bedrock and acknowledge the cloud transfer, the group’s included email text, personal instructions and relevant active memories are sent to that provider using your account. Local Ollama analysis is also supported. Email analysis does not automatically switch to another provider on failure. Memories are created or confirmed by you; analysis does not save them automatically.\n\nThe email workspace also offers automatic sorting, which stays off until you turn it on. When it is on, the sender, recipients, subject and first 1,500 characters of each message not yet sorted, together with your own mailbox addresses, are sent to TypeSafe to classify the message. For messages that need a summary or a dated follow-up, up to 6,000 characters of the message are also sent to OpenAI. Both use API keys you provide. Once on, sorting runs after every sync, including automatic ones, and the usage is charged to your own provider accounts. The resulting categories, summaries and follow-ups are stored on your Mac.\n\nWhen you use voice input and a Gemini key is available, recorded command audio is sent to Google for transcription; local Whisper is a supported fallback. MiniMax receives text to be spoken if you select its speech service. macOS speech and a configured local CosyVoice model are local alternatives. Selecting local text analysis does not change these voice settings.\n\nProvider terms, account settings and retention controls apply to content they receive. The email workspace requests OpenAI processing with response storage disabled; this does not guarantee zero provider retention. Gemini’s unpaid-service terms can allow use of submitted content for model improvement and human review. Do not send personal, sensitive, confidential or Google user data through a provider configuration that permits incompatible uses. Review provider settings before connecting work accounts or processing private material.",
        links: [
          { label: "OpenAI API data controls", href: "https://developers.openai.com/api/docs/guides/your-data" },
          { label: "Gemini API terms and data use", href: "https://ai.google.dev/gemini-api/terms" },
          { label: "Amazon Bedrock data protection", href: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html" },
        ],
      },
      {
        id: "google-limited-use",
        title: "7. Limited use of Google user data",
        body: "JARVIS’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including its Limited Use requirements, and the applicable Google Workspace user data policy. Google user data is used to provide the user-facing features you request. Transfers for those features require your consent.\n\nWe do not sell Google user data, use it for advertising or credit decisions, or use it to train general-purpose AI models. Our personnel may access specific Google content you provide for support only with your explicit permission, or where necessary for security or legal obligations as permitted by Google’s policy. These restrictions also apply to service providers handling that data on our behalf. This statement is not a claim of Google verification or certification.",
        links: [
          { label: "Google API Services User Data Policy", href: googlePolicy },
          { label: "Google Workspace user data policy", href: workspacePolicy },
        ],
      },
      {
        id: "sharing",
        title: "8. Recipients and international processing",
        body: "Website and support data can be handled by our hosting, database, email-delivery and company-email providers and authorised personnel managing applications or support. Connected services such as Google, Notion and GitHub receive the requests made through their integrations, including background refreshes while JARVIS is open. Your configured AI and voice providers receive the content described above, as do TypeSafe and OpenAI for optional email sorting. These providers may process data outside Hong Kong, including in the United States or other locations supported by their services; choosing a local database does not limit cloud processing to Hong Kong.\n\nWe do not sell personal data. We may disclose information where legally required, to address fraud or security incidents, or to protect legal rights, subject to applicable law and any stricter Google-data restrictions. If ownership of the service changes, applicable privacy obligations continue; any transfer of Google user data that requires prior consent will be subject to that consent.",
      },
      {
        id: "retention",
        title: "9. Retention and deletion",
        body: "We retain website applications and related correspondence only while needed to manage your request or participation, resolve an outstanding issue, or meet a legal obligation. When those purposes end, we delete or de-identify records. A limited record of a withdrawal or consent may be kept where needed to honour your choice or establish how the request was handled. There is no blanket promise that all records disappear immediately: copies in email systems, provider logs and backups may remain under the relevant retention arrangements. You may contact us to request deletion and information about any justified retention.\n\nDesktop records remain on your Mac until you delete them; uninstalling the app alone may leave its data and Keychain entries. In the email workspace, disconnecting an account removes its local connection credential but keeps downloaded emails. Explicitly deleting that account removes its local emails and memories sourced from them, without deleting Gmail originals. Deleting a group removes its memberships and memories, not the underlying local emails. You can also edit or delete individual memories.\n\nRevoking access in your Google Account stops future authorised access but does not itself erase existing local copies. It can affect other JARVIS connections using the same Google authorisation. For help removing remaining local data or credentials, contact us. We cannot remotely erase your Mac or automatically delete records held under your own provider accounts.",
        links: [{ label: "Manage Google third-party connections", href: "https://support.google.com/accounts/answer/13533235" }],
      },
      {
        id: "rights",
        title: "10. Your choices, requests and complaints",
        body: `You may request access to and correction of personal data we hold about you, ask for deletion, or withdraw your beta application and related communications. Send requests to ${company.contactEmail} or our registered office, marked “Privacy”. Please identify the email address used and the request; we may ask for proportionate information to verify your identity. Do not send an identity-document copy unless specifically required.\n\nWe handle access and correction requests within the applicable statutory period. Under Hong Kong’s Personal Data (Privacy) Ordinance this is generally 40 days, subject to the law’s exceptions and procedures. Where we cannot fulfil a request, we will explain the reason as required. Deletion is subject to any lawful need to retain particular records. You may also contact Hong Kong’s Office of the Privacy Commissioner for Personal Data about a privacy complaint. Mandatory rights under other applicable laws are unaffected.`,
        links: [contactLink, { label: "Office of the Privacy Commissioner for Personal Data", href: "https://www.pcpd.org.hk/" }],
      },
      {
        id: "changes",
        title: "11. Changes to this policy",
        body: "We update this page when our handling changes and identify the current version above. Material changes will be brought to affected users’ attention through the website, the application or direct communication as appropriate. New purposes or transfers that require consent will not be authorised merely by publishing an updated policy.",
      },
    ],
  },
  terms: {
    heading: "Terms and Conditions",
    lastUpdated: "Last updated: 24 September 2026 · Version 2026-09-24",
    summary: "The terms for using the website, applying to the beta and using JARVIS as your AI personal assistant.",
    sections: [
      {
        id: "agreement",
        title: "1. These terms and the provider",
        body: `These terms govern the JARVIS website, beta programme and JARVIS application provided by ${company.legalName}, a company incorporated in Hong Kong with limited liability (Company No. ${company.companyNumber}; Business Registration No. ${company.businessRegistrationNumber}), at ${company.registeredAddress}. “We”, “us” and “JARVIS AI” mean that company.\n\nBy accepting these terms when applying for access or using the service after being presented with them, you agree to them. You must have legal capacity to agree and authority to connect the accounts or handle the data you use. If acting for an organisation, you must be authorised to do so. Our Privacy Policy explains data handling; accepting these terms is not permission for unrelated marketing or every possible transfer of your data.`,
      },
      {
        id: "beta",
        title: "2. Beta access and availability",
        body: "JARVIS is an AI personal assistant currently available for macOS. Submitting an application does not guarantee an invitation, a release date or access to a particular feature. We review requests and make access available according to the programme’s capacity and requirements.\n\nBeta features may be incomplete, change or be withdrawn. Errors, interruptions, lost settings or incompatible updates can occur. Keep independent copies of important work and review release requirements. Roadmap statements describe intentions, not contractual commitments to deliver a feature or support another platform.",
      },
      {
        id: "licence",
        title: "3. Permission to use JARVIS",
        body: "Subject to these terms and any licence supplied with a build, we permit you to install and use the application for your own or your organisation’s authorised work during your access to the service. This permission is non-exclusive and does not transfer ownership of our software or branding. Open-source components remain subject to their respective licences, which take precedence for those components.\n\nYou retain rights in the content you provide. You permit processing of that content only as needed to perform your requested features, maintain the service and provide requested support in accordance with the Privacy Policy. This is not a licence for us to sell your private content or use Google user data to train general-purpose models. AI output may be inaccurate, non-unique or subject to third-party rights; we do not promise exclusive rights in it.",
      },
      {
        id: "user-control",
        title: "4. Your accounts, content and decisions",
        body: "You are responsible for the accounts you connect, the information you supply and your authority to process other people’s data. Follow any confidentiality obligations and your organisation’s rules before sending material to cloud providers. Protect your Mac, credentials and API keys, and revoke connections you no longer need.\n\nReview prompts, generated answers, sources, recipients, dates and amounts before relying on them. The email workspace’s group analysis does not send mail or perform its suggested actions. The general assistant’s email tool saves a draft for you to review in Gmail. Other enabled tools can change connected services, such as calendar events; understand the requested operation and check its result. A source citation is not a guarantee that an interpretation is correct.",
      },
      {
        id: "ai-limits",
        title: "5. AI and service limitations",
        body: "AI can omit information, invent details or misunderstand instructions. JARVIS is a work assistant, not a professional adviser or an emergency service. Obtain appropriate professional advice for medical, legal, financial or other consequential decisions. Do not rely on it as the sole source of a deadline, commitment or safety-critical decision.\n\nSynchronisation and analysis may cover only a subset of your information. JARVIS is not a complete mailbox backup, and the current local email workspace has no cross-device sync. Model availability, permissions and provider limits can affect results. You should maintain your own backup and recovery arrangements.",
      },
      {
        id: "third-parties-fees",
        title: "6. Third-party services and charges",
        body: "Connected accounts, AI providers, voice services and downloads from other services are also governed by their own terms. You choose whether to connect them and are responsible for charges on API or cloud accounts you supply. Selecting local storage does not mean all requests are offline or free.\n\nApplying for beta access does not purchase a subscription or authorise a charge. Any future paid offer must state its price, billing period, included features, renewal, cancellation and refund terms before you purchase. A test checkout, proposed price or roadmap label does not by itself create a paid entitlement. Separate terms expressly accepted for a paid order apply to that order.",
      },
      {
        id: "acceptable-use",
        title: "7. Acceptable use",
        body: "Use the website and application lawfully. Do not access accounts or data without authority; infringe privacy or intellectual-property rights; distribute malware, spam or fraudulent material; evade access restrictions or rate limits; or disrupt the service or its providers. Do not use the service for unlawful surveillance or deceptive impersonation.\n\nDo not resell access, misrepresent affiliation with JARVIS, or copy or exploit our materials beyond your licence or what applicable law permits. Security concerns can be reported privately using the contact on our Security page; a report does not authorise testing that accesses another person’s information or disrupts the service.",
      },
      {
        id: "feedback",
        title: "8. Feedback and intellectual property",
        body: "Our website materials, branding and software are protected by intellectual-property rights belonging to us or our licensors. You may share links to the website and use materials where permitted by law or an express licence.\n\nIf you voluntarily submit suggestions, you allow us to use them to improve JARVIS without an obligation to implement them or pay compensation. This does not transfer ownership of your underlying content or permit publication of private messages, identifying feedback or testimonials without appropriate permission.",
      },
      {
        id: "ending-access",
        title: "9. Ending or suspending access",
        body: "You may stop using JARVIS or withdraw a beta application at any time. Remove connected-service access and local data separately if you want them deleted; stopping use or uninstalling alone may not remove them. The Privacy Policy explains these controls.\n\nWe may restrict access where reasonably necessary to address misuse, security, legal obligations or a discontinued beta programme. Where practicable, we will give notice and explain the reason. This does not limit rights under an existing paid order or mandatory law. Terms intended to continue, including intellectual-property provisions and rights arising before termination, survive the end of access.",
      },
      {
        id: "responsibility-limits",
        title: "10. Warranties and legal rights",
        body: "To the extent permitted by applicable law, the website and beta software are provided as available, without a promise of uninterrupted operation, error-free results or fitness for a particular purpose. We do not guarantee that a third-party service will remain available or that AI output is accurate.\n\nNothing in these terms excludes or limits liability for fraud, death or personal injury caused by negligence, or any other liability or statutory consumer right that cannot lawfully be excluded or limited. These terms do not remove remedies that applicable law requires us to provide.",
      },
      {
        id: "law-changes-contact",
        title: "11. Changes, governing law and contact",
        body: `We may update these terms as the service develops, identify the effective version and notify affected users of material changes as appropriate. Revised terms apply prospectively; where a change requires fresh acceptance, we will request it. An existing paid order is not silently rewritten by a website update.\n\nThese terms are governed by the laws of the Hong Kong Special Administrative Region. Hong Kong courts have non-exclusive jurisdiction, without affecting mandatory rights or forums available to you under applicable law. If a provision is unenforceable, the remaining provisions continue so far as legally possible.\n\nFor service questions or a dispute, contact ${company.contactEmail} or write to the registered office above. The English and Traditional Chinese versions are intended to convey the same terms; please contact us if you identify a discrepancy.`,
        links: [contactLink],
      },
    ],
  },
  security: {
    heading: "Security and Data Controls",
    lastUpdated: "Last updated: 26 September 2026",
    summary: "The controls available today, their limits and how to report a security concern.",
    sections: [
      {
        id: "local-data",
        title: "1. Local records and credentials",
        body: "JARVIS stores desktop conversations and connected-service context in a local SQLite database. API keys and connection credentials use macOS Keychain. The database itself has no separate application-level encryption. Use an individual macOS account, keep your device updated, and consider FileVault and secure backups. Removing the app may leave data or credentials behind.\n\nWebsite beta applications are separate server-side records. Applying for access does not upload your Mac’s mailbox or conversations to that application record.",
      },
      {
        id: "connections",
        title: "2. Connections and permissions",
        body: "Google connections use OAuth, so you authorise access on Google’s own consent screen. The email workspace requests read-only Gmail access; the separate general-assistant connection has Gmail modification, Calendar and profile permissions. Review the scope of each connection. You can disconnect in JARVIS and revoke access through your Google Account.\n\nThe email workspace’s analysis does not send email or execute its suggested next steps. Automatic sorting has no tools either: it only classifies messages, writes summaries and extracts follow-ups. The general assistant creates Gmail drafts for review. Other connected tools can make changes within their supported permissions, so review actions and their results.",
        links: [{ label: "Manage Google third-party connections", href: "https://support.google.com/accounts/answer/13533235" }],
      },
      {
        id: "processing",
        title: "3. Cloud processing is a separate choice",
        body: "Local storage does not mean local AI processing. General chat can use configured cloud providers and fallbacks. Email analysis has separate local, OpenAI and Bedrock settings; its cloud modes disclose the transfer of group messages, instructions and active memories. Automatic sorting, once you turn it on, sends message details to TypeSafe and, for some messages, OpenAI. Voice transcription and speech output have their own provider settings.\n\nCloud service requests use HTTPS. A supported local email-analysis model avoids that analysis transfer, but email synchronisation, updates, downloads and separately enabled cloud services still need a network connection. This is not an end-to-end encryption or zero-retention service.",
      },
      {
        id: "deletion",
        title: "4. Disconnecting and deleting",
        body: "Disconnecting a mailbox stops its local connection and keeps downloaded copies. Explicitly deleting the mailbox account removes that account’s local mail and source-linked memories without deleting Gmail originals. Groups and memories have their own deletion controls. Revoking Google access does not erase existing local copies.\n\nFor website application deletion or help clearing local data and credentials, contact us. We may need to verify your identity for server-side records; we cannot remotely erase your Mac.",
        links: [contactLink],
      },
      {
        id: "limits",
        title: "5. Current limits",
        body: "No system can promise perfect security. JARVIS is in beta; permissions, external services, model behaviour and your device settings all affect risk. The current email workspace does not offer cloud backup or cross-device sync. Public policy pages do not establish a security certification, an independent audit or Google OAuth verification.\n\nKeep independent backups and avoid sending sensitive content to a provider configuration that is unsuitable for that information. The Privacy Policy describes the relevant transfers and controls.",
      },
      {
        id: "report",
        title: "6. Report a security issue",
        body: `Email ${company.contactEmail} with “[Security]” in the subject. Include the affected version or URL, a concise description and reproduction steps using synthetic or redacted data. Do not include live tokens, passwords or another person’s private content.\n\nWe review reports and coordinate follow-up through that address. There is no published bounty or guaranteed response-time commitment. Do not access other users’ accounts, retain unnecessary personal data, disrupt services or publicly disclose private information while reporting a concern.`,
        links: [contactLink],
      },
    ],
  },
};

export const zhLegal: LegalCopy = {
  privacy: {
    heading: "私隱政策",
    lastUpdated: "最後更新：2026 年 9 月 26 日 · 版本 2026-09-26",
    summary: "說明我們如何處理網站申請、Mac 上的資料，以及傳送至已連接服務的內容。",
    sections: [
      {
        id: "responsibility",
        title: "1. 負責處理資料的機構",
        body: `本政策適用於 JARVIS 網站、Beta 申請，以及目前供 macOS 使用的 AI 個人助理 JARVIS。上述服務由香港有限公司 ${company.legalName} 營運（公司編號 ${company.companyNumber}；商業登記號碼 ${company.businessRegistrationNumber}），註冊辦事處為 ${company.registeredAddress}。\n\n我們是為營運網站及 Beta 計劃而收集的個人資料的資料使用者。私隱事宜請電郵至 ${company.contactEmail}，或寄往上述註冊辦事處並註明「私隱」。本政策亦說明桌面應用程式及你選用的供應商如何處理資料；本機儲存與雲端處理是不同的資料流程。`,
        links: [contactLink],
      },
      {
        id: "website-data",
        title: "2. Beta 申請及聯絡資料",
        body: "提交申請時，我們收集你的電郵地址、自願填寫的職務及工作流程資料、語言偏好、提交時間、申請狀態，以及確認已閱讀私隱政策和接受條款的時間與版本。我們用這些紀錄審核申請、安排邀請、避免重複申請及聯絡你參與測試。電郵地址及表格要求的確認是處理網上申請所需的資料；其他選填答案並非必須。\n\n你電郵聯絡我們時，我們會收到你的地址、訊息及自願提供的附件，並用於回覆、支援及調查問題。除非確有需要且你有權分享，否則請勿提供密碼、API key 或他人的私人訊息。\n\n申請不會自動訂閱一般推廣。我們只會就你申請的計劃發送申請、邀請及必要的 Beta 服務訊息。你可聯絡我們撤回申請或停止這些訊息；日後如有與申請無關的推廣，會另行提供選擇。",
      },
      {
        id: "website-services",
        title: "3. 網站託管、儲存及流量分析",
        body: "網站由 Vercel 託管。Vercel 會處理 IP 地址及請求詳情等網絡資料，以提供及保護網站。表格暫時使用 IP 地址和電郵地址限制濫用；Beta 申請紀錄不包括你的 IP 地址或瀏覽器 user-agent。申請紀錄連同申請來源及資料格式版本，會儲存在 AWS 亞太區（新加坡）的 Amazon DynamoDB，並設有資料庫備份。\n\n如啟用申請電郵通知，Resend 會處理收件地址及訊息內容，以發送確認電郵和內部申請通知；通知亦會送達公司信箱。即使沒有發送確認電郵，成功提交的申請仍會儲存在資料庫。\n\n網站使用 Vercel Web Analytics 了解頁面流量，涉及頁面網址、來源頁面、概略位置、瀏覽器、作業系統及裝置類型等資料。Vercel 將此服務描述為不使用廣告 Cookie 或跨網站持續追蹤訪客的彙總分析。我們不會把申請答案或電郵地址作為自訂分析事件傳送。網站不會設定語言偏好 Cookie，亦不使用廣告 Cookie。",
        links: [
          { label: "Vercel 流量分析私隱說明", href: "https://vercel.com/docs/analytics/privacy-policy" },
          { label: "Resend 私隱政策", href: "https://resend.com/legal/privacy-policy" },
          { label: "AWS 私隱聲明", href: "https://aws.amazon.com/privacy/" },
        ],
      },
      {
        id: "desktop-storage",
        title: "4. 儲存在 Mac 上的資料",
        body: "視乎你使用的功能，JARVIS 會在本機 SQLite 資料庫儲存對話、任務、已連接服務的相關資料、郵件副本、群組、個人指示、偏好及已確認記憶。API key 及連接憑證使用 macOS 鑰匙圈儲存。本機診斷紀錄亦可能包含操作詳情或語音轉錄文字。這些本機紀錄不會上傳至 JARVIS 雲端工作區，目前的電郵工作區亦不提供跨裝置同步。\n\n本機資料庫沒有額外的應用程式層加密，其保護取決於 Mac 的帳戶權限、裝置安全及你啟用的磁碟加密。傳送至 AI 或已連接服務的資料會按下文所述離開裝置。你自願交予支援的資料亦會由我們接收。",
      },
      {
        id: "google-access",
        title: "5. Google 連接及權限",
        body: "電郵工作區申請 Gmail 唯讀權限（gmail.readonly），以取得帳戶地址、郵件資料及內文，供本機閱讀、整理及分析。同步可由你啟動，亦可能在 JARVIS 開啟期間每約五分鐘自動進行。此工作區不會寄出郵件或更改 Gmail 標籤，亦不會下載附件。\n\n一般助理另有獨立的 Google 連接，申請 Gmail 讀取及修改權限（gmail.modify）、日曆權限及基本個人資料，用於閱讀與整理郵件、儲存草稿、操作日曆及顯示你的名稱。JARVIS 開啟期間，此連接會每約五分鐘在背景同步近期郵件及日曆活動。其權限範圍比電郵工作區廣。助理的郵件工具會在 Gmail 建立草稿供你審閱，不會寄出草稿。請閱讀你所啟用連接的 Google 授權畫面。",
      },
      {
        id: "ai-processing",
        title: "6. AI 分析、供應商選擇及語音",
        body: "一般助理會將你的提示、相關對話、已連接服務的背景資料，以及請求所需的 JARVIS 本機紀錄（例如電郵跟進事項及任務清單）傳送至應用程式設定的供應商。一般助理的預設路徑使用 Google Gemini；啟用的其他供應商或後備路徑可包括 OpenAI、Anthropic、Amazon Bedrock 及本機模型。單純選擇本機模型，不會停用已啟用的雲端後備路徑或獨立語音服務。\n\n電郵工作區有獨立的分析設定。你選擇 OpenAI 或 Amazon Bedrock 並確認雲端傳送後，納入分析的群組郵件、個人指示及相關有效記憶，會使用你的帳戶傳送至該供應商。你亦可使用支援的本機 Ollama 分析。電郵分析失敗時不會自動轉用另一供應商。記憶由你建立或確認，分析不會自動儲存記憶。\n\n電郵工作區亦提供自動整理功能，預設關閉，須由你開啟。開啟後，尚未整理的郵件的寄件者、收件者、主旨及內文首 1,500 個字元，連同你自己的信箱地址，會傳送至 TypeSafe 作分類。需要摘要或附日期跟進事項的郵件，最多 6,000 個字元的內容亦會傳送至 OpenAI。兩者均使用你提供的 API key。開啟後，每次同步（包括自動同步）完成後都會進行整理，相關用量由你的供應商帳戶支付。分類、摘要及跟進事項儲存在你的 Mac。\n\n使用語音輸入時，如已設定可用的 Gemini key，錄下的指令音訊會傳送至 Google 轉錄；本機 Whisper 是支援的後備方式。如選用 MiniMax 語音服務，需朗讀的文字會傳送至 MiniMax。macOS 語音及已設定的本機 CosyVoice 模型則提供本機選項。選擇本機文字分析不會改變這些語音設定。\n\n供應商收到的內容受其條款、帳戶設定及保留控制影響。電郵工作區向 OpenAI 要求停用回應儲存，但這不保證供應商完全不保留資料。Gemini 免費服務的條款可能容許將提交內容用於改善模型及人工審閱。請勿透過容許不相容用途的供應商設定傳送個人、敏感、機密或 Google 使用者資料；連接工作帳戶或處理私人內容前，應先檢查供應商設定。",
        links: [
          { label: "OpenAI API 資料控制", href: "https://developers.openai.com/api/docs/guides/your-data" },
          { label: "Gemini API 條款及資料用途", href: "https://ai.google.dev/gemini-api/terms" },
          { label: "Amazon Bedrock 資料保護", href: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html" },
        ],
      },
      {
        id: "google-limited-use",
        title: "7. Google 使用者資料的有限用途",
        body: "JARVIS 使用及向其他應用程式轉移 Google API 資料時，將遵循 Google API Services User Data Policy，包括其中的 Limited Use 要求，以及適用的 Google Workspace 使用者資料政策。Google 使用者資料用於提供你要求且在產品中可見的功能；為提供這些功能而轉移資料，須取得你的同意。\n\n我們不會出售 Google 使用者資料、將其用於廣告或信貸決定，或用於訓練通用 AI 模型。我們的人員只會在你明確允許下，為支援而查看你提供的特定 Google 內容，或按 Google 政策容許的情況，為安全或法定需要而查閱。代我們處理該等資料的服務供應商亦受這些限制約束。這項聲明不代表已取得 Google 驗證或認證。",
        links: [
          { label: "Google API Services User Data Policy", href: googlePolicy },
          { label: "Google Workspace 使用者資料政策", href: workspacePolicy },
        ],
      },
      {
        id: "sharing",
        title: "8. 資料接收者及跨境處理",
        body: "網站及支援資料可由託管、資料庫、電郵傳送及公司信箱供應商，以及負責申請或支援的獲授權人員處理。Google、Notion 及 GitHub 等已連接服務會收到透過整合功能提出的請求，包括 JARVIS 開啟期間的背景更新。你設定的 AI 及語音供應商會收到上文所述內容；如開啟自動整理，TypeSafe 及 OpenAI 亦會收到上文所述的郵件資料。供應商可能在香港以外處理資料，包括美國或其服務支援的其他地點；使用本機資料庫不代表雲端處理只在香港進行。\n\n我們不會出售個人資料。在法律要求、處理詐騙或安全事故，或保障合法權益時，我們可能按適用法律及 Google 資料的較嚴格限制披露必要資料。服務擁有權如有變更，適用的私隱責任仍然有效；如轉移 Google 使用者資料須事先取得同意，我們會遵守該要求。",
      },
      {
        id: "retention",
        title: "9. 資料保留及刪除",
        body: "我們只在處理申請或參與安排、解決未完事項或履行法律責任所需的期間，保留網站申請及相關往來資料。上述目的完結後，我們會刪除或去識別化資料。如有需要尊重你的選擇或說明申請處理方式，可能保留有限的撤回或同意紀錄。我們不承諾所有副本會即時消失：電郵系統、供應商紀錄及備份中的副本，可能按相關保留安排繼續存在。你可聯絡我們要求刪除，並查詢任何有正當理由保留的紀錄。\n\n桌面資料會保留在 Mac，直至你將其刪除；單純解除安裝應用程式可能留下資料及鑰匙圈項目。在電郵工作區中，斷開帳戶會移除本機連接憑證，但保留已下載郵件。明確刪除帳戶會移除該帳戶的本機郵件及以其為來源的記憶，不會刪除 Gmail 原信。刪除群組會清除群組關係及記憶，不會刪除底層本機郵件。你亦可逐項編輯或刪除記憶。\n\n在 Google 帳戶撤銷授權可停止之後的授權存取，但不會自行清除現有本機副本，亦可能影響共用該 Google 授權的其他 JARVIS 連接。如需清除剩餘本機資料或憑證的協助，請聯絡我們。我們無法遙距清除你的 Mac，或自動刪除你個人供應商帳戶內的紀錄。",
        links: [{ label: "管理 Google 第三方連接", href: "https://support.google.com/accounts/answer/13533235?hl=zh-Hant" }],
      },
      {
        id: "rights",
        title: "10. 你的選擇、要求及投訴",
        body: `你可要求查閱及更正我們持有的個人資料、要求刪除，或撤回 Beta 申請及相關通訊。請電郵至 ${company.contactEmail}，或寄往註冊辦事處並註明「私隱」。請說明所用電郵地址及要求；我們可能索取適度資料以核實身份，除非另有具體需要，否則請勿提供身份證明文件副本。\n\n我們會按適用法定期限處理查閱及更正要求。根據香港《個人資料（私隱）條例》，一般期限為 40 日，並受法例的例外情況及程序規定約束。如未能履行要求，我們會按規定說明原因。刪除要求須考慮保留個別紀錄的合法需要。你亦可就私隱問題向香港個人資料私隱專員公署投訴。其他適用法律賦予且不可排除的權利不受影響。`,
        links: [contactLink, { label: "個人資料私隱專員公署", href: "https://www.pcpd.org.hk/" }],
      },
      {
        id: "changes",
        title: "11. 政策更新",
        body: "資料處理方式如有改變，我們會更新此頁並列明版本。重大變更會按情況透過網站、應用程式或直接通訊通知受影響使用者。需要同意的新用途或資料轉移，不會單憑公布新版政策而獲得授權。",
      },
    ],
  },
  terms: {
    heading: "使用條款及細則",
    lastUpdated: "最後更新：2026 年 9 月 24 日 · 版本 2026-09-24",
    summary: "適用於瀏覽網站、申請 Beta 及使用 JARVIS AI 個人助理的條款。",
    sections: [
      {
        id: "agreement",
        title: "1. 本條款及服務提供者",
        body: `本條款適用於 ${company.legalName} 提供的 JARVIS 網站、Beta 計劃及應用程式。該公司為香港有限公司（公司編號 ${company.companyNumber}；商業登記號碼 ${company.businessRegistrationNumber}），註冊辦事處為 ${company.registeredAddress}。本條款所稱「我們」及「JARVIS AI」均指該公司。\n\n你在申請使用時接受本條款，或在獲呈示本條款後使用服務，即表示同意本條款。你須具備訂立協議的法律能力，並有權連接所用帳戶及處理相關資料；如代表機構行事，須獲該機構授權。私隱政策說明資料處理方式；接受本條款不等於同意無關推廣或所有可能的資料轉移。`,
      },
      {
        id: "beta",
        title: "2. Beta 使用資格及供應情況",
        body: "JARVIS 是目前供 macOS 使用的 AI 個人助理。提交申請不保證獲邀、特定發行日期或任何指定功能。我們按計劃容量及要求審核申請和安排使用。\n\nBeta 功能可能尚未完整、有所修改或停止提供，也可能出現錯誤、中斷、設定遺失或更新不相容。請獨立備份重要工作，並閱讀版本要求。路線圖只反映發展意向，不構成交付功能或支援其他平台的合約承諾。",
      },
      {
        id: "licence",
        title: "3. 使用 JARVIS 的許可",
        body: "在遵守本條款及版本附帶授權的前提下，你可於獲准使用服務期間，安裝及使用應用程式處理自己或所屬機構獲授權的工作。此許可並非專屬，亦不轉讓軟件或品牌的擁有權。開源組件仍受各自授權約束，就該等組件而言，其授權條款優先適用。\n\n你保留所提供內容的權利。你只允許我們按私隱政策，在執行你要求的功能、維持服務及提供所需支援的必要範圍內處理內容。這不授權我們出售私人內容，或以 Google 使用者資料訓練通用模型。AI 輸出可能不準確、與他人的輸出相似，或涉及第三方權利；我們不保證你對輸出享有專有權利。",
      },
      {
        id: "user-control",
        title: "4. 你的帳戶、內容及決定",
        body: "你須負責所連接的帳戶、提供的資料，以及處理他人資料所需的授權。向雲端供應商傳送內容前，請遵守保密責任及所屬機構的規則。請保護 Mac、憑證和 API key，並撤銷不再需要的連接。\n\n依賴結果前，請核對提示、生成答案、來源、收件者、日期及金額。電郵工作區的群組分析不會寄出郵件或執行其建議；一般助理的郵件工具只在 Gmail 儲存草稿供你審閱。其他已啟用工具可以更改已連接服務，例如日曆活動；請了解所要求的操作並檢查結果。有來源引用不代表內容解讀必然正確。",
      },
      {
        id: "ai-limits",
        title: "5. AI 及服務限制",
        body: "AI 可能遺漏資料、虛構細節或誤解指示。JARVIS 是工作助理，並非專業顧問或緊急服務。涉及醫療、法律、財務或其他重要決定時，請尋求適當的專業意見。請勿以其作為期限、承諾或安全攸關決定的唯一依據。\n\n同步及分析可能只涵蓋部分資料。JARVIS 不是完整信箱備份，目前的本機電郵工作區亦沒有跨裝置同步。模型供應情況、權限及供應商限制均可能影響結果。你應自行安排備份及復原。",
      },
      {
        id: "third-parties-fees",
        title: "6. 第三方服務及費用",
        body: "已連接帳戶、AI 供應商、語音服務及其他服務的下載，同時受各自條款約束。你可選擇是否連接，並須負責你提供的 API 或雲端帳戶所產生的費用。本機儲存不代表所有請求均離線或免費。\n\nBeta 申請不是訂閱購買，亦不授權扣款。日後任何收費方案均須在購買前列明價格、計費週期、所含功能、續訂、取消及退款條款。測試付款、擬定價格或路線圖標示本身不構成付費權益。你另行明確接受的付費訂單條款適用於該訂單。",
      },
      {
        id: "acceptable-use",
        title: "7. 可接受的使用方式",
        body: "請合法使用網站及應用程式。不得未經授權存取帳戶或資料、侵犯私隱或知識產權、散播惡意軟件、垃圾訊息或詐騙內容、規避存取限制或流量限制，或干擾服務及供應商。不得將服務用於非法監控或欺騙性冒認。\n\n除授權或適用法律容許外，不得轉售存取權、冒稱與 JARVIS 有聯繫，或複製及利用我們的資料。你可透過安全頁的聯絡方式私下報告問題；提交報告不代表獲准進行涉及他人資料或干擾服務的測試。",
      },
      {
        id: "feedback",
        title: "8. 意見及知識產權",
        body: "網站資料、品牌及軟件受我們或授權人的知識產權保護。你可分享網站連結，並在法律或明確授權容許的範圍內使用資料。\n\n如你自願提出建議，即允許我們將建議用於改善 JARVIS，而不負有採納或支付報酬的義務。這不轉讓原有內容的擁有權，亦不允許我們未經適當許可公開私人訊息、可識別身份的回饋或推薦內容。",
      },
      {
        id: "ending-access",
        title: "9. 停止或暫停使用",
        body: "你可隨時停止使用 JARVIS 或撤回 Beta 申請。如要刪除資料，須另行處理已連接服務的授權及本機資料；停止使用或解除安裝本身未必會清除資料。私隱政策說明相關控制。\n\n我們可在處理濫用、安全、法律責任或結束 Beta 計劃的合理需要下限制使用。在可行的情況下，我們會通知你並說明原因。這不限制既有付費訂單或強制適用法律賦予的權利。按性質應持續生效的條款，包括知識產權條款及終止前已產生的權利，在使用結束後仍然有效。",
      },
      {
        id: "responsibility-limits",
        title: "10. 保證及法定權利",
        body: "在適用法律容許的範圍內，網站及 Beta 軟件按可供使用的狀態提供，我們不承諾服務不中斷、結果沒有錯誤，或符合特定用途。我們不保證第三方服務會持續提供，或 AI 輸出準確。\n\n本條款不排除或限制欺詐、因疏忽導致死亡或人身傷害的責任，或任何依法不得排除或限制的責任及消費者法定權利，亦不免除適用法律要求我們提供的補救。",
      },
      {
        id: "law-changes-contact",
        title: "11. 更新、適用法律及聯絡",
        body: `我們可因服務發展更新本條款，列明生效版本，並按情況通知受影響使用者有關重大變更。修訂條款僅適用於生效後的使用；如變更須重新接受，我們會提出要求。網站更新不會默默改寫既有付費訂單。\n\n本條款受香港特別行政區法律管轄。香港法院具有非專屬司法管轄權，但不影響適用法律賦予你的強制權利或可用的爭議處理法院。如任何條文不可執行，其餘條文在法律容許的範圍內繼續有效。\n\n服務查詢或爭議請電郵至 ${company.contactEmail}，或寄往上述註冊辦事處。英文及繁體中文版本旨在表達相同條款；如發現差異，請聯絡我們。`,
        links: [contactLink],
      },
    ],
  },
  security: {
    heading: "安全及資料控制",
    lastUpdated: "最後更新：2026 年 9 月 26 日",
    summary: "目前提供的保護措施、實際限制，以及安全問題的通報方式。",
    sections: [
      {
        id: "local-data",
        title: "1. 本機紀錄及憑證",
        body: "JARVIS 將桌面對話及已連接服務的相關資料儲存在本機 SQLite 資料庫，API key 及連接憑證則使用 macOS 鑰匙圈。資料庫本身沒有額外的應用程式層加密。請使用個人 macOS 帳戶、保持裝置更新，並考慮啟用 FileVault 及安全備份。移除應用程式可能留下資料或憑證。\n\n網站 Beta 申請是獨立的伺服器端紀錄。申請使用不會把 Mac 上的信箱或對話上傳至該申請紀錄。",
      },
      {
        id: "connections",
        title: "2. 連接及權限",
        body: "Google 連接使用 OAuth，由你在 Google 的授權畫面批准。電郵工作區只申請 Gmail 唯讀權限；一般助理的獨立連接則有 Gmail 修改、日曆及個人資料權限。請閱讀各連接的權限範圍。你可在 JARVIS 斷開連接，並透過 Google 帳戶撤銷授權。\n\n電郵工作區的分析不會寄出郵件或執行建議步驟。自動整理同樣沒有任何工具，只會分類郵件、撰寫摘要及擷取跟進事項。一般助理會建立 Gmail 草稿供你審閱。其他已連接工具可在支援權限內進行更改，因此請核對操作及結果。",
        links: [{ label: "管理 Google 第三方連接", href: "https://support.google.com/accounts/answer/13533235?hl=zh-Hant" }],
      },
      {
        id: "processing",
        title: "3. 雲端處理需要另行考慮",
        body: "本機儲存不代表 AI 在本機處理。一般聊天可使用已設定的雲端供應商及後備路徑。電郵分析有獨立的本機、OpenAI 及 Bedrock 設定；雲端模式會說明傳送群組郵件、指示及有效記憶的安排。自動整理功能開啟後，會將郵件資料傳送至 TypeSafe，部分郵件亦會傳送至 OpenAI。語音轉錄及朗讀亦各有供應商設定。\n\n雲端服務請求使用 HTTPS。使用支援的本機電郵分析模型可避免該次分析內容的雲端傳送，但郵件同步、更新、下載及另行啟用的雲端服務仍需要網絡連接。此服務不提供端到端加密或零資料保留保證。",
      },
      {
        id: "deletion",
        title: "4. 斷開連接與刪除資料",
        body: "斷開信箱會停止其本機連接，並保留已下載副本。明確刪除信箱帳戶會移除該帳戶的本機郵件及來源記憶，不會刪除 Gmail 原信。群組及記憶有獨立的刪除控制。撤銷 Google 授權不會清除現有本機副本。\n\n如要刪除網站申請，或需要清除本機資料及憑證的協助，請聯絡我們。處理伺服器端紀錄時，我們可能需要核實身份；我們無法遙距清除你的 Mac。",
        links: [contactLink],
      },
      {
        id: "limits",
        title: "5. 目前限制",
        body: "沒有系統能保證絕對安全。JARVIS 仍在 Beta 階段；權限、外部服務、模型行為及裝置設定均會影響風險。目前的電郵工作區不提供雲端備份或跨裝置同步。公開政策頁本身不代表取得安全認證、獨立審計或 Google OAuth 驗證。\n\n請保留獨立備份，並避免向不適合處理相關資料的供應商設定傳送敏感內容。私隱政策列明相關資料傳送及控制。",
      },
      {
        id: "report",
        title: "6. 通報安全問題",
        body: `請電郵至 ${company.contactEmail}，並在主旨加上「[Security]」。請提供受影響版本或網址、簡要說明，以及使用合成或已遮蓋敏感內容的重現步驟。請勿提供有效 token、密碼或他人的私人內容。\n\n我們會審閱報告，並透過此地址協調跟進。目前沒有公布獎金計劃或保證回覆時限。通報期間請勿存取他人帳戶、保留不必要的個人資料、干擾服務或公開私人資訊。`,
        links: [contactLink],
      },
    ],
  },
};

export function getLegalCopy(locale: string): LegalCopy {
  return locale === "zh-HK" ? zhLegal : enLegal;
}
