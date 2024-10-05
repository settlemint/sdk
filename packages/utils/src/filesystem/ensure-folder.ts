import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function ensureFolder(path: string) {
  // Create the output directory if it doesn't exist
  const outputDir = dirname(path);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
}
