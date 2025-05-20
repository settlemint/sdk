import { describe, expect, test } from "bun:test";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { foundryFormatCommand } from "./format";

describe("foundryFormatCommand", () => {
  test("executes format command with --check option passed through", () => {
    let capturedForgeOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = foundryFormatCommand();

    cmdToTest.action(async (operands, options, cmd) => {
      capturedForgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "format", "--check"]);

    expect(capturedForgeOptions).toEqual(["--check"]);
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
