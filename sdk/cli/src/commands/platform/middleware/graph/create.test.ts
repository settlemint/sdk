import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { graphMiddlewareCreateCommand } from "./create.js";

describe("graphCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      graphMiddlewareCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "graph", "test-graph", "--provider", "gke", "--region", "europe"]);

    expect(commandArgs).toBe("test-graph");
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
      graphMiddlewareCreateCommand()
        .exitOverride()
        .action((args, options) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "graph",
      "test-graph",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--blockchain-node",
      "node-123",
      "--application",
      "my-app",
    ]);

    expect(commandArgs).toBe("test-graph");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      blockchainNode: "node-123",
      application: "my-app",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
