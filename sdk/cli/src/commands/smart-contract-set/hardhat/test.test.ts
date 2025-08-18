import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { hardhatTestCommand } from "./test";

describe("hardhatTestCommand", () => {
  test("executes test command with --bail option passed through", () => {
    let capturedHardhatOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = hardhatTestCommand();

    cmdToTest.action(async (operands, options, _cmd) => {
      capturedHardhatOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "test", "--bail"]);

    expect(capturedHardhatOptions).toEqual(["--bail"]);
  });

  test("executes test command with a specific test file path passed through", () => {
    let capturedHardhatOptions: string[] = [];
    const program = new Command();
    program.enablePositionalOptions();
    const cmdToTest = hardhatTestCommand();
    cmdToTest.action(async (operands, options, _cmd) => {
      capturedHardhatOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });
    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "test", "test/my-custom-test.test.ts"]);
    expect(capturedHardhatOptions).toEqual(["test/my-custom-test.test.ts"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      args: ["test/specific.ts", "--some-unknown-flag"],
    } as unknown as Command;

    const parsedCmdOptions = {
      // "help": false, // Example if -h was defined but not passed
    };

    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual([
      // If help was defined and false, it might appear here or not based on mapPassthroughOptions logic
      "test/specific.ts",
      "--some-unknown-flag",
    ]);
  });
});
