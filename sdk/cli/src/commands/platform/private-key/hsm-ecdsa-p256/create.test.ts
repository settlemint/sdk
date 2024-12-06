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
    program.parse([
      "node",
      "test",
      "hsm-ecdsa-p256",
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
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application-id",
      "123456789",
      "--blockchain-node-id",
      "node-1",
    ]);

    expect(commandArgs).toBe("test-key");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      applicationId: "123456789",
      blockchainNodeId: "node-1",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
