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
    program.parse([
      "node",
      "test",
      "application",
      "test-app",
      "--accept-defaults",
      "--workspace-id",
      "test-workspace-id",
    ]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-app");
    expect(commandOptions).toEqual({
      accept: true,
      workspaceId: "test-workspace-id",
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
    program.parse(["node", "test", "application", "test-app", "--default"]);

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
    program.parse(["node", "test", "application", "test-app", "--prod", "--workspace-id", "test-workspace-id"]);

    expect(commandArgs).toBe("test-app");
    expect(commandOptions).toEqual({
      prod: true,
      workspaceId: "test-workspace-id",
    });
  });
});
