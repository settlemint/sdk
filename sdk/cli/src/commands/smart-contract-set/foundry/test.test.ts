import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { foundryTestCommand } from "./test"; // Import the actual command

describe("foundryTestCommand", () => {
  test("executes test command with -vvv option passed through", () => {
    let capturedForgeOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = foundryTestCommand();

    // Hijack the action of the command to inspect inputs to mapPassthroughOptions
    cmdToTest.action(async (operands, options, _cmd) => {
      // In foundryTestCommand's actual action, it calls:
      // mapPassthroughOptions(options, { args: operands } as Command)
      // So, we replicate that here to capture the result.
      capturedForgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "test", "-vvv"]);

    // When "-vvv" is passed, and it's not a defined option (like -h),
    // `options` fed to mapPassthroughOptions should be empty (or only contain defaults like help:false).
    // `operands` should be ["-vvv"].
    // mapPassthroughOptions with empty `options` and `args: ["-vvv"]` should return ["-vvv"].
    expect(capturedForgeOptions).toEqual(["-vvv"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      // Simulating the structure passed by foundryTestCommand's action
      args: ["rawArg1", "-vvv"],
    } as unknown as Command;

    const parsedCmdOptions = {
      // Simulating the `options` object from Commander's parsing
      "some-option": "value",
      "boolean-flag": true,
      // help: false, // commander adds `help: false` if not present and helpOption is not false
      // but foundryTestCommand has .helpOption(false) for its own -h
      // and a general one is added by .addCommand()
    };

    // Test mapPassthroughOptions directly with mocked inputs similar to what it would receive
    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual(["--some-option=value", "--boolean-flag", "rawArg1", "-vvv"]);
  });
});
