import type { NextRequest } from "next/server.js";
import { NextResponse } from "next/server.js";
import { createRouteMatcher } from "./lib/route-matcher.js";
import { getSession } from "./session/session.js";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura"]);
const isAuthenticatedRoute = createRouteMatcher(["/s", "/s/(.*)"]);

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (isProxyRoute(request)) {
    response.headers.delete("Authorization");
    response.headers.set("x-auth-token", process.env.SETTLEMINT_PAT ?? "");
    if (isHasuraProxyRoute(request)) {
      response.headers.set("x-hasura-admin-secret", process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "");
    }
    return response;
  }

  const session = await getSession(request, response);

  if (isAuthenticatedRoute(request) && !session.auth?.address) {
    return NextResponse.redirect(new URL(`/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
  }

  return response;
}
