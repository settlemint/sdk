import { blockchainNodePrompt } from "@/commands/connect/blockchain-node.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { cancel } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function hardhatScriptRemoteCommand() {
  const build = new Command("remote")
    .description("Run a Hardhat script to deploy a contract on the platform or interact with a deployed contract.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option(
      "--blockchain-node-id <blockchainNodeId>",
      "Blockchain Node ID (optional, defaults to the blockchain node in the environment)",
    )
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values");

  build.action(async ({ script, prod, blockchainNodeId, acceptDefaults }) => {
    const autoAccept = !!acceptDefaults || isInCi;
    const env = await loadEnv(false, !!prod);

    const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
    if (!accessToken) {
      return missingAccessTokenError();
    }
    const instance = await instancePrompt(env, true);
    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    let nodeId = blockchainNodeId;
    if (!nodeId) {
      const blockchainNodes = await settlemint.blockchainNode.list(env.SETTLEMINT_APPLICATION!);
      const blockchainNode = await blockchainNodePrompt(env, blockchainNodes, autoAccept);
      if (!blockchainNode) {
        cancel("No Blockchain Node selected. Please select one to continue.");
      }
      nodeId = blockchainNode.id;
    }

    const envConfig = await settlemint.foundry.env(nodeId);
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(command, [...args, "hardhat", "run", script, "--network", "btp"], { env: envConfig });
  });

  return build;
}
