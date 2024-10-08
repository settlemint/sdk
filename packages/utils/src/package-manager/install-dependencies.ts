import { installPackage } from "@antfu/install-pkg";

export async function installDependencies(pkgs: string | string[]) {
  await installPackage(pkgs, { silent: true });
}
