import { type NextRequest, NextResponse } from "next/server";
import { createRouteMatcher } from "../utils/route-matcher";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura", "/proxy/hasura/(.*)"]);

/**
 * Middleware function to handle proxy requests
 * @param request - The incoming Next.js request
 * @returns A modified NextResponse for proxy routes, or undefined for non-proxy routes
 *
 * @example
 * ```typescript
 * import { proxyMiddleware } from './middleware/proxy';
 *
 * export default function middleware(request: NextRequest) {
 *   return proxyMiddleware(request);
 * }
 * ```
 */
export function proxyMiddleware(request: NextRequest) {
  if (isProxyRoute(request)) {
    const response = NextResponse.next();
    response.headers.delete("Authorization");
    response.headers.set("x-auth-token", process.env.SETTLEMINT_PAT_TOKEN ?? "");
    if (isHasuraProxyRoute(request)) {
      response.headers.set("x-hasura-admin-secret", process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "");
    }
    return response;
  }
}
