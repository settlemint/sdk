import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { namePrompt } from "@/commands/create/name.prompt";
import { templatePrompt } from "@/commands/create/template.prompt";
import { Command } from "@commander-js/extra-typings";
import confirm from "@inquirer/confirm";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import {
  downloadAndExtractNpmPackage,
  emptyDir,
  formatTargetDir,
  isEmpty,
  setName,
  templates,
} from "@settlemint/sdk-utils/package-manager";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";

/**
 * Creates and returns the 'codegen' command for the SettleMint SDK CLI.
 * This command generates the code for using the SettleMint services in the user's project.
 *
 * @returns {Command} The configured 'codegen' command
 */
export function createCommand(): Command {
  return (
    new Command("create")
      // Set the command description
      .description("Bootstrap your SettleMint project")
      .option("-n, --project-name <name>", "The name for your SettleMint project")
      .option(
        "-t, --template <template>",
        `The template for your SettleMint project, options are ${templates.map((templates) => templates.value).join(", ")}`,
      )
      // Define the action to be executed when the command is run
      .action(async ({ projectName, template }) => {
        // Display ASCII art and intro message
        intro("Creating a new SettleMint project");

        const env: Partial<DotEnv> = await loadEnv(false, false);
        const name = await namePrompt(env, projectName);

        const targetDir = formatTargetDir(name);
        const projectDir = join(process.cwd(), targetDir);
        if (!existsSync(projectDir)) {
          mkdirSync(projectDir, { recursive: true });
        }

        if (!isEmpty(projectDir)) {
          const confirmEmpty = await confirm({
            message: `The folder ${projectDir} already exists. Do you want to empty it?`,
            default: false,
          });
          if (!confirmEmpty) {
            cancel(`Error: A folder with the name ${targetDir} already exists in the current directory.`);
          }
          emptyDir(projectDir);
        }

        const selectedTemplate = await templatePrompt(templates);

        if (!selectedTemplate) {
          cancel("No template selected. Please select a template to continue.");
        }

        await spinner({
          startMessage: "Scaffolding the project",
          task: async () => {
            await downloadAndExtractNpmPackage(selectedTemplate.value, projectDir);
            await setName(name, projectDir);
          },
          stopMessage: "Project fully scaffolded",
        });

        outro("Your project is ready to go!");
      })
  );
}
