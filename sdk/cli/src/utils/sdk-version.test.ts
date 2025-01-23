import { describe, expect, mock, test } from "bun:test";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { note } from "@settlemint/sdk-utils/terminal";
import pkg from "../../package.json";
import { validateSdkVersion } from "./sdk-version";

const noteMock = mock(note);

function mockVersion(version: string) {
  // Mock dependencies
  mock.module("@settlemint/sdk-js", () => ({
    createSettleMintClient: mock(() => ({
      platform: {
        config: mock(() => Promise.resolve({ sdkVersion: version })),
      },
    })),
  }));
}

mock.module("@settlemint/sdk-utils/terminal", () => ({
  note: noteMock,
}));

describe("SDK Version Validation", () => {
  test("should not warn when versions match", async () => {
    mockVersion(pkg.version);
    await validateSdkVersion("https://test.instance");
    expect(createSettleMintClient).toHaveBeenCalledWith({
      instance: "https://test.instance",
      accessToken: "",
      anonymous: true,
    });
    expect(noteMock).not.toHaveBeenCalled();
  });

  test("should warn when SDK version is newer than platform", async () => {
    mockVersion("2.0.0");

    await validateSdkVersion("https://test.instance");

    expect(noteMock).toHaveBeenCalledWith(
      "A newer version of the SDK CLI is available (2.0.0). Please update your SDK CLI to ensure compatibility with the platform.",
      "warn",
    );
  });

  test("should warn when SDK version is older than platform", async () => {
    mockVersion("0.0.1");

    await validateSdkVersion("https://test.instance");

    expect(noteMock).toHaveBeenCalledWith(
      `SDK CLI version mismatch. The platform requires version '0.0.1' but you are using a newer version '${pkg.version}'. This might lead to compatibility issues with the platform.`,
      "warn",
    );
  });
});
