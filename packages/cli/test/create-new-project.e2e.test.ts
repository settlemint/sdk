import { afterAll, describe, expect, test } from "bun:test";
import { rmdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { $ } from "bun";
import { runCommand } from "./utils/runCommand";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";
const WORKSPACE_NAME = "Starter Kit Demo Workspace";

let projectDir: string;

afterAll(async () => {
  if (!projectDir) {
    return;
  }
  try {
    await rmdir(projectDir, { recursive: true });
    await rmdir(resolve(projectDir, "../", "unknown"), { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
});

describe("Setup a project using the SDK", () => {
  test("Create a starter kit project", async () => {
    const { cwd, output } = await runCommand(["create", "--project-name", PROJECT_NAME, "--template", TEMPLATE_NAME]);
    projectDir = join(cwd, PROJECT_NAME);
    expect((await stat(join(cwd, PROJECT_NAME))).isDirectory()).toBeTruthy();
    expect(output).toInclude("Your project is ready to go!");
  });

  test("Create necessary resources on the platform", async () => {
    const { output: workspaceOutput } = await runCommand(
      ["platform", "create", "workspace", `${WORKSPACE_NAME}`, "--accept", "--default"],
      { cwd: projectDir },
    );
    expect(workspaceOutput).toMatch(new RegExp(`Workspace ${WORKSPACE_NAME} \(.*?\) created successfully`, "gm"));
  });

  test.skip("Connect starter kit", async () => {
    await $`bun packages/cli/src/cli.ts connect`;
  });

  test.skip("Codegen starter kit", async () => {
    await $`bun packages/cli/src/cli.ts codegen`;
  });
});
