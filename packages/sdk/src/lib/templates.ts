import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

export const templates = [
  { value: "next-app-router", label: "Next.js (App Router)" },
  { value: "next-pages-router", label: "Next.js (Pages Router)" },
] as const;

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

const renameFiles: Record<string, string | undefined> = {
  "_env.local": ".env.local",
  // https://github.com/npm/npm/issues/1862
  _gitignore: ".gitignore",
  _npmrc: ".npmrc",
};

export function write(root: string, templateDir: string, file: string, content?: string) {
  const targetPath = join(root, renameFiles[file] ?? file);
  if (content) {
    writeFileSync(targetPath, content);
  } else {
    copy(join(templateDir, file), targetPath);
  }
}

function copyDir(srcDir: string, destDir: string) {
  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file);
    const destFile = resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

export function copy(src: string, dest: string) {
  const stat = statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    copyFileSync(src, dest);
  }
}
