import { type DotEnv, DotEnvSchema, validate } from "@settlemint/sdk-utils/validation";
import { type NextRequest, NextResponse } from "next/server.js";
import { match } from "path-to-regexp";

const isProxyRoute = match(["/proxy/*path"]);
const isHasuraProxyRoute = match(["/proxy/hasura", "/proxy/hasura/*path"]);
const isPortalProxyRoute = match(["/proxy/portal", "/proxy/portal/*path"]);
const isIpfsApiProxyRoute = match(["/proxy/ipfs/api", "/proxy/ipfs/api/*path"]);
const isIpfsGatewayProxyRoute = match(["/proxy/ipfs/gateway", "/proxy/ipfs/gateway/*path"]);
const isBlockscoutProxyRoute = match(["/proxy/blockscout", "/proxy/blockscout/*path"]);
const isTheGraphProxyRoute = match(["/proxy/thegraph", "/proxy/thegraph/*path"]);

interface ProxyMiddlewareOptions {
  disableHasuraProxy?: boolean;
  disablePortalProxy?: boolean;
  disableIpfsApiProxy?: boolean;
  disableIpfsGatewayProxy?: boolean;
  disableBlockscoutProxy?: boolean;
  disableTheGraphProxy?: boolean;
}

/**
 * Middleware function to handle proxy requests by adding appropriate authentication headers.
 *
 * @param request - The incoming Next.js request to process
 * @returns A modified NextResponse with authentication headers for proxy routes, or undefined for non-proxy routes
 * @throws Will throw an error if environment validation fails
 *
 * @example
 * import { proxyMiddleware } from '@settlemint/sdk-next/middlewares/proxy';
 *
 * export default function middleware(request: NextRequest) {
 *   return proxyMiddleware(request);
 * }
 */
export function proxyMiddleware(request: NextRequest, options: ProxyMiddlewareOptions = {}): NextResponse | undefined {
  const env = validate(DotEnvSchema, process.env);
  if (!isProxyRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const rewriteUrl = getRewriteUrl(request, env, options);
  if (!rewriteUrl) {
    return NextResponse.next();
  }
  const originalHeaders = Object.fromEntries(request.headers.entries());
  const extraHeaders: Record<string, string> = {};
  if (originalHeaders.authorization) {
    // biome-ignore lint/performance/noDelete: header should be removed
    delete originalHeaders.authorization;
  }
  if (env.SETTLEMINT_ACCESS_TOKEN) {
    extraHeaders["x-auth-token"] = env.SETTLEMINT_ACCESS_TOKEN;
  }
  if (isHasuraProxyRoute(request.nextUrl.pathname) && env.SETTLEMINT_HASURA_ADMIN_SECRET) {
    extraHeaders["x-hasura-admin-secret"] = env.SETTLEMINT_HASURA_ADMIN_SECRET;
  }
  return NextResponse.rewrite(rewriteUrl, {
    headers: {
      ...originalHeaders,
      ...extraHeaders,
    },
  });
}

function getRewriteUrl(request: NextRequest, env: DotEnv, options: ProxyMiddlewareOptions) {
  const path = request.nextUrl.pathname;
  if (isHasuraProxyRoute(path) && !options.disableHasuraProxy) {
    return env.SETTLEMINT_HASURA_ENDPOINT;
  }
  if (isPortalProxyRoute(path) && !options.disablePortalProxy) {
    return env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT;
  }
  if (isIpfsApiProxyRoute(path) && !options.disableIpfsApiProxy) {
    return env.SETTLEMINT_IPFS_API_ENDPOINT;
  }
  if (isIpfsGatewayProxyRoute(path) && !options.disableIpfsGatewayProxy) {
    return env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT;
  }
  if (isBlockscoutProxyRoute(path) && !options.disableBlockscoutProxy) {
    return env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT;
  }
  const theGraphMatch = isTheGraphProxyRoute(path);
  if (theGraphMatch && !options.disableTheGraphProxy) {
    const { path } = theGraphMatch.params;
    const endpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS ?? [];
    if (Array.isArray(path)) {
      const [, name] = path;
      if (!name) {
        return null;
      }
      return endpoints.find((endpoint: string) => endpoint.toLowerCase().endsWith(name?.toLowerCase()));
    }
  }
  return null;
}
