import { afterAll, afterEach, describe, expect, setDefaultTimeout, test } from "bun:test";
import { rmdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, loadEnv } from "@settlemint/sdk-utils";
import { $ } from "bun";
import { isLocalEnv } from "./utils/is-local-env";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const PROJECT_NAME = "starter-kit-demo";
const TEMPLATE_NAME = "@settlemint/starterkit-asset-tokenization";
const WORKSPACE_NAME = "Starter Kit Demo Workspace";
const APPLICATION_NAME = "Starter Kit App";
const NETWORK_NAME = "Starter Kit Network";
const NODE_NAME = "Starter Kit Node";
const PRIVATE_KEY_NAME = "Starter Kit Private Key";
const SMART_CONTRACT_SET_NAME = "Starter Kit Smart Contract Set";
const IPFS_NAME = "Starter Kit IPFS";
const GRAPH_NAME = "Starter Kit Graph";

const CLUSTER_PROVIDER = isLocalEnv() ? "local" : "gke";
const CLUSTER_REGION = isLocalEnv() ? "orbstack" : "europe";

const COMMAND_TEST_SCOPE = "create-new-project-e2e";

let projectDir: string;
let workspaceDeleted = false;
const createdResources = {
  application: false,
  blockchainNode: false,
  hdPrivateKey: false,
  ipfsStorage: false,
  smartContractSet: false,
  graphMiddleware: false,
};

setDefaultTimeout(10 * 60_000);

