import { proxyMiddleware } from "@settlemint/sdk/edge";
import { type NextRequest, NextResponse } from "next/server";

export default (request: NextRequest) => {
  const proxyResponse = proxyMiddleware(request);
  if (proxyResponse) {
    return proxyResponse;
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  return NextResponse.next({ headers });
};

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
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
