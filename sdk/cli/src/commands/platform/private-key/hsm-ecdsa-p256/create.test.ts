import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { privateKeyHsmCreateCommand } from "./create";

describe("privateKeyHdCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      privateKeyHsmCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "hsm-ecdsa-p256", "test-key", "--accept-defaults"]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-key");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
    });
  });

  test("executes command with args", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      privateKeyHsmCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "hsm-ecdsa-p256",
      "test-key",
      "--accept-defaults",
      "--application",
      "my-app",
      "--blockchain-node",
      "node-1",
    ]);

    expect(commandArgs).toBe("test-key");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      application: "my-app",
      blockchainNode: "node-1",
    });
  });
});
