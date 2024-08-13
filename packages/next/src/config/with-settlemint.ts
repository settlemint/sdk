import { config } from "@settlemint/sdk-config";
import type { NextConfig } from "next";

export type WithSettleMintOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
};

/**
 * Modifies the passed in Next.js configuration
 */
export async function withSettleMint<C extends NextConfig>(
  nextConfig: C,
  { disabled, output }: WithSettleMintOptions = {},
): Promise<C> {
  if (!disabled) {
    const cfg = await config();
    if (!cfg) {
      throw new Error("No configuration found, please run sdk-cli init");
    }

    const env = process.env.SETTLEMINT_ENVIRONMENT ?? cfg?.defaultEnvironment;
    if (!env || !cfg.environments) {
      throw new Error(
        "No environment found, either set SETTLEMINT_ENVIRONMENT or define a default environment in your .settlemintrc.json file",
      );
    }

    const envConf = cfg.environments[env];
    if (!envConf) {
      throw new Error(`No environment found for ${env}, please run sdk-cli init`);
    }

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
    } as C;
  }
  return nextConfig;
}
