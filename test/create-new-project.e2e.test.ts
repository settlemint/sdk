import { afterAll, describe, expect, test } from "bun:test";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";
import { PROJECT_NAME, TEMPLATE_NAME } from "./constants/config.e2e";
import { runCommand } from "./utils/runCommand";
import { tearDown } from "./utils/teardown";

afterAll(async () => {
  await tearDown();
});

describe("Setup a project using the SDK", () => {
  test("Create a starter kit project", async () => {
    const { cwd } = await runCommand(`create --project-name ${PROJECT_NAME} --template ${TEMPLATE_NAME}`);
    expect((await stat(join(cwd, PROJECT_NAME))).isDirectory()).toBeTruthy();
  });

  test.skip("Create necessary resources on the platform", async () => {
    await $`bun packages/cli/src/cli.ts platform create workspace`;
  });

  test.skip("Connect starter kit", async () => {
    await $`bun packages/cli/src/cli.ts connect`;
  });

  test.skip("Codegen starter kit", async () => {
    await $`bun packages/cli/src/cli.ts codegen`;
  });
});
