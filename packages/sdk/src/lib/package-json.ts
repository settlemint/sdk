import { default as pkgj } from "@npmcli/package-json";
import { findProjectRoot } from "./path.ts";

export async function setName(name: string, path?: string) {
  // Read the package.json file
  const pkgJson = await pkgj.load(path ?? findProjectRoot(process.cwd()));

  pkgJson.update({
    name,
  });

  await pkgJson.save();
}
