import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { sdkCliCommand } from "../commands";

const mockTelemetry = mock((data: unknown) => {
  return Promise.resolve();
});

// Mock telemetry module
mock.module("@/utils/telemetry", () => ({
  telemetry: mockTelemetry,
}));

const originalProcessExit = process.exit;
const exitMock = mock((exitCode: number) => {
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
    await sdkCliCommand(["bun", "settlemint", "login", "-a"]);

    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "login",
      status: "success",
    });
  });

  test("unknown command execution logs error telemetry", async () => {
    try {
      await sdkCliCommand(["bun", "settlemint", "invalid"]);
    } catch (error) {}
    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "invalid",
      status: "error",
      message: "error: unknown command 'invalid'",
    });
  });

  test("failed command execution logs error telemetry", async () => {
    try {
      await sdkCliCommand(["bun", "settlemint", "platform", "create", "application", "-w", "invalid", "-a"]);
    } catch (error) {}
    expect(mockTelemetry).toHaveBeenCalledWith({
      command: "platform create application",
      status: "error",
      message: "Could not find entity by unique name: invalid",
    });
  });
});
