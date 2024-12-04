import { type ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";
import isInCi from "is-in-ci";
import { isLocalEnv } from "./is-local-env";

const authSecret = randomBytes(32).toString("hex");
const commandsRunning: Record<string, ChildProcessWithoutNullStreams[]> = {};

const DEFAULT_ENV: Record<string, string> = {
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE,
  SETTLEMINT_AUTH_SECRET: authSecret,
  NEXTAUTH_URL: "http://localhost:3000",
  CI: isInCi ? "true" : "false",
};

if (isLocalEnv()) {
  // Disable warnings for self signed certificates
  DEFAULT_ENV.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function runCommand(
  testScope: string,
  args: string[],
  options: { isCli?: boolean; env?: Record<string, string>; cwd?: string } = {},
) {
  const cwd = options.cwd ?? resolve(__dirname, "../");
  const cmds = options.isCli === false ? args : [resolve(__dirname, "../../sdk/cli/src/cli.ts"), ...args];
  const proc = spawn("bun", cmds, {
    cwd,
    env: {
      ...DEFAULT_ENV,
      ...(options.env ?? {}),
    },
  });
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
  return new Promise<{ output: string; cwd: string }>((resolve, reject) => {
    proc.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      const index = commandsRunning[testScope].indexOf(proc);
      if (index > -1) {
        commandsRunning[testScope].splice(index, 1);
      }
      if (code === 0) {
        resolve({ output: output.join("\n"), cwd });
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

export function forceExitAllCommands(testScope: string) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  commandsRunning[testScope].forEach((command) => command.kill());
  commandsRunning[testScope] = [];
}
