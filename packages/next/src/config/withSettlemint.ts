import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes.js";
import { config } from "./config.ts";

export type WithSettleMintOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
  typedRoutes?: boolean;
};

/**
 * Modifies the passed in Next.js configuration
 */
export async function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled, output, typedRoutes }: WithSettleMintOptions = {},
): Promise<C> {
  if (!disabled) {
    const cfg = await config();
    if (!cfg) {
      throw new Error("No configuration found, please run settlemint connect");
    }

    const applications = cfg.applications ?? {};

    const env = process.env.SETTLEMINT_APPLICATION ?? cfg?.defaultApplication.id;
    if (!env || Object.keys(applications).length === 0) {
      throw new Error(
        "No environment found, either set SETTLEMINT_APPLICATION or define a default environment in your .settlemintrc.json file",
      );
    }

    const envConf = applications[env];
    if (!envConf) {
      throw new Error(`No application found for ${env}, please run \`settlemint connect\``);
    }

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
      experimental: {
        ...nextConfig.experimental,
        typedRoutes,
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
          ...(envConf.thegraphGql
            ? [
                {
                  source: "/proxy/thegraph/graphql",
                  destination: envConf.thegraphGql,
                },
              ]
            : []),
          ...(envConf.hasuraGql
            ? [
                {
                  source: "/proxy/hasura/graphql",
                  destination: envConf.hasuraGql,
                },
              ]
            : []),
          ...(envConf.portalRest
            ? [
                {
                  source: "/proxy/portal/rest/:path*",
                  destination: `${envConf.portalRest}/:path*`,
                },
              ]
            : []),
          ...(envConf.portalGql
            ? [
                {
                  source: "/proxy/portal/graphql",
                  destination: envConf.portalGql,
                },
              ]
            : []),
          ...(envConf.nodeJsonRpc
            ? [
                {
                  source: "/proxy/node/jsonrpc",
                  destination: envConf.nodeJsonRpc,
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
