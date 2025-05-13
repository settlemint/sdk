import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { sdkCliCommand } from "@/commands";
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { table } from "@settlemint/sdk-utils/terminal";

const moduleMocker = new ModuleMocker();

const mockTable = mock(table);
const mockJsonOutput = mock(jsonOutput);
const mockYamlOutput = mock(yamlOutput);

beforeAll(async () => {
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    table: mockTable,
  }));
  await moduleMocker.mock("@/utils/output/yaml-output", () => ({
    yamlOutput: mockYamlOutput,
  }));
  await moduleMocker.mock("@/utils/output/json-output", () => ({
    jsonOutput: mockJsonOutput,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("platform config command", () => {
  beforeEach(() => {
    mockTable.mockClear();
    mockJsonOutput.mockClear();
    mockYamlOutput.mockClear();
  });

  test("should output platform configuration", async () => {
    await sdkCliCommand(["bun", "settlemint", "platform", "config", "-i", "https://console-release.settlemint.com"]);
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
      "https://console-release.settlemint.com",
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
      "https://console-release.settlemint.com",
      "-o",
      "yaml",
    ]);
    expect(mockTable).not.toHaveBeenCalled();
    expect(mockJsonOutput).not.toHaveBeenCalled();
    expect(mockYamlOutput).toHaveBeenCalled();
  });
});
