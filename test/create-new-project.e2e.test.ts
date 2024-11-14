import { afterAll, describe, expect, test } from "bun:test";
import { rmdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { $ } from "bun";
import { runCommand } from "./utils/run-command";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";
const WORKSPACE_NAME = "Starter Kit Demo Workspace";
const APPLICATION_NAME = "Starter Kit App";

let projectDir: string;

afterAll(async () => {
  if (!projectDir) {
    return;
  }
  try {
    // Deleting a workspace automatically deletes all underlying resources
    await runCommand(["platform", "delete", "workspace", "--accept", "--force", "default"], { cwd: projectDir });
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

    const { output: applicationOutput } = await runCommand(
      ["platform", "create", "application", `${APPLICATION_NAME}`, "--accept", "--default"],
      { cwd: projectDir },
    );
    expect(applicationOutput).toInclude(`Application ${APPLICATION_NAME} created successfully`);

    const { output: networkOutput } = await runCommand(
      [
        "platform",
        "create",
        "blockchain-network",
        "besu-qbft",
        "test-network",
        "--provider",
        "gke", // TODO: from local env
        "--region",
        "europe", // TODO: from local env
        "--node-name",
        "validator-1",
        "--accept",
        "--default",
      ],
      { cwd: projectDir },
    );
    expect(networkOutput).toInclude("Besu QBFT test-network created successfully");
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
    const { output: deleteApplicationOutput } = await runCommand(
      ["platform", "delete", "application", "--accept", "--force", "default"],
      { cwd: projectDir },
    );
    expect(deleteApplicationOutput).toInclude(`Application ${APPLICATION_NAME} deleted successfully`);
    const { output: deleteWorkspaceOutput } = await runCommand(
      ["platform", "delete", "workspace", "--accept", "--force", "default"],
      { cwd: projectDir },
    );
    expect(deleteWorkspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} deleted successfully`);
  });
});
