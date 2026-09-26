import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { contentSecurityPolicy } from "./lib/security/headers";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = contentSecurityPolicy(nonce);
  // Next.js reads the nonce from the forwarded request's CSP header. next-intl
  // forwards a copy of request.headers, so setting it here reaches the render.
  request.headers.set("Content-Security-Policy", csp);
  const response = handleI18nRouting(request);
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
