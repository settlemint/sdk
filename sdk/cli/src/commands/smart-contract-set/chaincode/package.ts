import { unlink } from "node:fs/promises";
import path from "node:path";
import { Command } from "@commander-js/extra-typings";
import { executeCommand } from "@settlemint/sdk-utils";
import { cancel, note, outro } from "@settlemint/sdk-utils/terminal";

interface PackageOptions {
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
    .requiredOption("--lang <language>", "Language the chaincode is written in")
    .action(async (options) => {
      try {
        await packageChaincode({
          name: options.name,
          version: options.version,
          path: options.path,
          lang: options.lang,
        });
      } catch (error) {
        cancel(`Chaincode packaging failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    });

  return cmd;
}

async function packageChaincode(options: PackageOptions) {
  const { name, version, path: ccPath, lang } = options;

  note(`Packaging chaincode ${version}...`);

  // Handle package.json if it exists
  const rootPackageJson = Bun.file(path.join(process.cwd(), "package.json"));
  const ccPackageJsonPath = path.join(ccPath, "package.json");
  const ccPackageJson = Bun.file(ccPackageJsonPath);

  // Copy package.json if it exists in root
  const hasRootPackageJson = await rootPackageJson.exists();
  if (hasRootPackageJson) {
    await Bun.write(ccPackageJson, rootPackageJson);
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
  if (await ccPackageJson.exists()) {
    await unlink(ccPackageJsonPath);
  }

  outro("Chaincode is packaged successfully");
}
