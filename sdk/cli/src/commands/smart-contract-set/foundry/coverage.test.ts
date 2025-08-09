import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { foundryCoverageCommand } from "./coverage"; // Import the actual command

describe("foundryCoverageCommand", () => {
  test("executes coverage command with -vvv option passed through", () => {
    let capturedForgeOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = foundryCoverageCommand();

    // Hijack the action of the command to inspect inputs to mapPassthroughOptions
    cmdToTest.action(async (operands, options, _cmd) => {
      capturedForgeOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "coverage", "-vvv"]);

    expect(capturedForgeOptions).toEqual(["-vvv"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      args: ["rawArg1", "-vvv"],
    } as unknown as Command;

    const parsedCmdOptions = {
      report: "lcov",
      "boolean-flag": true,
    } as Record<string, string | boolean>;

    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual(["--report=lcov", "--boolean-flag", "rawArg1", "-vvv"]);
  });
});
