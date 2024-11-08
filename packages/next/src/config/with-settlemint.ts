import { type DotEnv, DotEnvSchema } from "@settlemint/sdk-utils";
import { validate } from "@settlemint/sdk-utils/validation";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes.js";

interface WithSettleMintOptions {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
}

/**
 * Modifies the passed in Next.js configuration with SettleMint-specific settings
 *
 * @param nextConfig - The original Next.js configuration
 * @param options - Options for customizing the SettleMint configuration
 * @returns A Promise that resolves to the modified Next.js configuration
 * @throws {Error} If the SettleMint configuration cannot be read or processed
 */
export async function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled = false, output }: WithSettleMintOptions = {},
): Promise<C> {
  if (disabled) return nextConfig;

  const baseConfig = {
    ...nextConfig,
  };

  const env = validate(DotEnvSchema, process.env);

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
function generateRewrites(env: DotEnv): Rewrite[] {
  const rewriteConfigs = [
    {
      condition: !!env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT,
      source: "/proxy/thegraph/graphql",
      destination: env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT,
    },
    {
      condition: !!env.SETTLEMINT_HASURA_ENDPOINT,
      source: "/proxy/hasura/graphql",
      destination: env.SETTLEMINT_HASURA_ENDPOINT,
    },
    {
      condition: !!env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
      source: "/proxy/portal/graphql",
      destination: env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT,
    },
    {
      condition: !!env.SETTLEMINT_IPFS_API_ENDPOINT,
      source: "/proxy/ipfs/api/v0",
      destination: env.SETTLEMINT_IPFS_API_ENDPOINT,
    },
    {
      condition: !!env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT,
      source: "/proxy/ipfs/gateway",
      destination: env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT,
    },
    {
      condition: !!env.SETTLEMINT_BLOCKSCOUT_ENDPOINT,
      source: "/proxy/blockscout/graphql",
      destination: env.SETTLEMINT_BLOCKSCOUT_ENDPOINT,
    },
  ];

  return rewriteConfigs
    .filter(({ condition, destination }) => condition && destination)
    .map(({ source, destination }) => ({ source, destination })) as Rewrite[];
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
