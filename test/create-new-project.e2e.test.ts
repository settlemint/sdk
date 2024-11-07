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
    await runCommand(["platform", "delete", "workspace", "--accept", "default"], { cwd: projectDir });
  } catch (err) {}
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
      [
        "platform",
        "create",
        "workspace",
        `${WORKSPACE_NAME}`,
        "--company-name",
        "Test Company",
        "--tax-id-type",
        "eu_vat",
        "--tax-id-value",
        "BE0123456789",
        "--address-line-1",
        "123 Test St",
        "--city",
        "Test City",
        "--postal-code",
        "12345",
        "--country",
        "BE",
        "--accept",
        "--default",
      ],
      { cwd: projectDir },
    );
    expect(workspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} created successfully`);
  });

  test.skip("Connect starter kit", async () => {
    await $`bun packages/cli/src/cli.ts connect`;
  });

  test.skip("Codegen starter kit", async () => {
    await $`bun packages/cli/src/cli.ts codegen`;
  });

  test.skip(
    "Build starter kit",
    async () => {
      await $`bun install`.cwd(projectDir);
      await $`bun lint`.cwd(projectDir);
      await $`bun run build`.cwd(projectDir);
    },
    { timeout: 60_000 },
  );

  test("Delete created resources on the platform", async () => {
    const { output: deleteWorkspaceOutput } = await runCommand(
      ["platform", "delete", "workspace", "--accept", "--force", "default"],
      { cwd: projectDir },
    );
    expect(deleteWorkspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} deleted successfully`);
  });
});
