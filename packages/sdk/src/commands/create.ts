import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "@commander-js/extra-typings";
import { printAsciiArt, printCancel, printIntro, printSpinner, promptConfirm } from "../lib/cli-message.js";
import { coerceSelect, coerceText } from "../lib/coerce.js";
import { setName } from "../lib/package-json.js";
import { getPkgManager, packageManagers } from "../lib/package-manager.js";
import {
  emptyDir,
  formatTargetDir,
  isEmpty,
  isValidPackageName,
  templates,
  toValidPackageName,
  write,
} from "../lib/templates.js";

/**
 * Creates and returns the 'codegen' command for the BTP SDK CLI.
 * This command generates the code for using the BTP services in the user's project.
 *
 * @returns {Command} The configured 'codegen' command
 */
export function createCommand(): Command {
  return (
    new Command("create")
      // Set the command description
      .description("Creates a new BTP integrated project")
      .option("-n, --projectName <name>", "The name for your BTP project (BTP_PROJECT_NAME environment variable)")
      .option(
        "-t, --template <url>",
        `The template for your BTP project, options are ${templates.map((templates) => templates.value).join(", ")} (BTP_TEMPLATE environment variable)`,
      )
      .option(
        "-p, --packageManager <packageManager>",
        `The package manager to use, options are ${packageManagers.join(", ")} (BTP_PACKAGE_MANAGER environment variable)`,
      )
      // Define the action to be executed when the command is run
      .action(async ({ projectName, template, packageManager }) => {
        // Display ASCII art and intro message
        printAsciiArt();
        printIntro("Creating a new BTP project");
        try {
          const selectedProjectName = await coerceText({
            type: "text",
            envValue: process.env.BTP_PROJECT_NAME,
            cliParamValue: projectName,
            validate: (value) => isValidPackageName(toValidPackageName(value ?? "")),
            promptMessage: "Enter name for your BTP project",
            existingMessage: "A valid name is already provided. Do you want to change it?",
            invalidMessage: "This is not a valid name, please choose a different name.",
          });

          const targetDir = formatTargetDir(selectedProjectName);
          const projectDir = join(process.cwd(), targetDir);
          if (!existsSync(projectDir)) {
            mkdirSync(projectDir, { recursive: true });
          }

          if (!isEmpty(projectDir)) {
            const confirmEmpty = await promptConfirm({
              message: `The folder ${projectDir} already exists. Do you want to empty it?`,
              initialValue: false,
            });
            if (!confirmEmpty) {
              printCancel(`Error: A folder with the name ${targetDir} already exists in the current directory.`);
              process.exit(1);
            }
            emptyDir(projectDir);
          }

          const selectedTemplate = await coerceSelect({
            options: templates.map((template) => ({
              value: template.value,
              label: template.label,
            })),
            envValue: process.env.BTP_TEMPLATE,
            cliParamValue: template,
            validate: (value) => templates.map((template) => template.value).includes(value?.trim() ?? ""),
            promptMessage: "Select a template",
            existingMessage: "A template is already selected. Do you want to change it?",
            skipCoerce: true,
          });

          if (!selectedTemplate) {
            printCancel("No template selected. Please select a template to continue.");
            process.exit(1);
          }

          const selectedPackageManager = await coerceSelect({
            options: packageManagers.map((pm) => ({
              value: pm,
              label: pm,
            })),
            envValue: process.env.BTP_PACKAGE_MANAGER ?? getPkgManager(),
            cliParamValue: packageManager,
            validate: (value) => packageManagers.includes(value?.trim() ?? ""),
            promptMessage: "Select a package manager",
            existingMessage: "A package manager is already selected. Do you want to change it?",
          });

          if (!selectedPackageManager) {
            printCancel("No package manager selected. Please select a package manager to continue.");
            process.exit(1);
          }

          await printSpinner({
            startMessage: "Scaffolding the project",
            task: async () => {
              const templateDir = resolve(fileURLToPath(import.meta.url), "../../../templates", selectedTemplate);
              const files = readdirSync(templateDir);
              for (const file of files.filter((f) => f !== "package.json")) {
                write(projectDir, templateDir, file);
              }
              await setName(selectedProjectName, projectDir);
            },
            stopMessage: "Project fully scaffolded",
          });
        } catch (error) {
          printCancel(`Error: ${(error as Error).message}`);
          console.error((error as Error).stack);
          process.exit(1);
        }
        process.exit(0);
      })
  );
}
