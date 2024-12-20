import { afterAll, beforeAll, expect } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, loadEnv } from "@settlemint/sdk-utils";
import {
  AAT_NAME,
  APPLICATION_NAME,
  BLOCKSCOUT_NAME,
  CLUSTER_PROVIDER,
  CLUSTER_REGION,
  GRAPH_NAME,
  HASURA_NAME,
  IPFS_NAME,
  MINIO_NAME,
  NETWORK_NAME,
  NODE_NAME,
  PORTAL_NAME,
  PRIVATE_KEY_NAME,
  PRIVATE_KEY_SMART_CONTRACTS_NAME,
  WORKSPACE_NAME,
} from "../constants/test-resources";
import { isLocalEnv } from "../utils/is-local-env";
import { type CommandResult, runCommand } from "../utils/run-command";

// Needed so it loads the correct environment variables
// @ts-ignore
process.env.NODE_ENV = "development";

const COMMAND_TEST_SCOPE = __filename;
const DISABLE_CONCURRENT_DEPLOYMENT = process.env.DISABLE_CONCURRENT_DEPLOYMENT === "true";

async function cleanup() {
  if (process.env.DISABLE_WORKSPACE_DELETE) {
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
    await createBlockchainNodeMinioAndIpfs();
    await createPrivateKeySmartcontractSetPortalAndBlockscout();
    await createGraphMiddleware();
  } catch (err) {
    console.error("Failed to create resources", err);
    await cleanup();
    process.exit(1);
  }
});

afterAll(cleanup);

async function resourceAlreadyCreated(envNames: (keyof DotEnv)[]) {
  const env: Partial<DotEnv> = await loadEnv(false, false);
  return envNames.every((envName) => env[envName] !== undefined);
}

async function addWorkspaceCredits() {
  // Add some credits so the workspace will not be auto paused
  const env: Partial<DotEnv> = await loadEnv(false, false);
  expect(env.SETTLEMINT_WORKSPACE).toBeString();
  const settlemint = createSettleMintClient({
    accessToken: process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS!,
    instance: env.SETTLEMINT_INSTANCE!,
  });
  if (!isLocalEnv()) {
    const workspace = await settlemint.workspace.read(env.SETTLEMINT_WORKSPACE!);
    await settlemint.workspace.addCredits(workspace.id, 100);
  }
}

async function createWorkspaceAndApplication() {
  const hasWorkspace = await resourceAlreadyCreated(["SETTLEMINT_WORKSPACE"]);
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

  const hasApplication = await resourceAlreadyCreated(["SETTLEMINT_APPLICATION"]);
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

async function createBlockchainNodeMinioAndIpfs() {
  const hasBlockchainNetwork = await resourceAlreadyCreated(["SETTLEMINT_BLOCKCHAIN_NETWORK"]);
  const hasBlockchainNode = await resourceAlreadyCreated(["SETTLEMINT_BLOCKCHAIN_NODE"]);
  const hasHasuraIntegration = await resourceAlreadyCreated(["SETTLEMINT_HASURA"]);
  const hasMinioStorage = await resourceAlreadyCreated(["SETTLEMINT_MINIO"]);
  const hasIpfsStorage = await resourceAlreadyCreated(["SETTLEMINT_IPFS"]);
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

  if (!hasBlockchainNode && networkResult?.status === "fulfilled" && networkResult.value) {
    expect(networkResult.value.output).toInclude(`Blockchain network ${NETWORK_NAME} created successfully`);
    expect(networkResult.value.output).toInclude("Blockchain node is deployed");
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
      "--provider",
      CLUSTER_PROVIDER,
      "--region",
      CLUSTER_REGION,
      "--wait",
      PRIVATE_KEY_SMART_CONTRACTS_NAME,
    ]).result;
    expect(privateKeyHsmCreateCommandOutput).toInclude(
      `Private key ${PRIVATE_KEY_SMART_CONTRACTS_NAME} created successfully`,
    );
    expect(privateKeyHsmCreateCommandOutput).toInclude("Private key is deployed");
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
}

async function createPrivateKeySmartcontractSetPortalAndBlockscout() {
  const hasPrivateKey = await resourceAlreadyCreated(["SETTLEMINT_HD_PRIVATE_KEY"]);
  const hasPortalMiddleware = await resourceAlreadyCreated(["SETTLEMINT_PORTAL"]);
  const hasBlockscoutInsights = await resourceAlreadyCreated(["SETTLEMINT_BLOCKSCOUT"]);
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
            "--provider",
            CLUSTER_PROVIDER,
            "--region",
            CLUSTER_REGION,
            "--wait",
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
            "--include-predeployed-abis",
            "StarterKitERC20Registry",
            "StarterKitERC20Factory",
            "StarterKitERC20",
            "StarterKitERC20DexFactory",
            "StarterKitERC20Dex",
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

async function createGraphMiddleware() {
  const hasGraphMiddleware = await resourceAlreadyCreated(["SETTLEMINT_THEGRAPH"]);
  if (hasGraphMiddleware) {
    return;
  }
  const { output: graphOutput } = await runCommand(COMMAND_TEST_SCOPE, [
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
  ]).result;
  expect(graphOutput).toInclude(`Middleware ${GRAPH_NAME} created successfully`);
  expect(graphOutput).toInclude("Middleware is deployed");
}

async function login() {
  const { output: loginOutput } = await runCommand(
    COMMAND_TEST_SCOPE,
    ["login", "--token-stdin", "--accept-defaults", "--default"],
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
  const hasAat = await resourceAlreadyCreated(["SETTLEMINT_ACCESS_TOKEN"]);
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
