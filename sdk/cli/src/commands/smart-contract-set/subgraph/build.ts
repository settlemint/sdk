import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { executeCommand, getPackageManagerExecutable, loadEnv } from "@settlemint/sdk-utils";
import { isGenerated } from "./utils/is-generated";
import { subgraphSetup } from "./utils/setup";
import { getSubgraphYamlFile } from "./utils/subgraph-config";

export function subgraphBuildCommand() {
  const test = new Command("build");
  test.description("Build the subgraph");
  test.action(async () => {
    const env = await loadEnv(false, true);

    const accessToken = await accessTokenPrompt(env, true);
    const instance = await instancePrompt(env, true);

    const generated = await isGenerated();
    await subgraphSetup({
      isGenerated: generated,
      env,
      settlemintClient: createSettleMintClient({
        accessToken,
        instance,
      }),
    });

    const cwd = generated ? process.cwd() : "./subgraph";
    const { command, args } = await getPackageManagerExecutable();
    const subgraphYamlFile = await getSubgraphYamlFile();
    await executeCommand(command, [...args, "graph", "codegen", subgraphYamlFile], { cwd });
    await executeCommand(command, [...args, "graph", "build", subgraphYamlFile], { cwd });
  });

  return test;
}
