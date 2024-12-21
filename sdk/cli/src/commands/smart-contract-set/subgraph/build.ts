import { dirname } from "node:path";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import isInCi from "is-in-ci";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphBuildCommand() {
  return new Command("build")
    .description("Build the subgraph")
    .option("-a, --accept-defaults", "Accept the default and previously set values")
    .option("--prod", "Connect to your production environment")
    .action(async ({ acceptDefaults, prod }) => {
      const autoAccept = !!acceptDefaults || isInCi;
      const env = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, true);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: "application",
        strict: true,
      });

      await subgraphSetup({
        env,
        instance,
        accessToken,
        autoAccept,
      });

      const { command, args } = await getPackageManagerExecutable();
      const subgraphYamlFile = await getSubgraphYamlFile();
      const cwd = dirname(subgraphYamlFile);
      await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
      await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
    });
}
