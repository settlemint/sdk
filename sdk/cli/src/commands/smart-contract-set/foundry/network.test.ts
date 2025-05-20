import { describe, expect, test } from "bun:test";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { foundryNetworkCommand } from "./network";

describe("foundryNetworkCommand", () => {
  test("executes network command with --port 3000 option passed through", () => {
    let capturedAnvilOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = foundryNetworkCommand();

    cmdToTest.action(async (operands, options, cmd) => {
      capturedAnvilOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    // Note: "--port" and "3000" are separate arguments here for passthrough
    program.parse(["node", "cli.js", "network", "--port", "3000"]);

    expect(capturedAnvilOptions).toEqual(["--port", "3000"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      args: ["--host", "0.0.0.0", "rawArg1"],
    } as unknown as Command;

    const parsedCmdOptions = {
      "some-defined-option": "value",
      "boolean-flag": true,
    };

    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual(["--some-defined-option=value", "--boolean-flag", "--host", "0.0.0.0", "rawArg1"]);
  });
});
