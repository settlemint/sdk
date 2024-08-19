import type { NextRequest } from "next/server.js";
import { NextResponse } from "next/server.js";
import { createRouteMatcher } from "./lib/route-matcher.js";
import { getSession } from "./session/session.js";

const isAuthenticatedRoute = createRouteMatcher(["/app/(.*)"]);

async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getSession(request, response);

  if (isAuthenticatedRoute(request) && !session.auth?.address) {
    return NextResponse.redirect(new URL(`/auth/login?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
  }

  return response;
}

export default middleware;
