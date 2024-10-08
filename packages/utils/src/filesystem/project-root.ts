import { dirname } from "node:path";
import { findUp } from "find-up";

export async function projectRoot(): Promise<string> {
  const packageJsonPath = await findUp("package.json");
  if (!packageJsonPath) {
    throw new Error("Unable to find project root (no package.json found)");
  }
  return dirname(packageJsonPath);
}
