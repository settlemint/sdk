import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { Command } from "@commander-js/extra-typings";
import type { IntegrationTool } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { ModuleMocker } from "@/utils/test/module-mocker";

const moduleMocker = new ModuleMocker();

const INSTANCE = "https://console.settlemint.com";
const APPLICATION_ACCESS_TOKEN = "sm_aat_application";
const PERSONAL_ACCESS_TOKEN = "sm_pat_personal";
const HASURA_ENDPOINT = "https://hasura.example.com/v1/graphql";
const PLATFORM_ADMIN_SECRET = "platform-admin-secret";
const ENV_ADMIN_SECRET = "env-admin-secret";

function createHasura({ withAdminSecret }: { withAdminSecret: boolean }): IntegrationTool {
  return {
    __typename: "Hasura",
    id: "hasura-id",
    uniqueName: "hasura-1",
    name: "Hasura",
    endpoints: [{ id: "hasura-1-graphql", label: "GraphQL", displayValue: HASURA_ENDPOINT }],
    credentials: withAdminSecret
      ? [{ id: "hasura-1-admin-secret", label: "Admin secret", displayValue: PLATFORM_ADMIN_SECRET }]
      : [],
  } as unknown as IntegrationTool;
}

const mockLoadEnv = mock(async (): Promise<Partial<DotEnv>> => ({}));
const mockInstancePrompt = mock(async () => INSTANCE);
const mockGetInstanceCredentials = mock(
  async (): Promise<{ personalAccessToken: string } | undefined> => ({ personalAccessToken: PERSONAL_ACCESS_TOKEN }),
);
const mockIntegrationToolList = mock(async (): Promise<IntegrationTool[]> => []);
const mockCreateSettleMintClient = mock((_options: { accessToken: string; instance: string }) => ({
  integrationTool: { list: mockIntegrationToolList },
}));
const mockServiceSpinner = mock(async (_type: string, task: () => Promise<unknown>) => task());
const mockHasuraPrompt = mock(
  async (): Promise<IntegrationTool | undefined> => createHasura({ withAdminSecret: true }),
);
const mockCreateHasuraMetadataClient = mock(
  (_options: { instance: string; accessToken?: string; adminSecret: string }) => ({}),
);
const mockTrackAllTables = mock(async () => ({ result: "success", messages: [] as string[] }));
const mockIntro = mock(() => {});
const mockOutro = mock(() => {});
const mockNote = mock(() => {});

let hasuraTrackCommand: typeof import("./track").hasuraTrackCommand;

beforeAll(async () => {
  await moduleMocker.mock("@settlemint/sdk-utils/environment", () => ({ loadEnv: mockLoadEnv }));
  await moduleMocker.mock("@/prompts/instance.prompt", () => ({ instancePrompt: mockInstancePrompt }));
  await moduleMocker.mock("@/utils/config", () => ({ getInstanceCredentials: mockGetInstanceCredentials }));
  await moduleMocker.mock("@settlemint/sdk-js", () => ({ createSettleMintClient: mockCreateSettleMintClient }));
  await moduleMocker.mock("@/spinners/service.spinner", () => ({ serviceSpinner: mockServiceSpinner }));
  await moduleMocker.mock("@/prompts/cluster-service/hasura.prompt", () => ({ hasuraPrompt: mockHasuraPrompt }));
  await moduleMocker.mock("@settlemint/sdk-hasura", () => ({
    createHasuraMetadataClient: mockCreateHasuraMetadataClient,
    trackAllTables: mockTrackAllTables,
  }));
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    intro: mockIntro,
    outro: mockOutro,
    note: mockNote,
  }));

  ({ hasuraTrackCommand } = await import("./track"));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

async function runTrack() {
  const program = new Command();
  program.addCommand(hasuraTrackCommand());
  await program.parseAsync(["node", "settlemint", "track"]);
}

