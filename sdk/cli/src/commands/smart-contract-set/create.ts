import { rmdir } from "node:fs/promises";
import { join } from "node:path";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { projectNamePrompt } from "@/prompts/project-name.prompt";
import { useCasePrompt } from "@/prompts/smart-contract-set/use-case.prompt";
import { sanitizeAndValidateInstanceUrl } from "@/utils/instance-url-utils";
import { executeForgeCommand } from "@/utils/smart-contract-set/execute-forge-command";
import { Command } from "@commander-js/extra-typings";
import confirm from "@inquirer/confirm";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { exists } from "@settlemint/sdk-utils/filesystem";
import { formatTargetDir, isEmpty, setName } from "@settlemint/sdk-utils/package-manager";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

/**
 * Creates and returns the 'create' command for the SettleMint SDK CLI.
 * This command bootstraps a new smart contract set project with the selected use case template.
 *
 * @returns {Command} The configured 'create' command
 */
export function createCommand(): Command {
  return new Command("create")
    .description("Bootstrap your smart contract set")
    .option("-n, --project-name <name>", "The name for your smart contract set project")
    .option(
      "--use-case <useCase>",
      "Use case for the smart contract set (run `settlemint platform config` to see available use cases)",
    )
    .option("-i, --instance <instance>", "The instance to connect to")
    .action(async ({ projectName, useCase, instance }) => {
      intro("Creating a new smart contract set");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const name = await projectNamePrompt(env, projectName);

      const selectedInstance = instance ? sanitizeAndValidateInstanceUrl(instance) : await instancePrompt(env, true);
      const settlemint = createSettleMintClient({
        instance: selectedInstance,
        accessToken: "",
        anonymous: true,
      });

      const platformConfig = await settlemint.platform.config();
      const selectedUseCase = await useCasePrompt(platformConfig, useCase);
      if (!selectedUseCase) {
        return nothingSelectedError("use case");
      }

      const targetDir = formatTargetDir(name);
      const projectDir = join(process.cwd(), targetDir);

      if ((await exists(projectDir)) && !(await isEmpty(projectDir))) {
        const confirmEmpty = await confirm({
          message: `The folder ${projectDir} already exists. Do you want to delete it?`,
          default: false,
        });
        if (!confirmEmpty) {
          cancel(`Error: A folder with the name ${targetDir} already exists in the current directory.`);
        }
        await rmdir(projectDir, { recursive: true });
      }

      await spinner({
        startMessage: "Scaffolding the smart contract set",
        task: async () => {
          await executeForgeCommand([
            "init",
            name,
            "--template",
            selectedUseCase.image.repository,
            "--branch",
            `v${selectedUseCase.image.tag}`,
          ]);
          await setName(name, projectDir);
        },
        stopMessage: "Smart contract set fully scaffolded",
      });

      outro("Your smart contract set is ready to go!");
    });
}
