import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { sanitizeCommandName } from "@/utils/sanitize-command-name";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import { type ResourceType, SETTLEMINT_CLIENT_MAP } from "./resource-type";

type DefaultArgs = {
  accept?: true | undefined;
  default?: true | undefined;
  prod?: true | undefined;
  wait?: true | undefined;
};

/**
 * Creates a command for creating resources in the SettleMint platform.
 *
 * @param options - Configuration options for the create command
 * @param options.type - The type of resource to create
 * @param options.alias - Command alias (shorthand)
 * @param options.examples - Array of example usage strings
 * @param options.execute - Function to configure and execute the create command
 * @returns A configured Commander command for creating the specified resource type
 */
export function getCreateCommand({
  type,
  alias,
  examples,
  execute,
}: {
  type: ResourceType;
  alias: string;
  examples: string[];
  execute: (
    cmd: Command<[string], DefaultArgs>,
    baseAction: (
      defaultArgs: DefaultArgs,
      createFunction: (
        settlemintClient: SettlemintClient,
        env: Partial<DotEnv>,
      ) => Promise<{
        result: { id: string; name: string };
        mapDefaultEnv: () => Partial<DotEnv> | Promise<Partial<DotEnv>>;
      }>,
    ) => void | Promise<void>,
  ) => void;
}) {
  const cmd = new Command(sanitizeCommandName(type))
    .alias(alias)
    .description(
      `Create a new ${type} in the SettleMint platform.

  Examples:

  ${examples.join("\n\n  ")}\n`,
    )
    .argument("<name>", `The ${type} name`)
    .option("-a, --accept", "Accept the default values")
    .option("-d, --default", `Save as default ${type}`)
    .option("-w, --wait", "Wait until deployed")
    .option("--prod", "Connect to production environment");

  execute(cmd, async ({ accept, prod, default: isDefault, wait }, createFunction) => {
    intro(`Creating ${type} in the SettleMint platform`);

    const autoAccept = !!accept || isInCi;
    const env: Partial<DotEnv> = await loadEnv(false, !!prod);

    const accessToken = await accessTokenPrompt(env, autoAccept);
    const instance = await instancePrompt(env, autoAccept);
    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const { result, mapDefaultEnv } = await spinner({
      startMessage: `Creating ${type}`,
      task: async () => {
        return createFunction(settlemint, env);
      },
      stopMessage: `${capitalizeFirstLetter(type)} created`,
    });

    if (isDefault) {
      const defaultEnv = mapDefaultEnv();
      const newEnv: Partial<DotEnv> = {
        SETTLEMINT_ACCESS_TOKEN: accessToken,
        SETTLEMINT_INSTANCE: instance,
        ...(defaultEnv instanceof Promise ? await defaultEnv : defaultEnv),
      };
      await writeEnvSpinner(!!prod, newEnv);
      note(`${capitalizeFirstLetter(type)} ${result.name} set as default`);
    }

    if (wait) {
      await waitForCompletion(settlemint, SETTLEMINT_CLIENT_MAP[type], result.id);
    }

    outro(`${capitalizeFirstLetter(type)} ${result.name} created successfully`);
  });

  return cmd;
}
