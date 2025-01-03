import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

export async function registerLinkedDependencies() {
  const sdkDir = join(__dirname, "../../", "sdk");
  await $`bun link`.cwd(join(sdkDir, "cli"));
  await $`bun link`.cwd(join(sdkDir, "js"));
  await $`bun link`.cwd(join(sdkDir, "blockscout"));
  await $`bun link`.cwd(join(sdkDir, "hasura"));
  await $`bun link`.cwd(join(sdkDir, "ipfs"));
  await $`bun link`.cwd(join(sdkDir, "minio"));
  await $`bun link`.cwd(join(sdkDir, "next"));
  await $`bun link`.cwd(join(sdkDir, "portal"));
  await $`bun link`.cwd(join(sdkDir, "thegraph"));
  await $`bun link`.cwd(join(sdkDir, "utils"));
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
