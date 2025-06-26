import { describe, expect, test } from "bun:test";
import { mapPassthroughOptions } from "@/utils/commands/passthrough-options";
import { Command } from "@commander-js/extra-typings";
import { hardhatNetworkCommand } from "./network";

describe("hardhatNetworkCommand", () => {
  test("executes network command with --port 8555 option passed through", () => {
    let capturedHardhatOptions: string[] = [];

    const program = new Command();
    program.enablePositionalOptions();

    const cmdToTest = hardhatNetworkCommand();

    cmdToTest.action(async (operands, options, _cmd) => {
      capturedHardhatOptions = mapPassthroughOptions(options, { args: operands } as Command);
    });

    program.addCommand(cmdToTest);
    program.parse(["node", "cli.js", "network", "--port", "8555"]);

    expect(capturedHardhatOptions).toEqual(["--port", "8555"]);
  });

  test("mapPassthroughOptions correctly formats defined options and passthrough args", () => {
    const mockCmdOperands = {
      args: ["--hostname", "0.0.0.0"],
    } as unknown as Command;

    const parsedCmdOptions = {
      "some-defined-option": "value",
    };

    const commandOptions = mapPassthroughOptions(parsedCmdOptions, mockCmdOperands);

    expect(commandOptions).toEqual(["--some-defined-option=value", "--hostname", "0.0.0.0"]);
  });
});
