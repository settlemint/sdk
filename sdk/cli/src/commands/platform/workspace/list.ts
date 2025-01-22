import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { instancePrompt } from "@/prompts/instance.prompt";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getInstanceCredentials } from "@/utils/config";
import { getWorkspaceUrl } from "@/utils/get-platform-url";
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { Command, Option } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";

export function workspacesListCommand() {
  return new Command("workspaces")
    .alias("w")
    .description("List workspaces")
    .usage(
      createExamples([
        {
          description: "List workspaces",
          command: "platform list workspaces",
        },
        {
          description: "List workspaces in wide format with more information",
          command: "platform list workspaces -o wide",
        },
        {
          description: "List workspaces in JSON format",
          command: "platform list workspaces -o json > workspaces.json",
        },
        {
          description: "List workspaces in YAML format",
          command: "platform list workspaces -o yaml > workspaces.yaml",
        },
      ]),
    )
    .addOption(new Option("-o, --output <output>", "The output format").choices(["wide", "json", "yaml"]))
    .action(async ({ output }) => {
      const printToTerminal = !output || output === "wide";
      if (printToTerminal) {
        intro("Listing workspaces");
      }

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const selectedInstance = await instancePrompt(env, true);
      const personalAccessToken = await getInstanceCredentials(selectedInstance);

      if (!personalAccessToken) {
        return missingPersonalAccessTokenError();
      }

      const settlemint = createSettleMintClient({
        accessToken: personalAccessToken.personalAccessToken,
        instance: selectedInstance,
      });

      const workspaces = await workspaceSpinner(settlemint);
      const wide = output === "wide";
      const workspacesData = workspaces.map((workspace) => {
        const basicFields = {
          name: workspace.name,
          uniqueName: workspace.uniqueName,
        };

        if (wide || !printToTerminal) {
          return {
            ...basicFields,
            url: getWorkspaceUrl(selectedInstance, workspace),
          };
        }

        return basicFields;
      });

      if (printToTerminal) {
        table("Workspaces", workspacesData);
      } else if (output === "json") {
        jsonOutput(workspacesData);
      } else if (output === "yaml") {
        yamlOutput(workspacesData);
      }

      if (printToTerminal) {
        outro("Workspaces listed");
      }
    });
}
