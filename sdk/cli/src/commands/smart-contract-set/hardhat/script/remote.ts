import { selectTargetNode } from "@/commands/smart-contract-set/hardhat/utils/select-target-node";
import { instancePrompt } from "@/prompts/instance.prompt";
import { createExamples } from "@/utils/commands/create-examples";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { validateIfRequiredPackagesAreInstalled } from "@/utils/validate-required-packages";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { getPackageManagerExecutable } from "@settlemint/sdk-utils/package-manager";
import { executeCommand, intro, outro } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function hardhatScriptRemoteCommand() {
  const cmd = new Command("remote")
    .description("Run a Hardhat script on a remote network on the platform.")
    .requiredOption("-s, --script <script>", 'The script to run with Hardhat , e.g. "scripts/deploy.ts"')
    .option(
      "--blockchain-node <blockchainNode>",
      "Blockchain Node unique name (optional, defaults to the blockchain node in the environment)",
    )
    .option("--prod", "Connect to your production environment")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--no-compile", "Don't compile before running this task")
    .usage(
      createExamples([
        {
          description: "Run a Hardhat script on a remote network",
          command: "hardhat script remote --script scripts/deploy.ts",
        },
        {
          description: "Run a Hardhat script on a remote network with a specific blockchain node",
          command: "hardhat script remote --script scripts/deploy.ts --blockchain-node my-blockchain-node",
        },
        {
          description: "Run a Hardhat script on a remote network without compiling",
          command: "hardhat script remote --script scripts/deploy.ts --no-compile",
        },
      ]),
    );

  cmd.action(async ({ script, prod, blockchainNode: blockchainNodeUniqueName, acceptDefaults, compile }) => {
    intro("Running Hardhat script on remote network");
    await validateIfRequiredPackagesAreInstalled(["hardhat"]);

    const autoAccept = !!acceptDefaults || isInCi;
    const env = await loadEnv(false, !!prod);

    const instance = await instancePrompt(env, true);
    const accessToken = await getApplicationOrPersonalAccessToken({
      env,
      instance,
      prefer: "application",
    });

    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const node = await selectTargetNode({ env, blockchainNodeUniqueName, autoAccept, settlemint });

    const envConfig = await settlemint.foundry.env(node.uniqueName);
    const { command, args } = await getPackageManagerExecutable();
    await executeCommand(
      command,
      [...args, "hardhat", "run", script, "--network", "btp", ...(compile ? ["--no-compile"] : [])],
      { env: envConfig },
    );
    outro("Script execution completed successfully");
  });

  return cmd;
}
