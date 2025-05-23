import { afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, readFile, rmdir, stat, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { $ } from "bun";
import { getSubgraphYamlConfig, updateSubgraphYamlConfig } from "../sdk/cli/src/utils/subgraph/subgraph-config";
import { PRIVATE_KEY_SMART_CONTRACTS_NAMES } from "./constants/test-resources";
import {
  registerLinkedDependencies,
  unlinkLinkedDependencies,
  updatePackageJsonToUseLinkedDependencies,
} from "./utils/link-dependencies";
import { retryCommand } from "./utils/retry-command";
import { forceExitAllCommands, runCommand } from "./utils/run-command";
import { findPrivateKeyByName } from "./utils/test-resources";

const PROJECT_NAME = "kit-demo-standalone";
const TEMPLATE_NAME = "asset-tokenization";
const TEMPLATE_VERSION = "1.1.1";
const SUBGRAPH_NAMES = ["kit", "starterkits"] as const;

const COMMAND_TEST_SCOPE = __filename;

const projectDir = join(__dirname, PROJECT_NAME);
const dAppDir = join(projectDir, "kit", "dapp");
const contractsDir = join(projectDir, "kit", "contracts");
const subgraphDir = join(projectDir, "kit", "subgraph");

setDefaultTimeout(15 * 60_000);

async function cleanup() {
  try {
    await unlinkLinkedDependencies();
    if (await exists(projectDir)) {
      await rmdir(projectDir, { recursive: true });
    }
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}

beforeAll(cleanup);
//afterAll(cleanup);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Setup a project on a standalone environment using the SDK", () => {
  let contractsDeploymentInfo: Record<string, string>;

  test(`Create a ${TEMPLATE_NAME} project`, async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["create", "--project-name", PROJECT_NAME, "--template", TEMPLATE_NAME, "--version", TEMPLATE_VERSION],
      {
        cwd: __dirname,
      },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your project is ready to go!");
    if (await exists(join(__dirname, "../.env"))) {
      await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    }
    if (await exists(join(__dirname, "../.env.local"))) {
      await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
    }
    const env = await loadEnv(false, false, projectDir);
    const envWithAccessTokenInUrl = Object.entries(env).reduce(
      (acc, [key, value]) => {
        try {
          if (typeof value === "string" && key !== "SETTLEMINT_INSTANCE") {
            const url = new URL(value);
            url.pathname = `/${encodeURIComponent(env.SETTLEMINT_ACCESS_TOKEN!)}/${url.pathname.slice(1)}`;
            acc[key] = url.toString();
          }
          if (Array.isArray(value)) {
            acc[key] = value.map((v) => {
              if (typeof v === "string") {
                const url = new URL(v);
                url.pathname = `/${encodeURIComponent(env.SETTLEMINT_ACCESS_TOKEN!)}/${url.pathname.slice(1)}`;
                return url.toString();
              }
              return v;
            });
          }
        } catch {}
        return acc;
      },
      env as Record<string, unknown>,
    );
    await writeFile(
      join(projectDir, ".env"),
      Object.entries(envWithAccessTokenInUrl)
        .map(([key, value]) => `${key}=${typeof value === "string" ? value : JSON.stringify(value)}`)
        .join("\n"),
    );
    await unlink(join(projectDir, ".env.local"));
  });

  test("Install dependencies and link SDK to use local one", async () => {
    const env = { ...process.env, NODE_ENV: "production" };
    await registerLinkedDependencies();
    await updatePackageJsonToUseLinkedDependencies(projectDir);
    await updatePackageJsonToUseLinkedDependencies(dAppDir);
    await updatePackageJsonToUseLinkedDependencies(contractsDir);
    await updatePackageJsonToUseLinkedDependencies(subgraphDir);
    await $`bun install`.cwd(projectDir).env(env);
  });

  test("Connect to platform", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["connect", "--instance", "standalone", "--accept-defaults"],
      { cwd: projectDir },
    ).result;
    expect(output).toInclude("dApp connected");
  });

  test("Validate that .env file has the correct values", async () => {
    const env = await loadEnv(false, false, projectDir);

    expect(env.SETTLEMINT_INSTANCE).toBe("standalone");
    expect(env.SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_MINIO_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_MINIO_ACCESS_KEY).toBeString();
    expect(env.SETTLEMINT_MINIO_SECRET_KEY).toBeString();
    expect(env.SETTLEMINT_IPFS_API_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toBeArray();
    expect(env.SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH).toBeString();
    expect(env.SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_HASURA_ENDPOINT).toBeString();
    expect(env.SETTLEMINT_HASURA_ADMIN_SECRET).toBeString();
    expect(env.SETTLEMINT_BLOCKSCOUT_GRAPHQL_ENDPOINT).toBeString();
  });

  test("contracts - Install dependencies", async () => {
    const result = await $`bun run dependencies`.cwd(contractsDir);
    expect(result.exitCode).toBe(0);
  });

  test("contracts - Build and Deploy smart contracts", async () => {
    const deploymentId = "asset-tokenization-kit";
    let retries = 0;
    // Only deploy the stable coin factory, otherwise it will take very long to deploy all the contracts
    const { output: deployOutput } = await retryCommand(async () => {
      const privateKey = await findPrivateKeyByName(PRIVATE_KEY_SMART_CONTRACTS_NAMES[retries]!);
      retries++;
      return runCommand(
        COMMAND_TEST_SCOPE,
        [
          "scs",
          "hardhat",
          "deploy",
          "remote",
          "--default-sender",
          privateKey?.address!,
          "--deployment-id",
          deploymentId,
          "--module",
          "ignition/modules/stable-coin-factory.ts",
          "--accept-defaults",
        ],
        {
          cwd: contractsDir,
          env: {
            HARDHAT_IGNITION_CONFIRM_DEPLOYMENT: "false",
          },
        },
      ).result;
    });

    const deploymentInfoData = await readFile(
      join(contractsDir, "ignition", "deployments", deploymentId, "deployed_addresses.json"),
    );
    contractsDeploymentInfo = JSON.parse(deploymentInfoData.toString());
    expect(deployOutput).not.toInclude("Connected to blockchain node");
    expect(deployOutput).toInclude("successfully deployed 🚀");
    expect(deployOutput).not.toInclude("Error reading hardhat.config.ts");
  });

  test("subgraph - Update contract addresses", async () => {
    const config = await getSubgraphYamlConfig(subgraphDir);
    const updatedConfig: typeof config = {
      ...config,
      dataSources: config.dataSources.map((dataSource) => {
        const addressKey = Object.keys(contractsDeploymentInfo).find((key) => key.endsWith(`#${dataSource.name}`));
        const address = addressKey ? contractsDeploymentInfo[addressKey]! : dataSource.source.address;
        return {
          ...dataSource,
          source: {
            ...dataSource.source,
            address,
          },
        };
      }),
    };
    await updateSubgraphYamlConfig(updatedConfig, subgraphDir);
  });

  test("subgraph - Build subgraph", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["smart-contract-set", "subgraph", "build"], {
      cwd: subgraphDir,
    }).result;
    expect(output).toInclude("Build completed");
  });

  test("subgraph - Codegen subgraph", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["smart-contract-set", "subgraph", "codegen"], {
      cwd: subgraphDir,
    }).result;
    expect(output).toInclude("Types generated successfully");
  });

  test("subgraph - Deploy subgraphs", async () => {
    for (const subgraphName of SUBGRAPH_NAMES) {
      const { output } = await retryCommand(
        () =>
          runCommand(
            COMMAND_TEST_SCOPE,
            ["smart-contract-set", "subgraph", "deploy", "--accept-defaults", subgraphName],
            {
              cwd: subgraphDir,
            },
          ).result,
      );
      expect(output).toInclude("Build completed");
    }

    const env = await loadEnv(false, false, projectDir);

    expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toBeArray();
    for (const subgraphName of SUBGRAPH_NAMES) {
      const subgraphDeployed = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.some((endpoint) =>
        endpoint.endsWith(`/subgraphs/name/${subgraphName}`),
      );
      if (!subgraphDeployed) {
        expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toInclude(subgraphName);
      } else {
        expect(subgraphDeployed).toBeTrue();
      }
    }
  });

  test("hasura - Track tables", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["hasura", "track", "--accept-defaults"], {
      cwd: projectDir,
    }).result;
    expect(output).toInclude("Table tracking completed successfully");
  });

  test("dApp - Codegen", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["codegen", "--thegraph-subgraph-names", ...SUBGRAPH_NAMES],
      {
        cwd: dAppDir,
      },
    ).result;

    expect(output).toInclude("Generating Hasura resources");
    expect(output).toInclude("Generating Minio resources");
    expect(output).toInclude("Generating IPFS resources");
    expect(output).toInclude("Generating Blockscout resources");
    expect(output).toInclude("Generating Portal resources");
    expect(output).toInclude("Generating TheGraph resources");
    expect(output).toInclude("Codegen complete");
  });

  // dApp needs an updated SDK cli for this to work
  test.skip("Build app", async () => {
    const env = { ...process.env, NODE_ENV: "production" };
    try {
      await $`bun lint`.cwd(projectDir).env(env);
      await $`bun addresses`.cwd(dAppDir).env(env);
      await $`bunx tsc --noEmit`.cwd(dAppDir).env(env);
    } catch (err) {
      const shellError = err as $.ShellError;
      console.log(shellError.stdout.toString());
      console.log(shellError.stderr.toString());
      throw new Error("Build failed");
    }
  });

  test("subgraph - Remove  subgraphs", async () => {
    const subgraphToRemove = SUBGRAPH_NAMES[1];
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "subgraph", "remove", "--accept-defaults", "--force", subgraphToRemove],
      {
        cwd: subgraphDir,
      },
    ).result;
    expect(output).toInclude(`Subgraph ${subgraphToRemove} removed successfully`);

    const env = await loadEnv(false, false, projectDir);
    expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toBeArray();
    const subgraphDeployed = env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS?.some((endpoint) =>
      endpoint.endsWith(`/subgraphs/name/${subgraphToRemove}`),
    );
    if (!subgraphDeployed) {
      expect(env.SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS).toInclude(subgraphToRemove);
    } else {
      expect(subgraphDeployed).toBeTrue();
    }
  });
});
