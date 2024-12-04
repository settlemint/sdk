import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import { commonSetup } from "./lib/common.ts";
import { isGenerated } from "./lib/is-generated.ts";
import { subgraphYamlFile } from "./lib/utils.ts";

export function subgraphCodegenCommand() {
  const test = new Command("codegen");
  test.description("Codegen the subgraph types");
  test.action(async () => {
    await commonSetup(isGenerated);

    if (!isGenerated) {
      $.cwd("./subgraph");
    }

    await $`npx graph codegen ${subgraphYamlFile}`;
  });

  return test;
}
