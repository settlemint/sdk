import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import type { IntegrationTool, Storage } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { ModuleMocker } from "@/utils/test/module-mocker";

const moduleMocker = new ModuleMocker();

const INSTANCE = "https://console.settlemint.com";
const HASURA_ENDPOINT = "https://hasura.example.com/v1/graphql";
const HASURA_DATABASE_URL = "postgresql://hasura:password@hasura.example.com:5432/hasura";
const MINIO_ENDPOINT = "https://minio.example.com";

function createHasura({ withSecrets }: { withSecrets: boolean }): IntegrationTool {
  return {
    __typename: "Hasura",
    id: "hasura-id",
    uniqueName: "hasura-1",
    name: "Hasura",
    endpoints: [
      { id: "hasura-1-graphql", label: "GraphQL", displayValue: HASURA_ENDPOINT },
      ...(withSecrets ? [{ id: "hasura-1-postgresql", label: "PostgreSQL", displayValue: HASURA_DATABASE_URL }] : []),
    ],
    credentials: withSecrets
      ? [{ id: "hasura-1-admin-secret", label: "Admin secret", displayValue: "admin-secret" }]
      : [],
  } as unknown as IntegrationTool;
}

function createMinio({ withSecrets }: { withSecrets: boolean }): Storage {
  return {
    __typename: "MinioStorage",
    id: "minio-id",
    uniqueName: "minio-1",
    name: "MinIO",
    endpoints: [{ id: "minio-1-s3-api", label: "S3 API", displayValue: MINIO_ENDPOINT }],
    credentials: [
      { id: "minio-1-access-key", label: "Access key", displayValue: "access-key" },
      ...(withSecrets ? [{ id: "minio-1-secret-key", label: "Secret key", displayValue: "secret-key" }] : []),
    ],
  } as unknown as Storage;
}

const mockLoadEnv = mock(async (): Promise<Partial<DotEnv>> => ({}));
const mockInstancePrompt = mock(async () => INSTANCE);
const mockGetInstanceCredentials = mock(async () => ({ personalAccessToken: "sm_pat_personal" }));
const mockCreateSettleMintClient = mock(() => ({}));
const mockWorkspaceSpinner = mock(async () => []);
const mockWorkspacePrompt = mock(async () => ({ uniqueName: "my-workspace", name: "My workspace", applications: [] }));
const mockApplicationPrompt = mock(async () => ({ uniqueName: "my-app", name: "My app" }));
const mockApplicationAccessTokenPrompt = mock(async () => "sm_aat_application");
const mockServicesSpinner = mock(async () => ({
  middlewares: [],
  integrationTools: [],
  storages: [],
  privateKeys: [],
  insights: [],
  customDeployments: [],
  blockchainNodes: [],
  loadBalancers: [],
}));
const mockNoServicePrompt = mock(async () => undefined);
const mockHasuraPrompt = mock(async (): Promise<IntegrationTool | undefined> => undefined);
const mockMinioPrompt = mock(async (): Promise<Storage | undefined> => undefined);
const mockWriteEnvSpinner = mock(async (_prod: boolean, _env: Partial<DotEnv>) => {});
const mockIntro = mock(() => {});
const mockOutro = mock(() => {});
const mockTable = mock(() => {});
const mockNote = mock((_message: string, _level?: string) => {});

let connectCommand: typeof import("./connect").connectCommand;

beforeAll(async () => {
  await moduleMocker.mock("@settlemint/sdk-utils/environment", () => ({ loadEnv: mockLoadEnv }));
  await moduleMocker.mock("@/prompts/instance.prompt", () => ({ instancePrompt: mockInstancePrompt }));
  await moduleMocker.mock("@/utils/config", () => ({ getInstanceCredentials: mockGetInstanceCredentials }));
  await moduleMocker.mock("@settlemint/sdk-js", () => ({ createSettleMintClient: mockCreateSettleMintClient }));
  await moduleMocker.mock("@/spinners/workspaces.spinner", () => ({ workspaceSpinner: mockWorkspaceSpinner }));
  await moduleMocker.mock("@/prompts/workspace.prompt", () => ({ workspacePrompt: mockWorkspacePrompt }));
  await moduleMocker.mock("@/prompts/application.prompt", () => ({ applicationPrompt: mockApplicationPrompt }));
  await moduleMocker.mock("@/prompts/aat.prompt", () => ({
    applicationAccessTokenPrompt: mockApplicationAccessTokenPrompt,
  }));
  await moduleMocker.mock("@/spinners/services.spinner", () => ({ servicesSpinner: mockServicesSpinner }));
  await moduleMocker.mock("@/prompts/cluster-service/blockchain-node.prompt", () => ({
    blockchainNodePrompt: mockNoServicePrompt,
  }));
  await moduleMocker.mock("@/prompts/cluster-service/blockchain-node-or-load-balancer.prompt", () => ({
    blockchainNodeOrLoadBalancerPrompt: mockNoServicePrompt,
  }));
  await moduleMocker.mock("@/prompts/cluster-service/hasura.prompt", () => ({ hasuraPrompt: mockHasuraPrompt }));
  await moduleMocker.mock("@/prompts/cluster-service/thegraph.prompt", () => ({ theGraphPrompt: mockNoServicePrompt }));
  await moduleMocker.mock("@/prompts/cluster-service/portal.prompt", () => ({ portalPrompt: mockNoServicePrompt }));
  await moduleMocker.mock("@/prompts/cluster-service/ipfs.prompt", () => ({ ipfsPrompt: mockNoServicePrompt }));
  await moduleMocker.mock("@/prompts/cluster-service/minio.prompt", () => ({ minioPrompt: mockMinioPrompt }));
  await moduleMocker.mock("@/prompts/cluster-service/hd-private-keys.prompt", () => ({
    hdPrivateKeyPrompt: mockNoServicePrompt,
  }));
  await moduleMocker.mock("@/prompts/cluster-service/custom-deployment.prompt", () => ({
    customDeploymentPrompt: mockNoServicePrompt,
  }));
  await moduleMocker.mock("@/prompts/cluster-service/blockscout.prompt", () => ({
    blockscoutPrompt: mockNoServicePrompt,
  }));
  await moduleMocker.mock("@/spinners/write-env.spinner", () => ({ writeEnvSpinner: mockWriteEnvSpinner }));
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    intro: mockIntro,
    outro: mockOutro,
    table: mockTable,
    note: mockNote,
  }));

  ({ connectCommand } = await import("./connect"));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

