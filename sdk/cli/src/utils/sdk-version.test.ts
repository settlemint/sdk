import { afterAll, beforeAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { note } from "@settlemint/sdk-utils/terminal";
import pkg from "../../package.json";
import { validateSdkVersion } from "./sdk-version";

const moduleMocker = new ModuleMocker();

const noteMock = mock(note);

async function mockVersion(version: string) {
  moduleMocker.clear("@settlemint/sdk-js");
  await moduleMocker.mock("@settlemint/sdk-js", () => ({
    createSettleMintClient: mock(() => ({
      platform: {
        config: mock(() => Promise.resolve({ sdkVersion: version })),
      },
    })),
  }));
}

beforeAll(async () => {
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    note: noteMock,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("SDK Version Validation", () => {
  beforeEach(() => {
    noteMock.mockClear();
  });

  test("should not warn when versions match", async () => {
    await mockVersion(pkg.version);
    await validateSdkVersion("https://test.instance");
    expect(createSettleMintClient).toHaveBeenCalledWith({
      instance: "https://test.instance",
      accessToken: "",
      anonymous: true,
    });
    expect(noteMock).not.toHaveBeenCalled();
  });

  test("should warn when SDK version is older than platform", async () => {
    await mockVersion("50.0.0");

    await validateSdkVersion("https://test.instance");

    expect(noteMock).toHaveBeenCalledWith(
      `A newer version of the SDK CLI is available (50.0.0). Please update your SDK CLI to ensure compatibility with the platform.

To update:
- For bun, run: bun install -g @settlemint/sdk-cli
- For npm, run: npm update -g @settlemint/sdk-cli
- For yarn, run: yarn global add @settlemint/sdk-cli
- For pnpm, run: pnpm update -g @settlemint/sdk-cli`,
      "warn",
    );
  });

  test("should warn when SDK version is newer than platform", async () => {
    await mockVersion("0.0.1");

    await validateSdkVersion("https://test.instance");

    expect(noteMock).toHaveBeenCalledWith(
      `SDK CLI version mismatch. The platform requires version '0.0.1' but you are using a newer version '${pkg.version}'. This might lead to compatibility issues with the platform.

To update:
- For bun, run: bun install -g @settlemint/sdk-cli
- For npm, run: npm update -g @settlemint/sdk-cli
- For yarn, run: yarn global add @settlemint/sdk-cli
- For pnpm, run: pnpm update -g @settlemint/sdk-cli`,
      "warn",
    );
  });

  test("should not warn when SDK version is newer than platform on managed instance", async () => {
    await mockVersion("0.0.1");

    await validateSdkVersion("https://console.settlemint.com/");

    expect(noteMock).not.toHaveBeenCalled();
  });
});
