import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import { commonSetup } from "./lib/common.ts";
import { isGenerated } from "./lib/is-generated.ts";
import { subgraphYamlFile } from "./lib/utils.ts";

export function subgraphBuildCommand() {
  const test = new Command("build");
  test.description("Build the subgraph");
  test.action(async () => {
    await commonSetup(isGenerated);

    if (!isGenerated) {
      $.cwd("./subgraph");
    }

    await $`npx graph codegen ${subgraphYamlFile}`;
    await $`npx graph build ${subgraphYamlFile}`;
  });

  return test;
}
