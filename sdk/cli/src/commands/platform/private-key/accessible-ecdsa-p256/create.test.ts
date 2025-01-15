import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { privateKeyAccessibleCreateCommand } from "./create";

describe("privateKeyHdCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      privateKeyAccessibleCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "accessible-ecdsa-p256",
      "test-key",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
    ]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-key");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with args", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      privateKeyAccessibleCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "accessible-ecdsa-p256",
      "test-key",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application",
      "my-app",
      "--blockchain-node",
      "node-1",
    ]);

    expect(commandArgs).toBe("test-key");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      application: "my-app",
      blockchainNode: "node-1",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
