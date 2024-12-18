import { dirname } from "node:path";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { missingAccessTokenError } from "@/error/missing-config-error";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphCodegenCommand() {
  return new Command("codegen")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .description("Codegen the subgraph types")
    .action(async ({ acceptDefaults, prod }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const accessToken = env.SETTLEMINT_ACCESS_TOKEN;
      if (!accessToken) {
        return missingAccessTokenError();
      }

      const instance = await instancePrompt(env, true);
      await subgraphSetup({
        env,
        instance,
        accessToken,
        autoAccept,
      });

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], {
        cwd: dirname(subgraphYamlFile),
      });
    });
}
