import { beforeAll, describe, expect, it, mock } from "bun:test";
import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { getApplicationOrPersonalAccessToken } from "./get-app-or-personal-token";

const mockConfig = (mockReturn: unknown) => {
  return mock.module("@/utils/config", () => mockReturn);
};

const appToken = "sm_aat_123";
const personalToken = "sm_pat_456";

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
    });

    expect(result).toBe(appToken);
  });

  it("Preference - Application access token - Fallback to personal access token if no application access token", async () => {
    mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: personalToken,
      })),
    });

    const result = await getApplicationOrPersonalAccessToken({
      env: {},
      instance: "test-instance",
      prefer: "application",
    });

    expect(result).toBe(personalToken);
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
    });

    expect(result).toBe(personalToken);
  });

  it("Preference - Personal access token -  Error if no personal access token", async () => {
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
    });

    expect(result).toBe(missingPersonalAccessTokenError());
  });
});