afterAll(async () => {
  if (!projectDir) {
    return;
  }
  if (!workspaceDeleted) {
    try {
      // Deleting a workspace automatically deletes all underlying resources
      await runCommand(
        COMMAND_TEST_SCOPE,
        ["platform", "delete", "workspace", "--accept-defaults", "--force", "default"],
        {
          cwd: projectDir,
        },
      );
    } catch (err) {
      console.error("Failed to delete workspace", err);
    }
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
    expect((await stat(join(cwd, PROJECT_NAME))).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
  });

  test("Create workspace and application on the platform", async () => {
    expect(projectDir).toBeString();
    const { output: workspaceOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
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
        "--accept-defaults",
        "--default",
      ],
      { cwd: projectDir },
    );
    expect(workspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} created successfully`);

    const currentCwd = process.cwd();
    process.chdir(projectDir);
    // Add some credits so the workspace will not be auto paused
    const env: Partial<DotEnv> = await loadEnv(false, false);
    expect(env.SETTLEMINT_WORKSPACE).toBeString();
    const settlemint = createSettleMintClient({
      accessToken: env.SETTLEMINT_ACCESS_TOKEN!,
      instance: env.SETTLEMINT_INSTANCE!,
    });
    process.chdir(currentCwd);
    if (!isLocalEnv()) {
      await settlemint.workspace.addCredits(env.SETTLEMINT_WORKSPACE!, 100);
    }

    const { output: applicationOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["platform", "create", "application", `${APPLICATION_NAME}`, "--accept-defaults", "--default"],
      { cwd: projectDir },
    );
    expect(applicationOutput).toInclude(`Application ${APPLICATION_NAME} created successfully`);
    createdResources.application = true;
  });

  test("Create blockchain network and node on the platform", async () => {
    expect(createdResources.application).toBeTrue();
    const { output: networkOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "platform",
        "create",
        "blockchain-network",
        "besu",
        NETWORK_NAME,
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--node-name",
        NODE_NAME,
        "--accept-defaults",
        "--default",
        "--wait",
      ],
      { cwd: projectDir },
    );
    expect(networkOutput).toInclude(`Blockchain network ${NETWORK_NAME} created successfully`);
    expect(networkOutput).toInclude("Blockchain node is deployed");
    createdResources.blockchainNode = true;
  });

  test("Create HD private key on the platform", async () => {
    expect(createdResources.blockchainNode).toBeTrue();
    const { output: privateKeyOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "platform",
        "create",
        "private-key",
        "hd-ecdsa-p256",
        "--accept-defaults",
        "--default",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--wait",
        PRIVATE_KEY_NAME,
      ],
      { cwd: projectDir },
    );
    expect(privateKeyOutput).toInclude(`Private key ${PRIVATE_KEY_NAME} created successfully`);
    expect(privateKeyOutput).toInclude("Private key is deployed");
    createdResources.hdPrivateKey = true;
  });

  test("Create smart contract set and deploy on the platform", async () => {
    expect(createdResources.blockchainNode).toBeTrue();
    const { output: smartContractSetOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "platform",
        "create",
        "smart-contract-set",
        "--use-case",
        "solidity-starterkit",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--accept-defaults",
        "--default",
        "--wait",
        SMART_CONTRACT_SET_NAME,
      ],
      { cwd: projectDir },
    );
    expect(smartContractSetOutput).toInclude(`Smart contract set ${SMART_CONTRACT_SET_NAME} created successfully`);
    expect(smartContractSetOutput).toInclude("Smart contract set is deployed");
    createdResources.smartContractSet = true;
  });

  test("Create IPFS storage on the platform", async () => {
    expect(createdResources.application).toBeTrue();
    const { output: ipfsOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "platform",
        "create",
        "storage",
        "ipfs",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--accept-defaults",
        "--default",
        "--wait",
        IPFS_NAME,
      ],
      { cwd: projectDir },
    );
    expect(ipfsOutput).toInclude(`Storage ${IPFS_NAME} created successfully`);
    expect(ipfsOutput).toInclude("Storage is deployed");
    createdResources.ipfsStorage = true;
  });

  test("Create graph middleware on the platform", async () => {
    expect(createdResources.smartContractSet).toBeTrue();
    expect(createdResources.ipfsStorage).toBeTrue();
    const { output: graphOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      [
        "platform",
        "create",
        "middleware",
        "graph",
        "--provider",
        CLUSTER_PROVIDER,
        "--region",
        CLUSTER_REGION,
        "--accept-defaults",
        "--default",
        "--wait",
        GRAPH_NAME,
      ],
      { cwd: projectDir },
    );
    expect(graphOutput).toInclude(`Middleware ${GRAPH_NAME} created successfully`);
    expect(graphOutput).toInclude("Middleware is deployed");
    createdResources.graphMiddleware = true;
  });

  test.skip("Create smart contract portal middleware on the platform", () => {});

  test.skip("Create hasura integration on the platform", () => {});

  test.skip("Create Minio storage on the platform", () => {
    // Optional, can be done later
  });

  test.skip("Create blockscout insights on the platform", () => {
    // Optional, can be done later
  });

  test.skip("Create custom deployment on the platform", () => {
    // Optional, can be done later
  });

  test("Validate that .env file has the correct values", async () => {
    const currentCwd = process.cwd();
    process.chdir(projectDir);
    const env: Partial<DotEnv> = await loadEnv(false, false);
    process.chdir(currentCwd);

    expect(env.SETTLEMINT_ACCESS_TOKEN).toBeString();
    expect(env.SETTLEMINT_INSTANCE).toBeString();
    expect(env.SETTLEMINT_AUTH_SECRET).toBeString();
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
  });

  test("Connect starter kit", async () => {
    expect(Object.values(createdResources).includes(false)).toBeFalse();
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["connect", "--accept-defaults"], { cwd: projectDir });
    expect(output).toInclude("Connected to SettleMint");
  });

  test("Codegen starter kit", async () => {
    expect(Object.values(createdResources).includes(false)).toBeFalse();
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["codegen"], { cwd: projectDir });
    expect(output).toInclude("Schema was generated successfully");
    expect(output).toInclude("Introspection output was generated successfully");
    expect(output).toInclude("Codegen complete");
  });

  test.skip("Build starter kit", async () => {
    await $`bun install`.cwd(projectDir);
    await $`bun lint`.cwd(projectDir);
    await $`bun run build`.cwd(projectDir);
  });

  test("Delete created resources on the platform", async () => {
    expect(createdResources.application).toBeTrue();
    const { output: deleteApplicationOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["platform", "delete", "application", "--accept-defaults", "--force", "default"],
      { cwd: projectDir },
    );
    expect(deleteApplicationOutput).toInclude(`Application ${APPLICATION_NAME} deleted successfully`);
    const { output: deleteWorkspaceOutput } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["platform", "delete", "workspace", "--accept-defaults", "--force", "default"],
      { cwd: projectDir },
    );
    expect(deleteWorkspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} deleted successfully`);
    workspaceDeleted = true;
  });
});
