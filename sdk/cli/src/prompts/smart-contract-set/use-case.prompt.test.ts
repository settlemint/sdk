import { afterAll, beforeAll, describe, expect, mock, test } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { useCasePrompt } from "./use-case.prompt";

const moduleMocker = new ModuleMocker();

const mockSelect = mock(({ choices }: { choices: { value: string }[] }) => {
  // For the multiple use cases test, return test-2
  if (choices.length === 3) {
    return Promise.resolve("test-2");
  }
  // For other tests, return the first choice
  return Promise.resolve(choices[0]?.value ?? "");
});

beforeAll(async () => {
  await moduleMocker.mock("@inquirer/select", () => ({
    default: mockSelect,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("useCasePrompt", () => {
  const mockPlatformConfig: PlatformConfig = {
    smartContractSets: {
      id: "test-sets",
      sets: [
        {
          id: "test-1",
          name: "test-1",
          featureflagged: false,
          image: {
            repository: "test-repo",
            tag: "test-tag",
            registry: "test-registry",
          },
        },
        {
          id: "test-2",
          name: "test-2",
          featureflagged: false,
          image: {
            repository: "test-repo",
            tag: "test-tag",
            registry: "test-registry",
          },
        },
        {
          id: "test-3",
          name: "test-3",
          featureflagged: false,
          image: {
            repository: "test-repo",
            tag: "test-tag",
            registry: "test-registry",
          },
        },
        {
          id: "test-4",
          name: "test-4",
          featureflagged: true,
          image: {
            repository: "test-repo",
            tag: "test-tag",
            registry: "test-registry",
          },
        },
      ],
    },
    kits: [],
    deploymentEngineTargets: [],
    preDeployedAbis: [],
    sdkVersion: "0.0.1",
  };

  test("throws error when no use cases are available", async () => {
    const emptyConfig: PlatformConfig = {
      smartContractSets: {
        id: "empty-sets",
        sets: [],
      },
      kits: [],
      deploymentEngineTargets: [],
      preDeployedAbis: [],
      sdkVersion: "0.0.1",
    };

    expect(() => useCasePrompt(emptyConfig)).toThrow("No use cases found");
  });

  test("returns the use case when only one is available", async () => {
    const singleConfig: PlatformConfig = {
      smartContractSets: {
        id: "empty-sets",
        sets: [
          {
            id: "test-1",
            name: "test-1",
            featureflagged: false,
            image: {
              repository: "test-repo",
              tag: "test-tag",
              registry: "test-registry",
            },
          },
        ],
      },
      kits: [],
      deploymentEngineTargets: [],
      preDeployedAbis: [],
      sdkVersion: "0.0.1",
    };

    const result = await useCasePrompt(singleConfig);
    expect(result).toEqual({
      id: "test-1",
      name: "test-1",
      featureflagged: false,
      image: {
        repository: "test-repo",
        tag: "test-tag",
        registry: "test-registry",
      },
    });
  });

  test("returns the use case when valid id is provided", async () => {
    const result = await useCasePrompt(mockPlatformConfig, "test-1");
    expect(result).toEqual({
      id: "test-1",
      name: "test-1",
      featureflagged: false,
      image: {
        repository: "test-repo",
        tag: "test-tag",
        registry: "test-registry",
      },
    });
  });

  test("throws error when invalid use case id is provided", async () => {
    expect(() => useCasePrompt(mockPlatformConfig, "invalid")).toThrow(
      "No use case found with id 'invalid'. Possible use cases: 'test-1, test-2, test-3'",
    );
  });

  test("prompts user to select when multiple use cases are available", async () => {
    const result = await useCasePrompt(mockPlatformConfig);

    expect(mockSelect).toHaveBeenCalledWith({
      message: "Which use case do you want to use?",
      choices: expect.arrayContaining([
        { name: "test-1", value: "test-1" },
        { name: "test-2", value: "test-2" },
        { name: "test-3", value: "test-3" },
      ]),
    });

    expect(result).toEqual({
      id: "test-2",
      name: "test-2",
      featureflagged: false,
      image: {
        repository: "test-repo",
        tag: "test-tag",
        registry: "test-registry",
      },
    });
  });

  test("excludes feature flagged use cases from choices", async () => {
    await useCasePrompt(mockPlatformConfig);

    expect(mockSelect).toHaveBeenCalledWith({
      message: "Which use case do you want to use?",
      choices: expect.arrayContaining([
        { name: "test-1", value: "test-1" },
        { name: "test-2", value: "test-2" },
        { name: "test-3", value: "test-3" },
      ]),
    });
  });
});
