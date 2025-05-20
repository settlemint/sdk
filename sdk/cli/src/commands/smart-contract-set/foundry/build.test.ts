import { describe, expect, test } from "bun:test";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { foundryBuildCommand } from "./build";

describe("foundryBuildCommand", () => {
  test("executes build command with --force option passed through", () => {
    let capturedForgeOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = foundryBuildCommand();

    cmdToTest.action(async (operands, options, cmd) => {
      capturedForgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "build", "--force"]);

    expect(capturedForgeOptions).toEqual(["--force"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      args: ["rawArg1", "--other-unknown"],
    } as unknown as Command;

    const parsedCmdOptions = {
      "some-defined-option": "value",
      "boolean-flag": true,
    };

    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual(["--some-defined-option=value", "--boolean-flag", "rawArg1", "--other-unknown"]);
  });
});
