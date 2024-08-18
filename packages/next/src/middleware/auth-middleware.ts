import type { MiddlewareFactory } from "./chain";
import { createRouteMatcher } from "./route-matcher";

const isAuthenticatedRoute = createRouteMatcher(["/app/(?!auth/)(.*)"]);

export const withAuth: MiddlewareFactory = (config, middleware) => {
  return async (request, event, response) => {
    const session = await config.auth();

    if (isAuthenticatedRoute(request) && !session) {
      const newUrl = new URL(`/app/auth/login?rd=${request.nextUrl.pathname}`, request.nextUrl.origin);
      return Response.redirect(newUrl);
    }

    return middleware(request, event, response);
  };
};
