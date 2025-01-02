import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { blockchainNodeBesuCreateCommand } from "./create.js";

describe("besuNodeCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNodeBesuCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "besu",
      "test-node",
      "--node-type",
      "VALIDATOR",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
    ]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-node");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      nodeType: "VALIDATOR",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with custom parameters", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNodeBesuCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "besu",
      "test-node",
      "--blockchain-network",
      "12345",
      "--node-type",
      "NON_VALIDATOR",
      "--node-identity",
      "0x1234567890abcdef",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
    ]);

    expect(commandArgs).toBe("test-node");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      blockchainNetwork: "12345",
      nodeType: "NON_VALIDATOR",
      nodeIdentity: "0x1234567890abcdef",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with application", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNodeBesuCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "besu",
      "test-node",
      "--blockchain-network",
      "12345",
      "--node-type",
      "NON_VALIDATOR",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application",
      "123456789",
      "--size",
      "LARGE",
      "--type",
      "DEDICATED",
    ]);

    expect(commandArgs).toBe("test-node");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      blockchainNetwork: "12345",
      nodeType: "NON_VALIDATOR",
      application: "123456789",
      size: "LARGE",
      type: "DEDICATED",
    });
  });
});
