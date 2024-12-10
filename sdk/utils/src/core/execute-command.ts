import { spawn } from "node:child_process";

/**
 * Executes a command with the given arguments in a child process
 *
 * @param command - The command to execute
 * @param args - Array of arguments to pass to the command
 * @param env - Environment variables to pass to the command
 * @returns Promise that resolves when the process completes successfully
 * @throws Error if the process fails or exits with non-zero code
 */
export async function executeCommand(command: string, args: string[], env?: Record<string, string>): Promise<void> {
  const child = spawn(command, args, { env: { ...process.env, ...env } });
  return new Promise((resolve, reject) => {
    child.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    child.stderr.on("data", (data) => {
      console.error(data.toString());
    });
    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0 || code === null || code === 143) {
        resolve();
        return;
      }
      reject(new Error(`Command "${command}" exited with code ${code}`));
    });
  });
}
