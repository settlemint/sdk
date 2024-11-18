import { resolve } from "node:path";
import { $ } from "bun";
import { isLocalEnv } from "./is-local-env";

const DEFAULT_ENV: Record<string, string> = {
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE,
};

if (isLocalEnv()) {
  // Disable warnings for self signed certificates
  DEFAULT_ENV.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function runCommand(command: string[], options: { env?: Record<string, string>; cwd?: string } = {}) {
  const cwd = options.cwd ?? resolve(__dirname, "../");
  const out = await $`bun ${resolve(__dirname, "../../packages/cli/src/cli.ts")} ${command}`.cwd(cwd).env({
    ...DEFAULT_ENV,
    ...(options.env ?? {}),
  });
  const output = out.stdout?.toString();
  console.log(output);
  const errors = out.stderr?.toString();
  if (errors) {
    console.error(errors);
  }
  if (out.exitCode !== 0) {
    console.error("Command failed");
  }
  return { output, cwd };
}
