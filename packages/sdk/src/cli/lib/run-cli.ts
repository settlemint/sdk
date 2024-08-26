import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";
import spawn from "cross-spawn";

interface RunCliCommandOptions {
  command: string;
  commandOptions: string[];
  cwd?: string;
  logFileName: string;
  envVars?: Record<string, string>;
}

export async function runCli({
  command,
  commandOptions,
  cwd = process.cwd(),
  logFileName,
  envVars = {},
}: RunCliCommandOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandOptions, {
      env: {
        ...process.env,
        ADBLOCK: "1",
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
        ...envVars,
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
    const logStream = createWriteStream(join(cwd, ".settlemint/logs", logFileName), { flags: "a" });

    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("close", (code) => {
      logStream.end();
      if (code !== 0) {
        reject(new Error(`${command} ${commandOptions.join(" ")}\n\n${output}`));
        return;
      }
      resolve(output);
    });
  });
}
