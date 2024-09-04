import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";
import { readSettlemintConfig } from "../../../cli/lib/config/read-config";
import { activeServerConfig } from "./config";

export interface WithSettleMintOptions {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
}

/**
 * Modifies the passed in Next.js configuration with SettleMint-specific settings
 * @param nextConfig - The original Next.js configuration
 * @param options - Options for customizing the SettleMint configuration
 * @returns The modified Next.js configuration
 * @throws {Error} If the SettleMint configuration cannot be read or processed
 *
 * @example
 * ```typescript
 * const modifiedConfig = withSettleMint(nextConfig, { output: 'standalone' });
 * ```
 */
export function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled = false, output }: WithSettleMintOptions = {},
): C {
  if (disabled) return nextConfig;

  const baseConfig = {
    ...nextConfig,
    output: output ?? nextConfig.output ?? "standalone",
  };

  const config = readSettlemintConfig();
  if (!config) return baseConfig;

  const cfg = activeServerConfig(config);
  if (!cfg) return baseConfig;

  return {
    ...baseConfig,
    poweredByHeader: false,
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [{ key: "X-Frame-Options", value: "DENY" }],
        },
      ];
    },
    async rewrites() {
      const existingRewrites = await getExistingRewrites(nextConfig);
      const newRewrites = generateRewrites(cfg);
      return mergeRewrites(existingRewrites, newRewrites);
    },
  } as C;
}

/**
 * Retrieves existing rewrites from the Next.js configuration
 * @param nextConfig - The Next.js configuration
 * @returns An array of existing rewrites or an empty array if none exist
 */
function getExistingRewrites(nextConfig: NextConfig) {
  return nextConfig.rewrites ? nextConfig.rewrites() : [];
}

/**
 * Generates new rewrites based on the active server configuration
 * @param cfg - The active server configuration
 * @returns An array of new rewrites
 */
function generateRewrites(cfg: ReturnType<typeof activeServerConfig>) {
  const rewriteConfigs = [
    { condition: cfg.thegraphGql, source: "/proxy/thegraph/graphql", destination: cfg.thegraphGql },
    { condition: cfg.hasuraGql, source: "/proxy/hasura/graphql", destination: cfg.hasuraGql },
    { condition: cfg.portalRest, source: "/proxy/portal/rest/:path*", destination: `${cfg.portalRest}/:path*` },
    { condition: cfg.portalGql, source: "/proxy/portal/graphql", destination: cfg.portalGql },
    { condition: cfg.nodeJsonRpc, source: "/proxy/node/jsonrpc", destination: cfg.nodeJsonRpc },
  ];

  return rewriteConfigs.reduce((acc, { condition, source, destination }) => {
    if (condition && destination) acc.push({ source, destination });
    return acc;
  }, [] as Rewrite[]);
}

/**
 * Merges existing rewrites with new rewrites
 * @param existingRewrites - The existing rewrites from the Next.js configuration
 * @param newRewrites - The new rewrites to be added
 * @returns The merged rewrites
 */
function mergeRewrites(
  existingRewrites: Rewrite[] | { beforeFiles: Rewrite[]; afterFiles: Rewrite[]; fallback: Rewrite[] },
  newRewrites: Rewrite[],
) {
  if (Array.isArray(existingRewrites)) {
    return [...existingRewrites, ...newRewrites];
  }

  return {
    beforeFiles: existingRewrites.beforeFiles,
    afterFiles: [...existingRewrites.afterFiles, ...newRewrites],
    fallback: existingRewrites.fallback,
  };
}
