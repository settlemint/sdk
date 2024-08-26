import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";
import { getPkgManager } from "@/cli/lib/package-manager";
import spawn from "cross-spawn";

/**
 * Run a Hardhat command and return all console output.
 *
 * @param command - The Hardhat command to run, including any arguments.
 * @param cwd - The current working directory (optional).
 * @returns A Promise that resolves with the console output as a string.
 */
export async function runHardhat(command: string, cwd: string = process.cwd()): Promise<string> {
  const allArgs = command.split(/\s+/);
  const args: string[] = ["hardhat", ...allArgs];

  return new Promise((resolve, reject) => {
    const child = spawn(getPkgManager(), args, {
      env: {
        ...process.env,
        ADBLOCK: "1",
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
      },
      cwd,
      stdio: ["inherit", "pipe", "pipe"],
    });

    let output = "";

    child.stdout?.on("data", (data) => {
      output += data.toString();
    });

    child.stderr?.on("data", (data) => {
      output += data.toString();
    });

    mkdirSync(join(cwd, ".settlemint/logs"), { recursive: true });
    const logStream = createWriteStream(join(cwd, ".settlemint/logs/hardhat.log"), { flags: "a" });

    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("close", (code) => {
      logStream.end();
      if (code !== 0) {
        reject(new Error(`${getPkgManager()} ${args.join(" ")}\n\n${output}`));
        return;
      }
      resolve(output);
    });
  });
}
