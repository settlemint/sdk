import { afterAll, beforeAll, describe, expect, it, mock } from "bun:test";
import { ModuleMocker } from "@/utils/test/module-mocker";
import input from "@inquirer/input";
import { subgraphNamePrompt } from "./subgraph-name.prompt";

const moduleMocker = new ModuleMocker();

const mockInput = mock(({ default: defaultInput }: { default: string | undefined }) =>
  Promise.resolve(defaultInput ?? ""),
);

beforeAll(async () => {
  await moduleMocker.mock("@inquirer/input", () => ({
    default: mockInput,
  }));
});

afterAll(() => {
  mock.restore();
  moduleMocker.clear();
});

describe("subgraphNamePrompt", () => {
  it("should return existing subgraph name when accept is true", async () => {
    const env = {
      SETTLEMINT_THEGRAPH_DEFAULT_SUBGRAPH: "existing-subgraph",
    };

    const result = await subgraphNamePrompt({
      env,
      accept: true,
    });

    expect(result).toBe("existing-subgraph");
  });

  it("should use default name when provided", async () => {
    const result = await subgraphNamePrompt({
      defaultName: "subgraph-name",
      env: {},
      accept: false,
    });

    expect(result).toBe("subgraph-name");
  });

  it("should prompt user for input when accept is false and no default name is provided", async () => {
    await subgraphNamePrompt({
      env: {},
      accept: false,
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
    });

    expect(result).toBe("user-input");
  });
});
