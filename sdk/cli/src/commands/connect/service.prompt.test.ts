import { describe, expect, it, mock } from "bun:test";
import type { DotEnv } from "@settlemint/sdk-utils";
import { servicePrompt } from "./service.prompt";

const MOCK_SERVICES = [
  { uniqueName: "service-1", name: "Service 1" },
  { uniqueName: "service-2", name: "Service 2" },
  { uniqueName: "service-3", name: "Service 3" },
];

describe("servicePrompt", () => {
  it("returns undefined if no services available", async () => {
    const mockDefaultHandler = mock(() => Promise.resolve(undefined));

    const result = await servicePrompt({
      env: {},
      services: [],
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: false,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("returns selected service if accept and service exists in env", async () => {
    const mockDefaultHandler = mock(() => Promise.resolve(undefined));
    const env: Partial<DotEnv> = { SETTLEMINT_BLOCKCHAIN_NODE: "service-2" };

    const result = await servicePrompt({
      env,
      services: MOCK_SERVICES,
      accept: true,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: false,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual({ uniqueName: "service-2", name: "Service 2" });
  });

  it("returns single service if only one available and isRequired is true", async () => {
    const mockDefaultHandler = mock(() => Promise.resolve(undefined));
    const singleService = [MOCK_SERVICES[0]];

    const result = await servicePrompt({
      env: {},
      services: singleService,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isRequired: true,
      isCi: false,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual(MOCK_SERVICES[0]);
  });

  it("prompts if service is optional and only one service is available", async () => {
    const mockDefaultHandler = mock(({ choices }) => Promise.resolve(undefined));
    const singleService = [MOCK_SERVICES[0]];

    const result = await servicePrompt({
      env: {},
      services: singleService,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isRequired: false,
      isCi: false,
    });
    expect(mockDefaultHandler).toHaveBeenCalledWith({
      defaultService: undefined,
      choices: expect.arrayContaining([
        {
          value: undefined,
          name: "None",
        },
        ...singleService.map((service) => ({ name: service.name, value: service })),
      ]),
    });
    expect(result).toBeUndefined();
  });

  it("prompts if service is required and multiple services are available", async () => {
    const mockDefaultHandler = mock(({ choices }) => Promise.resolve(undefined));

    const result = await servicePrompt({
      env: {},
      services: MOCK_SERVICES,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isRequired: true,
      isCi: false,
    });
    expect(mockDefaultHandler).toHaveBeenCalledWith({
      defaultService: undefined,
      choices:
        expect.arrayContaining(MOCK_SERVICES.map((service) => ({ name: service.name, value: service }))) &&
        expect.not.arrayContaining([
          {
            value: undefined,
            name: "None",
          },
        ]),
    });
    expect(result).toBeUndefined();
  });

  it("calls defaultHandler when multiple services and no accept", async () => {
    const selectedService = { uniqueName: "service-2", name: "Service 2" };
    const mockDefaultHandler = mock(() => Promise.resolve(selectedService));

    const result = await servicePrompt({
      env: {},
      services: MOCK_SERVICES,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: false,
    });

    expect(mockDefaultHandler).toHaveBeenCalledWith({
      defaultService: undefined,
      choices: expect.arrayContaining([
        {
          value: undefined,
          name: "None",
        },
        ...MOCK_SERVICES.map((service) => ({ name: service.name, value: service })),
      ]),
    });
    expect(result).toEqual(selectedService);
  });

  it("passes default service to handler from env", async () => {
    const env: Partial<DotEnv> = { SETTLEMINT_BLOCKCHAIN_NODE: "service-3" };
    const defaultService = MOCK_SERVICES.find((s) => s.uniqueName === env.SETTLEMINT_BLOCKCHAIN_NODE);
    const mockDefaultHandler = mock(() => Promise.resolve(defaultService));

    const result = await servicePrompt({
      env,
      services: MOCK_SERVICES,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: false,
    });

    expect(mockDefaultHandler).toHaveBeenCalledWith({
      defaultService,
      choices: expect.arrayContaining([
        {
          value: undefined,
          name: "None",
        },
        ...MOCK_SERVICES.map((service) => ({ name: service.name, value: service })),
      ]),
    });
    expect(result).toEqual(defaultService!);
  });

  it("does not call defaultHandler in CI environment", async () => {
    const selectedService = { uniqueName: "service-2", name: "Service 2" };
    const mockDefaultHandler = mock(() => Promise.resolve(selectedService));

    const result = await servicePrompt({
      env: {},
      services: MOCK_SERVICES,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: true,
    });

    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("returns selected service in CI environment if accept is false and service exists in env", async () => {
    const mockDefaultHandler = mock(() => Promise.resolve(undefined));
    const env: Partial<DotEnv> = { SETTLEMINT_BLOCKCHAIN_NODE: "service-2" };

    const result = await servicePrompt({
      env,
      services: MOCK_SERVICES,
      accept: false,
      envKey: "SETTLEMINT_BLOCKCHAIN_NODE",
      defaultHandler: mockDefaultHandler,
      isCi: true,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual({ uniqueName: "service-2", name: "Service 2" });
  });
});
