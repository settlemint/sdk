import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "@settlemint/sdk-config/path";

/**
 * Updates the .gitignore file in the project root to include the .settlemint/ directory.
 * If the .gitignore file doesn't exist, it creates one with the .settlemint/ entry.
 * If the file exists but doesn't have the .settlemint/ entry, it appends it to the file.
 *
 * @throws {Error} If there's an issue reading from or writing to the .gitignore file.
 *
 * @example
 * ```typescript
 * updateGitignore();
 * ```
 */
export function updateGitignore() {
  const root = findProjectRoot(process.cwd());
  const gitignorePath = join(root, ".gitignore");

  const gitignoreContent = existsSync(gitignorePath) ? readFileSync(gitignorePath, "utf-8") : "";

  if (!gitignoreContent.split("\n").some((line) => line.trim().startsWith(".settlemint"))) {
    const updatedContent = `${gitignoreContent.trim()}\n\n.settlemint/\n`;
    writeFileSync(gitignorePath, updatedContent);
  }
}
