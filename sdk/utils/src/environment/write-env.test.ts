import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { exists } from "@/filesystem.js";
import { writeEnv } from "./write-env.js";

const TEST_DIR = join(__dirname, ".test-env");
const ENV_FILE = join(TEST_DIR, ".env");
const ENV_PROD_FILE = join(TEST_DIR, ".env.production");
const ENV_LOCAL_FILE = join(TEST_DIR, ".env.local");

// Needed so it loads the correct environment variables
// @ts-ignore
process.env.NODE_ENV = "development";

describe("writeEnv", () => {
  beforeAll(async () => {
    await mkdir(TEST_DIR, { recursive: true });
    await $`bun init -y`.cwd(TEST_DIR);
    await $`bun install -y`.cwd(TEST_DIR);
  });

  afterAll(async () => {
    await rm(TEST_DIR, { recursive: true, force: true });
  });

  it("should write development environment variables", async () => {
    const env = {
      SETTLEMINT_INSTANCE: "https://dev.example.com",
      SETTLEMINT_WORKSPACE: "test-workspace",
    };

    await writeEnv({
      prod: false,
      env,
      secrets: false,
      cwd: TEST_DIR,
    });

    expect(await exists(ENV_FILE)).toBe(true);
    const content = await Bun.file(ENV_FILE).text();
    expect(content).toContain("SETTLEMINT_INSTANCE=https://dev.example.com");
    expect(content).toContain("SETTLEMINT_WORKSPACE=test-workspace");
  });

  it("should write production environment variables", async () => {
    const env = {
      SETTLEMINT_INSTANCE: "https://prod.example.com",
      SETTLEMINT_WORKSPACE: "prod-workspace",
    };

    await writeEnv({
      prod: true,
      env,
      secrets: false,
      cwd: TEST_DIR,
    });

    expect(await exists(ENV_PROD_FILE)).toBe(true);
    const content = await Bun.file(ENV_PROD_FILE).text();
    expect(content).toContain("SETTLEMINT_INSTANCE=https://prod.example.com");
    expect(content).toContain("SETTLEMINT_WORKSPACE=prod-workspace");
  });

  it("should write secret environment variables to local files", async () => {
    const env = {
      SETTLEMINT_ACCESS_TOKEN: "secret-token",
    };

    await writeEnv({
      prod: false,
      env,
      secrets: true,
      cwd: TEST_DIR,
    });

    expect(await exists(ENV_LOCAL_FILE)).toBe(true);
    const content = await Bun.file(ENV_LOCAL_FILE).text();
    expect(content).toContain("SETTLEMINT_ACCESS_TOKEN=secret-token");
  });

  it("should merge with existing environment variables", async () => {
    const existingEnv = "EXISTING_VAR=existing\nSETTLEMINT_INSTANCE=https://old.example.com";
    await writeFile(ENV_FILE, existingEnv);

    const newEnv = {
      SETTLEMINT_INSTANCE: "https://new.example.com",
      SETTLEMINT_WORKSPACE: "test",
    };

    await writeEnv({
      prod: false,
      env: newEnv,
      secrets: false,
      cwd: TEST_DIR,
    });

    const content = await Bun.file(ENV_FILE).text();
    expect(content).toContain("EXISTING_VAR=existing");
    expect(content).toContain("SETTLEMINT_INSTANCE=https://new.example.com");
    expect(content).toContain("SETTLEMINT_WORKSPACE=test");
  });

  it("should handle arrays and objects", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://graph1.example.com", "https://graph2.example.com"],
    };

    await writeEnv({
      prod: false,
      env,
      secrets: false,
      cwd: TEST_DIR,
    });

    const content = await Bun.file(ENV_FILE).text();
    expect(content).toContain(
      'SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS=["https://graph1.example.com","https://graph2.example.com"]',
    );
  });

  it("should remove sdk environment variables that are not in the new env", async () => {
    const initialEnv = {
      SETTLEMINT_CUSTOM_DEPLOYMENT: "test-custom-deployment",
      SETTLEMINT_INSTANCE: "https://dev.example.com",
      SETTLEMINT_WORKSPACE: "test-workspace",
      MY_VAR: "my-value",
    };
    await writeEnv({
      prod: false,
      env: initialEnv,
      secrets: false,
      cwd: TEST_DIR,
    });
    const initialContent = await Bun.file(ENV_FILE).text();
    expect(initialContent).toContain("SETTLEMINT_INSTANCE=https://dev.example.com");
    expect(initialContent).toContain("SETTLEMINT_CUSTOM_DEPLOYMENT=test-custom-deployment");
    expect(initialContent).toContain("SETTLEMINT_WORKSPACE=test-workspace");
    expect(initialContent).toContain("MY_VAR=my-value");
    const { SETTLEMINT_CUSTOM_DEPLOYMENT: _SETTLEMINT_CUSTOM_DEPLOYMENT, ...existingEnv } = initialEnv;

    await writeEnv({
      prod: false,
      env: existingEnv,
      secrets: false,
      cwd: TEST_DIR,
    });

    const updatedContent = await Bun.file(ENV_FILE).text();
    expect(updatedContent).toContain("SETTLEMINT_WORKSPACE=test-workspace");
    expect(updatedContent).toContain("SETTLEMINT_INSTANCE=https://dev.example.com");
    expect(updatedContent).not.toContain("SETTLEMINT_CUSTOM_DEPLOYMENT=test-custom-deployment");
    expect(updatedContent).toContain("MY_VAR=my-value");
  });
});
