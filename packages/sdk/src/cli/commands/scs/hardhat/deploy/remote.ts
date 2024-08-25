import { Command } from "@commander-js/extra-typings";
import { printAsciiArt, printCancel, printIntro, printOutro, printSpinner } from "../../../../lib/cli-message";
import { readSettlemintConfig } from "../../../../lib/config/read-config";
import { runHardhat } from "../../../../lib/hardhat";

export function hardhatDeployRemoteCommand() {
  const build = new Command("remote")
    .description("Deploy the smart contracts using Hardhat/ignition to the remote network on the platform")
    .option("-m, --module <ignitionmodule>", 'The module to deploy with Ignition, e.g. "ignition/modules/Counter.ts"')
    .option("-r, --reset", "Reset the deployment")
    .option(
      "-a, --application <id>",
      "The name of the environment to use (SETTLEMINT_APPLICATION environment variable)",
    );

  build.action(async ({ module, reset, application }) => {
    printAsciiArt();
    printIntro("Deploying the smart contracts");

    const config = readSettlemintConfig(true);
    if (!config) {
      printCancel("No .settlemintrc.json file found");
      process.exit(1);
    }

    const app =
      config.applications?.[process.env.SETTLEMINT_APPLICATION ?? application ?? config.defaultApplication.id];
    if (!app) {
      printCancel("No application found");
      process.exit(1);
    }

    const nodeUrl = app.nodeJsonRpcDeploy;
    if (!nodeUrl) {
      printCancel("No deployment node URL found");
      process.exit(1);
    }

    process.env.SETTLEMINT_NODE_JSON_RPC_URL = nodeUrl;
    process.env.HARDHAT_IGNITION_CONFIRM_DEPLOYMENT = "false";
    process.env.HARDHAT_IGNITION_CONFIRM_RESET = "false";

    await printSpinner({
      startMessage: "Running hardhat deploy",
      task: async () => {
        await runHardhat(
          `ignition deploy ${reset ? "--reset" : ""}  --network btp ${module ?? "ignition/modules/main.ts"}`,
        );
      },
      stopMessage: "Smart contracts deployed",
    });
    printOutro("Smart contracts deployed");
  });

  return build;
}
