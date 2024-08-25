import { proxyMiddleware } from "@settlemint/sdk/edge";
import { type NextRequest, NextResponse } from "next/server";

export default (request: NextRequest) => {
  const proxyResponse = proxyMiddleware(request);
  if (proxyResponse) {
    return proxyResponse;
  }

  return NextResponse.next();
};

// Optional: Configure which paths this middleware will run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
