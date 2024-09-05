import { execSync } from "node:child_process";
import { lookup } from "node:dns/promises";
import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";
import { URL } from "node:url";
import { spawn } from "cross-spawn";

/**
 * Array of supported package managers.
 */
export const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"] as const;

/**
 * Type representing supported package managers.
 */
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

/**
 * Determines the package manager based on the user agent string.
 *
 * @returns The detected package manager.
 *
 * @example
 * ```typescript
 * const manager = getPkgManager();
 * console.log(manager); // 'npm', 'pnpm', 'yarn', or 'bun'
 * ```
 */
export function getPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  if (userAgent.startsWith("bun")) {
    return "bun";
  }

  return "npm";
}

/**
 * Gets the executor command for a given package manager.
 *
 * @param packageManager - The package manager to get the executor for.
 * @returns The executor command for the given package manager.
 *
 * @example
 * ```typescript
 * const executor = getExecutor('npm');
 * console.log(executor); // 'npx'
 * ```
 */
export function getExecutor(packageManager: PackageManager): string {
  switch (packageManager) {
    case "npm":
      return "npx";
    case "pnpm":
      return "pnpm dlx";
    case "yarn":
      return "yarn dlx";
    case "bun":
      return "bunx";
    default:
      return "npx";
  }
}

/**
 * Spawns a package manager installation process based on user preference.
 *
 * @param packageManager - The package manager to use. If not provided, it will be auto-detected.
 * @param cwd - The current working directory for the installation. Defaults to the current process working directory.
 * @returns A Promise that resolves once the installation is finished.
 * @throws Will throw an error if the installation process fails.
 *
 * @example
 * ```typescript
 * try {
 *   await install('npm', '/path/to/project');
 *   console.log('Installation completed successfully');
 * } catch (error) {
 *   console.error('Installation failed:', error);
 * }
 * ```
 */
export async function install(packageManager?: PackageManager, cwd: string = process.cwd()): Promise<void> {
  const args: string[] = ["install"];
  if (!getOnline()) {
    args.push("--offline");
  }

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager ?? getPkgManager(), args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        ADBLOCK: "1",
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
      },
      cwd,
    });

    mkdirSync(join(cwd, ".settlemint/logs"), { recursive: true });
    const logStream = createWriteStream(join(cwd, ".settlemint/logs/install.log"), { flags: "a" });

    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("close", (code) => {
      logStream.end();
      if (code !== 0) {
        reject({ command: `${packageManager ?? getPkgManager()} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

/**
 * Retrieves the proxy configuration from environment variables or npm config.
 *
 * @returns The proxy URL if configured, undefined otherwise.
 */
function getProxy(): string | undefined {
  if (process.env.https_proxy) {
    return process.env.https_proxy;
  }

  try {
    const httpsProxy = execSync("npm config get https-proxy").toString().trim();
    return httpsProxy !== "null" ? httpsProxy : undefined;
  } catch (e) {
    return;
  }
}

/**
 * Checks if the system is online by attempting a DNS lookup.
 *
 * @returns A Promise that resolves to true if online, false otherwise.
 */
async function getOnline(): Promise<boolean> {
  try {
    await lookup("registry.yarnpkg.com");
    return true;
  } catch {
    const proxy = getProxy();
    if (!proxy) {
      return false;
    }

    try {
      const proxyUrl = new URL(proxy);
      const hostname = proxyUrl.hostname;
      if (!hostname) {
        return false;
      }

      try {
        await lookup(hostname);
        return true;
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  }
}
