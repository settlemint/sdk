import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { version } from "@/package.json";
import { downloadTemplate } from "giget";

export const templates = [{ value: "asset-tokenization", label: "Asset Tokenization" }] as const;

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

export function formatTargetDir(targetDir: string) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

export function isEmpty(path: string) {
  const files = readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function emptyDir(dir: string) {
  if (!existsSync(dir)) return;
  for (const file of readdirSync(dir)) {
    if (file === ".git") continue;
    rmSync(resolve(dir, file), { recursive: true, force: true });
  }
}

export async function downloadAndExtractNpmPackage(
  template: (typeof templates)[number]["value"],
  targetDir: string,
): Promise<void> {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  // Download and extract the package using giget
  await downloadTemplate(`https://registry.npmjs.org/${template}/-/${template}-${version}.tgz`, {
    dir: targetDir,
    force: true,
  });
}
