import { dirname } from "node:path";
import { findUp } from "find-up";

export async function projectRoot() {
  const packageJsonPath = await findUp("package.json");
  if (!packageJsonPath) {
    throw new Error("Unable to find project root (no package.json found)");
  }
  return dirname(packageJsonPath);
}
