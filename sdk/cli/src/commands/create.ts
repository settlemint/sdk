import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { projectNamePrompt } from "@/prompts/project-name.prompt";
import { templatePrompt } from "@/prompts/starter-kit/template.prompt";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { Command } from "@commander-js/extra-typings";
import confirm from "@inquirer/confirm";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { emptyDir, formatTargetDir, isEmpty, setName } from "@settlemint/sdk-utils/package-manager";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { downloadAndExtractNpmPackage } from "../utils/download-extract";

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
      .option(
        "-t, --template <template>",
        "The template for your SettleMint project (run `settlemint platform config` to see available templates)",
      )
      .option("-i, --instance <instance>", "The instance to connect to")
      .action(async ({ projectName, template, instance }) => {
        intro("Creating a new SettleMint project");
        const env: Partial<DotEnv> = await loadEnv(false, false);

        const selectedInstance = instance ? sanitizeAndValidateInstanceUrl(instance) : await instancePrompt(env, true);
        const settlemint = createSettleMintClient({
          instance: selectedInstance,
          accessToken: "",
          anonymous: true,
        });

        const platformConfig = await settlemint.platform.config();
        const selectedTemplate = await templatePrompt(platformConfig, template);
        if (!selectedTemplate) {
          return nothingSelectedError("template");
        }

        const name = await projectNamePrompt(env, projectName);

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

        await spinner({
          startMessage: "Scaffolding the project",
          task: async () => {
            await downloadAndExtractNpmPackage(`@settlemint/${selectedTemplate}`, projectDir);
            await setName(name, projectDir);
          },
          stopMessage: "Project fully scaffolded",
        });

        outro("Your project is ready to go!");
      })
  );
}
