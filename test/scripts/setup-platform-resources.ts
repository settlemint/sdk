import { afterAll, beforeAll, expect } from "bun:test";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { executeCommand } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import {
  AAT_NAME,
  APPLICATION_NAME,
  BLOCKSCOUT_NAME,
  CLUSTER_PROVIDER,
  CLUSTER_REGION,
  GRAPH_NAME,
  HASURA_NAME,
  IPFS_NAME,
  LOAD_BALANCER_NAME,
  MINIO_NAME,
  NETWORK_NAME,
  NODE_NAME,
  NODE_NAME_2_WITH_PK,
  NODE_NAME_3_WITHOUT_PK,
  PORTAL_NAME,
  PRIVATE_KEY_2_NAME,
  PRIVATE_KEY_NAME,
  PRIVATE_KEY_SMART_CONTRACTS_NAMES,
  WORKSPACE_NAME,
} from "../constants/test-resources";
import { isLocalEnv } from "../utils/is-local-env";
import { type CommandResult, runCommand } from "../utils/run-command";
import {
  blockchainNodeAlreadyCreated,
  defaultResourceAlreadyCreated,
  findBlockchainNodeByName,
  findLoadBalancerByName,
  privateKeyAlreadyCreated,
  setupSettleMintClient,
} from "../utils/test-resources";

// Needed so it loads the correct environment variables
// @ts-ignore
process.env.NODE_ENV = "development";

const COMMAND_TEST_SCOPE = __filename;
const DISABLE_CONCURRENT_DEPLOYMENT = process.env.DISABLE_CONCURRENT_DEPLOYMENT === "true";

