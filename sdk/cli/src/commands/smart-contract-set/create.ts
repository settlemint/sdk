import { rmdir } from "node:fs/promises";
import { join } from "node:path";
import { SMART_CONTRACT_SETS, SMART_CONTRACT_SET_DETAILS } from "@/constants/smart-contract-sets";
import { Command, Option } from "@commander-js/extra-typings";
import confirm from "@inquirer/confirm";
import { type DotEnv, executeCommand, exists } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { formatTargetDir, isEmpty, setName } from "@settlemint/sdk-utils/package-manager";
import { cancel, intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import { $ } from "bun";
import { namePrompt } from "../create/name.prompt";
import { useCasePrompt } from "./prompts/use-case.prompt";

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
      .description("Bootstrap your smart contract set")
      .option("-n, --project-name <name>", "The name for your smart contract set project")
      .addOption(
        new Option("--use-case <useCase>", "Use case for the smart contract set")
          .choices(SMART_CONTRACT_SETS)
          .makeOptionMandatory(),
      )
      .action(async ({ projectName, useCase }) => {
        intro("Creating a new smart contract set");

        const env: Partial<DotEnv> = await loadEnv(false, false);
        const name = await namePrompt(env, projectName);

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
          await rmdir(projectDir);
        }

        const selectedUseCase = await useCasePrompt(useCase);

        if (!selectedUseCase) {
          cancel("No use case selected. Please select a use case to continue.");
        }

        await spinner({
          startMessage: "Scaffolding the smart contract set",
          task: async () => {
            const smartContractSet = SMART_CONTRACT_SET_DETAILS.find((set) => set.id === selectedUseCase);
            if (!smartContractSet) {
              throw new Error(`No smart contract set found for use case ${selectedUseCase}`);
            }
            await executeCommand("forge", [
              "init",
              name,
              "--template",
              smartContractSet.image.repository,
              "--branch",
              `v${smartContractSet.image.tag}`,
            ]);
            await setName(name, projectDir);
          },
          stopMessage: "Smart contract set fully scaffolded",
        });

        outro("Your smart contract set is ready to go!");
      })
  );
}
