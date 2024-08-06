import { cosmiconfig } from "cosmiconfig";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "./path";

export type Framework = "nextjs" | "nodejs";

export async function detectFramework(): Promise<Framework> {
  // Check for Next.js configuration
  const explorer = cosmiconfig("next");
  try {
    const result = await explorer.search(process.cwd());
    if (result) {
      return "nextjs";
    }
  } catch (error) {
    // If there's an error searching for Next.js config, we'll continue to check for Node.js
  }

  const root = findProjectRoot(process.cwd());

  // Check for package.json (Node.js)
  const packageJsonPath = join(root, "package.json");
  if (existsSync(packageJsonPath)) {
    return "nodejs";
  }

  // If neither Next.js config nor package.json is found, throw an error
  throw new Error("Unable to detect framework. Neither Next.js configuration nor package.json found.");
}
