import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { DotEnv } from "@settlemint/sdk-utils";
import { servicePrompt } from "./service.prompt";

describe("servicePrompt", () => {
  const mockServices = [{ uniqueName: "service-1" }, { uniqueName: "service-2" }, { uniqueName: "service-3" }];

  const mockDefaultHandler = mock((): Promise<undefined | { uniqueName: string }> => Promise.resolve(undefined));

  beforeEach(() => {
    mockDefaultHandler.mockReset();
  });

  it("returns undefined if no services available", async () => {
    const result = await servicePrompt({
      env: {},
      services: [],
      accept: false,
      envKey: "SETTLEMINT_APPLICATION" as keyof DotEnv,
      defaultHandler: mockDefaultHandler,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("returns selected service if accept and service exists in env", async () => {
    const env: Partial<DotEnv> = { SETTLEMINT_APPLICATION: "service-2" };
    const result = await servicePrompt({
      env,
      services: mockServices,
      accept: true,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual({ uniqueName: "service-2" });
  });

  it("returns single service if only one available", async () => {
    const singleService = [{ uniqueName: "service-1" }];
    const result = await servicePrompt({
      env: {},
      services: singleService,
      accept: false,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual({ uniqueName: "service-1" });
  });

  it("calls defaultHandler when multiple services and no accept", async () => {
    const selectedService = { uniqueName: "service-2" };
    mockDefaultHandler.mockImplementation(() => Promise.resolve(selectedService));

    const result = await servicePrompt({
      env: {},
      services: mockServices,
      accept: false,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
    });

    expect(mockDefaultHandler).toHaveBeenCalledWith({ defaultService: undefined });
    expect(result).toEqual(selectedService);
  });

  it("passes default service to handler from env", async () => {
    const env: Partial<DotEnv> = { SETTLEMINT_APPLICATION: "service-3" };
    const defaultService = mockServices.find((s) => s.uniqueName === env.SETTLEMINT_APPLICATION);
    mockDefaultHandler.mockImplementation(() => Promise.resolve(defaultService));

    const result = await servicePrompt({
      env,
      services: mockServices,
      accept: false,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
    });

    expect(mockDefaultHandler).toHaveBeenCalledWith({ defaultService });
    expect(result).toEqual(defaultService!);
  });

  it("does not call defaultHandler in CI environment", async () => {
    const selectedService = { uniqueName: "service-2" };
    mockDefaultHandler.mockImplementation(() => Promise.resolve(selectedService));

    const result = await servicePrompt({
      env: {},
      services: mockServices,
      accept: false,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
      isCi: true,
    });

    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it("returns selected service in CI environment if accept is false and service exists in env", async () => {
    const env: Partial<DotEnv> = { SETTLEMINT_APPLICATION: "service-2" };
    const result = await servicePrompt({
      env,
      services: mockServices,
      accept: false,
      envKey: "SETTLEMINT_APPLICATION",
      defaultHandler: mockDefaultHandler,
      isCi: true,
    });
    expect(mockDefaultHandler).not.toHaveBeenCalled();
    expect(result).toEqual({ uniqueName: "service-2" });
  });
});