describe("hasuraTrackCommand", () => {
  beforeEach(() => {
    for (const fn of [
      mockLoadEnv,
      mockInstancePrompt,
      mockGetInstanceCredentials,
      mockIntegrationToolList,
      mockCreateSettleMintClient,
      mockServiceSpinner,
      mockHasuraPrompt,
      mockCreateHasuraMetadataClient,
      mockTrackAllTables,
      mockIntro,
      mockOutro,
      mockNote,
    ]) {
      fn.mockClear();
    }
    mockLoadEnv.mockResolvedValue({
      SETTLEMINT_APPLICATION: "my-app",
      SETTLEMINT_ACCESS_TOKEN: APPLICATION_ACCESS_TOKEN,
    });
    mockGetInstanceCredentials.mockResolvedValue({ personalAccessToken: PERSONAL_ACCESS_TOKEN });
    mockHasuraPrompt.mockResolvedValue(createHasura({ withAdminSecret: true }));
  });

  test("reads the admin secret with the personal access token and keeps the application access token for Hasura", async () => {
    await runTrack();

    expect(mockCreateSettleMintClient).toHaveBeenCalledWith({
      accessToken: PERSONAL_ACCESS_TOKEN,
      instance: INSTANCE,
    });
    expect(mockCreateHasuraMetadataClient).toHaveBeenCalledWith({
      instance: HASURA_ENDPOINT,
      accessToken: APPLICATION_ACCESS_TOKEN,
      adminSecret: PLATFORM_ADMIN_SECRET,
    });
    expect(mockTrackAllTables).toHaveBeenCalledTimes(1);
  });

  test("uses SETTLEMINT_HASURA_ADMIN_SECRET when the personal access token does not get the admin secret", async () => {
    mockLoadEnv.mockResolvedValue({
      SETTLEMINT_APPLICATION: "my-app",
      SETTLEMINT_ACCESS_TOKEN: APPLICATION_ACCESS_TOKEN,
      SETTLEMINT_HASURA_ADMIN_SECRET: ENV_ADMIN_SECRET,
    });
    mockHasuraPrompt.mockResolvedValue(createHasura({ withAdminSecret: false }));

    await runTrack();

    expect(mockCreateHasuraMetadataClient).toHaveBeenCalledWith({
      instance: HASURA_ENDPOINT,
      accessToken: APPLICATION_ACCESS_TOKEN,
      adminSecret: ENV_ADMIN_SECRET,
    });
    expect(mockTrackAllTables).toHaveBeenCalledTimes(1);
  });

  test("stops with a clear message when the personal access token does not get the admin secret and it is not set", async () => {
    mockHasuraPrompt.mockResolvedValue(createHasura({ withAdminSecret: false }));

    const result = runTrack();

    await expect(result).rejects.toThrow(
      "Could not read the Hasura admin secret. The platform returns it only to workspace admins using a personal access token.",
    );
    await expect(result).rejects.toThrow("SETTLEMINT_HASURA_ADMIN_SECRET");
    expect(mockCreateHasuraMetadataClient).not.toHaveBeenCalled();
    expect(mockTrackAllTables).not.toHaveBeenCalled();
  });

  test("uses SETTLEMINT_HASURA_ADMIN_SECRET when there is no personal access token", async () => {
    mockGetInstanceCredentials.mockResolvedValue(undefined);
    mockLoadEnv.mockResolvedValue({
      SETTLEMINT_APPLICATION: "my-app",
      SETTLEMINT_ACCESS_TOKEN: APPLICATION_ACCESS_TOKEN,
      SETTLEMINT_HASURA_ADMIN_SECRET: ENV_ADMIN_SECRET,
    });
    mockHasuraPrompt.mockResolvedValue(createHasura({ withAdminSecret: false }));

    await runTrack();

    expect(mockCreateSettleMintClient).toHaveBeenCalledWith({
      accessToken: APPLICATION_ACCESS_TOKEN,
      instance: INSTANCE,
    });
    expect(mockCreateHasuraMetadataClient).toHaveBeenCalledWith({
      instance: HASURA_ENDPOINT,
      accessToken: APPLICATION_ACCESS_TOKEN,
      adminSecret: ENV_ADMIN_SECRET,
    });
    expect(mockTrackAllTables).toHaveBeenCalledTimes(1);
  });

  test("stops with a clear message when there is no personal access token and the admin secret is not set", async () => {
    mockGetInstanceCredentials.mockResolvedValue(undefined);
    mockHasuraPrompt.mockResolvedValue(createHasura({ withAdminSecret: false }));

    const result = runTrack();

    await expect(result).rejects.toThrow(
      "Could not read the Hasura admin secret: no personal access token found and SETTLEMINT_HASURA_ADMIN_SECRET is not set.",
    );
    await expect(result).rejects.toThrow("settlemint login");
    expect(mockTrackAllTables).not.toHaveBeenCalled();
  });
});
