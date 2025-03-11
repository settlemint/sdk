import { describe, expect, test } from "bun:test";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { foundryTestCommand } from "./test";

describe("foundryTestCommand", () => {
  test("executes test command with vvv option", () => {
    let commandOptions: string[] = [];
    const program = new Command();
    program.enablePositionalOptions().addCommand(
      foundryTestCommand().action((passThroughOptions, cmd) => {
        const forgeOptions = mapPassthroughOptions(passThroughOptions, cmd);
        commandOptions = forgeOptions;
      }),
    );
    program.parse(["node", "test", "test", "-vvv"]);

    expect(commandOptions).toEqual(["-vvv"]);
  });
});
