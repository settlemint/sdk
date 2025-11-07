import { type SpawnOptionsWithoutStdio, spawn } from "node:child_process";
import { maskTokens } from "../logging/mask-tokens.js";

/**
 * Options for executing a command, extending SpawnOptionsWithoutStdio
 */
export interface ExecuteCommandOptions extends SpawnOptionsWithoutStdio {
  /** Whether to suppress output to stdout/stderr */
  silent?: boolean;
}

/**
 * Error class for command execution errors
 * @extends Error
 */
export class CommandError extends Error {
  /**
   * Constructs a new CommandError
   * @param message - The error message
   * @param code - The exit code of the command
   * @param output - The output of the command
   */
  constructor(
    message: string,
    public readonly code: number,
    public readonly output: string[],
  ) {
    super(message);
  }
}

/**
 * Checks if we're in quiet mode (Claude Code environment)
 */
function isQuietMode(): boolean {
  return !!(process.env.CLAUDECODE || process.env.REPL_ID || process.env.AGENT);
}

/**
 * Executes a command with the given arguments in a child process.
 * Pipes stdin to the child process and captures stdout/stderr output.
 * Masks any sensitive tokens in the output before displaying or returning.
 * In quiet mode (when CLAUDECODE, REPL_ID, or AGENT env vars are set),
 * output is suppressed unless the command errors out.
 *
 * @param command - The command to execute
 * @param args - Array of arguments to pass to the command
 * @param options - Options for customizing command execution
 * @returns Array of output strings from stdout and stderr
 * @throws {CommandError} If the process fails to start or exits with non-zero code
 * @example
 * import { executeCommand } from "@settlemint/sdk-utils/terminal";
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
  const { silent, ...spawnOptions } = options ?? {};
  const quietMode = isQuietMode();
  // In quiet mode, suppress output unless explicitly overridden with silent: false
  const shouldSuppressOutput = quietMode ? silent !== false : !!silent;

  const child = spawn(command, args, { ...spawnOptions, env: { ...process.env, ...options?.env } });
  process.stdin.pipe(child.stdin);
  const output: string[] = [];
  const stdoutOutput: string[] = [];
  const stderrOutput: string[] = [];

  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data: Buffer | string) => {
      const maskedData = maskTokens(data.toString());
      if (!shouldSuppressOutput) {
        process.stdout.write(maskedData);
      }
      output.push(maskedData);
      stdoutOutput.push(maskedData);
    });
    child.stderr.on("data", (data: Buffer | string) => {
      const maskedData = maskTokens(data.toString());
      if (!shouldSuppressOutput) {
        process.stderr.write(maskedData);
      }
      output.push(maskedData);
      stderrOutput.push(maskedData);
    });

    const showErrorOutput = () => {
      // In quiet mode, show output on error
      if (quietMode && shouldSuppressOutput && output.length > 0) {
        // Write stdout to stdout and stderr to stderr
        if (stdoutOutput.length > 0) {
          process.stdout.write(stdoutOutput.join(""));
        }
        if (stderrOutput.length > 0) {
          process.stderr.write(stderrOutput.join(""));
        }
      }
    };

    child.on("error", (err) => {
      process.stdin.unpipe(child.stdin);
      showErrorOutput();
      reject(new CommandError(err.message, "code" in err && typeof err.code === "number" ? err.code : 1, output));
    });
    child.on("close", (code) => {
      process.stdin.unpipe(child.stdin);
      if (code === 0 || code === null || code === 143) {
        resolve(output);
        return;
      }
      // In quiet mode, show output on error
      showErrorOutput();
      reject(new CommandError(`Command "${command}" exited with code ${code}`, code, output));
    });
  });
}
