import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { applicationDeleteCommand } from "./delete.js";

describe("applicationDeleteCommand", () => {
  test("executes command with valid arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      applicationDeleteCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "application", "default"]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("default");
    expect(commandOptions).toEqual({});
  });
});
