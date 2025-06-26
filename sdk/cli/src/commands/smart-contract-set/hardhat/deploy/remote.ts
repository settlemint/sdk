import { selectTargetNode } from "@/commands/smart-contract-set/hardhat/utils/select-target-node";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { addressPrompt } from "@/prompts/smart-contract-set/address.prompt";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { getHardhatConfigData } from "@/utils/smart-contract-set/hardhat-config";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { type BlockchainNode, createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { cancel, executeCommand, intro, note, outro } from "@settlemint/sdk-utils/terminal";
import { LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

export function hardhatDeployRemoteCommand() {
  const cmd = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .usage(
      createExamples([
        {
          description: "Deploy smart contracts to remote network using Hardhat/Ignition",
          command: "scs hardhat deploy remote",
        },
        {
          description: "Deploy a specific Ignition module to remote network",
          command: "scs hardhat deploy remote --module ignition/modules/custom.ts",
        },
        {
          description: "Deploy with a clean deployment state to remote network",
          command: "scs hardhat deploy remote --reset",
        },
        {
          description: "Deploy and verify contracts on remote network",
          command: "scs hardhat deploy remote --verify",
        },
        {
          description: "Deploy to remote network with specific blockchain node",
          command: "scs hardhat deploy remote --blockchain-node my-node",
        },
        {
          description: "Deploy to production environment",
          command: "scs hardhat deploy remote --prod",
        },
      ]),
    )
    .option(
      "-m, --module <ignitionmodule>",
      'The module to deploy with Ignition, defaults to "ignition/modules/main.ts"',
    )
    .option("--deployment-id <deploymentId>", "Set the id of the deployment")
    .option("-r, --reset", "Wipes the existing deployment state before deploying")
    .option("-v, --verify", "Verify the deployment on Etherscan")
    .option("--default-sender <defaultSender>", "Set the default sender for the deployment")
    .option("--parameters <parameters>", "A relative path to a JSON file to use for the module parameters")
    .option("--strategy <strategy>", `Set the deployment strategy to use (default: "basic")`)
    .option(
      "--blockchain-node <blockchainNode>",
      "Blockchain Node unique name (optional, defaults to the blockchain node in the environment)",
    )
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values");

  cmd.action(
    async ({
      module,
      reset,
      verify,
      deploymentId,
      defaultSender,
      parameters,
      strategy,
      prod,
      acceptDefaults,
      blockchainNode: blockchainNodeUniqueName,
    }) => {
      intro("Deploying smart contracts to remote network using Hardhat/Ignition");
      await validateIfRequiredPackagesAreInstalled(["hardhat"]);

      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      let node: BlockchainNode | undefined;
      let envHardhatConfig: Record<string, string> = {};

      const instance = await instancePrompt({
        env,
        accept: true,
      });
      if (instance === STANDALONE_INSTANCE || instance === LOCAL_INSTANCE) {
        envHardhatConfig.BTP_RPC_URL = env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT ?? "";
      } else {
        const accessToken = await getApplicationOrPersonalAccessToken({
          env,
          instance,
          prefer: "application",
        });

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        node = await selectTargetNode({ env, blockchainNodeUniqueName, autoAccept, settlemint });
        envHardhatConfig = await settlemint.foundry.env(node.uniqueName);
      }

      const hardhatConfig = await getHardhatConfigData(envHardhatConfig);
      if (verify && !hardhatConfig?.etherscan?.apiKey) {
        cancel(
          "It is not possible to verify the deployment on this network unless you supply an Etherscan API key in the hardhat.config.ts file",
        );
      }

      let address: string | null = defaultSender ?? null;
      if (!defaultSender) {
        address = await addressPrompt({ accept: autoAccept, node, hardhatConfig });
      }
      if (!address) {
        return nothingSelectedError("private key");
      }

      const { command, args } = await getPackageManagerExecutable();
      try {
        const output = await executeCommand(
          command,
          [
            ...args,
            "hardhat",
            "ignition",
            "deploy",
            ...(reset ? ["--reset"] : []),
            ...(verify ? ["--verify"] : []),
            ...(deploymentId ? ["--deployment-id", deploymentId] : []),
            ...(parameters ? ["--parameters", parameters] : []),
            ...(strategy ? ["--strategy", strategy] : []),
            "--network",
            "btp",
            "--default-sender",
            address,
            module ?? "ignition/modules/main.ts",
          ].filter(Boolean),
          { env: envHardhatConfig },
        );

        // Only show success message if deployment wasn't cancelled
        const outputStr = output.join("\n");
        if (!outputStr.includes("Deploy cancelled")) {
          outro("Smart contracts deployed successfully to remote network");
        } else {
          note("Smart contract deployment was cancelled");
        }
      } catch (_error) {
        // Handle any execution errors
        cancel(
          "The smart contract deployment was unsuccessful. Please check the error details above and try again. You may need to review your contract code or deployment configuration.",
        );
      }
    },
  );

  return cmd;
}
