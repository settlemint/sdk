import { detect } from "package-manager-detector/detect";

export async function getPackageManager(targetDir: string): Promise<"yarn" | "pnpm" | "bun" | "npm"> {
  const packageManager = await detect();

  return packageManager?.name ?? "npm";
}
