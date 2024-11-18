import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkBesuCreateCommand } from "./create.js";

describe("besuCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNetworkBesuCreateCommand()
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
      "test-network",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--node-name",
      "validator-1",
    ]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe("test-network");
    expect(commandOptions).toEqual({
      accept: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
    });
  });

  test("executes command with custom parameters", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNetworkBesuCreateCommand()
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
      "test-network",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--node-name",
      "validator-1",
      "--chain-id",
      "12345",
      "--gas-limit",
      "10000000",
      "--seconds-per-block",
      "5",
    ]);

    expect(commandArgs).toBe("test-network");
    expect(commandOptions).toEqual({
      accept: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
      chainId: 12345,
      gasLimit: "10000000",
      secondsPerBlock: 5,
    });
  });

  test("executes command with application id", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockchainNetworkBesuCreateCommand()
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
      "test-network",
      "--accept-defaults",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--node-name",
      "validator-1",
      "--application-id",
      "123456789",
    ]);

    expect(commandArgs).toBe("test-network");
    expect(commandOptions).toEqual({
      accept: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
      applicationId: "123456789",
    });
  });
});
