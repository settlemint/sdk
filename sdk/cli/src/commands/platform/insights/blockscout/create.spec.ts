import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { blockscoutInsightsCreateCommand } from "./create";

describe("blockscoutInsightsCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      blockscoutInsightsCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "blockscout", "test-blockscout", "--provider", "gke", "--region", "europe"]);

    expect(commandArgs).toBe("test-blockscout");
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
      blockscoutInsightsCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "blockscout",
      "test-blockscout",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application",
      "app-123",
      "--load-balancer",
      "lb-123",
    ]);

    expect(commandArgs).toBe("test-blockscout");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      application: "app-123",
      loadBalancer: "lb-123",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
