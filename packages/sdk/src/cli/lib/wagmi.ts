import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
// TODO
import { type PackageManager, getExecutor, getPkgManager } from "@/cli/lib/package-manager";
import { findProjectRoot } from "@/common/path";
import spawn from "cross-spawn";

/**
 * Run a Hardhat command and return all console output.
 *
 * @param command - The Hardhat command to run, including any arguments.
 * @param cwd - The current working directory (optional).
 * @returns A Promise that resolves with the console output as a string.
 */
export async function runWagmiCli(
  command: string,
  packageManager?: PackageManager,
  cwd: string = process.cwd(),
): Promise<string> {
  const allArgs = command.split(/\s+/);
  const args: string[] = ["wagmi", ...allArgs];

  const wagmiCliConfig = `import { defineConfig } from '@wagmi/cli'
import { hardhat, react, actions } from '@wagmi/cli/plugins'

/** @type {import('@wagmi/cli/plugins').HardhatConfig} */
const hardhatConfig = {
  project: './contracts',
}

/** @type {import('@wagmi/cli/plugins').ReactConfig} */
const reactConfig = {}

/** @type {import('@wagmi/cli/plugins').ActionsConfig} */
const actionsConfig = {}

/** @type {import('@wagmi/cli').Config} */
export default defineConfig({
  out: '.settlemint/wagmi/generated.ts',
  plugins: [
    hardhat(hardhatConfig),
    react(reactConfig),
    actions(actionsConfig),
  ],
})
`;

  // Create directory structure
  const settleMintDir = join(findProjectRoot(process.cwd()), ".settlemint");
  const wagmiDir = join(settleMintDir, "wagmi");
  mkdirSync(wagmiDir, { recursive: true });

  // Write Portal REST types to file
  const wagmiConfigPath = join(wagmiDir, "wagmi.config.ts");
  writeFileSync(wagmiConfigPath, wagmiCliConfig);

  return new Promise((resolve, reject) => {
    const child = spawn(getExecutor(packageManager ?? getPkgManager()), args, {
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
    const logStream = createWriteStream(join(cwd, ".settlemint/logs/wagmi.log"), { flags: "a" });

    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("close", (code) => {
      logStream.end();
      if (code !== 0) {
        reject(new Error(`${getExecutor(packageManager ?? getPkgManager())} ${args.join(" ")}\n\n${output}`));
        return;
      }
      resolve(output);
    });
  });
}
