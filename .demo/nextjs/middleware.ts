import { proxyMiddleware } from "@settlemint/sdk-next/middlewares/proxy";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const proxyResponse = proxyMiddleware(request);
  if (proxyResponse) {
    return proxyResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
