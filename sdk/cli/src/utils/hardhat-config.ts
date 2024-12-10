import type { HardhatUserConfig } from "hardhat/config";

type HardhatConfig = HardhatUserConfig & { etherscan?: { apiKey?: string } };

export async function getHardhatConfigData(): Promise<HardhatConfig> {
  try {
    const hardhatConfigData = await import("hardhat");
    return hardhatConfigData.userConfig;
  } catch (error) {
    console.error("Error reading hardhat.config.ts", error);
    return {};
  }
}
