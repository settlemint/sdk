import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { applicationsSpinner } from "@/spinners/applications.spinner";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getInstanceCredentials } from "@/utils/config";
import { getApplicationUrl, getWorkspaceUrl } from "@/utils/get-platform-url";
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { Command, Option } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export function applicationsListCommand() {
  return new Command("applications")
    .alias("a")
    .description("List applications")
    .usage(
      createExamples([
        {
          description: "List applications",
          command: "platform list applications",
        },
        {
          description: "List applications in wide format with more information",
          command: "platform list applications -o wide",
        },
        {
          description: "List applications in JSON format",
          command: "platform list applications -o json > applications.json",
        },
        {
          description: "List applications in YAML format",
          command: "platform list applications -o yaml > applications.yaml",
        },
      ]),
    )
    .option(
      "-w, --workspace <workspace>",
      "The workspace unique name to list applications for (defaults to workspace from env)",
    )
    .addOption(new Option("-o, --output <output>", "The output format").choices(["wide", "json", "yaml"]))
    .action(async ({ workspace, output }) => {
      intro("Listing applications");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const selectedInstance = await instancePrompt({
        env,
        accept: true,
      });
      const personalAccessToken = await getInstanceCredentials(selectedInstance);

      if (!personalAccessToken) {
        return missingPersonalAccessTokenError();
      }

      const settlemint = createSettleMintClient({
        accessToken: personalAccessToken.personalAccessToken,
        instance: selectedInstance,
      });

      const workspaceUniqueName = workspace ?? env.SETTLEMINT_WORKSPACE ?? (await selectWorkspace(settlemint, env));
      const applications = await applicationsSpinner(settlemint, workspaceUniqueName);
      const applicationsData = applications.map((application) => {
        const basicFields = {
          name: application.name,
          uniqueName: application.uniqueName,
        };

        if (output) {
          return {
            ...basicFields,
            url: getApplicationUrl(selectedInstance, application),
          };
        }

        return basicFields;
      });

      const selectedWorkspace = await settlemint.workspace.read(workspaceUniqueName);

      if (output === "json") {
        jsonOutput(applicationsData);
      } else if (output === "yaml") {
        yamlOutput(applicationsData);
      } else {
        table(
          `Applications for workspace ${selectedWorkspace.name} (${selectedWorkspace.uniqueName}) - ${getWorkspaceUrl(selectedInstance, selectedWorkspace)}`,
          applicationsData,
        );
      }

      outro("Applications listed");
    });
}

async function selectWorkspace(settlemint: SettlemintClient, env: Partial<DotEnv>) {
  const workspaces = await workspaceSpinner(settlemint);
  const workspace = await workspacePrompt(env, workspaces, true);
  return workspace.uniqueName;
}
