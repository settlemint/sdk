import { readFile, writeFile } from "node:fs/promises";
import type { HardhatUserConfig } from "hardhat/config";

type HardhatConfig = HardhatUserConfig & { etherscan?: { apiKey: string } };

export async function getHardhatConfigData() {
  try {
    const hardhatConfigData = await readFile("hardhat.config.ts", "utf-8");
    const hardhatConfig: HardhatConfig = JSON.parse(hardhatConfigData);
    return hardhatConfig;
  } catch (error) {
    console.error("Error reading hardhat.config.ts", error);
    return {};
  }
}

export async function updateHardhatConfigData(config: HardhatConfig) {
  try {
    const hardhatConfigData = await writeFile("hardhat.config.ts", JSON.stringify(config, null, 2));
    return hardhatConfigData;
  } catch (error) {
    console.error("Error writing hardhat.config.ts", error);
    return {};
  }
}
