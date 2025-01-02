import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { applicationCreateCommand } from "./create.js";

describe("applicationCreateCommand", () => {
  test("executes command with valid arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      applicationCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "application", "test-app", "--accept-defaults", "--workspace", "test-workspace"]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-app");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      workspace: "test-workspace",
    });
  });

  test("executes command with default flag", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      applicationCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "application", "test-app", "-d"]);

    expect(commandArgs).toBe("test-app");
    expect(commandOptions).toEqual({
      default: true,
    });
  });

  test("executes command with prod flag", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      applicationCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "application", "test-app", "--prod", "--workspace", "test-workspace"]);

    expect(commandArgs).toBe("test-app");
    expect(commandOptions).toEqual({
      prod: true,
      workspace: "test-workspace",
    });
  });
});
