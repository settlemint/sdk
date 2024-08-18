import { NextResponse } from "next/server";
import type { MiddlewareFactory } from "./chain";
import { createRouteMatcher } from "./route-matcher";

const isProxyRoute = createRouteMatcher(["/proxy/(.*)"]);
const isHasuraProxyRoute = createRouteMatcher(["/proxy/hasura"]);

export const withProxy: MiddlewareFactory = (_config, middleware) => {
  return (request, event, response) => {
    if (isProxyRoute(request)) {
      const newResponse = NextResponse.next();
      newResponse.headers.delete("Authorization");
      newResponse.headers.set("x-auth-token", process.env.SETTLEMINT_PAT ?? "");
      if (isHasuraProxyRoute(request)) {
        newResponse.headers.set("x-hasura-admin-secret", process.env.SETTLEMINT_HASURA_ADMIN_SECRET ?? "");
      }
      return newResponse;
    }

    return middleware(request, event, response);
  };
};
