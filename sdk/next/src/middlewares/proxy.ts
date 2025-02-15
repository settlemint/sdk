import { DotEnvSchema, validate } from "@settlemint/sdk-utils/validation";
import { type NextRequest, NextResponse } from "next/server.js";
import { match } from "path-to-regexp";

const isProxyRoute = match(["/proxy/*path"]);
const isHasuraProxyRoute = match(["/proxy/hasura", "/proxy/hasura/*path"]);

/**
 * Middleware function to handle proxy requests by adding appropriate authentication headers.
 *
 * @param request - The incoming Next.js request to process
 * @returns A modified NextResponse with authentication headers for proxy routes, or undefined for non-proxy routes
 * @throws Will throw an error if environment validation fails
 *
 * @example
 * import { proxyMiddleware } from '@settlemint/sdk-next/middlewares/proxy';
 *
 * export default function middleware(request: NextRequest) {
 *   return proxyMiddleware(request);
 * }
 */
export function proxyMiddleware(request: NextRequest): NextResponse | undefined {
  const env = validate(DotEnvSchema, process.env);
  if (isProxyRoute(request.nextUrl.pathname)) {
    const response = NextResponse.next();
    response.headers.delete("Authorization");
    if (env.SETTLEMINT_ACCESS_TOKEN) {
      response.headers.set("x-auth-token", env.SETTLEMINT_ACCESS_TOKEN);
    }
    if (isHasuraProxyRoute(request.nextUrl.pathname) && env.SETTLEMINT_HASURA_ADMIN_SECRET) {
      response.headers.set("x-hasura-admin-secret", env.SETTLEMINT_HASURA_ADMIN_SECRET);
    }
    return response;
  }
}
