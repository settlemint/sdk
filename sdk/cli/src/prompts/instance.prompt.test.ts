import { afterAll, afterEach, beforeAll, describe, expect, mock, test } from "bun:test";
import { exists, rename, rm } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { removeCredentials, storeCredentials } from "@/utils/config";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { LOCAL_INSTANCE, STANDALONE_INSTANCE } from "@settlemint/sdk-utils/validation";
import { instancePrompt } from "./instance.prompt";

const TEST_INSTANCE = "https://test.settlemint.com";
const SECOND_INSTANCE = "https://second.settlemint.com";
const CONFIG_DIR = join(homedir(), ".config", "settlemint");
const BACKUP_DIR = join(homedir(), ".config", "settlemint-backup");

const moduleMocker = new ModuleMocker();

const mockSelect = mock((args: { choices: { value: string }[] }) => {
  return Promise.resolve(args.choices[0]?.value ?? "");
});

async function restoreBackup() {
  if (await exists(BACKUP_DIR)) {
    await rm(CONFIG_DIR, { force: true, recursive: true });
    await rename(BACKUP_DIR, CONFIG_DIR);
  }
}

beforeAll(async () => {
  await moduleMocker.mock("@inquirer/select", () => ({
    default: mockSelect,
  }));
  await restoreBackup();
  if (await exists(CONFIG_DIR)) {
    await rename(CONFIG_DIR, BACKUP_DIR);
  }
});

afterAll(async () => {
  mock.restore();
  moduleMocker.clear();
  await restoreBackup();
});

describe("instancePrompt", () => {
  afterEach(async () => {
    await removeCredentials(TEST_INSTANCE);
    await removeCredentials(SECOND_INSTANCE);
    mockSelect.mockClear();
  });

  test("returns console.settlemint.com when no instance is provided and running in CI", async () => {
    const result = await instancePrompt({
      env: {},
      accept: true,
      isCi: true,
    });
    expect(result).toBe("https://console.settlemint.com");
  });

  test("returns instance from env config when accept is true", async () => {
    const env = { SETTLEMINT_INSTANCE: SECOND_INSTANCE };
    const result = await instancePrompt({
      env,
      accept: true,
    });
    expect(result).toBe(SECOND_INSTANCE);
  });

  test("shows prompt with when accept is false", async () => {
    await storeCredentials("test-token", SECOND_INSTANCE);
    const result = await instancePrompt({
      env: { SETTLEMINT_INSTANCE: SECOND_INSTANCE },
      accept: false,
      isCi: false,
    });
    expect(mockSelect).toHaveBeenCalledWith({
      message: "What instance do you want to connect to?",
      choices: [
        {
          name: SECOND_INSTANCE,
          value: SECOND_INSTANCE,
        },
        {
          name: "Standalone (services run independently of SettleMint platform)",
          value: STANDALONE_INSTANCE,
        },
        {
          name: "Local (for local development mode)",
          value: LOCAL_INSTANCE,
        },
      ],
      default: SECOND_INSTANCE,
    });
    expect(result).toBe(SECOND_INSTANCE);
  });

  test("shows prompt with standalone instance only when accept is false and no instance is provided", async () => {
    const result = await instancePrompt({
      env: {},
      accept: false,
      isCi: false,
    });
    expect(mockSelect).toHaveBeenCalledWith({
      message: "What instance do you want to connect to?",
      choices: expect.arrayContaining([
        {
          name: "Standalone (services run independently of SettleMint platform)",
          value: STANDALONE_INSTANCE,
        },
      ]),
      default: STANDALONE_INSTANCE,
    });
    expect(result).toBe(STANDALONE_INSTANCE);
  });
});
