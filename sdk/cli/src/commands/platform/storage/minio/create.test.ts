import { describe, expect, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import { minioStorageCreateCommand } from "./create.js";

describe("minioStorageCreateCommand", () => {
  test("executes command with required arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = new Command();
    program.addCommand(
      minioStorageCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse(["node", "test", "minio", "test-storage", "--provider", "gke", "--region", "europe"]);

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
      minioStorageCreateCommand()
        .exitOverride()
        .action((args: string, options: Record<string, unknown>) => {
          commandArgs = args;
          commandOptions = options;
        }),
    );
    program.parse([
      "node",
      "test",
      "minio",
      "test-storage",
      "--provider",
      "gke",
      "--region",
      "europe",
      "--application-id",
      "123456789",
      "--size",
      "MEDIUM",
      "--type",
      "DEDICATED",
    ]);

    expect(commandArgs).toBe("test-storage");
    expect(commandOptions).toEqual({
      provider: "gke",
      region: "europe",
      applicationId: "123456789",
      size: "MEDIUM",
      type: "DEDICATED",
    });
  });
});
