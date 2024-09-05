import { printAsciiArt, printCancel, printIntro, printOutro, printSpinner } from "@/cli/lib/cli-message";
import { updateCustomDeployment } from "@/cli/lib/cluster-manager";
import {
  loadSettleMintApplicationConfig,
  loadSettleMintConfig,
  loadSettleMintEnvironmentConfig,
} from "@/common/config/loader";
import { Command } from "@commander-js/extra-typings";

export function customDeploymentUpdateCommand() {
  const update = new Command("update")
    .description("Update a custom deployment")
    .option("-ip, --imagePath <IMAGE_PATH>", "Path to the container image")
    .option("-p, --port <PORT>", "Port the container image exposes")
    .action(async ({ imagePath, port }) => {
      printAsciiArt();
      printIntro("Updating custom deployment");

      const config = await loadSettleMintConfig();
      if (!config) {
        printCancel("No configuration found");
        process.exit(1);
      }
      const app = await loadSettleMintApplicationConfig();
      if (!app) {
        printCancel("No application configuration found");
        process.exit(1);
      }
      if (!app.customDeploymentId) {
        printCancel("No custom deployment configuration found");
        process.exit(1);
      }
      const envCfg = loadSettleMintEnvironmentConfig();
      await printSpinner({
        startMessage: "Updating custom deployment settings",
        task: () => {
          return updateCustomDeployment({
            instance: config.instance,
            pat: envCfg.SETTLEMINT_PAT_TOKEN,
            id: app.customDeploymentId!,
            data: {
              imagePath: imagePath!,
              port: Number(port!),
            },
          });
        },
        stopMessage:
          "Updating custom deployment setting finished, check the SettleMint platform for the deployment status",
      });

      printOutro("The custom deployment has been updated!");
    });

  return update;
}
