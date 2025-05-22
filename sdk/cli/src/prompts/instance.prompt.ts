import { getInstances } from "@/utils/config";
import { sanitizeInstanceUrl } from "@/utils/instance-url-utils";
import input from "@inquirer/input";
import select from "@inquirer/select";
import { note } from "@settlemint/sdk-utils/terminal";
import { type DotEnv, STANDALONE_INSTANCE, UrlSchema, validate } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Prompts the user for the URL of their SettleMint instance.
 *
 * @param env - Partial environment variables, potentially containing a pre-configured instance URL.
 * @returns A promise that resolves to the user-input or default SettleMint instance URL.
 * @throws Will throw an error if the input validation fails.
 *
 * @example
 * const env: Partial<DotEnv> = { SETTLEMINT_INSTANCE: "https://example.settlemint.com" };
 * const instanceUrl = await instancePrompt(env);
 * console.log(instanceUrl); // Output: https://example.settlemint.com or user input
 */
export async function instancePrompt(
  env: Partial<DotEnv>,
  accept: boolean | undefined,
  freeTextInput = false,
  isCi = isInCi,
): Promise<string> {
  const autoAccept = !!accept || isCi;
  const defaultInstance = env.SETTLEMINT_INSTANCE;
  const defaultPossible = autoAccept && defaultInstance;

  if (defaultPossible) {
    return sanitizeInstanceUrl(defaultInstance);
  }

  const knownInstances = await getInstances();
  const defaultPromptInstance =
    defaultInstance ?? (knownInstances.length > 0 ? knownInstances[0] : "https://console.settlemint.com");

  if (isCi) {
    return sanitizeInstanceUrl(defaultPromptInstance);
  }

  if (freeTextInput) {
    const instance = await input({
      message: "What is the URL of your SettleMint instance?",
      default: defaultPromptInstance,
      required: true,
      validate(value) {
        try {
          validate(UrlSchema, value);
          return true;
        } catch (error) {
          return "Invalid URL";
        }
      },
      transformer: (value) => value.trim(),
    });
    return sanitizeInstanceUrl(instance);
  }

  if (knownInstances.length === 0) {
    note("No instances found. Run `settlemint login` to configure an instance.", "warn");
  }

  return select({
    message: "What instance do you want to connect to?",
    choices: [
      ...knownInstances.map((instance) => ({
        name: instance,
        value: sanitizeInstanceUrl(instance),
      })),
      {
        name: "Standalone (services run independently of SettleMint platform)",
        value: STANDALONE_INSTANCE,
      },
    ],
    default: sanitizeInstanceUrl(defaultPromptInstance),
  });
}
