import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { type CommandExample, createExamples } from "@/commands/platform/utils/create-examples";
import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { sanitizeCommandName } from "@/utils/sanitize-command-name";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { type DotEnv, capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";
import type { ResourceType } from "./resource-type";
type DefaultArgs = {
  acceptDefaults?: true | undefined;
  default?: true | undefined;
  prod?: true | undefined;
  wait?: true | undefined;
  restartIfTimeout?: true | undefined;
};

/**
 * Creates a command for creating resources in the SettleMint platform.
 *
 * @param options - Configuration options for the create command
 * @param options.name - The name of the command
 * @param options.type - The type of resource to create
 * @param options.alias - Command alias for shorthand usage
 * @param options.examples - Array of example usage strings showing different ways to use the command
 * @param options.execute - Function to configure and execute the create command
 * @param options.execute.cmd - The Commander command instance to configure with options and action
 * @param options.execute.baseAction - Base action function that handles common create functionality like env loading and client setup
 * @param options.usePersonalAccessToken - Whether to use personal access token for auth (defaults to true)
 * @returns A configured Commander command for creating the specified resource type
 */
export function getCreateCommand({
  name,
  type,
  alias,
  examples,
  execute,
  usePersonalAccessToken = true,
}: {
  name: string;
  type: ResourceType;
  alias: string;
  examples: CommandExample[];
  execute: (
    cmd: Command<[string], DefaultArgs>,
    baseAction: (
      defaultArgs: DefaultArgs,
      createFunction: (
        settlemintClient: SettlemintClient,
        env: Partial<DotEnv>,
      ) => Promise<{
        result: { id: string; name: string; uniqueName: string };
        waitFor?: { resourceType: ResourceType; id: string; name: string; uniqueName: string };
        mapDefaultEnv?: () => Partial<DotEnv> | Promise<Partial<DotEnv>>;
      }>,
    ) => void | Promise<void>,
  ) => void;
  usePersonalAccessToken?: boolean;
}) {
  const cmd = new Command(sanitizeCommandName(name))
    .alias(alias)
    .description(`Create a new ${type} in the SettleMint platform.`)
    .usage(createExamples(examples))
    .argument("<name>", `The ${type} name`)
    .option("-a, --accept-defaults", "Accept the default values")
    .option("-d, --default", `Save as default ${type}`)
    .option("-w, --wait", "Wait until deployed")
    .option("-r, --restart-if-timeout", "Restart if wait time is exceeded")
    .option("--prod", "Connect to production environment");

  execute(cmd, async ({ acceptDefaults, prod, default: isDefault, wait, restartIfTimeout }, createFunction) => {
    intro(`Creating ${type} in the SettleMint platform`);

    const autoAccept = !!acceptDefaults || isInCi;
    const env: Partial<DotEnv> = await loadEnv(false, !!prod);

    const instance = await instancePrompt(env, autoAccept);
    const accessToken = await getApplicationOrPersonalAccessToken({
      env,
      instance,
      prefer: usePersonalAccessToken ? "personal" : "application",
    });

    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const { result, waitFor, mapDefaultEnv } = await spinner({
      startMessage: `Creating ${type}`,
      task: async () => {
        return createFunction(settlemint, env);
      },
      stopMessage: `${capitalizeFirstLetter(type)} created`,
    });

    if (wait) {
      await waitForCompletion({
        settlemint,
        type: waitFor?.resourceType ?? type,
        uniqueName: waitFor?.uniqueName ?? result.uniqueName,
        action: "deploy",
        restartIfTimeout,
      });

      if (waitFor) {
        outro(`${capitalizeFirstLetter(waitFor.resourceType)} ${waitFor.name} created successfully`);
      }
    }

    if (isDefault && typeof mapDefaultEnv === "function") {
      const defaultEnv = mapDefaultEnv();
      const updatedEnv = defaultEnv instanceof Promise ? await defaultEnv : defaultEnv;
      const isApplicationChanged = updatedEnv.SETTLEMINT_APPLICATION === env.SETTLEMINT_APPLICATION;
      const newEnv: Partial<DotEnv> = isApplicationChanged
        ? {
            SETTLEMINT_ACCESS_TOKEN: usePersonalAccessToken ? env.SETTLEMINT_ACCESS_TOKEN : accessToken,
            SETTLEMINT_INSTANCE: instance,
            ...updatedEnv,
          }
        : {
            ...env,
            ...updatedEnv,
          };
      if (isApplicationChanged && updatedEnv.SETTLEMINT_APPLICATION) {
        newEnv.SETTLEMINT_WORKSPACE = (
          await settlemint.application.read(updatedEnv.SETTLEMINT_APPLICATION)
        ).workspace.uniqueName;
      }
      if (newEnv.SETTLEMINT_BLOCKCHAIN_NODE && newEnv.SETTLEMINT_BLOCKCHAIN_NODE !== env.SETTLEMINT_BLOCKCHAIN_NODE) {
        newEnv.SETTLEMINT_BLOCKCHAIN_NETWORK = (
          await settlemint.blockchainNode.read(newEnv.SETTLEMINT_BLOCKCHAIN_NODE)
        ).blockchainNetwork.uniqueName;
      }
      await writeEnvSpinner(!!prod, newEnv);
      note(`${capitalizeFirstLetter(type)} ${result.name} set as default`);
    }

    outro(`${capitalizeFirstLetter(type)} ${result.name} created successfully`);
  });

  return cmd;
}
