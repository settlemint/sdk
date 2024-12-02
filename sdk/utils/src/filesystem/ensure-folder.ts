import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { exists } from "./exists.js";

export async function ensureFolder(path: string): Promise<void> {
  // Create the output directory if it doesn't exist
  const outputDir = dirname(path);
  if (!(await exists(outputDir))) {
    await mkdir(outputDir, { recursive: true });
  }
}
