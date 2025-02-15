import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes.js";

/**
 * Options for configuring the SettleMint configuration.
 */
export interface WithSettleMintOptions {
  /**
   * Whether to disable the SettleMint configuration.
   */
  disabled?: boolean;
}

/**
 * Modifies the passed in Next.js configuration with SettleMint-specific settings.
 *
 * @param nextConfig - The original Next.js configuration
 * @param options - Options for customizing the SettleMint configuration
 * @returns The modified Next.js configuration
 * @throws If the SettleMint configuration cannot be read or processed
 */
export async function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled = false }: WithSettleMintOptions = {},
): Promise<C> {
  if (disabled) return nextConfig;

  const baseConfig = {
    ...nextConfig,
  };

  const env = await loadEnv(true, false);

  return {
    ...baseConfig,
    async rewrites() {
      const existingRewrites = await getExistingRewrites(baseConfig);
      const newRewrites = generateRewrites(env);
      return mergeRewrites(existingRewrites, newRewrites);
    },
    headers: async () => [
      {
        source: "/(.*)",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
    ],
    poweredByHeader: false,
    reactStrictMode: true,
    compress: false,
  } as C;
}

/**
 * Retrieves existing rewrites from the Next.js configuration.
 *
 * @param nextConfig - The Next.js configuration
 * @returns An array of existing rewrites or an empty array if none exist
 */
function getExistingRewrites(nextConfig: NextConfig) {
  return nextConfig.rewrites ? nextConfig.rewrites() : [];
}

/**
 * Generates new rewrites based on the environment configuration.
 *
 * @param env - The environment configuration
 * @returns An array of new rewrites
 */
function generateRewrites(env: DotEnv): Rewrite[] {
  const theGraphEndpoints = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS ?? [];
  const rewriteConfigs: Rewrite[] = [
    ...theGraphEndpoints.map((endpoint) => {
      const name = endpoint.split("/").pop();
      return {
        source: `/proxy/thegraph/graphql/${name ? encodeURIComponent(name) : ""}`,
        destination: endpoint ?? "http://unconfigured.settlemint.com",
      };
    }),
    {
      source: "/proxy/hasura/graphql",
      destination: env.SETTLEMINT_HASURA_ENDPOINT ?? "http://unconfigured.settlemint.com",
    },
    {
      source: "/proxy/portal/graphql",
      destination: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT ?? "http://unconfigured.settlemint.com",
    },
    {
      source: "/proxy/ipfs/api/v0",
      destination: env.SETTLEMINT_IPFS_API_ENDPOINT ?? "http://unconfigured.settlemint.com",
    },
    {
      source: "/proxy/ipfs/gateway",
      destination: env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT ?? "http://unconfigured.settlemint.com",
    },
    {
      source: "/proxy/blockscout/graphql",
      destination: env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT ?? "http://unconfigured.settlemint.com",
    },
  ];

  return rewriteConfigs;
}

/**
 * Merges existing rewrites with new rewrites.
 *
 * @param existingRewrites - The existing rewrites from the Next.js configuration
 * @param newRewrites - The new rewrites to be added
 * @returns The merged rewrites configuration
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
