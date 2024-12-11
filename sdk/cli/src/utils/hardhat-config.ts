import { note } from "@settlemint/sdk-utils/terminal";
import type { HardhatUserConfig } from "hardhat/config";

export type HardhatConfig = HardhatUserConfig & { etherscan?: { apiKey?: string } };

export async function getHardhatConfigData(envConfig: Record<string, string>): Promise<HardhatConfig> {
  try {
    // Inject env variables into process.env so that the hardhat config can read them
    process.env = {
      ...process.env,
      ...envConfig,
    };
    const hardhatConfigData = await import("hardhat");
    return hardhatConfigData.userConfig;
  } catch (err) {
    const error = err as Error;
    note(`Error reading hardhat.config.ts: ${error.message}`);
    return {};
  }
}
