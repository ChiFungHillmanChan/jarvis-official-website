import { spawn } from "node:child_process";
import { once } from "node:events";
import { JSDOM } from "jsdom";

const PORT = process.env.SMOKE_PORT ?? "3457";
const BASE = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 30_000;
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://jarvis-automation.com").replace(/\/$/, "");

const routes = [
  { path: "/", expect: [307] },
  { path: "/en", expect: [200] },
  { path: "/zh-HK", expect: [200] },
  { path: "/en/how-it-works", expect: [200] },
  { path: "/zh-HK/how-it-works", expect: [200] },
  { path: "/en/company", expect: [200] },
  { path: "/zh-HK/company", expect: [200] },
  { path: "/en/contact", expect: [200] },
  { path: "/zh-HK/contact", expect: [200] },
  { path: "/en/privacy", expect: [200] },
  { path: "/zh-HK/privacy", expect: [200] },
  { path: "/en/terms", expect: [200] },
  { path: "/zh-HK/terms", expect: [200] },
  { path: "/en/security", expect: [200] },
  { path: "/zh-HK/security", expect: [200] },
  { path: "/en/download", expect: [200] },
  { path: "/zh-HK/download", expect: [200] },
  { path: "/social-image.png", expect: [200] },
  { path: "/sitemap.xml", expect: [200] },
  { path: "/robots.txt", expect: [200] },
  { path: "/en/does-not-exist", expect: [404] },
];

async function waitForReady(url, deadline) {
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "manual" });
      if (r.status > 0) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Server did not become ready within ${READY_TIMEOUT_MS}ms`);
}

function checkPageSeo(html, path) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const issues = [];
  const [locale, ...segments] = path.slice(1).split("/");
  const suffix = segments.length ? `/${segments.join("/")}` : "";
  const canonical = `${SITE_ORIGIN}${path}`;
  const meta = (selector) => document.head.querySelector(selector)?.getAttribute("content");

  if (document.documentElement.lang !== (locale === "zh-HK" ? "zh-Hant-HK" : "en")) issues.push("incorrect HTML language");
  if (document.querySelectorAll("h1").length !== 1) issues.push("page must contain one h1");
  if (document.querySelectorAll("main").length !== 1) issues.push("page must contain one main landmark");
  if (!document.title || !meta('meta[name="description"]')) issues.push("missing title or description");
  if (document.head.querySelectorAll('link[rel="canonical"]').length !== 1 || document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") !== canonical) issues.push("incorrect canonical URL");
  for (const language of ["en", "zh-HK", "x-default"]) {
    const target = language === "x-default" ? "en" : language;
    if (document.head.querySelector(`link[hreflang="${language}"]`)?.getAttribute("href") !== `${SITE_ORIGIN}/${target}${suffix}`) issues.push(`incorrect ${language} alternate`);
  }
  if (meta('meta[property="og:url"]') !== canonical) issues.push("incorrect social canonical");
  if (meta('meta[property="og:title"]') !== document.title || meta('meta[name="twitter:title"]') !== document.title) issues.push("social title differs from page title");
  if (!meta('meta[property="og:image"]')?.startsWith(`${SITE_ORIGIN}/`)) issues.push("missing absolute social image");
  if (!meta('meta[name="googlebot"]')?.includes("max-image-preview:large")) issues.push("large search image previews disabled");
  if (Array.from(document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]')).some((tag) => /noindex/.test(tag.getAttribute("content") || ""))) issues.push("public page is noindex");

  const graph = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent);
      graph.push(...(data["@graph"] || [data]));
    } catch { issues.push("invalid JSON-LD"); }
  }
  if (!graph.some((node) => node["@type"] === "Organization")) issues.push("missing organization structured data");
  if (!graph.some((node) => node["@type"] === "WebSite")) issues.push("missing website structured data");
  if (!graph.some((node) => node["@id"] === `${canonical}#webpage` && node.url === canonical)) issues.push("missing localized page structured data");
  if (suffix && !graph.some((node) => node["@type"] === "BreadcrumbList")) issues.push("missing breadcrumb structured data");
  if (!suffix && !graph.some((node) => node["@type"] === "SoftwareApplication" && node.url === canonical)) issues.push("missing localized app structured data");
  dom.window.close();
  return issues;
}

async function main() {
  const server = spawn("npx", ["next", "start", "-H", "127.0.0.1", "-p", PORT], {
    stdio: ["ignore", "inherit", "inherit"],
    env: { ...process.env, NODE_ENV: "production" },
  });
  const stop = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  try {
    await waitForReady(`${BASE}/en`, Date.now() + READY_TIMEOUT_MS);

    const failures = [];
    for (const { path, expect } of routes) {
      const url = `${BASE}${path}`;
      const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "Twitterbot/1.0" } });
      const issues = [];
      if (!expect.includes(r.status)) issues.push(`expected HTTP ${expect.join(" or ")}`);
      if (r.status === 200 && /^\/(en|zh-HK)(\/|$)/.test(path)) {
        issues.push(...checkPageSeo(await r.text(), path));
      }
      if (path === "/sitemap.xml" && r.ok) {
        const xml = new JSDOM(await r.text(), { contentType: "text/xml" });
        if (xml.window.document.querySelectorAll("url").length !== 16) issues.push("sitemap must contain sixteen localized URLs");
        xml.window.close();
      }
      const ok = issues.length === 0;
      console.log(`${ok ? "PASS" : "FAIL"} ${r.status} ${path}${issues.length ? ` — ${issues.join(", ")}` : ""}`);
      if (!ok) failures.push({ path, status: r.status, issues });
    }

    if (failures.length > 0) {
      console.error("\nFAILED:", JSON.stringify(failures, null, 2));
      process.exitCode = 1;
    } else {
      console.log(`\nAll ${routes.length} routes passed, including SEO markup on sixteen public pages.`);
    }
  } finally {
    stop();
    await Promise.race([once(server, "exit"), new Promise((r) => setTimeout(r, 2000))]);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
