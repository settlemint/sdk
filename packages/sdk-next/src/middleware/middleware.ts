import type { Lucia } from "lucia";
import type { NextRequest } from "next/server.js";
import { NextResponse } from "next/server.js";
import type { DatabaseSessionAttributes, DatabaseUserAttributes } from "../auth/lucia.js";
import { createRouteMatcher } from "./lib/route-matcher.js";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura"]);
const isSecuredRoute = createRouteMatcher(["/s", "/s/(.*)"]);
const isAdminRoute = createRouteMatcher(["/a", "/a/(.*)"]);

export function middleware(lucia: Lucia<DatabaseSessionAttributes, DatabaseUserAttributes>, noAuthRoute = "/auth") {
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

    if (isSecuredRoute(request) || isAdminRoute(request)) {
      const sessionId = request.cookies.get(lucia.sessionCookieName);

      // no cookie exists
      if (!sessionId) {
        return NextResponse.redirect(new URL(`${noAuthRoute}/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
      }

      const { user, session } = await lucia.validateSession(sessionId.value);

      // session expired
      if (!session) {
        return NextResponse.redirect(new URL(`${noAuthRoute}/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
      }

      if (isAdminRoute(request)) {
        // User does not have the admin role
        if (!user.roles?.includes("admin")) {
          return NextResponse.redirect(
            new URL(`${noAuthRoute}/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin),
          );
        }
      }
    }

    return response;
  };

  return settleMintMiddleware;
}
