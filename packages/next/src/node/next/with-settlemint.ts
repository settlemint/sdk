import { loadSettleMintApplicationConfig } from "@settlemint/sdk-config/loader";
import type { ApplicationConfig } from "@settlemint/sdk-config/schemas";
import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

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
    output: output ?? nextConfig.output ?? "standalone",
  };

  const config = await loadSettleMintApplicationConfig();

  if (!config) {
    console.warn("No SettleMint application config found, using normal Next.js config");
    return nextConfig;
  }

  return {
    ...baseConfig,
    env: {
      ...nextConfig.env,
      SETTLEMINT_APP_URL: process.env.SETTLEMINT_APP_URL,
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    },
    async rewrites() {
      const existingRewrites = await getExistingRewrites(baseConfig);
      const newRewrites = generateRewrites(config);
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
function generateRewrites(cfg: ApplicationConfig): Rewrite[] {
  const rewriteConfigs = [
    { condition: cfg.thegraphGql, source: "/proxy/thegraph/graphql", destination: cfg.thegraphGql },
    {
      condition: cfg.hasuraGql,
      source: "/proxy/hasura/graphql",
      destination: process.env.LOCAL_HASURA ?? cfg.hasuraGql,
    },
    { condition: cfg.portalRest, source: "/proxy/portal/rest/:path*", destination: `${cfg.portalRest}/:path*` },
    { condition: cfg.portalGql, source: "/proxy/portal/graphql", destination: cfg.portalGql },
    { condition: cfg.nodeJsonRpc, source: "/proxy/node/jsonrpc", destination: cfg.nodeJsonRpc },
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
