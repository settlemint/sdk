import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";
import { $ } from "bun";
import isInCi from "is-in-ci";
import { isLocalEnv } from "./is-local-env";

const authSecret = randomBytes(32).toString("hex");
const commandsRunning: Record<string, ChildProcessWithoutNullStreams[]> = {};

const DEFAULT_ENV: Record<string, string> = {
  ...process.env,
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN!,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE!,
  CI: isInCi ? "true" : "false",
  NODE_ENV: "development",
  HARDHAT_IGNITION_CONFIRM_DEPLOYMENT: "false",
  HARDHAT_IGNITION_CONFIRM_RESET: "false",
};

if (isLocalEnv()) {
  // Disable warnings for self signed certificates
  DEFAULT_ENV.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export type CommandResult = { output: string; cwd: string };

export function runCommand(
  testScope: string,
  args: string[],
  options: { env?: Record<string, string>; cwd?: string; stdin?: string } = {},
) {
  const cwd = options.cwd ?? resolve(__dirname, "../../");
  const cmds = [resolve(__dirname, "../../sdk/cli/src/cli.ts"), ...args];
  const proc = spawn("bun", cmds, {
    cwd,
    env: {
      ...DEFAULT_ENV,
      ...(options.env ?? {}),
    },
  });
  if (options.stdin) {
    proc.stdin.write(options.stdin);
    proc.stdin.end();
  }
  const output: string[] = [];
  const errors: string[] = [];
  proc.stdout.on("data", (data) => {
    output.push(data.toString());
    console.log(data.toString());
  });
  proc.stderr.on("data", (data) => {
    errors.push(data.toString());
    console.error(data.toString());
  });
  if (!commandsRunning[testScope]) {
    commandsRunning[testScope] = [];
  }
  commandsRunning[testScope].push(proc);
  const p = new Promise<CommandResult>((resolve, reject) => {
    proc.on("close", (code: number) => {
      console.log(`child process exited with code ${code}`);
      const index = commandsRunning[testScope]?.indexOf(proc) ?? -1;
      if (index > -1) {
        commandsRunning[testScope]?.splice(index, 1);
      }
      if (code === 0 || code === null || code === 143) {
        resolve({ output: output.join("\n"), cwd });
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
  return {
    result: p,
    kill: () => proc.pid && killProcess(proc.pid),
  };
}

export function forceExitAllCommands(testScope: string) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  commandsRunning[testScope]?.forEach((command) => command.pid && killProcess(command.pid));
  commandsRunning[testScope] = [];
}

function killProcess(pid: number) {
  process.kill(pid, "SIGINT");
  $`pkill -P ${pid}`
    .then(() => console.log(`Killed process ${pid}`))
    .catch((err) => console.error(`Failed to kill process ${pid}`, err));
}
