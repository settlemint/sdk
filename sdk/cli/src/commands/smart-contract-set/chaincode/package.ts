import { copyFile, mkdir, unlink } from "node:fs/promises";
import path, { dirname } from "node:path";
import { Command } from "@commander-js/extra-typings";
import { executeCommand, exists } from "@settlemint/sdk-utils";
import { cancel, note, outro } from "@settlemint/sdk-utils/terminal";

interface PackageChaincodeOptions {
  name: string;
  version: string;
  path: string;
  lang: string;
}

export function packageChaincodeCommand() {
  const cmd = new Command("package")
    .description("Package a chaincode")
    .argument("<name>", "Name of the chaincode")
    .requiredOption("--version <version>", "Version of the chaincode")
    .requiredOption("--path <path>", "Path to the chaincode")
    .requiredOption("--lang <language>", "Language the chaincode is written in");

  cmd.action(async function packageAction(name, options) {
    note(`Packaging chaincode ${name}...`);

    try {
      const { version, path: ccPath, lang } = options;

      const ccPackageJsonPath = path.join(ccPath, "package.json");
      await ensureCcPackageJsonExists(ccPath);

      // Execute peer lifecycle chaincode package command
      await executeCommand("peer", [
        "lifecycle",
        "chaincode",
        "package",
        `./${name}.tar.gz`,
        "--path",
        ccPath,
        "--lang",
        lang,
        "--label",
        `${name}_${version}`,
      ]);

      // Cleanup package.json if we copied it
      if (await exists(ccPackageJsonPath)) {
        await unlink(ccPackageJsonPath);
      }

      outro(`Chaincode ${name} is packaged successfully`);
    } catch (error) {
      cancel(`Chaincode ${name} packaging failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  return cmd;
}

async function ensureCcPackageJsonExists(ccPath: string) {
  const rootPackageJsonPath = path.join(process.cwd(), "package.json");
  const ccPackageJsonPath = path.join(ccPath, "package.json");
  if (await exists(ccPackageJsonPath)) {
    return;
  }

  const hasRootPackageJson = await exists(rootPackageJsonPath);
  if (hasRootPackageJson) {
    await mkdir(dirname(ccPackageJsonPath), { recursive: true });
    await copyFile(rootPackageJsonPath, ccPackageJsonPath);
  }
}
