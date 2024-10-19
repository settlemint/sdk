import { proxyMiddleware } from "@settlemint/sdk-next/middlewares/proxy";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { authConfig } from "./lib/auth-config";

const isUserAuthenticatedRoute = match(["/issuer", "/issuer/*path"]);

const { auth } = NextAuth({
  ...authConfig,
  providers: [], // we don't want to import bcryptjs in the middleware
});

export default auth((request) => {
  const proxyResponse = proxyMiddleware(request);
  if (proxyResponse) {
    return proxyResponse;
  }

  if (isUserAuthenticatedRoute(request.nextUrl.pathname) && !request.auth) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
