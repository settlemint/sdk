import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { sdkCliCommand } from "../commands";

const moduleMocker = new ModuleMocker();

const mockTelemetry = mock((data: unknown) => {
  console.log("telemetry", data);
  return Promise.resolve();
});

const originalProcessExit = process.exit;
const exitMock = mock((exitCode: number) => {
  console.log("exit", exitCode);
  return Promise.resolve() as never;
});

beforeAll(async () => {
  await moduleMocker.mock("@/utils/telemetry", () => ({
    telemetry: mockTelemetry,
  }));
  process.exit = exitMock;
});

afterAll(() => {
  process.exit = originalProcessExit;
  mock.restore();
  moduleMocker.clear();
});

describe("CLI Telemetry", () => {
  test("successful command execution logs telemetry", async () => {
    await sdkCliCommand(["bun", "settlemint", "platform", "config", "-i", "https://console-release.settlemint.com"]);

    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "platform config",
      status: "success",
    });
  });

  test("unknown command execution logs error telemetry", async () => {
    try {
      await sdkCliCommand(["bun", "settlemint", "invalid"]);
    } catch {}
    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "invalid",
      status: "error",
      message: "error: unknown command 'invalid'",
    });
  });

  test("failed command execution logs error telemetry", async () => {
    try {
      await sdkCliCommand(["bun", "settlemint", "connect", "-i", "https://onprem.settlemint.com"]);
    } catch {}
    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "connect",
      status: "error",
      message: "No configuration found for instance 'https://onprem.settlemint.com'",
    });
  });
});
