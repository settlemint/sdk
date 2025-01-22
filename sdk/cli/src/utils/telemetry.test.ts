import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { sdkCliCommand } from "../commands";

const mockTelemetry = mock((data: unknown) => {
  console.log("telemetry", data);
  return Promise.resolve();
});

// Mock telemetry module
mock.module("@/utils/telemetry", () => ({
  telemetry: mockTelemetry,
}));

const originalProcessExit = process.exit;
const exitMock = mock((exitCode: number) => {
  console.log("exit", exitCode);
  return Promise.resolve() as never;
});

beforeAll(() => {
  process.exit = exitMock;
});

afterAll(() => {
  process.exit = originalProcessExit;
});

describe("CLI Telemetry", () => {
  test("successful command execution logs telemetry", async () => {
    await sdkCliCommand(["bun", "settlemint", "platform", "config", "-i", "https://console.settlemint.com"]);

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
