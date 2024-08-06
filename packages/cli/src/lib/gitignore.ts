import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findProjectRoot } from "./path";

export function updateGitignore() {
  const root = findProjectRoot(process.cwd());
  const gitignorePath = join(root, ".gitignore");

  const gitignoreContent = existsSync(gitignorePath) ? readFileSync(gitignorePath, "utf-8") : "";

  if (!gitignoreContent.split("\n").some((line) => line.trim().startsWith(".btp"))) {
    const updatedContent = `${gitignoreContent.trim()}\n\n.btp/\n`;
    writeFileSync(gitignorePath, updatedContent);
  }
}
