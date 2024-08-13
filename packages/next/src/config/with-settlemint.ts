import { config } from "@settlemint/sdk-config";
import type { NextConfig } from "next";
import { getExecutor, getPkgManager } from "../../../sdk/src/lib/package-manager.js";

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
      throw new Error("No configuration found, please run settlemint init");
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
      throw new Error(`No application found for ${env}, please run ${getExecutor(getPkgManager())} settlemint connect`);
    }

    return {
      ...nextConfig,
      output: output ?? nextConfig.output ?? "standalone",
    } as C;
  }
  return nextConfig;
}
