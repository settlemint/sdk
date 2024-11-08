import { resolve } from "node:path";
import { $ } from "bun";

const DEFAULT_ENV = {
  SETTLEMINT_ACCESS_TOKEN: process.env.SETTLEMINT_ACCESS_TOKEN,
  SETTLEMINT_INSTANCE: process.env.SETTLEMINT_INSTANCE,
};

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
  return { output, cwd };
}
