import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { executeFoundryCommand } from "@/utils/smart-contract-set/execute-foundry-command";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { executeCommand } from "@settlemint/sdk-utils/terminal";

const moduleMocker = new ModuleMocker();

beforeAll(async () => {
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    executeCommand: mock((command: string) => console.log("executed command", command)),
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("executeFoundryCommand", () => {
  test("executes foundry forge command with provided arguments", async () => {
    moduleMocker.clear("which");
    await moduleMocker.mock("which", () => {
      return {
        default: mock(() => Promise.resolve()),
      };
    });
    await executeFoundryCommand("forge", ["build"]);

    expect(executeCommand).toHaveBeenCalledTimes(1);
    expect(executeCommand).toHaveBeenCalledWith("forge", ["build"]);
  });

  test("throws error if foundry forge command is not installed", async () => {
    moduleMocker.clear("which");
    await moduleMocker.mock("which", () => {
      return {
        default: mock(() => Promise.reject(new Error("Forge is not installed"))),
      };
    });
    expect(executeFoundryCommand("forge", [])).rejects.toThrow("Foundry is not installed");
  });
});
