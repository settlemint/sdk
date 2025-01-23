import { afterAll, describe, expect, mock, test } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import type { PlatformConfig } from "@settlemint/sdk-js";
import { useCasePrompt } from "./use-case.prompt";

const moduleMocker = new ModuleMocker();

const mockSelect = mock(({ choices }: { choices: { value: string }[] }) => Promise.resolve(choices[0]?.value ?? ""));

moduleMocker.mock("@inquirer/select", () => ({
  default: mockSelect,
}));

moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
  cancel: mock((message: string) => {
    throw new Error(message);
  }),
}));

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
          name: "solidity-test-1",
          featureflagged: false,
          image: { repository: "test", tag: "latest", registry: "test" },
        },
        {
          id: "test-2",
          name: "chaincode-test-2",
          featureflagged: false,
          image: { repository: "test", tag: "latest", registry: "test" },
        },
        {
          id: "test-3",
          name: "test-3",
          featureflagged: false,
          image: { repository: "test", tag: "latest", registry: "test" },
        },
        {
          id: "starterkit-1",
          name: "starterkit",
          featureflagged: false,
          image: { repository: "test", tag: "latest", registry: "test" },
        },
        {
          id: "hidden",
          name: "hidden",
          featureflagged: true,
          image: { repository: "test", tag: "latest", registry: "test" },
        },
      ],
    },
    deploymentEngineTargets: [],
    preDeployedContracts: [],
  };

  test("throws error when no use cases are available", async () => {
    const emptyConfig: PlatformConfig = {
      smartContractSets: {
        id: "empty-sets",
        sets: [],
      },
      deploymentEngineTargets: [],
      preDeployedContracts: [],
    };

    expect(() => useCasePrompt(emptyConfig)).toThrow("No use cases found");
  });

  test("returns the use case when only one is available", async () => {
    const singleConfig: PlatformConfig = {
      smartContractSets: {
        id: "single-set",
        sets: [
          {
            id: "test-1",
            name: "test-1",
            featureflagged: false,
            image: { repository: "test", tag: "latest", registry: "test" },
          },
        ],
      },
      deploymentEngineTargets: [],
      preDeployedContracts: [],
    };

    const result = await useCasePrompt(singleConfig);
    expect(result).toEqual({
      id: "test-1",
      name: "test-1",
      featureflagged: false,
      image: { repository: "test", tag: "latest", registry: "test" },
    });
  });

  test("returns the use case when valid id is provided", async () => {
    const result = await useCasePrompt(mockPlatformConfig, "test-1");
    expect(result).toEqual({
      id: "test-1",
      name: "solidity-test-1",
      featureflagged: false,
      image: { repository: "test", tag: "latest", registry: "test" },
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
        { name: "Fabric: test-2", value: "test-2" },
        { name: "Solidity: test-1", value: "test-1" },
        { name: "test-3", value: "test-3" },
      ]),
    });

    expect(result).toEqual({
      id: "test-2",
      name: "chaincode-test-2",
      featureflagged: false,
      image: { repository: "test", tag: "latest", registry: "test" },
    });
  });

  test("excludes feature flagged and starterkit use cases from choices", async () => {
    await useCasePrompt(mockPlatformConfig);

    expect(mockSelect).toHaveBeenCalledWith({
      message: "Which use case do you want to use?",
      choices: expect.arrayContaining([
        { name: "Solidity: test-1", value: "test-1" },
        { name: "Fabric: test-2", value: "test-2" },
        { name: "test-3", value: "test-3" },
      ]),
    });
  });
});
