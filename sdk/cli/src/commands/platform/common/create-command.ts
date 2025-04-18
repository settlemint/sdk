import { waitForCompletion } from "@/commands/platform/utils/wait-for-completion";
import type { ResourceType } from "@/constants/resource-type";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { providerPrompt } from "@/prompts/provider.prompt";
import { regionPrompt } from "@/prompts/region.prompt";
import { writeEnvSpinner } from "@/spinners/write-env.spinner";
import { type CommandExample, createExamples } from "@/utils/commands/create-examples";
import { sanitizeCommandName } from "@/utils/commands/sanitize-command-name";
import { getApplicationOrPersonalAccessToken } from "@/utils/get-app-or-personal-token";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

type DefaultArgs = {
  acceptDefaults?: true | undefined;
  default?: true | undefined;
  prod?: true | undefined;
  wait?: true | undefined;
  restartIfTimeout?: true | undefined;
  provider?: string | undefined;
  region?: string | undefined;
};

type CreateFunctionContext = {
  settlemint: SettlemintClient;
  env: Partial<DotEnv>;
  showSpinner: <T>(task: () => Promise<T>) => Promise<T>;
  provider?: string;
  region?: string;
};
/**
 * Creates a command for creating resources in the SettleMint platform.
 *
 * @param options - Configuration options for the create command
 * @param options.name - The name of the command
 * @param options.type - The type of resource to create
 * @param options.subType - The sub-type of resource to create
 * @param options.alias - Command alias for shorthand usage
 * @param options.examples - Array of example usage strings showing different ways to use the command
 * @param options.execute - Function to configure and execute the create command
 * @param options.execute.cmd - The Commander command instance to configure with options and action
 * @param options.execute.baseAction - Base action function that handles common create functionality like env loading and client setup
 * @param options.usePersonalAccessToken - Whether to use personal access token for auth (defaults to true)
 * @param options.requiresDeployment - Whether the resource requires deployment (defaults to true)
 * @returns A configured Commander command for creating the specified resource type
 */
export function getCreateCommand({
  name,
  type,
  subType,
  alias,
  examples,
  execute,
  usePersonalAccessToken = true,
  requiresDeployment = true,
}: {
  name: string;
  type: ResourceType;
  subType?: string;
  alias: string;
  examples: CommandExample[];
  execute: (
    cmd: Command<[string], DefaultArgs>,
    baseAction: (
      defaultArgs: DefaultArgs,
      createFunction: (context: CreateFunctionContext) => Promise<{
        result: { id: string; name: string; uniqueName: string };
        waitFor?: { resourceType: ResourceType; id: string; name: string; uniqueName: string };
        mapDefaultEnv?: () => Partial<DotEnv> | Promise<Partial<DotEnv>>;
      }>,
    ) => void | Promise<void>,
  ) => void;
  usePersonalAccessToken?: boolean;
  requiresDeployment?: boolean;
}) {
  const cmd = new Command(sanitizeCommandName(name))
    .alias(alias)
    .description(`Create a new ${subType ? `${subType} ${type}` : type} in the SettleMint platform.`)
    .usage(createExamples(examples))
    .argument("<name>", `The ${subType ? `${subType} ${type}` : type} name`)
    .option("-a, --accept-defaults", "Accept the default values")
    .option("-d, --default", `Save as default ${type}`)
    .option("--prod", "Connect to production environment");

  if (requiresDeployment) {
    cmd
      .option("-w, --wait", "Wait until deployed")
      .option("-r, --restart-if-timeout", "Restart if wait time is exceeded");
  }

  execute(
    cmd,
    async ({ acceptDefaults, prod, default: isDefault, wait, restartIfTimeout, provider, region }, createFunction) => {
      intro(`Creating ${type} in the SettleMint platform`);

      const env: Partial<DotEnv> = await loadEnv(false, !!prod);

      const instance = await instancePrompt(env, acceptDefaults);
      const accessToken = await getApplicationOrPersonalAccessToken({
        env,
        instance,
        prefer: usePersonalAccessToken ? "personal" : "application",
      });

      const settlemint = createSettleMintClient({
        accessToken,
        instance,
      });
      const platformConfig = await settlemint.platform.config();

      let selectedProvider: Awaited<ReturnType<typeof providerPrompt>> | undefined = undefined;
      let selectedRegion: Awaited<ReturnType<typeof regionPrompt>> | undefined = undefined;
      if (cmd.options.some((option) => option.long === "--provider")) {
        selectedProvider = await providerPrompt(platformConfig, provider);
        if (!selectedProvider) {
          return nothingSelectedError("provider");
        }

        selectedRegion = await regionPrompt(selectedProvider, region);
        if (!selectedRegion) {
          return nothingSelectedError("region");
        }
      }

      const showSpinner = <T>(task: () => Promise<T>) =>
        spinner({
          startMessage: `Creating ${type}`,
          task: task,
          stopMessage: `${capitalizeFirstLetter(type)} created`,
        });
      const { result, waitFor, mapDefaultEnv } = await createFunction({
        settlemint,
        env,
        showSpinner,
        provider: selectedProvider?.id,
        region: selectedRegion?.id,
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
        const isApplicationChanged = updatedEnv.SETTLEMINT_APPLICATION !== env.SETTLEMINT_APPLICATION;
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
    },
  );

  return cmd;
}
