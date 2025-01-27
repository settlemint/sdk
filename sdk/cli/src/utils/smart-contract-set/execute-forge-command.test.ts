import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { executeCommand } from "@settlemint/sdk-utils/terminal";
import { executeForgeCommand } from "./execute-forge-command";

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

describe("executeForgeCommand", () => {
  test("executes forge command with provided arguments", async () => {
    moduleMocker.clear("which");
    await moduleMocker.mock("which", () => {
      return {
        default: mock(() => Promise.resolve()),
      };
    });
    await executeForgeCommand(["build"]);

    expect(executeCommand).toHaveBeenCalledTimes(1);
    expect(executeCommand).toHaveBeenCalledWith("forge", ["build"]);
  });

  test("throws error if forge is not installed", async () => {
    moduleMocker.clear("which");
    await moduleMocker.mock("which", () => {
      return {
        default: mock(() => Promise.reject(new Error("Forge is not installed"))),
      };
    });
    expect(executeForgeCommand([])).rejects.toThrow("Foundry is not installed");
  });
});
