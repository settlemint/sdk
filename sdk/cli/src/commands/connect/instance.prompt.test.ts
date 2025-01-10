import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test";
import { exists, rename, rm } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { removeCredentials, storeCredentials } from "@/utils/config";
import { instancePrompt } from "./instance.prompt";

const TEST_INSTANCE = "https://test.settlemint.com";
const SECOND_INSTANCE = "https://second.settlemint.com";
const CONFIG_DIR = join(homedir(), ".config", "settlemint");
const BACKUP_DIR = join(homedir(), ".config", "settlemint-backup");

async function restoreBackup() {
  if (await exists(BACKUP_DIR)) {
    await rm(CONFIG_DIR, { force: true, recursive: true });
    await rename(BACKUP_DIR, CONFIG_DIR);
  }
}

describe("instancePrompt", () => {
  beforeAll(async () => {
    await restoreBackup();
    if (await exists(CONFIG_DIR)) {
      await rename(CONFIG_DIR, BACKUP_DIR);
    }
  });

  afterAll(restoreBackup);

  afterEach(async () => {
    await removeCredentials(TEST_INSTANCE);
    await removeCredentials(SECOND_INSTANCE);
  });

  test("returns console.settlemint.com when no instance is provided and accept is true", async () => {
    const result = await instancePrompt({}, true);
    expect(result).toBe("https://console.settlemint.com");
  });

  test("returns instance from settlemint config when only one instance is available", async () => {
    await storeCredentials("test-token", TEST_INSTANCE);
    const result = await instancePrompt({}, false);
    expect(result).toBe(TEST_INSTANCE);
  });

  test("returns instance from env config when accept is true", async () => {
    await storeCredentials("test-token", TEST_INSTANCE);
    await storeCredentials("test-token", SECOND_INSTANCE);
    const env = { SETTLEMINT_INSTANCE: SECOND_INSTANCE };
    const result = await instancePrompt(env, true);
    expect(result).toBe(SECOND_INSTANCE);
  });
});
