import { afterAll, describe, expect, it, mock } from "bun:test";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import input from "@inquirer/input";
import { subgraphNamePrompt } from "./subgraph-name.prompt";

const mockInput = mock(({ default: defaultInput }: { default: string | undefined }) =>
  Promise.resolve(defaultInput ?? ""),
);

mock.module("@inquirer/input", () => ({
  default: mockInput,
}));

mock.module("@/spinners/write-env.spinner", () => ({
  writeEnvSpinner: mock(() => {
    return Promise.resolve();
  }),
}));

afterAll(() => {
  mock.restore();
});

describe("subgraphNamePrompt", () => {
  it("should return existing subgraph name when accept is true", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: "existing-subgraph",
    };

    const result = await subgraphNamePrompt({
      env,
      accept: true,
      prod: false,
    });

    expect(result).toBe("existing-subgraph");
    expect(writeEnvSpinner).not.toHaveBeenCalled();
  });

  it("should save and return new subgraph name when defaultName differs from env", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: "old-name",
    };

    const result = await subgraphNamePrompt({
      defaultName: "new-name",
      env,
      accept: true,
      prod: false,
    });

    expect(input).not.toHaveBeenCalled();
    expect(result).toBe("new-name");
    expect(writeEnvSpinner).toHaveBeenCalledWith(false, {
      ...env,
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: "new-name",
    });
  });

  it("should use default name when provided", async () => {
    const result = await subgraphNamePrompt({
      defaultName: "subgraph-name",
      env: {},
      accept: false,
      prod: false,
    });

    expect(result).toBe("subgraph-name");
    expect(writeEnvSpinner).toHaveBeenCalledWith(false, {
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: "subgraph-name",
    });
  });

  it("should prompt user for input when accept is false and no default name is provided", async () => {
    await subgraphNamePrompt({
      env: {},
      accept: false,
      prod: false,
    });

    expect(input).toHaveBeenCalledWith({
      message: "What is the name of your subgraph?",
      default: undefined,
      required: true,
    });
  });

  it("should sanitize user input", async () => {
    const result = await subgraphNamePrompt({
      defaultName: "User Input!",
      env: {},
      accept: false,
      prod: false,
    });

    expect(result).toBe("user-input");
    expect(writeEnvSpinner).toHaveBeenCalledWith(false, {
      SETTLEMINT_THEGRAPH_SUBGRAPH_NAME: "user-input",
    });
  });
});
