import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { exists, rename, rm } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { storeCredentials } from "@/utils/config";
import { instancePrompt } from "./instance.prompt";

const TEST_INSTANCE = "https://test.settlemint.com";
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
    await storeCredentials("test-token", TEST_INSTANCE);
  });

  afterAll(restoreBackup);

  test("returns instance from settlemint config when only one instance is available", async () => {
    const result = await instancePrompt({}, false);
    expect(result).toBe(TEST_INSTANCE);
  });

  test("returns instance from env config when accept is true", async () => {
    const otherInstance = "https://other.settlemint.com";
    await storeCredentials("test-token", otherInstance);
    const env = { SETTLEMINT_INSTANCE: otherInstance };
    const result = await instancePrompt(env, true);
    expect(result).toBe(otherInstance);
  });
});
