import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { validateIfRequiredPackagesAreInstalled } from "./validate-required-packages";

const TEST_DIR = join(__dirname, ".test-validate-required-packages");

beforeAll(async () => {
  await mkdir(TEST_DIR, { recursive: true });
  await $`bun init -y`.cwd(TEST_DIR);
  await $`bun add chalk debug`.cwd(TEST_DIR);
});

afterAll(async () => {
  await rm(TEST_DIR, { recursive: true, force: true });
});

describe("hasRequiredPackagesInstalled", () => {
  test("should succeed when required packages are installed", async () => {
    await validateIfRequiredPackagesAreInstalled(["chalk", "debug"], TEST_DIR);
  });

  test("should fail when some required packages are not installed", async () => {
    expect(validateIfRequiredPackagesAreInstalled(["axios", "vue", "debug"], TEST_DIR)).rejects.toThrow(
      "The following required npm packages are not installed: axios, vue.",
    );
  });
});
