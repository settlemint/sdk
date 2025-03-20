import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { blockchainNetworkBesuCreateCommand } from "./create.js";

describe("besuNetworkCreateCommand", () => {
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
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
      size: "SMALL",
      type: "SHARED",
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
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
      chainId: 12345,
      gasLimit: "10000000",
      secondsPerBlock: 5,
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with application unique name", () => {
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
      "--app",
      "test-app",
      "--size",
      "LARGE",
      "--type",
      "DEDICATED",
    ]);

    expect(commandArgs).toBe("test-network");
    expect(commandOptions).toEqual({
      acceptDefaults: true,
      provider: "gke",
      region: "europe",
      nodeName: "validator-1",
      application: "test-app",
      size: "LARGE",
      type: "DEDICATED",
    });
  });
});
