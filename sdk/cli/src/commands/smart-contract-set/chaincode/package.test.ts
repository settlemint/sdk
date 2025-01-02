import { describe, expect, test } from "bun:test";
import { packageChaincodeCommand } from "./package.js";

describe("packageChaincodeCommand", () => {
  test("executes command with valid arguments", () => {
    let commandOptions: Record<string, unknown> = {};
    let commandArgs = "";
    const program = packageChaincodeCommand()
      .exitOverride()
      .action((args, options) => {
        commandArgs = args;
        commandOptions = options;
      });

    const chaincodeName = "test-chaincode";
    const version = "1.0.0";
    const path = "./dist";
    const lang = "node";

    program.parse(["node", "package", chaincodeName, "--version", version, "--path", path, "--lang", lang]);

    // Validate command was executed with correct arguments
    expect(commandArgs).toBe(chaincodeName);
    expect(commandOptions).toEqual({
      version,
      path,
      lang,
    });
  });
});
