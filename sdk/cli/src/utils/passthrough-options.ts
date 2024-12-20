import type { Command } from "@commander-js/extra-typings";

export function mapPassthroughOptions(options: Record<string, string | boolean>, command: Command) {
  const optionArgs = Object.entries(options).map(([key, value]) => {
    if (value === true) {
      return `--${key}`;
    }
    return `--${key}=${value}`;
  });
  return [...optionArgs, ...command.args];
}
