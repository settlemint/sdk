import { auth } from "@/lib/auth";
import { createRouteMatcher, proxyMiddleware } from "@settlemint/sdk/edge";
import { NextResponse } from "next/server";

const isSecuredRoute = createRouteMatcher(["/s", "/s/(.*)"]);

export default auth((request) => {
  try {
    const response = NextResponse.next();

    const proxyResponse = proxyMiddleware(request, response);
    if (proxyResponse) {
      return proxyResponse;
    }

    if (isSecuredRoute(request) && !request.auth) {
      return NextResponse.redirect(new URL(`/auth/?rd=${request.nextUrl.pathname}`, request.nextUrl.origin));
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
});

// Optional: Configure which paths this middleware will run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
