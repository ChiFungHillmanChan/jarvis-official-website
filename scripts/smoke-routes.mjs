import { spawn } from "node:child_process";
import { once } from "node:events";

const PORT = process.env.SMOKE_PORT ?? "3457";
const BASE = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 30_000;

const routes = [
  { path: "/", expect: [307] },
  { path: "/en", expect: [200] },
  { path: "/zh-HK", expect: [200] },
  { path: "/en/company", expect: [200] },
  { path: "/zh-HK/company", expect: [200] },
  { path: "/en/contact", expect: [200] },
  { path: "/zh-HK/contact", expect: [200] },
  { path: "/en/privacy", expect: [200] },
  { path: "/zh-HK/privacy", expect: [200] },
  { path: "/en/terms", expect: [200] },
  { path: "/zh-HK/terms", expect: [200] },
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

async function main() {
  const server = spawn("npx", ["next", "start", "-p", PORT], {
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
      const r = await fetch(url, { redirect: "manual" });
      const ok = expect.includes(r.status);
      console.log(`${ok ? "✓" : "✗"} ${r.status} ${path}`);
      if (!ok) failures.push({ path, status: r.status, expected: expect });
    }

    if (failures.length > 0) {
      console.error("\nFAILED:", JSON.stringify(failures, null, 2));
      process.exitCode = 1;
    } else {
      console.log(`\nAll ${routes.length} routes passed.`);
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
