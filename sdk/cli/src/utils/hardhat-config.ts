import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-solhint";
import { readFile, writeFile } from "node:fs/promises";
import type { HardhatUserConfig } from "hardhat/config";

export async function getHardhatConfigData() {
  try {
    const hardhatConfigData = await readFile("hardhat.config.ts", "utf-8");
    const hardhatConfig: HardhatUserConfig = JSON.parse(hardhatConfigData);
    return hardhatConfig;
  } catch (error) {
    console.error("Error reading hardhat.config.ts", error);
    return {};
  }
}

export async function updateHardhatConfigData(config: HardhatUserConfig) {
  try {
    const hardhatConfigData = await writeFile("hardhat.config.ts", JSON.stringify(config, null, 2));
    return hardhatConfigData;
  } catch (error) {
    console.error("Error writing hardhat.config.ts", error);
    return {};
  }
}
