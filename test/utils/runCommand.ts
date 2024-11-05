import { resolve } from "node:path";
import { $ } from "bun";

export async function runCommand(command: string) {
  const cwd = resolve(__dirname, "../");
  const out = await $`bun ../packages/cli/src/cli.ts ${command.split(" ")}`.cwd(cwd);
  const output = out.stdout?.toString();
  console.log(output);
  const errors = out.stderr?.toString();
  if (errors) {
    console.error(errors);
  }
  return { output, cwd };
}
