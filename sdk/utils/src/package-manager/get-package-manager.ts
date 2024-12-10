import type { AgentName } from "package-manager-detector";
import { detect } from "package-manager-detector/detect";

export async function getPackageManager(targetDir?: string): Promise<AgentName> {
  const packageManager = await detect({ cwd: targetDir || process.cwd() });

  return packageManager?.name ?? "npm";
}
