import { afterAll, beforeAll, describe, expect, it, mock } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import { subgraphPrompt } from "./subgraph.prompt";

const moduleMocker = new ModuleMocker();

const mockSelect = mock(
  ({ default: defaultValue }: { default: string }): Promise<string | undefined> => Promise.resolve(defaultValue),
);
const mockCancel = mock(() => {
  throw new Error("Operation cancelled");
});
const mockSubgraphNamePrompt = mock(() => Promise.resolve("new-subgraph"));

beforeAll(async () => {
  await moduleMocker.mock("@inquirer/select", () => ({
    default: mockSelect,
  }));
  await moduleMocker.mock("@settlemint/sdk-utils/terminal", () => ({
    cancel: mockCancel,
  }));
  await moduleMocker.mock("@/prompts/smart-contract-set/subgraph-name.prompt", () => ({
    subgraphNamePrompt: mockSubgraphNamePrompt,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("subgraphPrompt", () => {
  it("should return all subgraphs when accept is true and allow all is true", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
    };

    const result = await subgraphPrompt({
      env,
      accept: true,
      message: "Select a subgraph",
      allowAll: true,
    });

    expect(result).toEqual(["subgraph1", "subgraph2"]);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("should return the default subgraph when accept is true, allow all is false and a default subgraph is set", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
      SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: "subgraph2",
    };

    const result = await subgraphPrompt({
      env,
      accept: true,
      message: "Select a subgraph",
    });

    expect(result).toEqual(["subgraph2"]);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("should return the no subgraph when accept is true, allow all is false and no default subgraph is set", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
      SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: undefined,
    };

    const result = await subgraphPrompt({
      env,
      accept: true,
      message: "Select a subgraph",
    });

    expect(result).toEqual([]);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("should cancel when no subgraphs are found", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: [],
    };

    expect(() =>
      subgraphPrompt({
        env,
        message: "Select a subgraph",
      }),
    ).toThrow();

    expect(mockCancel).toHaveBeenCalledWith("No subgraphs found");
  });

  it("should return the only subgraph when there is only one", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/single-subgraph"],
    };

    const result = await subgraphPrompt({
      env,
      message: "Select a subgraph",
    });

    expect(result).toEqual(["single-subgraph"]);
    expect(mockSelect).not.toHaveBeenCalled();
  });

  it("should prompt user to select a subgraph when multiple are available and select the correct default", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: [
        "https://example.com/subgraph1",
        "https://example.com/subgraph2",
        "https://example.com/subgraph3",
      ],
      SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: "subgraph3",
    };

    mockSelect.mockImplementationOnce(({ default: defaultValue }: { default: string }) => {
      expect(defaultValue).toBe("subgraph3");
      return Promise.resolve("subgraph2");
    });

    const result = await subgraphPrompt({
      env,
      message: "Select a subgraph",
    });

    expect(result).toEqual(["subgraph2"]);
    expect(mockSelect).toHaveBeenCalled();
  });

  it("should handle 'All' selection when allowAll is true", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
    };

    mockSelect.mockImplementationOnce(() => Promise.resolve("All"));

    const result = await subgraphPrompt({
      env,
      message: "Select a subgraph",
      allowAll: true,
    });

    expect(result).toEqual(["subgraph1", "subgraph2"]);
  });

  it("should handle 'New' selection when allowNew is true", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
    };

    mockSelect.mockImplementationOnce(() => Promise.resolve("New"));

    const result = await subgraphPrompt({
      env,
      message: "Select a subgraph",
      allowNew: true,
    });

    expect(result).toEqual(["new-subgraph"]);
    expect(mockSubgraphNamePrompt).toHaveBeenCalled();
  });

  it("should cancel when no subgraph is selected", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS: ["https://example.com/subgraph1", "https://example.com/subgraph2"],
    };

    mockSelect.mockImplementationOnce(() => Promise.resolve(undefined));

    expect(() =>
      subgraphPrompt({
        env,
        message: "Select a subgraph",
      }),
    ).toThrow();

    expect(mockCancel).toHaveBeenCalledWith("No subgraph selected");
  });
});
