import { randomBytes } from "node:crypto";
import { resolve } from "node:path";
import type { Subprocess } from "bun";
import { isLocalEnv } from "./is-local-env";

const authSecret = randomBytes(32).toString("hex");
const commandsRunning: Record<string, Subprocess[]> = {};

const DEFAULT_ENV: Record<string, string> = {
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE,
  SETTLEMINT_AUTH_SECRET: authSecret,
  NEXTAUTH_URL: "http://localhost:3000",
};

if (isLocalEnv()) {
  // Disable warnings for self signed certificates
  DEFAULT_ENV.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function runCommand(
  testScope: string,
  command: string[],
  options: { env?: Record<string, string>; cwd?: string } = {},
) {
  const cwd = options.cwd ?? resolve(__dirname, "../");
  const proc = Bun.spawn(["bun", resolve(__dirname, "../../sdk/cli/src/cli.ts"), ...command], {
    stdout: "pipe",
    cwd,
    env: {
      ...DEFAULT_ENV,
      ...(options.env ?? {}),
    },
  });
  if (!commandsRunning[testScope]) {
    commandsRunning[testScope] = [];
  }
  commandsRunning[testScope].push(proc);
  await proc.exited;
  const index = commandsRunning[testScope].indexOf(proc);
  if (index > -1) {
    commandsRunning[testScope].splice(index, 1);
  }
  const output = await new Response(proc.stdout).text();
  console.log(output);
  const errors = await new Response(proc.stderr).text();
  if (errors) {
    console.error(errors);
  }
  if (proc.exitCode !== 0) {
    console.error("Command failed");
  }
  return { output, cwd };
}

export function forceExitAllCommands(testScope: string) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  commandsRunning[testScope].forEach((command) => command.kill());
  commandsRunning[testScope] = [];
}
