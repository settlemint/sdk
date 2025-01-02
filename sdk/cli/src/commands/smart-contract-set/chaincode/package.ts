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
  console.log("\n🚀 Initializing package command...");

  const cmd = new Command("package")
    .description("Package a chaincode")
    .requiredOption("--name <name>", "Name of the output file")
    .requiredOption("--version <version>", "Version of the chaincode")
    .requiredOption("--path <path>", "Path to the chaincode")
    .requiredOption("--lang <language>", "Language the chaincode is written in");

  cmd.action(async function packageAction(options) {
    note(`Packaging chaincode ${options.version}...`);

    try {
      console.log("\n🏃 Starting packageChaincode function...");

      // Package.json handling logs
      const rootPackageJsonPath = path.join(process.cwd(), "package.json");
      console.log(`\n📦 Checking for root package.json at: ${rootPackageJsonPath}`);

      const ccPackageJsonPath = path.join(options.path, "package.json");
      console.log(`📦 Target chaincode package.json path: ${ccPackageJsonPath}`);

      const hasRootPackageJson = await exists(rootPackageJsonPath);
      console.log(`📋 Root package.json exists: ${hasRootPackageJson}`);

      if (hasRootPackageJson) {
        console.log("📝 Copying package.json to chaincode directory...");
      }

      console.log("\n🔧 Executing peer command...");
      console.log(
        "Command:",
        "peer",
        [
          "lifecycle",
          "chaincode",
          "package",
          `./${options.name}.tar.gz`,
          "--path",
          options.path,
          "--lang",
          options.lang,
          "--label",
          `${options.name}_${options.version}`,
        ].join(" "),
      );

      await packageChaincode(options);

      console.log("\n✅ Package creation completed");
      outro("Chaincode is packaged successfully");
    } catch (error) {
      cancel(`Chaincode packaging failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  console.log("📦 Package command initialized and ready");
  return cmd;
}

async function packageChaincode(options: PackageChaincodeOptions) {
  console.log("\n⚙️ packageChaincode function started");
  const { name, version, path: ccPath, lang } = options;

  // Handle package.json if it exists
  const rootPackageJsonPath = path.join(process.cwd(), "package.json");
  const ccPackageJsonPath = path.join(ccPath, "package.json");

  // Copy package.json if it exists in root
  const hasRootPackageJson = await exists(rootPackageJsonPath);
  if (hasRootPackageJson) {
    console.log("📄 Copying root package.json to chaincode directory");
    await copyFile(rootPackageJsonPath, ccPackageJsonPath);
  }

  console.log("\n🚀 Executing peer lifecycle chaincode package command");
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
    console.log("\n🧹 Cleaning up temporary package.json");
    await unlink(ccPackageJsonPath);
  }

  console.log("\n✨ packageChaincode function completed");
}
