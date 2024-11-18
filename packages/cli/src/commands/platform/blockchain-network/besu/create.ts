import { parseNumber } from "@/utils/parse-number";
import { Option } from "@commander-js/extra-typings";
import type { DotEnv } from "@settlemint/sdk-utils";
import { getCreateCommand } from "../../common/create-command";

/**
 * Creates and returns the 'blockchain-network besu' command for the SettleMint SDK.
 * This command creates a new Besu blockchain network in a specified application.
 *
 * @returns A configured Commander command for creating a Besu network
 */
export function blockchainNetworkBesuCreateCommand() {
  return getCreateCommand({
    name: "besu",
    type: "blockchain network",
    alias: "b",
    execute: (cmd, baseAction) => {
      cmd
        .option(
          "-a, --application-id <applicationId>",
          "The application ID to create the network in (defaults to application from env)",
        )
        .requiredOption("--node-name <name>", "Name of the node")
        .option("--chain-id <chainId>", "The chain ID for the network", parseNumber)
        .option("--contract-size-limit <limit>", "Maximum contract size limit", parseNumber)
        .option("--evm-stack-size <size>", "EVM stack size", parseNumber)
        .option("--gas-limit <limit>", "Block gas limit")
        .option("--gas-price <price>", "Gas price in wei", parseNumber)
        .option("--seconds-per-block <seconds>", "Block time in seconds", parseNumber)
        .requiredOption("--provider <provider>", "Network provider")
        .requiredOption("--region <region>", "Deployment region")
        .addOption(
          new Option("--size <size>", "Network size")
            .choices(["CUSTOM", "LARGE", "MEDIUM", "SMALL"])
            .argParser((value) => value as "CUSTOM" | "LARGE" | "MEDIUM" | "SMALL" | null | undefined),
        )
        .addOption(
          new Option("--type <type>", "Network type")
            .choices(["DEDICATED", "SHARED"])
            .argParser((value) => value as "DEDICATED" | "SHARED" | null | undefined),
        )
        .action(
          async (
            name,
            {
              applicationId,
              chainId,
              contractSizeLimit,
              evmStackSize,
              gasLimit,
              gasPrice,
              nodeName,
              provider,
              region,
              secondsPerBlock,
              size,
              type,
              ...defaultArgs
            },
          ) => {
            return baseAction(defaultArgs, async (settlemint, env) => {
              const application = applicationId ?? env.SETTLEMINT_APPLICATION!;
              const result = await settlemint.blockchainNetwork.create({
                name,
                applicationId: application,
                nodeName: nodeName,
                consensusAlgorithm: "BESU_QBFT",
                chainId: chainId ?? 46040,
                contractSizeLimit: contractSizeLimit ?? 2147483647,
                evmStackSize: evmStackSize ?? 2048,
                gasLimit: gasLimit ?? "9007199254740991",
                gasPrice: gasPrice ?? 0,
                provider: provider,
                region: region,
                secondsPerBlock: secondsPerBlock ?? 2,
                size: size ?? "SMALL",
                type: type ?? "SHARED",
              });

              const blockchainNode =
                result.blockchainNodes.find((item) => item.name === nodeName) ?? result.blockchainNodes[0];

              return {
                result,
                waitFor: blockchainNode
                  ? {
                      resourceType: "blockchain node",
                      ...blockchainNode,
                    }
                  : undefined,
                mapDefaultEnv: async (): Promise<Partial<DotEnv>> => {
                  const workspaceId = applicationId
                    ? (await settlemint.application.read(applicationId)).workspace.id
                    : env.SETTLEMINT_WORKSPACE!;

                  return {
                    SETTLEMINT_APPLICATION: application,
                    SETTLEMINT_WORKSPACE: workspaceId,
                    SETTLEMINT_BLOCKCHAIN_NETWORK: result.id,
                    SETTLEMINT_BLOCKCHAIN_NODE: blockchainNode?.id,
                  };
                },
              };
            });
          },
        );
    },
    examples: [
      `# Create a Besu blockchain network with required options
  $ bunx @settlemint/sdk-cli@latest platform blockchain-network besu create my-network --provider gke --region europe --node-name validator-1 --accept-defaults`,
      `# Create a Besu blockchain network and save as default
  $ bunx @settlemint/sdk-cli@latest platform blockchain-network besu create my-network --provider gke --region europe --node-name validator-1 -d`,
      `# Create a Besu blockchain network in a specific application
  $ bunx @settlemint/sdk-cli@latest platform blockchain-network besu create my-network --provider gke --region europe --node-name validator-1 --application-id 123456789`,
      `# Create a Besu blockchain network with custom parameters
  $ bunx @settlemint/sdk-cli@latest platform blockchain-network besu create my-network --provider gke --region europe --node-name validator-1 --chain-id 12345 --gas-limit 10000000 --seconds-per-block 5`,
    ],
  });
}
