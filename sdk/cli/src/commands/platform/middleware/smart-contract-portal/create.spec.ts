import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { smartContractPortalMiddlewareCreateCommand } from "./create.js";

describe("smartContractPortalMiddlewareCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      smartContractPortalMiddlewareCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "smart-contract-portal", "test-portal", "--provider", "gke", "--region", "europe"]);

    expect(commandArgs).toBe("test-portal");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with parameters", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      smartContractPortalMiddlewareCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "smart-contract-portal",
      "test-portal",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--blockchain-node",
      "node-123",
      "--application",
      "my-app",
      "--load-balancer",
      "lb-123",
      "--abis",
      "./supply-chain.json",
      "./erc20.json",
      "--include-predeployed-abis",
      "StableCoin",
      "Bond",
    ]);

    expect(commandArgs).toBe("test-portal");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      blockchainNode: "node-123",
      application: "my-app",
      loadBalancer: "lb-123",
      abis: ["./supply-chain.json", "./erc20.json"],
      includePredeployedAbis: ["StableCoin", "Bond"],
      size: "SMALL",
      type: "SHARED",
    });
  });
});
