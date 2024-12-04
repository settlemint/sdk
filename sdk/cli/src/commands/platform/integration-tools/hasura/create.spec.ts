import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { hasuraIntegrationCreateCommand } from "./create";

describe("hasuraIntegrationCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      hasuraIntegrationCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "hasura", "test-hasura", "--provider", "gke", "--region", "europe"]);

    expect(commandArgs).toBe("test-hasura");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with application ID", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      hasuraIntegrationCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "hasura",
      "test-hasura",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application-id",
      "123456789",
    ]);

    expect(commandArgs).toBe("test-hasura");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      applicationId: "123456789",
      size: "SMALL",
      type: "SHARED",
    });
  });
});
