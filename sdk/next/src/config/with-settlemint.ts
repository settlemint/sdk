import { loadEnv } from "@settlemint/sdk-utils/environment";
import type { NextConfig } from "next";

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
