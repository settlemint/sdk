import { copyFile, unlink } from "node:fs/promises";
import path from "node:path";
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
    .requiredOption("--name <name>", "Name of the output file")
    .requiredOption("--version <version>", "Version of the chaincode")
    .requiredOption("--path <path>", "Path to the chaincode")
    .requiredOption("--lang <language>", "Language the chaincode is written in");

  cmd.action(async function packageAction(options) {
    note(`Packaging chaincode ${options.version}...`);

    try {
      const { name, version, path: ccPath, lang } = options;

      // Handle package.json if it exists
      const rootPackageJsonPath = path.join(process.cwd(), "package.json");
      const ccPackageJsonPath = path.join(ccPath, "package.json");

      // Copy package.json if it exists in root
      const hasRootPackageJson = await exists(rootPackageJsonPath);
      if (hasRootPackageJson) {
        await copyFile(rootPackageJsonPath, ccPackageJsonPath);
      }

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

      outro("Chaincode is packaged successfully");
    } catch (error) {
      cancel(`Chaincode packaging failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  return cmd;
}
