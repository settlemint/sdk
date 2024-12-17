import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { type DotEnv, loadEnv } from "@settlemint/sdk-utils";
import { $ } from "bun";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";

const COMMAND_TEST_SCOPE = __filename;

const projectDir = join(process.cwd(), "test", PROJECT_NAME);
const dappDir = join(projectDir, "kit", "dapp");

setDefaultTimeout(15 * 60_000);

async function cleanup() {
  try {
    await rmdir(projectDir, { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}

beforeAll(cleanup);
afterAll(cleanup);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Setup a project using the SDK", () => {
  let contractsDeploymentInfo: Record<string, string>;

  test("Create a starter kit project", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["create", "--project-name", PROJECT_NAME, "--template", TEMPLATE_NAME],
      {
        cwd: __dirname,
      },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
    await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
  });

  // test("Create Minio storage on the platform", () => {
  //   // Optional, can be done later
  // });

  // test("Create custom deployment on the platform", () => {
  //   // Optional, can be done later
  // });

  test("Validate that .env file has the correct values", async () => {
    const currentCwd = process.cwd();
    process.chdir(projectDir);
    // Needed so it loads the correct environment variables
    // @ts-ignore
    process.env.NODE_ENV = "development";
    const env: Partial<DotEnv> = await loadEnv(false, false);
    process.chdir(currentCwd);

    expect(env.SETTLEMINT_ACCESS_TOKEN).toBeString();
    expect(env.SETTLEMINT_INSTANCE).toBeString();
    expect(env.SETTLEMINT_WORKSPACE).toBeString();

    expect(env.SETTLEMINT_APPLICATION).toBeString();

    expect(env.SETTLEMINT_BLOCKCHAIN_NETWORK).toBeString();
    expect(env.SETTLEMINT_BLOCKCHAIN_NODE).toBeString();

    expect(env.SETTLEMINT_HD_PRIVATE_KEY).toBeString();

    expect(env.SETTLEMINT_IPFS).toBeString();
    expect(env.SETTLEMINT_IPFS_API_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_IPFS_PINNING_ENDPOINT).toBeString();

    expect(env.SETTLEMINT_THEGRAPH).toBeString();
    expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toBeArray();

    expect(env.SETTLEMINT_PORTAL).toBeString();
    expect(env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_PORTAL_REST_ENDPOINT).toBeString();

    expect(env.SETTLEMINT_HASURA).toBeString();
    expect(env.SETTLEMINT_HASURA_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_HASURA_ADMIN_SECRET).toBeString();

    expect(env.SETTLEMINT_BLOCKSCOUT).toBeString();
    expect(env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT).toBeString();
  });

  test("Install dependencies and link SDK to use local one", async () => {
    const env = { NODE_ENV: "production" };
    await $`bun link`.cwd("./sdk/cli");
    await $`bun install`.cwd(projectDir).env(env);
    await $`bun link @settlemint/sdk-cli`.cwd(projectDir);
  });

  test("Connect starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["connect", "--accept-defaults"], { cwd: projectDir })
      .result;
    expect(output).toInclude("Connected to SettleMint");
  });

  test("Codegen starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["codegen", "--thegraph-subgraph-names", "starterkits"], {
      cwd: dappDir,
    }).result;

    expect(output).toInclude("Generating Hasura resources");
    expect(output).toInclude("Generating IPFS resources");
    expect(output).toInclude("Generating Blockscout resources");
    expect(output).toInclude("Generating Portal resources");
    expect(output).toInclude("Generating TheGraph resources");
    expect(output).toInclude("Codegen complete");
  });

  test("Build starter kit", async () => {
    const env = { NODE_ENV: "production" };
    await $`bun lint`.cwd(projectDir).env(env);
    await $`bun check-types`.cwd(projectDir).env(env);
  });
});
