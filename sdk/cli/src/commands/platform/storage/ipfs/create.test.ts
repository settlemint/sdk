import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { ipfsStorageCreateCommand } from "./create.js";

describe("ipfsStorageCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      ipfsStorageCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "ipfs", "test-storage", "--provider", "gke", "--region", "europe"]);

    expect(commandArgs).toBe("test-storage");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      size: "SMALL",
      type: "SHARED",
    });
  });

  test("executes command with optional parameters", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      ipfsStorageCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "ipfs",
      "test-storage",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application",
      "my-app",
      "--size",
      "MEDIUM",
      "--type",
      "DEDICATED",
    ]);

    expect(commandArgs).toBe("test-storage");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      application: "my-app",
      size: "MEDIUM",
      type: "DEDICATED",
    });
  });
});
