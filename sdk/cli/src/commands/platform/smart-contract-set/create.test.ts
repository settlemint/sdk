import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { smartContractSetCreateCommand } from "./create.js";

describe("smartContractSetCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      smartContractSetCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "smart-contract-set",
      "test-set",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--use-case",
      "solidity-empty",
    ]);

    // Validate command was executed with correct argumentsa
    expect(commandArgs).toBe("test-set");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      useCase: "solidity-empty",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with size parameter", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      smartContractSetCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "smart-contract-set",
      "test-set",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--blockchain-node-id",
      "node-123",
      "--use-case",
      "solidity-empty",
      "--size",
      "MEDIUM",
    ]);

    expect(commandArgs).toBe("test-set");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      blockchainNodeId: "node-123",
      useCase: "solidity-empty",
      size: "MEDIUM",
      type: "SHARED",
    });
  });

  test("executes command with application id", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      smartContractSetCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "smart-contract-set",
      "test-set",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--blockchain-node-id",
      "node-123",
      "--use-case",
      "solidity-starterkit",
      "--application-id",
      "123456789",
    ]);

    expect(commandArgs).toBe("test-set");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      blockchainNodeId: "node-123",
      useCase: "solidity-starterkit",
      applicationId: "123456789",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
