import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes.js";
import { applicationConfig } from "./config";

export type WithSettleMintOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
  typedRoutes?: boolean;
};

/**
 * Modifies the passed in Next.js configuration
 */
export function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled, output, typedRoutes }: WithSettleMintOptions = {},
): C {
  if (!disabled) {
    const cfg = applicationConfig();

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
      experimental: {
        ...nextConfig.experimental,
        typedRoutes,
      },
      env: {
        ...nextConfig.env,
        SETTLEMINT_APPLICATION_ID: cfg.application.id,
        SETTLEMINT_APPLICATION_DISPLAY_NAME: cfg.application.displayName,
        SETTLEMINT_PORTAL_GQL: cfg.portalGql,
        SETTLEMINT_PORTAL_REST: cfg.portalRest,
        SETTLEMINT_THEGRAPH_GQL: cfg.thegraphGql,
        SETTLEMINT_HASURA_GQL: cfg.hasuraGql,
        SETTLEMINT_NODE_JSON_RPC: cfg.nodeJsonRpc,
        SETTLEMINT_PAT: cfg.pat,
        SETTLEMINT_APP_URL: cfg.appUrl,
        SETTLEMINT_HASURA_ADMIN_SECRET: cfg.hasuraAdminSecret,
      },
      async rewrites() {
        let existingRewrites:
          | Rewrite[]
          | {
              beforeFiles: Rewrite[];
              afterFiles: Rewrite[];
              fallback: Rewrite[];
            };

        if (nextConfig.rewrites) {
          existingRewrites = await nextConfig.rewrites();
        } else {
          existingRewrites = [];
        }

        const rewrites = [
          ...(cfg.thegraphGql
            ? [
                {
                  source: "/proxy/thegraph/graphql",
                  destination: cfg.thegraphGql,
                },
              ]
            : []),
          ...(cfg.hasuraGql
            ? [
                {
                  source: "/proxy/hasura/graphql",
                  destination: cfg.hasuraGql,
                },
              ]
            : []),
          ...(cfg.portalRest
            ? [
                {
                  source: "/proxy/portal/rest/:path*",
                  destination: `${cfg.portalRest}/:path*`,
                },
              ]
            : []),
          ...(cfg.portalGql
            ? [
                {
                  source: "/proxy/portal/graphql",
                  destination: cfg.portalGql,
                },
              ]
            : []),
          ...(cfg.nodeJsonRpc
            ? [
                {
                  source: "/proxy/node/jsonrpc",
                  destination: cfg.nodeJsonRpc,
                },
              ]
            : []),
        ];

        if (Array.isArray(existingRewrites)) {
          return [...existingRewrites, ...rewrites];
        }

        return {
          beforeFiles: existingRewrites.beforeFiles,
          afterFiles: [...existingRewrites.afterFiles, ...rewrites],
          fallback: existingRewrites.fallback,
        };
      },
    } as C;
  }
  return nextConfig;
}
