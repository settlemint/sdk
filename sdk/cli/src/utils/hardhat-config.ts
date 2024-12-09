import { readFile } from "node:fs/promises";
import type { HardhatUserConfig } from "hardhat/config";

export async function getHardhatConfigData() {
  try {
    const hardhatConfigData = await readFile("hardhat.config.ts", "utf-8");
    const hardhatConfig: HardhatUserConfig & { etherscan?: { apiKey: string } } = JSON.parse(hardhatConfigData);
    return hardhatConfig;
  } catch (error) {
    console.error("Error reading hardhat.config.ts", error);
    return {};
  }
}
