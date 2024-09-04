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
