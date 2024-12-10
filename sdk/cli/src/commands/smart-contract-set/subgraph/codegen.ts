import { Command } from "@commander-js/extra-typings";
import { $ } from "bun";
import { commonSetup } from "./lib/common";
import { isGenerated } from "./lib/is-generated";
import { subgraphYamlFile } from "./lib/utils";

export function subgraphCodegenCommand() {
  const test = new Command("codegen");
  test.description("Codegen the subgraph types");
  test.action(async () => {
    await commonSetup(await isGenerated);

    if (!isGenerated) {
      $.cwd("./subgraph");
    }

    await $`npx graph codegen ${subgraphYamlFile}`;
  });

  return test;
}
