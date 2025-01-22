import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { sdkCliCommand } from "@/commands";
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { table } from "@settlemint/sdk-utils/terminal";

const mockTable = mock(table);

// Mock terminal module
mock.module("@settlemint/sdk-utils/terminal", () => ({
  table: mockTable,
}));

const mockJsonOutput = mock(jsonOutput);

mock.module("@/utils/output/json-output", () => ({
  jsonOutput: mockJsonOutput,
}));

const mockYamlOutput = mock(yamlOutput);

mock.module("@/utils/output/yaml-output", () => ({
  yamlOutput: mockYamlOutput,
}));

afterAll(() => {
  mock.restore();
});

describe("platform config command", () => {
  beforeEach(() => {
    mockTable.mockClear();
    mockJsonOutput.mockClear();
    mockYamlOutput.mockClear();
  });

  test("should output platform configuration", async () => {
    await sdkCliCommand(["bun", "settlemint", "platform", "config", "-i", "https://console.settlemint.com"]);
    expect(mockTable).toHaveBeenCalledTimes(3);
    expect(mockJsonOutput).not.toHaveBeenCalled();
    expect(mockYamlOutput).not.toHaveBeenCalled();
  });

  test("should output platform configuration in json format", async () => {
    await sdkCliCommand([
      "bun",
      "settlemint",
      "platform",
      "config",
      "-i",
      "https://console.settlemint.com",
      "-o",
      "json",
    ]);
    expect(mockTable).not.toHaveBeenCalled();
    expect(mockJsonOutput).toHaveBeenCalled();
    expect(mockYamlOutput).not.toHaveBeenCalled();
  });

  test("should output platform configuration in yaml format", async () => {
    await sdkCliCommand([
      "bun",
      "settlemint",
      "platform",
      "config",
      "-i",
      "https://console.settlemint.com",
      "-o",
      "yaml",
    ]);
    expect(mockTable).not.toHaveBeenCalled();
    expect(mockJsonOutput).not.toHaveBeenCalled();
    expect(mockYamlOutput).toHaveBeenCalled();
  });
});
