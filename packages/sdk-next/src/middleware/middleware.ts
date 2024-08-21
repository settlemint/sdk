import type { Lucia } from "lucia";
import type { NextRequest } from "next/server.js";
import { NextResponse } from "next/server.js";
import { createRouteMatcher } from "./lib/route-matcher.js";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura"]);
const isAuthenticatedRoute = createRouteMatcher(["/s", "/s/(.*)"]);

export function middleware(lucia: Lucia) {
  const settleMintMiddleware = async (request: NextRequest) => {
    const response = NextResponse.next();

    if (isProxyRoute(request)) {
      response.headers.delete("Authorization");
      response.headers.set("x-auth-token", process.env.SETTLEMINT_PAT ?? "");
      if (isHasuraProxyRoute(request)) {
        response.headers.set("x-hasura-admin-secret", process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "");
      }
      return response;
    }

    if (isAuthenticatedRoute(request)) {
      const sessionId = request.cookies.get("settlemint");

      // no cookie exists
      if (!sessionId) {
        return NextResponse.redirect(new URL(`/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
      }

      const { session } = await lucia.validateSession(sessionId.value);

      // session expired
      if (!session) {
        return NextResponse.redirect(new URL(`/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
      }
    }

    return response;
  };

  return settleMintMiddleware;
}
