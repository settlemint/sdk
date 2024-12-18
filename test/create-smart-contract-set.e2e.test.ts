import { afterAll, afterEach, beforeAll, describe, expect, setDefaultTimeout, test } from "bun:test";
import { copyFile, rmdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { $, type ShellError } from "bun";
import { forceExitAllCommands, runCommand } from "./utils/run-command";

const SMART_CONTRACT_SET_NAME = "contracts";
const COMMAND_TEST_SCOPE = __filename;
const USE_CASE = "solidity-token-erc20";

const projectDir = join(__dirname, SMART_CONTRACT_SET_NAME);

setDefaultTimeout(15 * 60_000);

async function cleanup() {
  try {
    await rmdir(projectDir, { recursive: true });
  } catch (err) {
    console.log("Failed to delete project dir", err);
  }
}

beforeAll(cleanup);
afterAll(cleanup);

afterEach(() => {
  forceExitAllCommands(COMMAND_TEST_SCOPE);
});

describe("Setup a smart contract set using the SDK", () => {
  test("Create a smart contract set and install packages", async () => {
    const { output } = await runCommand(
      COMMAND_TEST_SCOPE,
      ["smart-contract-set", "create", "--project-name", SMART_CONTRACT_SET_NAME, "--use-case", USE_CASE],
      { cwd: __dirname },
    ).result;
    expect((await stat(projectDir)).isDirectory()).toBeTrue();
    expect(output).toInclude("Your smart contract set is ready to go!");
    await $`bun install`.cwd(projectDir);
    await copyFile(join(__dirname, "../.env"), join(projectDir, ".env"));
    await copyFile(join(__dirname, "../.env.local"), join(projectDir, ".env.local"));
  });

  test("Foundry - Build smart contract set", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "foundry", "build"], { cwd: projectDir }).result;
    expect(output).toInclude("Compiler run successful");
  });

  test("Foundry - Format smart contract set", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "foundry", "format"], { cwd: projectDir }).result;
    expect(output).toInclude("Smart contract set formatted successfully!");
  });

  test("Foundry - Start local anvil network", (done) => {
    const { result, kill } = runCommand(COMMAND_TEST_SCOPE, ["scs", "foundry", "network"], { cwd: projectDir });
    result
      .then(({ output }) => {
        expect(output).toInclude("Listening on 127.0.0.1:8545");
        done();
      })
      .catch((err: ShellError) => {
        expect(err).toBeUndefined();
        done();
      });
    setTimeout(() => {
      kill();
    }, 3_000);
  });

  test("Foundry - Test smart contract set", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "foundry", "test"], { cwd: projectDir }).result;
    expect(output).toInclude("[PASS]");
    expect(output).not.toInclude("[FAIL]");
    expect(output).toInclude("Suite result: ok.");
  });

  test("Hardhat - Build smart contract set", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "build"], { cwd: projectDir }).result;
    expect(output).toMatch(/.*Compiled [0-9]+ Solidity files successfully.*/);
  });

  test("Hardhat - Test smart contract set", async () => {
    const { output } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "test"], { cwd: projectDir }).result;
    expect(output).toInclude("0 passing");
  });

  test("Hardhat - Deploy smart contract set (local)", (done) => {
    const { result, kill } = runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "network"], { cwd: projectDir });
    let isDeployed = false;
    result
      .then(() => {
        expect(isDeployed).toBeTrue();
        done();
      })
      .catch(() => {
        expect(isDeployed).toBeTrue();
        done();
      });
    setTimeout(async () => {
      const { output: deployOutput } = await runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "deploy", "local"], {
        cwd: projectDir,
      }).result;
      expect(deployOutput).toInclude("successfully deployed 🚀");

      const { output: outputReset } = await runCommand(
        COMMAND_TEST_SCOPE,
        ["scs", "hardhat", "deploy", "local", "--reset"],
        {
          cwd: projectDir,
        },
      ).result;
      expect(outputReset).toInclude("successfully deployed 🚀");
      isDeployed = true;
      kill();
    }, 3_000);
  });

  test("Hardhat - Deploy smart contract set (remote)", async () => {
    const deployCommand = runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "deploy", "remote", "--accept-defaults"], {
      cwd: projectDir,
    });
    // Confirm deployment
    const onDeployOutput = (message: string) => {
      if (message.includes("Confirm deploy")) {
        deployCommand.stdin.cork();
        deployCommand.stdin.write("y");
        deployCommand.stdin.uncork();
      }
    };
    deployCommand.stdout.on("data", onDeployOutput);
    const { output: deployOutput } = await deployCommand.result;
    deployCommand.stdout.off("data", onDeployOutput);
    expect(deployOutput).toInclude("successfully deployed 🚀");
    expect(deployOutput).not.toInclude("Error reading hardhat.config.ts");

    const resetCommand = runCommand(
      COMMAND_TEST_SCOPE,
      ["scs", "hardhat", "deploy", "remote", "--reset", "-m", "ignition/modules/main.ts", "--accept-defaults"],
      {
        cwd: projectDir,
      },
    );
    // Confirm deployment and reset
    const onResetOutput = (message: string) => {
      if (message.includes("Confirm deploy") || message.includes("Confirm reset")) {
        resetCommand.stdin.cork();
        resetCommand.stdin.write("y");
        resetCommand.stdin.uncork();
      }
    };
    resetCommand.stdout.on("data", onResetOutput);
    const { output: outputReset } = await resetCommand.result;
    resetCommand.stdout.off("data", onResetOutput);
    expect(outputReset).toInclude("successfully deployed 🚀");
    expect(outputReset).not.toInclude("Error reading hardhat.config.ts");
  });

  test("Hardhat - Deploy smart contract set (remote) - Blockchain Node Selection", async (done) => {
    const { stdout, stdin, kill } = runCommand(COMMAND_TEST_SCOPE, ["scs", "hardhat", "deploy", "remote"], {
      cwd: projectDir,
    });

    const nodeListCapture: string[] = [];
    const onDeployOutput = (message: string) => {
      if (message.includes("Which blockchain node do you want to connect to?")) {
        nodeListCapture.push(message);
        const nodeListString = nodeListCapture.join("\n");
        expect(nodeListString).not.toContain("Starter Kit Node (without activated PK)");
        stdout.off("data", onDeployOutput);
        done();
      }

      if (message.includes("Confirm deploy")) {
        stdin.cork();
        stdin.write("y");
        stdin.uncork();
      }
    };

    stdout.on("data", onDeployOutput);
  });
});
