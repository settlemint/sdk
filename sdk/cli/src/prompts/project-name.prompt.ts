import input from "@inquirer/input";
import { type DotEnv, validate } from "@settlemint/sdk-utils/validation";
import { z } from "zod";

/**
 * Prompts the user for the name of their new SettleMint project.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured project name
 * @param argument - Optional project name passed as a command line argument
 * @returns A promise that resolves to the project name
 * @throws Will throw an error if the input validation fails
 *
 * @example
 * import { projectNamePrompt } from "@/commands/create/project-name.prompt";
 *
 * const env: Partial<DotEnv> = { SETTLEMINT_NEW_PROJECT_NAME: "my-project" };
 * const projectName = await projectNamePrompt(env);
 * console.log(projectName); // Output: "my-project" or user input
 */
export async function projectNamePrompt(env: Partial<DotEnv>, argument?: string): Promise<string> {
  const defaultInstance = env.SETTLEMINT_NEW_PROJECT_NAME ?? argument;

  if (defaultInstance) {
    return defaultInstance;
  }

  return input({
    message: "What is the name of your new SettleMint project?",
    default: defaultInstance,
    required: true,
    validate(value) {
      try {
        validate(z.string(), value);
        return true;
      } catch (error) {
        return "Invalid projectname";
      }
    },
  });
}
