import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import type { ServiceType } from "@/spinners/services.spinner";
import { Command } from "@commander-js/extra-typings";
import type { Application, SettlemintClient, Workspace } from "@settlemint/sdk-js";
import * as servicesModule from "./services";

// Define an interface for the arguments to getServicesAndMapResults
interface GetServicesAndMapResultsArgs {
  instance: string;
  settlemint: SettlemintClient;
  applicationUniqueName: string;
  types?: ServiceType[];
  printToTerminal: boolean;
  wide: boolean;
}

// --- Mocks for external dependencies ---
const mockLoadEnvFn = mock(
  async (): Promise<Partial<{ SETTLEMINT_APPLICATION: string }>> => ({ SETTLEMINT_APPLICATION: "env-app" }),
);
const mockInstancePromptFn = mock(async () => "https://console.settlemint.com");
const mockGetInstanceCredentialsFn = mock(async () => ({ personalAccessToken: "test-token" }));

const mockWorkspace: Workspace = {
  id: "ws-id",
  uniqueName: "ws-test",
  name: "WS Test",
  applications: [],
};

const mockAppReadFn = mock(
  async (appName: string): Promise<Application> => ({
    id: `app-id-${appName}`,
    uniqueName: appName,
    name: appName.toUpperCase(),
    workspace: mockWorkspace,
  }),
);

const mockCreateSettleMintClientFn = mock(
  () =>
    ({
      application: { read: mockAppReadFn },
    }) as unknown as SettlemintClient,
);

const mockJsonOutputFn = mock(() => {});
const mockYamlOutputFn = mock(() => {});
const mockTableFn = mock(() => {});
const mockIntroFn = mock(() => {});
const mockOutroFn = mock(() => {});
const mockMissingPersonalAccessTokenErrorFn = mock(() => {
  throw new Error("Missing token");
});
const mockNothingSelectedErrorFn = mock(() => {
  throw new Error("Nothing selected");
});

// --- Controlled mock implementations for internal functions ---
const mockGetServicesAndMapResultsImpl = async (args: GetServicesAndMapResultsArgs) => [];
const mockSelectApplicationImpl = async () => "selected-app-from-prompt";

// --- Bun mock.module calls for external dependencies ---
mock.module("@settlemint/sdk-utils/environment", () => ({ loadEnv: mockLoadEnvFn }));
mock.module("@/prompts/instance.prompt", () => ({ instancePrompt: mockInstancePromptFn }));
mock.module("@/utils/config", () => ({ getInstanceCredentials: mockGetInstanceCredentialsFn }));
mock.module("@settlemint/sdk-js", () => ({ createSettleMintClient: mockCreateSettleMintClientFn }));
mock.module("@/error/missing-config-error", () => ({
  missingPersonalAccessTokenError: mockMissingPersonalAccessTokenErrorFn,
}));
mock.module("@/error/nothing-selected-error", () => ({ nothingSelectedError: mockNothingSelectedErrorFn }));
mock.module("@/utils/output/json-output", () => ({ jsonOutput: mockJsonOutputFn }));
mock.module("@/utils/output/yaml-output", () => ({ yamlOutput: mockYamlOutputFn }));
mock.module("@settlemint/sdk-utils/terminal", () => ({ intro: mockIntroFn, outro: mockOutroFn, table: mockTableFn }));

// servicesCommand and SERVICE_TYPES are imported via servicesModule
const { servicesCommand, SERVICE_TYPES } = servicesModule;

