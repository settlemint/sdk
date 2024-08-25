import { type NextRequest, NextResponse } from "next/server";
import { createRouteMatcher } from "../utils/route-matcher";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura"]);

export function proxyMiddleware(request: NextRequest) {
  if (isProxyRoute(request)) {
    const response = NextResponse.next();
    response.headers.delete("Authorization");
    response.headers.set("x-auth-token", process.env.SETTLEMINT_PAT ?? "");
    if (isHasuraProxyRoute(request)) {
      response.headers.set("x-hasura-admin-secret", process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "");
    }
    return response;
  }
}
