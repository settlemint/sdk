import { beforeEach, describe, expect, it, mock } from "bun:test";
import {} from "@/error/missing-config-error";
import { getApplicationOrPersonalAccessToken } from "./get-app-or-personal-token";

describe("getApplicationOrPersonalAccessToken", () => {
  const mockLoadEnv = mock(() => ({
    SETTLEMINT_ACCESS_TOKEN: "app-token-123",
  }));

  const mockGetInstanceCredentials = mock(() => ({
    personalAccessToken: "personal-token-456",
  }));

  // Mock cancel to prevent process exit
  const mockCancel = mock((message: string) => {
    throw new Error(message);
  });

  beforeEach(() => {
    mockLoadEnv.mockClear();
    mockGetInstanceCredentials.mockClear();
    mockCancel.mockClear();
  });

  it('should prefer application token when preference is "application"', async () => {
    mock.module("@settlemint/sdk-utils", () => ({
      loadEnv: mockLoadEnv,
    }));
    mock.module("@/utils/config", () => ({
      getInstanceCredentials: mockGetInstanceCredentials,
    }));

    const result = await getApplicationOrPersonalAccessToken({
      validateEnv: false,
      prod: false,
      instance: "test-instance",
      prefer: "application",
      strict: false,
    });

    expect(result).toBe("app-token-123");
  });

  it('should prefer personal token when preference is "personal"', async () => {
    mock.module("@settlemint/sdk-utils", () => ({
      loadEnv: mockLoadEnv,
    }));
    mock.module("@/utils/config", () => ({
      getInstanceCredentials: mockGetInstanceCredentials,
    }));

    const result = await getApplicationOrPersonalAccessToken({
      validateEnv: false,
      prod: false,
      instance: "test-instance",
      prefer: "personal",
      strict: false,
    });

    expect(result).toBe("personal-token-456");
  });
});
