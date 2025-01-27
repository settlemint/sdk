import { afterAll, describe, expect, it, mock } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { CancelError } from "@settlemint/sdk-utils/terminal";
import { getApplicationOrPersonalAccessToken } from "./get-app-or-personal-token";

const moduleMocker = new ModuleMocker();

const mockConfig = (mockReturn: Record<string, unknown>) => {
  moduleMocker.clear();
  return moduleMocker.mock("@/utils/config", () => mockReturn);
};

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

const appToken = "sm_aat_123";
const personalToken = "sm_pat_456";

describe("getApplicationOrPersonalAccessToken", () => {
  it("Preference - Application access token - Returns application access token when set", async () => {
    await mockConfig({
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
    await mockConfig({
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
    await mockConfig({
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
    await mockConfig({
      getInstanceCredentials: mock(() => ({
        personalAccessToken: undefined,
      })),
    });

    try {
      await getApplicationOrPersonalAccessToken({
        env: {
          SETTLEMINT_ACCESS_TOKEN: appToken,
        },
        instance: "test-instance",
        prefer: "personal",
      });
    } catch (err) {
      expect(err).toBeInstanceOf(CancelError);
      const error = err as CancelError;
      expect(error.message).toBe(
        "No personal access token found for instance, please run `settlemint login` to login to your instance",
      );
    }
  });
});