describe("servicesCommand", () => {
  let program: Command;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let getServicesAndMapResultsSpy: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let selectApplicationSpy: any;

  beforeEach(async () => {
    // Reset direct function mocks for external dependencies
    mockLoadEnvFn.mockClear();
    mockInstancePromptFn.mockClear();
    mockGetInstanceCredentialsFn.mockClear();
    mockCreateSettleMintClientFn.mockClear();
    mockAppReadFn.mockClear();
    mockJsonOutputFn.mockClear();
    mockYamlOutputFn.mockClear();
    mockTableFn.mockClear();
    mockIntroFn.mockClear();
    mockOutroFn.mockClear();
    mockMissingPersonalAccessTokenErrorFn.mockClear();
    mockNothingSelectedErrorFn.mockClear();

    // Spy on the exported functions from servicesModule and use our mock implementations
    getServicesAndMapResultsSpy = spyOn(servicesModule, "getServicesAndMapResults").mockImplementation(
      mockGetServicesAndMapResultsImpl,
    );
    selectApplicationSpy = spyOn(servicesModule, "selectApplication").mockImplementation(mockSelectApplicationImpl);

    mockAppReadFn.mockResolvedValue({
      id: "app-id-default",
      uniqueName: "my-app",
      name: "MY-APP",
      workspace: { ...mockWorkspace, uniqueName: "ws-my-app", name: "WS My App" },
    });

    program = new Command();
    program.addCommand(servicesCommand());
  });

  afterEach(() => {
    getServicesAndMapResultsSpy.mockRestore();
    selectApplicationSpy.mockRestore();
  });

  test("should use positional arguments for types if --type is not provided", async () => {
    mockLoadEnvFn.mockResolvedValueOnce({ SETTLEMINT_APPLICATION: "my-app" });
    await program.parseAsync(["node", "cli.js", "services", "blockchain-node", "middleware"]);
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.applicationUniqueName).toBe("my-app");
    expect(callArg.types).toEqual(["blockchain-node", "middleware"]);
  });

  test("should use --type option for types if provided", async () => {
    await program.parseAsync([
      "node",
      "cli.js",
      "services",
      "--application",
      "my-app",
      "--type",
      "storage",
      "private-key",
    ]);
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.types).toEqual(["storage", "private-key"]);
  });

  test("--type option should override positional arguments", async () => {
    await program.parseAsync([
      "node",
      "cli.js",
      "services",
      "--application",
      "my-app",
      "blockchain-node",
      "--type",
      "insights",
    ]);
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.types).toEqual(["insights"]);
  });

  test("should filter invalid positional arguments for types", async () => {
    mockLoadEnvFn.mockResolvedValueOnce({ SETTLEMINT_APPLICATION: "my-app" });
    await program.parseAsync(["node", "cli.js", "services", "invalid-type", "blockchain-node", "another-invalid"]);
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.types).toEqual(["blockchain-node"]);
  });

  test("should pass undefined types if no type arguments or options are given", async () => {
    await program.parseAsync(["node", "cli.js", "services", "--application", "my-app"]);
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.types).toBeUndefined();
  });

  test("should use jsonOutput when --output json is specified", async () => {
    await program.parseAsync(["node", "cli.js", "services", "--application", "my-app", "--output", "json"]);
    expect(mockJsonOutputFn).toHaveBeenCalled();
    expect(mockTableFn).not.toHaveBeenCalled();
  });

  test("should use yamlOutput when --output yaml is specified", async () => {
    await program.parseAsync(["node", "cli.js", "services", "--application", "my-app", "--output", "yaml"]);
    expect(mockYamlOutputFn).toHaveBeenCalled();
    expect(mockTableFn).not.toHaveBeenCalled();
  });

  test("should use table output when --output wide is specified", async () => {
    await program.parseAsync(["node", "cli.js", "services", "--application", "my-app", "--output", "wide"]);
    expect(mockTableFn).toHaveBeenCalled();
    expect(mockJsonOutputFn).not.toHaveBeenCalled();
  });

  test("should use table output by default", async () => {
    await program.parseAsync(["node", "cli.js", "services", "--application", "my-app"]);
    expect(mockTableFn).toHaveBeenCalled();
  });

  test("should call selectApplication if no app name is provided via option or env", async () => {
    mockLoadEnvFn.mockResolvedValueOnce({});
    mockAppReadFn.mockResolvedValueOnce({
      id: "app-id-prompt",
      uniqueName: "app-from-prompt",
      name: "APP-FROM-PROMPT",
      workspace: { ...mockWorkspace, uniqueName: "ws-prompt", name: "WS Prompt" },
    });

    await program.parseAsync(["node", "cli.js", "services"]);

    expect(selectApplicationSpy).toHaveBeenCalled();
    expect(getServicesAndMapResultsSpy).toHaveBeenCalled();
    const callArg = getServicesAndMapResultsSpy.mock.calls[0][0] as GetServicesAndMapResultsArgs;
    expect(callArg.applicationUniqueName).toBe("selected-app-from-prompt");
  });
});
