import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

const SDK_PACKAGES = [
  "cli",
  "js",
  "blockscout",
  "hasura",
  "ipfs",
  "minio",
  "next",
  "portal",
  "thegraph",
  "utils",
  "viem",
  "eas",
] as const;

const SDK_DIR = join(__dirname, "../../", "sdk");

export async function registerLinkedDependencies() {
  for (const pkg of SDK_PACKAGES) {
    await $`bun link`.cwd(join(SDK_DIR, pkg));
  }
}

export async function unlinkLinkedDependencies() {
  for (const pkg of SDK_PACKAGES) {
    await $`bun unlink`.cwd(join(SDK_DIR, pkg));
  }
}

export async function updatePackageJsonToUseLinkedDependencies(projectDir: string) {
  // Update package.json to use linked SDK packages
  const packageJsonPath = join(projectDir, "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
  for (const [key] of Object.entries(packageJson.dependencies || {})) {
    if (key.startsWith("@settlemint/")) {
      packageJson.dependencies[key] = `link:${key}`;
    }
  }
  for (const [key] of Object.entries(packageJson.devDependencies || {})) {
    if (key.startsWith("@settlemint/")) {
      packageJson.devDependencies[key] = `link:${key}`;
    }
  }
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
