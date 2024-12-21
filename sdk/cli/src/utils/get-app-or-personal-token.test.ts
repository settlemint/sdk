import { beforeAll, describe, expect, it, mock } from "bun:test";
import { missingAccessTokenError, missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getApplicationOrPersonalAccessToken } from "./get-app-or-personal-token";

const mockConfig = (mockReturn: unknown) => {
  return mock.module("@/utils/config", () => mockReturn);
};

const appToken = "app-token-123";
const personalToken = "personal-token-456";

describe("getApplicationOrPersonalAccessToken", () => {
  beforeAll(() => {
    mock.module("@settlemint/sdk-utils/terminal", () => ({
      cancel: (message: string) => message,
    }));
  });

  it("Preference - Application access token - Returns application access token when set", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: personalToken,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {
        SETTLEMINT_ACCESS_TOKEN: appToken,
      },
      instance: "test-instance",
      prefer: "application",
      allowFallback: false,
    });

    expect(result).toBe(appToken);
  });

  it("Preference - Application access token - Fallback allowed - Fallback to personal access token if no application access token", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: personalToken,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {},
      instance: "test-instance",
      prefer: "application",
      allowFallback: true,
    });

    expect(result).toBe(personalToken);
  });

  it("Preference - Application access token - Fallback disallowed - Error if no application access token", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: personalToken,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {},
      instance: "test-instance",
      prefer: "application",
      allowFallback: false,
    });
    expect(result).toBe(missingAccessTokenError(true));

    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: undefined,
      })),
    });
    const result2 = await getApplicationOrPersonalAccessToken({
      env: {},
      instance: "test-instance",
      prefer: "application",
      allowFallback: false,
    });
    expect(result2).toBe(missingAccessTokenError(false));
  });

  it("Preference - Personal access token - Returns personal access token when set", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: personalToken,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {
        SETTLEMINT_ACCESS_TOKEN: appToken,
      },
      instance: "test-instance",
      prefer: "personal",
      allowFallback: false,
    });

    expect(result).toBe(personalToken);
  });

  it("Preference - Personal access token - Fallback allowed - Fallback to application access token if no personal access token", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: undefined,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {
        SETTLEMINT_ACCESS_TOKEN: appToken,
      },
      instance: "test-instance",
      prefer: "personal",
      allowFallback: true,
    });

    expect(result).toBe(appToken);
  });

  it("Preference - Personal access token - Fallback disallowed - Error if no personal access token", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: undefined,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {
        SETTLEMINT_ACCESS_TOKEN: appToken,
      },
      instance: "test-instance",
      prefer: "personal",
      allowFallback: false,
    });

    expect(result).toBe(missingPersonalAccessTokenError());
  });
});
