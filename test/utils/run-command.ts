import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { $ } from "bun";
import isInCi from "is-in-ci";
import { isLocalEnv } from "./is-local-env";

const commandsRunning: Record<string, ChildProcessWithoutNullStreams[]> = {};

const DEFAULT_ENV: Record<string, string> = {
  ...(Object.fromEntries(
    Object.entries(process.env).filter(([_, value]) => typeof value === "string" && value !== ""),
  ) as Record<string, string>),
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN!,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE!,
  CI: isInCi ? "true" : "false",
  NODE_ENV: "development",
};

const CLI_DEV_ENTRY_POINT = resolve(__dirname, "../../sdk/cli/dist/cli.mjs");
const CLI_PROD_ENTRY_POINT = resolve(__dirname, "../../sdk/cli/dist/cli.js");

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
  let hasAccessTokenInOutput = false;
  const cwd = options.cwd ?? resolve(__dirname, "../../");
  const cliEntry = existsSync(CLI_DEV_ENTRY_POINT) ? CLI_DEV_ENTRY_POINT : CLI_PROD_ENTRY_POINT;
  const cmds = [cliEntry, ...args];
  const proc = spawn("node", cmds, {
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
    const dataString = data.toString();
    if (!hasAccessTokenInOutput) {
      hasAccessTokenInOutput = checkOutputForAccessToken(dataString);
    }
    output.push(dataString);
    console.log(dataString);
  });
  proc.stderr.on("data", (data) => {
    const dataString = data.toString();
    if (!hasAccessTokenInOutput) {
      hasAccessTokenInOutput = checkOutputForAccessToken(dataString);
    }
    errors.push(dataString);
    console.error(dataString);
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
      if (hasAccessTokenInOutput) {
        reject(new Error("Access token found in output"));
        return;
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
    stdin: proc.stdin,
    stdout: proc.stdout,
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
    .then(() => console.log(`[pkill] Killed process ${pid}`))
    .catch((pkillError) => {
      $`kill -9 ${pid}`
        .then(() => console.log(`[kill] Killed process ${pid}`))
        .catch((killError) => {
          console.error(`Failed to kill process ${pid}`, { pkillError, killError });
        });
    });
}

function checkOutputForAccessToken(output: string) {
  return /sm_(pat|aat|sat)_[0-9a-zA-Z]+/g.test(output);
}
