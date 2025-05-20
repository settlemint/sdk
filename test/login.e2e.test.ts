import { afterEach, describe, expect, test } from "bun:test";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const COMMAND_TEST_SCOPE = __filename;

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Login command", () => {
  test("Regular login should succeed", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, ["login"]);
    const onOutput = (message: string) => {
      if (message.includes("What is the URL of your SettleMint instance?")) {
        command.stdin.cork();
        command.stdin.write(`${process.env.SETTLEMINT_INSTANCE}\n`);
        command.stdin.uncork();
      }
      if (message.includes("Do you want to use your existing personal access token")) {
        command.stdin.cork();
        command.stdin.write("y\n");
        command.stdin.uncork();
      }
    };
    command.stdout.on("data", onOutput);
    const { output } = await command.result;
    command.stdout.off("data", onOutput);
    expect(output).toInclude("Successfully logged in to SettleMint!");
  });

  test("Login with valid token via stdin should succeed", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "login",
      "--token-stdin",
      "--instance",
      process.env.SETTLEMINT_INSTANCE!,
    ]);
    command.stdin.write(`${process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS}\n`);
    command.stdin.end();

    const { output } = await command.result;
    expect(output).toInclude("Successfully logged in to SettleMint!");
  });

  test("Login with no token via stdin should fail", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, ["login", "--token-stdin"]);
    expect(() => command.result).toThrow();
  });

  test("Login with invalid token via stdin should fail", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, ["login", "--token-stdin"]);
    command.stdin.write("invalid_token\n");
    command.stdin.end();
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude("Invalid personal access token");
  });

  test("Login with token as argument should fail", async () => {
    const command = runCommand(COMMAND_TEST_SCOPE, [
      "login",
      "--token-stdin",
      process.env.SETTLEMINT_ACCESS_TOKEN_E2E_TESTS || "some_token",
    ]);
    const outputs: string[] = [];
    command.stdout.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    command.stderr.on("data", (data: Buffer) => {
      outputs.push(data.toString());
    });
    expect(() => command.result).toThrow();
    expect(outputs.join("\n")).toInclude("error: too many arguments for 'login'. Expected 0 arguments but got 1");
  });
});
