import { afterAll, describe, expect, test } from "bun:test";
import { rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { runCommand } from "./utils/runCommand";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";

let projectDir: string;

afterAll(async () => {
  if (!projectDir) {
    return;
  }
  try {
    await rmdir(projectDir, { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
});

describe("Setup a project using the SDK", () => {
  test("Create a starter kit project", async () => {
    const { cwd } = await runCommand(`create --project-name ${PROJECT_NAME} --template ${TEMPLATE_NAME}`);
    projectDir = join(cwd, PROJECT_NAME);
    expect((await stat(join(cwd, PROJECT_NAME))).isDirectory()).toBeTruthy();
  });

  test("Create necessary resources on the platform", async () => {
    await $`bun packages/cli/src/cli.ts platform create workspace`;
  });

  test.skip("Connect starter kit", async () => {
    await $`bun packages/cli/src/cli.ts connect`;
  });

  test.skip("Codegen starter kit", async () => {
    await $`bun packages/cli/src/cli.ts codegen`;
  });
});
