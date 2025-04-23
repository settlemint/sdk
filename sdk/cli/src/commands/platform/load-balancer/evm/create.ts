import { addClusterServiceArgs } from "@/commands/platform/common/cluster-service.args";
import { getCreateCommand } from "@/commands/platform/common/create-command";
import { missingApplication } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { blockchainNetworkPrompt } from "@/prompts/cluster-service/blockchain-network.prompt";
import { blockchainNodePrompt } from "@/prompts/cluster-service/blockchain-node.prompt";
import { serviceSpinner } from "@/spinners/service.spinner";
import { cancel } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'load-balancer evm' command for the SettleMint SDK.
 * This command creates a new EVM load balancer in a specified application.
 *
 * @returns A configured Commander command for creating an EVM load balancer
 */
export function loadBalancerEvmCreateCommand() {
  return getCreateCommand({
    name: "evm",
    type: "load balancer",
    subType: "EVM",
    alias: "e",
    execute: (cmd, baseAction) => {
      addClusterServiceArgs(cmd)
        .option(
          "--app, --application <application>",
          "The application unique name to create the load balancer in (defaults to application from env)",
        )
        .option(
          "--blockchain-nodes <blockchainNodes...>",
          "Blockchain node unique names where the load balancer connects to (must be from the same network)",
        )
        .action(
          async (
            name,
            { application, provider, region, size, type, blockchainNodes, acceptDefaults, ...defaultArgs },
          ) => {
            return baseAction(
              {
                ...defaultArgs,
                acceptDefaults,
                provider,
                region,
              },
              async ({ settlemint, env, showSpinner, provider, region }) => {
                const applicationUniqueName = application ?? env.SETTLEMINT_APPLICATION;
                if (!applicationUniqueName) {
                  return missingApplication();
                }

                let networkUniqueName: string | undefined;
                let connectedNodesUniqueNames = blockchainNodes;
                if (!connectedNodesUniqueNames) {
                  const networks = await serviceSpinner("blockchain network", () =>
                    settlemint.blockchainNetwork.list(applicationUniqueName),
                  );
                  const network = await blockchainNetworkPrompt({
                    env,
                    networks,
                    accept: acceptDefaults,
                    isRequired: true,
                  });
                  if (!network) {
                    return nothingSelectedError("blockchain network");
                  }
                  const blockchainNodes = await serviceSpinner("blockchain node", () =>
                    settlemint.blockchainNode.list(applicationUniqueName),
                  );
                  const connectedNodes = await blockchainNodePrompt({
                    env,
                    nodes: blockchainNodes.filter((node) => node.blockchainNetwork?.uniqueName === networkUniqueName),
                    accept: acceptDefaults,
                    promptMessage: "Which blockchain node do you want to connect the load balancer to?",
                    allowAll: true,
                  });
                  connectedNodesUniqueNames = Array.isArray(connectedNodes)
                    ? blockchainNodes.map((node) => node.uniqueName)
                    : connectedNodes
                      ? [connectedNodes.uniqueName]
                      : [];
                }
                if (!networkUniqueName) {
                  const applicationBlockchainNodes = await serviceSpinner("blockchain node", () =>
                    settlemint.blockchainNode.list(applicationUniqueName),
                  );
                  const selectedBlockchainNodes = applicationBlockchainNodes.filter((node) =>
                    connectedNodesUniqueNames.includes(node.uniqueName),
                  );
                  if (selectedBlockchainNodes.length === 0) {
                    return cancel("blockchain network");
                  }
                  const onTheSameNetwork = selectedBlockchainNodes.every(
                    (node) =>
                      node.blockchainNetwork?.uniqueName === selectedBlockchainNodes[0].blockchainNetwork?.uniqueName,
                  );
                  if (!onTheSameNetwork) {
                    return cancel("Blockchain nodes must be on the same network");
                  }
                  networkUniqueName = selectedBlockchainNodes[0].blockchainNetwork?.uniqueName;
                }

                const result = await showSpinner(() =>
                  settlemint.loadBalancer.create({
                    applicationUniqueName,
                    name,
                    blockchainNetworkUniqueName: networkUniqueName,
                    provider,
                    region,
                    size,
                    type,
                    connectedNodesUniqueNames,
                  }),
                );

                return {
                  result,
                  mapDefaultEnv: (): Partial<DotEnv> => {
                    return {
                      SETTLEMINT_APPLICATION: applicationUniqueName,
                      SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER: result.uniqueName,
                    };
                  },
                };
              },
            );
          },
        );
    },
    examples: [
      {
        description: "Create an EVM load balancer and save as default",
        command: "platform create load-balancer evm my-lb --accept-defaults -d",
      },
      {
        description: "Create an EVM load balancer and connect to specific blockchain nodes",
        command: "platform create load-balancer evm my-lb --blockchain-nodes my-node1 my-node2 --accept-defaults",
      },
      {
        description: "Create an EVM load balancer in a different application",
        command: "platform create load-balancer evm my-lb --application my-app --accept-defaults",
      },
    ],
  });
}
