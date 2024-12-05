import { afterAll, afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, rmdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { type DotEnv, loadEnv } from "@settlemint/sdk-utils";
import { $ } from "bun";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";

const COMMAND_TEST_SCOPE = "connect-e2e";

let projectDir: string;
const createdResources = {
  application: true,
  blockchainNode: true,
  hdPrivateKey: false,
  ipfsStorage: true,
  smartContractSet: false,
  graphMiddleware: true,
  portalMiddleware: true,
  hasuraIntegration: true,
  blockscoutInsights: true,
};

setDefaultTimeout(15 * 60_000);

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

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Setup a project using the SDK", () => {
  test("Create a starter kit project", async () => {
    const { cwd, output } = await runCommand(COMMAND_TEST_SCOPE, [
      "create",
      "--project-name",
      PROJECT_NAME,
      "--template",
      TEMPLATE_NAME,
    ]);
    projectDir = join(cwd, PROJECT_NAME);
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
    await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
  });

  test("Validate that .env file has the correct values", async () => {
    const currentCwd = process.cwd();
    process.chdir(projectDir);
    process.env.NODE_ENV = "development";
    const env: Partial<DotEnv> = await loadEnv(false, false);
    process.chdir(currentCwd);

    expect(env.SETTLEMINT_ACCESS_TOKEN).toBeString();
    expect(env.SETTLEMINT_INSTANCE).toBeString();
    expect(env.SETTLEMINT_WORKSPACE).toBeString();
    if (createdResources.application) {
      expect(env.SETTLEMINT_APPLICATION).toBeString();
    }
    if (createdResources.blockchainNode) {
      expect(env.SETTLEMINT_BLOCKCHAIN_NETWORK).toBeString();
      expect(env.SETTLEMINT_BLOCKCHAIN_NODE).toBeString();
      expect(env.SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_DEX_FACTORY).toBeString();
      expect(env.SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_FACTORY).toBeString();
      expect(env.SETTLEMINT_PREDEPLOYED_CONTRACT_ERC20_REGISTRY).toBeString();
    }
    if (createdResources.hdPrivateKey) {
      expect(env.SETTLEMINT_HD_PRIVATE_KEY).toBeString();
    }
    if (createdResources.smartContractSet) {
      expect(env.SETTLEMINT_SMART_CONTRACT_SET).toBeString();
    }
    if (createdResources.ipfsStorage) {
      expect(env.SETTLEMINT_IPFS).toBeString();
      expect(env.SETTLEMINT_IPFS_API_ENDPOINT).toBeString();
      expect(env.SETTLEMINT_IPFS_GATEWAY_ENDPOINT).toBeString();
      expect(env.SETTLEMINT_IPFS_PINNING_ENDPOINT).toBeString();
    }
    if (createdResources.graphMiddleware) {
      expect(env.SETTLEMINT_THEGRAPH).toBeString();
      expect(env.SETTLEMINT_THEGRAPH_SUBGRAPH_ENDPOINT).toBeString();
    }
    if (createdResources.portalMiddleware) {
      expect(env.SETTLEMINT_PORTAL).toBeString();
      expect(env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT).toBeString();
      expect(env.SETTLEMINT_PORTAL_REST_ENDPOINT).toBeString();
    }
    if (createdResources.hasuraIntegration) {
      expect(env.SETTLEMINT_HASURA).toBeString();
      expect(env.SETTLEMINT_HASURA_ENDPOINT).toBeString();
      expect(env.SETTLEMINT_HASURA_ADMIN_SECRET).toBeString();
    }
    if (createdResources.blockscoutInsights) {
      expect(env.SETTLEMINT_BLOCKSCOUT).toBeString();
      expect(env.SETTLEMINT_BLOCKSCOUT_UI_ENDPOINT).toBeString();
      expect(env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT).toBeString();
    }
  });

  test("Connect starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["connect", "--accept-defaults"], { cwd: projectDir });
    expect(output).toInclude("Connected to SettleMint");
  });

  test("Codegen starter kit", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["codegen"], { cwd: projectDir });
    if (createdResources.hasuraIntegration) {
      expect(output).toInclude("Generating Hasura resources");
      expect(output).toInclude("Schema was generated successfully");
    }
    if (createdResources.portalMiddleware) {
      expect(output).toInclude("Generating Portal resources");
      expect(output).toInclude("Schema was generated successfully");
    }
    if (createdResources.graphMiddleware) {
      expect(output).toInclude("Generating TheGraph resources");
      expect(output).toInclude("Introspection output was generated successfully");
    }
    if (createdResources.ipfsStorage) {
      expect(output).toInclude("Generating IPFS resources");
      expect(output).toInclude("Schema was generated successfully");
    }
    if (createdResources.blockscoutInsights) {
      expect(output).toInclude("Generating Blockscout resources");
      expect(output).toInclude("Schema was generated successfully");
    }
    expect(output).toInclude("Codegen complete");
  });

  test("Build starter kit", async () => {
    const env = { NODE_ENV: "production" };
    await $`bun install`.cwd(projectDir).env(env);
    await $`bun lint`.cwd(projectDir).env(env);
    await $`bunx tsc`.cwd(projectDir).env(env);
  });
});
