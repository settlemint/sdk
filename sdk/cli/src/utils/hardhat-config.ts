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
  } catch (error) {
    console.error("Error reading hardhat.config.ts", error);
    return {};
  }
}
