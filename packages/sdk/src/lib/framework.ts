import { existsSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "./path.ts";

type Framework = "nextjs" | "nodejs";

export async function detectFramework(): Promise<Framework> {
  const root = findProjectRoot(process.cwd());

  // Check for Next.js configuration file
  const nextConfigFiles = ["next.config.js", "next.config.mjs", "next.config.ts"];
  for (const configFile of nextConfigFiles) {
    if (existsSync(join(root, configFile))) {
      return "nextjs";
    }
  }

  // Check for package.json (Node.js)
  const packageJsonPath = join(root, "package.json");
  if (existsSync(packageJsonPath)) {
    return "nodejs";
  }

  // If neither Next.js config nor package.json is found, throw an error
  throw new Error("Unable to detect framework. Neither Next.js configuration nor package.json found.");
}
