import { proxyMiddleware } from "@settlemint/sdk/edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();

    const proxyResponse = proxyMiddleware(request, response);
    if (proxyResponse) {
      return proxyResponse;
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
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
