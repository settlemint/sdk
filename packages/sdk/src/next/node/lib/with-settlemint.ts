import { activeConfig } from "@/next/browser/config/config";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";
import { readSettlemintConfig } from "../../../cli/lib/config/read-config";

export type WithSettleMintOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
};

/**
 * Modifies the passed in Next.js configuration
 */
export function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled, output }: WithSettleMintOptions = { disabled: false },
): C {
  if (!disabled) {
    const baseConfig = {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
    };

    const config = readSettlemintConfig();
    if (!config) {
      return baseConfig;
    }
    const cfg = activeConfig(config);
    if (!cfg) {
      return baseConfig;
    }

    return {
      ...baseConfig,
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
