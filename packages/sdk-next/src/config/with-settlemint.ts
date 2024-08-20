import { activeConfig } from "@settlemint/sdk-common/config";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes.js";

export type WithSettleMintOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
};

/**
 * Modifies the passed in Next.js configuration
 */
export function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled, output }: WithSettleMintOptions = {},
): C {
  if (!disabled) {
    const cfg = activeConfig();
    if (!cfg) {
      return nextConfig;
    }

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
      webpack: (config, context) => {
        // Call the existing webpack function if it exists
        const updatedConfig = typeof nextConfig.webpack === "function" ? nextConfig.webpack(config, context) : config;

        // Add our externals
        updatedConfig.externals = [
          ...(Array.isArray(updatedConfig.externals) ? updatedConfig.externals : []),
          "pino-pretty",
          "lokijs",
          "encoding",
        ];

        return updatedConfig;
      },
      experimental: {
        ...nextConfig.experimental,
        turbo: {
          ...nextConfig.experimental?.turbo,
          resolveAlias: {
            ...nextConfig.experimental?.turbo?.resolveAlias,
            "pino-pretty": "pino-pretty",
            lokijs: "lokijs",
            encoding: "encoding",
          },
        },
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
