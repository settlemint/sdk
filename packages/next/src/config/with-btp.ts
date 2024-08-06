import { config } from "@settlemint/btp-sdk-config";
import type { NextConfig } from "next";

export type WithBTPOptions = {
  disabled?: boolean;
  output?: "standalone" | "export" | "static" | "server" | "experimental-server" | "experimental-static";
};

/**
 * Modifies the passed in Next.js configuration
 */
export async function withBTP<C extends NextConfig>(
  nextConfig: C,
  { disabled, output }: WithBTPOptions = {},
): Promise<C> {
  if (disabled) {
    const cfg = await config();
    if (!cfg) {
      throw new Error("No configuration found, please run btp-sdk-cli init");
    }

    const env = process.env.BTP_ENVIRONMENT ?? cfg?.defaultEnvironment;
    if (!env || !cfg.environments) {
      throw new Error(
        "No environment found, either set BTP_ENVIRONMENT or define a default environment in your .btprc.json file",
      );
    }

    const envConf = cfg.environments[env];
    if (!envConf) {
      throw new Error(`No environment found for ${env}, please run btp-sdk-cli init`);
    }

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
    } as C;
  }
  return nextConfig;
}
