import { tryParseJson } from "@settlemint/sdk-utils";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, note } from "@settlemint/sdk-utils/terminal";

export type HardhatConfig = {
  networks?: {
    btp?: { from?: string };
  };
  etherscan?: { apiKey?: string };
};

export async function getHardhatConfigData(envConfig: Record<string, string>): Promise<HardhatConfig> {
  try {
    const { command, args } = await getPackageManagerExecutable();
    const output = await executeCommand(
      command,
      [...args, "ts-node", "-e", `import hardhat from "hardhat";\nconsole.log(JSON.stringify(hardhat.userConfig));`],
      {
        env: {
          ...process.env,
          ...envConfig,
        },
        silent: true,
      },
    );
    const config = tryParseJson<unknown>(output.join(" "));
    if (isHardhatConfig(config)) {
      return config;
    }
    throw new Error("Invalid hardhat config");
  } catch (err) {
    const error = err as Error;
    note(`Error reading hardhat.config.ts: ${error.message}`);
    return {};
  }
}

function isHardhatConfig(config: unknown): config is HardhatConfig {
  return typeof config === "object" && config !== null && "networks" in config;
}
