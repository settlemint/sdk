import { proxyMiddleware } from "@settlemint/sdk/edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  proxyMiddleware(request, response);

  response.headers.set("x-middleware-custom", "middleware-was-here");

  // Example: Redirect if the path starts with '/old-path'
  if (request.nextUrl.pathname.startsWith("/old-path")) {
    return NextResponse.redirect(new URL("/new-path", request.url));
  }

  // Example: Rewrite the URL if it matches a certain pattern
  if (request.nextUrl.pathname.startsWith("/rewrite-me")) {
    return NextResponse.rewrite(new URL("/rewritten", request.url));
  }

  return response;
}

// Optional: Configure which paths this middleware will run on
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
