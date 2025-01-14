import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { namePrompt } from "@/commands/create/name.prompt";
import { templatePrompt } from "@/commands/create/template.prompt";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { Command, Option } from "@commander-js/extra-typings";
import confirm from "@inquirer/confirm";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { emptyDir, formatTargetDir, isEmpty, setName, templates } from "@settlemint/sdk-utils/package-manager";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import { downloadAndExtractNpmPackage } from "./create/download-extract";

/**
 * Creates and returns the 'create' command for the SettleMint SDK CLI.
 * This command bootstraps a new SettleMint project from a template.
 *
 * @returns {Command} The configured 'create' command
 */
export function createCommand(): Command {
  return (
    new Command("create")
      // Set the command description
      .description("Bootstrap your SettleMint project")
      .option("-n, --project-name <name>", "The name for your SettleMint project")
      .addOption(
        new Option("-t, --template <template>", "Thehe template for your SettleMint project").choices(
          templates.map((templates) => templates.value),
        ),
      )
      // Define the action to be executed when the command is run
      .action(async ({ projectName, template }) => {
        // Display ASCII art and intro message
        intro("Creating a new SettleMint project");
        const env: Partial<DotEnv> = await loadEnv(false, false);
        const name = await namePrompt(env, projectName);

        const targetDir = formatTargetDir(name);
        const projectDir = join(process.cwd(), targetDir);
        if (!(await exists(projectDir))) {
          await mkdir(projectDir, { recursive: true });
        }

        if (!(await isEmpty(projectDir))) {
          const confirmEmpty = await confirm({
            message: `The folder ${projectDir} already exists. Do you want to empty it?`,
            default: false,
          });
          if (!confirmEmpty) {
            cancel(`Error: A folder with the name ${targetDir} already exists in the current directory.`);
          }
          await emptyDir(projectDir);
        }

        const selectedTemplate = await templatePrompt(templates, template);

        if (!selectedTemplate) {
          return nothingSelectedError("template");
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
