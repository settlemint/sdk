import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "./path.js";

export function updateGitignore() {
  const root = findProjectRoot(process.cwd());
  const gitignorePath = join(root, ".gitignore");

  const gitignoreContent = existsSync(gitignorePath) ? readFileSync(gitignorePath, "utf-8") : "";

  if (!gitignoreContent.split("\n").some((line) => line.trim().startsWith(".settlemint"))) {
    const updatedContent = `${gitignoreContent.trim()}\n\n.settlemint/\n`;
    writeFileSync(gitignorePath, updatedContent);
  }
}