async function runConnect() {
  const program = new Command();
  program.addCommand(connectCommand());
  await program.parseAsync(["node", "settlemint", "connect"]);
}

function writtenEnv(): Partial<DotEnv> {
  expect(mockWriteEnvSpinner).toHaveBeenCalledTimes(1);
  return mockWriteEnvSpinner.mock.calls[0][1];
}

function warnings(): string[] {
  return mockNote.mock.calls.filter(([, level]) => level === "warn").map(([message]) => message);
}

describe("connectCommand", () => {
  beforeEach(() => {
    mockHasuraPrompt.mockReset();
    mockMinioPrompt.mockReset();
    mockWriteEnvSpinner.mockClear();
    mockNote.mockClear();
    mockOutro.mockClear();
  });

  test("writes the Hasura and MinIO secrets without a warning when the token gets them", async () => {
    mockHasuraPrompt.mockResolvedValue(createHasura({ withSecrets: true }));
    mockMinioPrompt.mockResolvedValue(createMinio({ withSecrets: true }));

    await runConnect();

    const env = writtenEnv();
    expect(env.SETTLEMINT_HASURA_ENDPOINT).toBe(HASURA_ENDPOINT);
    expect(env.SETTLEMINT_HASURA_ADMIN_SECRET).toBe("admin-secret");
    expect(env.SETTLEMINT_HASURA_DATABASE_URL).toBe(HASURA_DATABASE_URL);
    expect(env.SETTLEMINT_MINIO_ACCESS_KEY).toBe("access-key");
    expect(env.SETTLEMINT_MINIO_SECRET_KEY).toBe("secret-key");
    expect(warnings()).toEqual([]);
  });

  test("names the secrets it could not read and still writes the other values", async () => {
    mockHasuraPrompt.mockResolvedValue(createHasura({ withSecrets: false }));
    mockMinioPrompt.mockResolvedValue(createMinio({ withSecrets: false }));

    await runConnect();

    const env = writtenEnv();
    expect(env.SETTLEMINT_HASURA).toBe("hasura-1");
    expect(env.SETTLEMINT_HASURA_ENDPOINT).toBe(HASURA_ENDPOINT);
    expect(env.SETTLEMINT_MINIO).toBe("minio-1");
    expect(env.SETTLEMINT_MINIO_ENDPOINT).toBe(MINIO_ENDPOINT);
    expect(env.SETTLEMINT_MINIO_ACCESS_KEY).toBe("access-key");

    const [warning, ...otherWarnings] = warnings();
    expect(otherWarnings).toEqual([]);
    expect(warning).toContain(
      "Could not read SETTLEMINT_HASURA_ADMIN_SECRET, SETTLEMINT_HASURA_DATABASE_URL, SETTLEMINT_MINIO_SECRET_KEY.",
    );
    expect(warning).toContain("only to workspace admins using a personal access token");
    expect(mockOutro).toHaveBeenCalledWith("dApp connected");
  });

  test("only names the secrets of the selected services", async () => {
    mockMinioPrompt.mockResolvedValue(createMinio({ withSecrets: false }));

    await runConnect();

    const [warning, ...otherWarnings] = warnings();
    expect(otherWarnings).toEqual([]);
    expect(warning).toContain("Could not read SETTLEMINT_MINIO_SECRET_KEY.");
    expect(warning).not.toContain("SETTLEMINT_HASURA");
  });

  test("does not warn when no Hasura or MinIO service is selected", async () => {
    await runConnect();

    expect(writtenEnv().SETTLEMINT_HASURA_ADMIN_SECRET).toBeUndefined();
    expect(warnings()).toEqual([]);
  });
});
