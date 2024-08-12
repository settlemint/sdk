import { type PackageJson, default as pkgj } from "@npmcli/package-json";
import { findProjectRoot } from "@settlemint/btp-sdk-config";
import { compare } from "compare-versions";

export async function addDependencies(
  dependencies: Record<string, string>,
  checkVersion = false,
  path?: string,
): Promise<boolean> {
  // Read the package.json file
  const pkgJson = await pkgj.load(findProjectRoot(path ?? process.cwd()));

  const newDependencies: Record<string, string> = {};

  for (const [name, version] of Object.entries(dependencies)) {
    if (checkVersion) {
      const currentVersion = pkgJson.content.dependencies?.[name];
      if (!currentVersion || compare(currentVersion, version, "<")) {
        newDependencies[name] = version;
      }
    } else {
      newDependencies[name] = version;
    }
  }

  if (Object.keys(newDependencies).length > 0) {
    // Add the new dependencies
    pkgJson.update({
      dependencies: {
        ...(pkgJson.content.dependencies as Record<string, string>),
        ...newDependencies,
      },
    } as PackageJson);

    // Write the changes back to package.json
    await pkgJson.save();
    return true;
  }
  return false;
}

export async function setName(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgj.load(findProjectRoot(path ?? process.cwd()));

  pkgJson.update({
    name,
  });

  await pkgJson.save();
}
