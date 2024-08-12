import { execSync } from "node:child_process";
import { lookup } from "node:dns/promises";
import { createWriteStream, mkdirSync } from "node:fs";
import { parse } from "node:url";
import spawn from "cross-spawn";

export const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"] as const;
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

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
 * Spawn a package manager installation based on user preference.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export async function install(): Promise<void> {
  const args: string[] = ["install"];
  if (!getOnline()) {
    args.push("--offline");
  }

  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    /**
     * Spawn the installation process.
     */
    const child = spawn(getPkgManager(), args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        ADBLOCK: "1",
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
      },
    });

    mkdirSync(".btp/logs", { recursive: true });
    const logStream = createWriteStream(".btp/logs/install.log", { flags: "a" });

    child.stdout?.pipe(logStream);
    child.stderr?.pipe(logStream);

    child.on("close", (code) => {
      logStream.end();
      if (code !== 0) {
        reject({ command: `${getPkgManager()} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

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

export async function getOnline(): Promise<boolean> {
  try {
    await lookup("registry.yarnpkg.com");
    // If DNS lookup succeeds, we are online
    return true;
  } catch {
    // The DNS lookup failed, but we are still fine as long as a proxy has been set
    const proxy = getProxy();
    if (!proxy) {
      return false;
    }

    const { hostname } = parse(proxy);
    if (!hostname) {
      // Invalid proxy URL
      return false;
    }

    try {
      await lookup(hostname);
      // If DNS lookup succeeds for the proxy server, we are online
      return true;
    } catch {
      // The DNS lookup for the proxy server also failed, so we are offline
      return false;
    }
  }
}