async function cleanup(force = false) {
  if (process.env.DISABLE_WORKSPACE_DELETE && !force) {
    console.log("Skipping delete of workspace and application");
    return;
  }
  try {
    const { output: deleteApplicationOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "delete",
      "application",
      "--accept-defaults",
      "--force",
      "default",
    ]).result;
    expect(deleteApplicationOutput).toInclude(`Application ${APPLICATION_NAME} deleted successfully`);
    const { output: deleteWorkspaceOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "delete",
      "workspace",
      "--accept-defaults",
      "--force",
      "default",
    ]).result;
    expect(deleteWorkspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} deleted successfully`);
    await logout();
  } catch (err) {
    const error = err as Error;
    console.error(`Cleaning up resources failed: ${error.message}`, error);
  }
}

beforeAll(async () => {
  try {
    await login();
    await createWorkspaceAndApplication();
    await createApplicationAccessToken();
    await createBlockchainNetworkMinioAndIpfs();
    await createBlockchainNodes();
    await createLoadBalancer();
    await createPrivateKeySmartcontractSetPortalAndBlockscout();
    await createGraphMiddlewareAndActivatedPrivateKey();
    await prepareTestApp();
  } catch (err) {
    console.error("Failed to create resources", err);
    await cleanup();
    process.exit(1);
  }
});

afterAll(cleanup);

async function addWorkspaceCredits() {
  // Add some credits so the workspace will not be auto paused
  const env: Partial<DotEnv> = await loadEnv(false, false);
  expect(env.SETTLEMINT_WORKSPACE).toBeString();
  const settlemint = await setupSettleMintClient();
  if (!isLocalEnv()) {
    const workspace = await settlemint.workspace.read(env.SETTLEMINT_WORKSPACE!);
    await settlemint.workspace.addCredits(workspace.id, 5_000);
  }
}

async function createWorkspaceAndApplication() {
  const hasWorkspace = await defaultResourceAlreadyCreated(["SETTLEMINT_WORKSPACE"]);
  if (!hasWorkspace) {
    const { output: workspaceOutput } = await runCommand(COMMAND_TEST_SCOPE, [
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
    ]).result;
    expect(workspaceOutput).toInclude(`Workspace ${WORKSPACE_NAME} created successfully`);
    await addWorkspaceCredits();
  }

  const hasApplication = await defaultResourceAlreadyCreated(["SETTLEMINT_APPLICATION"]);
  if (!hasApplication) {
    const { output: applicationOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "create",
      "application",
      `${APPLICATION_NAME}`,
      "--accept-defaults",
      "--default",
    ]).result;
    expect(applicationOutput).toInclude(`Application ${APPLICATION_NAME} created successfully`);
  }
}

async function createBlockchainNetworkMinioAndIpfs() {
  const hasBlockchainNetwork = await defaultResourceAlreadyCreated(["SETTLEMINT_BLOCKCHAIN_NETWORK"]);
  const hasBlockchainNode = await defaultResourceAlreadyCreated(["SETTLEMINT_BLOCKCHAIN_NODE"]);
  const hasHasuraIntegration = await defaultResourceAlreadyCreated(["SETTLEMINT_HASURA"]);
  const hasMinioStorage = await defaultResourceAlreadyCreated(["SETTLEMINT_MINIO"]);
  const hasIpfsStorage = await defaultResourceAlreadyCreated(["SETTLEMINT_IPFS"]);
  const results = await deployResources([
    () =>
      hasBlockchainNetwork && hasBlockchainNode
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
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
            "--restart-if-timeout",
          ]).result,
    () =>
      hasHasuraIntegration
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "integration-tool",
            "hasura",
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            HASURA_NAME,
          ]).result,
    () =>
      hasMinioStorage
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "storage",
            "minio",
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            MINIO_NAME,
          ]).result,
    () =>
      hasIpfsStorage
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
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
            "--restart-if-timeout",
            IPFS_NAME,
          ]).result,
  ]);

  const [networkResult, hasuraResult, minioResult, ipfsResult] = results;

  expect([networkResult?.status, hasuraResult?.status, minioResult?.status, ipfsResult?.status]).toEqual([
    "fulfilled",
    "fulfilled",
    "fulfilled",
    "fulfilled",
  ]);

  if (networkResult?.status === "fulfilled" && networkResult.value) {
    expect(networkResult.value.output).toInclude(`Blockchain network ${NETWORK_NAME} created successfully`);
    expect(networkResult.value.output).toInclude("Blockchain node is deployed");
  }

  if (hasuraResult?.status === "fulfilled" && hasuraResult.value) {
    expect(hasuraResult.value.output).toInclude(`Integration tool ${HASURA_NAME} created successfully`);
    expect(hasuraResult.value.output).toInclude("Integration tool is deployed");
  }

  if (minioResult?.status === "fulfilled" && minioResult.value) {
    expect(minioResult.value.output).toInclude(`Storage ${MINIO_NAME} created successfully`);
    expect(minioResult.value.output).toInclude("Storage is deployed");
  }

  if (ipfsResult?.status === "fulfilled" && ipfsResult.value) {
    expect(ipfsResult.value.output).toInclude(`Storage ${IPFS_NAME} created successfully`);
    expect(ipfsResult.value.output).toInclude("Storage is deployed");
  }

  for (const privateKeyName of PRIVATE_KEY_SMART_CONTRACTS_NAMES) {
    const hasPrivateKey = await privateKeyAlreadyCreated(privateKeyName);
    if (!hasPrivateKey) {
      const env: Partial<DotEnv> = await loadEnv(false, false);
      const { output: privateKeyHsmCreateCommandOutput } = await runCommand(COMMAND_TEST_SCOPE, [
        "platform",
        "create",
        "private-key",
        "hsm-ecdsa-p256",
        "--blockchain-node",
        env.SETTLEMINT_BLOCKCHAIN_NODE!,
        "--accept-defaults",
        "--default",
        "--wait",
        "--restart-if-timeout",
        privateKeyName,
      ]).result;
      expect(privateKeyHsmCreateCommandOutput).toInclude(`Private key ${privateKeyName} created successfully`);
      expect(privateKeyHsmCreateCommandOutput).toInclude("Private key is deployed");
    }
  }
}

async function createBlockchainNodes() {
  const hasBlockchainNodeWithPk = await blockchainNodeAlreadyCreated(NODE_NAME_2_WITH_PK);
  const hasBlockchainNodeWithoutPk = await blockchainNodeAlreadyCreated(NODE_NAME_3_WITHOUT_PK);

  const results = await deployResources([
    () =>
      hasBlockchainNodeWithPk
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "blockchain-node",
            "besu",
            "--node-type",
            "NON_VALIDATOR",
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--wait",
            "--restart-if-timeout",
            NODE_NAME_2_WITH_PK,
          ]).result,
    () =>
      hasBlockchainNodeWithoutPk
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "blockchain-node",
            "besu",
            "--node-type",
            "NON_VALIDATOR",
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--wait",
            "--restart-if-timeout",
            NODE_NAME_3_WITHOUT_PK,
          ]).result,
  ]);

  const [nodeWithPkResult, nodeWithoutPkResult] = results;

  expect([nodeWithPkResult?.status, nodeWithoutPkResult?.status]).toEqual(["fulfilled", "fulfilled"]);

  if (nodeWithPkResult?.status === "fulfilled" && nodeWithPkResult.value) {
    expect(nodeWithPkResult.value.output).toInclude(`Blockchain node ${NODE_NAME_2_WITH_PK} created successfully`);
    expect(nodeWithPkResult.value.output).toInclude("Blockchain node is deployed");
  }

  if (nodeWithoutPkResult?.status === "fulfilled" && nodeWithoutPkResult.value) {
    expect(nodeWithoutPkResult.value.output).toInclude(
      `Blockchain node ${NODE_NAME_3_WITHOUT_PK} created successfully`,
    );
    expect(nodeWithoutPkResult.value.output).toInclude("Blockchain node is deployed");
  }
}

async function createPrivateKeySmartcontractSetPortalAndBlockscout() {
  const hasPrivateKey = await defaultResourceAlreadyCreated(["SETTLEMINT_HD_PRIVATE_KEY"]);
  const hasPortalMiddleware = await defaultResourceAlreadyCreated(["SETTLEMINT_PORTAL"]);
  const hasBlockscoutInsights = await defaultResourceAlreadyCreated(["SETTLEMINT_BLOCKSCOUT"]);
  const env: Partial<DotEnv> = await loadEnv(false, false);

  const results = await deployResources([
    () =>
      hasPrivateKey
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "private-key",
            "hd-ecdsa-p256",
            "--blockchain-node",
            env.SETTLEMINT_BLOCKCHAIN_NODE!,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            PRIVATE_KEY_NAME,
          ]).result,
    () =>
      hasPortalMiddleware
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "middleware",
            "smart-contract-portal",
            PORTAL_NAME,
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            "--include-predeployed-abis",
            "asset-tokenization",
          ]).result,
    () =>
      hasBlockscoutInsights
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "insights",
            "blockscout",
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            BLOCKSCOUT_NAME,
          ]).result,
  ]);

  const [privateKeyResult, portalResult, blockscoutResult] = results;

  expect([privateKeyResult?.status, portalResult?.status, blockscoutResult?.status]).toEqual([
    "fulfilled",
    "fulfilled",
    "fulfilled",
  ]);

  if (privateKeyResult?.status === "fulfilled" && privateKeyResult.value) {
    expect(privateKeyResult.value.output).toInclude(`Private key ${PRIVATE_KEY_NAME} created successfully`);
    expect(privateKeyResult.value.output).toInclude("Private key is deployed");
  }

  if (portalResult?.status === "fulfilled" && portalResult.value) {
    expect(portalResult.value.output).toInclude(`Middleware ${PORTAL_NAME} created successfully`);
    expect(portalResult.value.output).toInclude("Middleware is deployed");
  }

  if (blockscoutResult?.status === "fulfilled" && blockscoutResult.value) {
    expect(blockscoutResult.value.output).toInclude(`Insights ${BLOCKSCOUT_NAME} created successfully`);
    expect(blockscoutResult.value.output).toInclude("Insights is deployed");
  }
}

async function createGraphMiddlewareAndActivatedPrivateKey() {
  const hasGraphMiddleware = await defaultResourceAlreadyCreated(["SETTLEMINT_THEGRAPH"]);
  const hasPrivateKey2 = await privateKeyAlreadyCreated(PRIVATE_KEY_2_NAME);
  const blockchainNodeWithPk = await findBlockchainNodeByName(NODE_NAME_2_WITH_PK);
  const loadBalancer = await findLoadBalancerByName(LOAD_BALANCER_NAME);

  const results = await deployResources([
    () =>
      hasGraphMiddleware
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "middleware",
            "graph",
            "--load-balancer",
            loadBalancer!.uniqueName,
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--accept-defaults",
            "--default",
            "--wait",
            "--restart-if-timeout",
            GRAPH_NAME,
          ]).result,
    () =>
      hasPrivateKey2
        ? Promise.resolve(undefined)
        : runCommand(COMMAND_TEST_SCOPE, [
            "platform",
            "create",
            "private-key",
            "hsm-ecdsa-p256",
            "--blockchain-node",
            blockchainNodeWithPk!.uniqueName,
            "--accept-defaults",
            "--wait",
            "--restart-if-timeout",
            PRIVATE_KEY_2_NAME,
          ]).result,
  ]);

  const [graphMiddlewareResult, privateKey2Result] = results;
  expect([graphMiddlewareResult?.status, privateKey2Result?.status]).toEqual(["fulfilled", "fulfilled"]);

  if (graphMiddlewareResult?.status === "fulfilled" && graphMiddlewareResult.value) {
    expect(graphMiddlewareResult.value.output).toInclude(`Middleware ${GRAPH_NAME} created successfully`);
    expect(graphMiddlewareResult.value.output).toInclude("Middleware is deployed");
  }
  if (privateKey2Result?.status === "fulfilled" && privateKey2Result.value) {
    expect(privateKey2Result.value.output).toInclude(`Private key ${PRIVATE_KEY_2_NAME} created successfully`);
    expect(privateKey2Result.value.output).toInclude("Private key is deployed");
  }
}

async function createLoadBalancer() {
  const hasLoadBalancer = await defaultResourceAlreadyCreated(["SETTLEMINT_BLOCKCHAIN_NODE_OR_LOAD_BALANCER"]);
  if (!hasLoadBalancer) {
    const blockchainNodeWithPk = await findBlockchainNodeByName(NODE_NAME_2_WITH_PK);
    const blockchainNodeWithoutPk = await findBlockchainNodeByName(NODE_NAME_3_WITHOUT_PK);
    const { output: loadBalancerCreateCommandOutput } = await runCommand(COMMAND_TEST_SCOPE, [
      "platform",
      "create",
      "load-balancer",
      "evm",
      "--blockchain-nodes",
      blockchainNodeWithPk!.uniqueName,
      blockchainNodeWithoutPk!.uniqueName,
      "--provider",
      CLUSTER_PROVIDER,
      "--region",
      CLUSTER_REGION,
      "--accept-defaults",
      "--default",
      "--wait",
      "--restart-if-timeout",
      LOAD_BALANCER_NAME,
    ]).result;
    expect(loadBalancerCreateCommandOutput).toInclude(`Load balancer ${LOAD_BALANCER_NAME} created successfully`);
    expect(loadBalancerCreateCommandOutput).toInclude("Load balancer is deployed");
  }
}

async function login() {
  const { output: loginOutput } = await runCommand(
    COMMAND_TEST_SCOPE,
    ["login", "--token-stdin", "--accept-defaults"],
    {
      stdin: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS,
    },
  ).result;
  expect(loginOutput).toInclude("Successfully logged in to SettleMint!");
}

async function logout() {
  const { output: logoutOutput } = await runCommand(COMMAND_TEST_SCOPE, ["logout", "--all"]).result;
  expect(logoutOutput).toInclude("Successfully logged out from all instances");
}

async function createApplicationAccessToken() {
  const hasAat = await defaultResourceAlreadyCreated(["SETTLEMINT_ACCESS_TOKEN"]);
  if (hasAat) {
    return;
  }
  const { output: graphOutput } = await runCommand(COMMAND_TEST_SCOPE, [
    "platform",
    "create",
    "aat",
    "--validity-period",
    "NONE",
    "--accept-defaults",
    "--default",
    AAT_NAME,
  ]).result;
  expect(graphOutput).toInclude(`Application access token ${AAT_NAME} created successfully`);
}

async function deployResources(commands: (() => Promise<CommandResult | undefined>)[]) {
  if (DISABLE_CONCURRENT_DEPLOYMENT) {
    console.log("Disabling concurrent deployment, running commands sequentially");
    const results: PromiseSettledResult<undefined | CommandResult>[] = [];
    for (const command of commands) {
      try {
        const result = await command();
        results.push({
          status: "fulfilled",
          value: result,
        });
      } catch (err) {
        results.push({
          status: "rejected",
          reason: err,
        });
      }
    }
    return results;
  }
  return await Promise.allSettled(commands.map((command) => command()));
}

export async function prepareTestApp() {
  const cwd = process.cwd();
  try {
    const testAppDir = join(__dirname, "../test-app");
    await mkdir(testAppDir, { recursive: true });
    console.log("Initializing npm project in", testAppDir);
    process.chdir(testAppDir);
    await executeCommand("npm", ["init", "-y"]);
    console.log("Initializing tsconfig in", testAppDir);
    if (!(await exists(join(testAppDir, "tsconfig.json")))) {
      await executeCommand("npx", ["tsc", "--init"]);
    }
    console.log("Copying .env in", testAppDir);
    if (await exists(join(__dirname, "../../.env"))) {
      await copyFile(join(__dirname, "../../.env"), join(testAppDir, ".env"));
    }
    if (await exists(join(__dirname, "../../.env.local"))) {
      await copyFile(join(__dirname, "../../.env.local"), join(testAppDir, ".env.local"));
    }
    console.log("Running codegen in", testAppDir);
    await runCommand(COMMAND_TEST_SCOPE, ["codegen"], {
      cwd: testAppDir,
    }).result;
  } finally {
    process.chdir(cwd);
  }
}
