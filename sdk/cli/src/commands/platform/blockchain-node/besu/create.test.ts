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
      "validator",
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
      nodeType: "validator",
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
      "--blockchain-network-id",
      "12345",
      "--node-type",
      "non-validator",
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
      blockchainNetworkId: "12345",
      nodeType: "non-validator",
      nodeIdentity: "0x1234567890abcdef",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with application id", () => {
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
      "--blockchain-network-id",
      "12345",
      "--node-type",
      "non-validator",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application-id",
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
      blockchainNetworkId: "12345",
      nodeType: "non-validator",
      applicationId: "123456789",
      size: "LARGE",
      type: "DEDICATED",
    });
  });
});
