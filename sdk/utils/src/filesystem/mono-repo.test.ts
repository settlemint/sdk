import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { $ } from "bun";
import { findMonoRepoRoot } from "./mono-repo.js";
import { projectRoot } from "./project-root.js";

const TEST_PROJECT_DIR = join(process.cwd(), ".temp-mono-repo-test");

beforeAll(async () => {
  await mkdir(TEST_PROJECT_DIR);
});

afterAll(async () => {
  // await rm(TEST_PROJECT_DIR, { recursive: true, force: true });
});

describe("mono-repo utilities", () => {
  test("findMonoRepoRoot returns root", async () => {
    const currentFileRoot = await findMonoRepoRoot(__dirname);
    expect(currentFileRoot).toBe(resolve(__dirname, "../../../../"));

    const packageRoot = await projectRoot();
    const currentPackageRoot = await findMonoRepoRoot(packageRoot);
    expect(currentPackageRoot).toBe(resolve(__dirname, "../../../../"));
  });

  test("findMonoRepoRoot returns null if no monorepo is found", async () => {
    await $`bun init -y`.cwd(TEST_PROJECT_DIR);
    await $`bun install -y`.cwd(TEST_PROJECT_DIR);
    const result = await findMonoRepoRoot(TEST_PROJECT_DIR);
    expect(result).toBeNull();
  });
});
