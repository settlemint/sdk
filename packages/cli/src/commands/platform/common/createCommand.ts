import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import type { DotEnv } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, spinner } from "@settlemint/sdk-utils/terminal";
import isInCi from "is-in-ci";

export function getCreateCommand<CreateOptions>({
  type,
  alias,
  examples,
  addOptionsAndExecute,
}: {
  type: "application" | "workspace";
  alias: string;

  examples: string[];
  addOptionsAndExecute: (
    cmd: Command<
      [string],
      {
        accept?: true | undefined;
        default?: true | undefined;
        prod?: true | undefined;
      }
    >,
    baseAction: (args: {
      accept?: true | undefined;
      default?: true | undefined;
      prod?: true | undefined;
      createFunction: (settlemintClient: SettlemintClient) => Promise<{ id: string; name: string }>;
    }) => void | Promise<void>,
  ) => void;
}) {
  const cmd = new Command(type)
    .alias(alias)
    .description(
      `Create a new ${type} in the SettleMint platform.

  Examples:
    ${examples.join("\n\n")}`,
    )
    .argument("<name>", `The ${type} name`)
    .option("-a, --accept", "Accept the default values")
    .option("-d, --default", `Save as default ${type}`)
    .option("--prod", "Connect to production environment");

  // Add any additional options passed in
  addOptionsAndExecute(cmd, async ({ accept, prod, default: isDefault, createFunction }) => {
    intro(`Creating ${type} in the SettleMint platform`);

    const autoAccept = !!accept || isInCi;
    const env: Partial<DotEnv> = await loadEnv(false, !!prod);

    const accessToken = await accessTokenPrompt(env, autoAccept);
    const instance = await instancePrompt(env, autoAccept);
    const settlemint = createSettleMintClient({
      accessToken,
      instance,
    });

    const result = await spinner({
      startMessage: `Creating ${type}`,
      task: async () => {
        return createFunction(settlemint);
      },
      stopMessage: `${type} created`,
    });

    if (isDefault) {
      const newEnv: Partial<DotEnv> = {
        SETTLEMINT_ACCESS_TOKEN: accessToken,
        SETTLEMINT_INSTANCE: instance,
      };
      if (type === "workspace") {
        newEnv.SETTLEMINT_WORKSPACE = env.SETTLEMINT_WORKSPACE;
      }
      if (type === "application") {
        newEnv.SETTLEMINT_WORKSPACE = env.SETTLEMINT_WORKSPACE; // TODO: this could be coming from create options
        newEnv.SETTLEMINT_APPLICATION = result.id;
      }
      await writeEnvSpinner(!!prod, newEnv);
      note(`${type} ${result.name} set as default`);
    }

    outro(`${type} ${result.name} created successfully`);
  });

  return cmd;
}
