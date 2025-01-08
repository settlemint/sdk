import { type SpawnOptionsWithoutStdio, spawn } from "node:child_process";
import { maskTokens } from "./mask-tokens.js";

/**
 * Options for executing a command, extending SpawnOptionsWithoutStdio
 */
export interface ExecuteCommandOptions extends SpawnOptionsWithoutStdio {
  /** Whether to suppress output to stdout/stderr */
  silent?: boolean;
}

/**
 * Executes a command with the given arguments in a child process.
 * Pipes stdin to the child process and captures stdout/stderr output.
 * Masks any sensitive tokens in the output before displaying or returning.
 *
 * @param command - The command to execute
 * @param args - Array of arguments to pass to the command
 * @param options - Options for customizing command execution
 * @returns Array of output strings from stdout and stderr
 * @throws {Error} If the process fails to start or exits with non-zero code
 * @example
 * import { executeCommand } from "@settlemint/sdk-utils";
 *
 * // Execute git clone
 * await executeCommand("git", ["clone", "repo-url"]);
 *
 * // Execute silently
 * await executeCommand("npm", ["install"], { silent: true });
 */
export async function executeCommand(
  command: string,
  args: string[],
  options?: ExecuteCommandOptions,
): Promise<string[]> {
  const child = spawn(command, args, { env: { ...process.env, ...options?.env } });
  process.stdin.pipe(child.stdin);
  const output: string[] = [];
  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data: Buffer | string) => {
      const maskedData = maskTokens(data.toString());
      if (!options?.silent) {
        process.stdout.write(maskedData);
      }
      output.push(maskedData);
    });
    child.stderr.on("data", (data: Buffer | string) => {
      const maskedData = maskTokens(data.toString());
      if (!options?.silent) {
        process.stderr.write(maskedData);
      }
      output.push(maskedData);
    });
    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0 || code === null || code === 143) {
        process.stdin.unpipe(child.stdin);
        resolve(output);
        return;
      }
      reject(new Error(`Command "${command}" exited with code ${code}`));
    });
  });
}
