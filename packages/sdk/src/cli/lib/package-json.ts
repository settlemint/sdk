import { findProjectRoot } from "@/common/path";
import pkgjs from "@npmcli/package-json";

export async function setName(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgjs.load(path ?? findProjectRoot(process.cwd()));

  pkgJson.update({
    name,
  });

  await pkgJson.save();
}
