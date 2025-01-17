import { LABELS_MAP } from "@/constants/resource-type";
import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { applicationPrompt } from "@/prompts/application.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { applicationsSpinner } from "@/spinners/applications.spinner";
import { type ServiceType, servicesSpinner } from "@/spinners/services.spinner";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getInstanceCredentials } from "@/utils/config";
import { Command, Option } from "@commander-js/extra-typings";
import { type BlockchainNode, type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, note, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { gray, greenBright, redBright, yellowBright } from "yoctocolors";

interface ServiceItem {
  name: string;
  uniqueName: string;
  status: string;
}

const SERVICE_TYPES: ServiceType[] = [
  "blockchain-network",
  "blockchain-node",
  "custom-deployment",
  "insights",
  "integration-tool",
  "middleware",
  "private-key",
  "storage",
];

export function servicesCommand() {
  return new Command("services")
    .alias("s")
    .description("List the application services")
    .usage(
      createExamples([
        {
          description: "List the application services",
          command: "settlemint platform application get",
        },
        {
          description: "List the application services for a specific application",
          command: "settlemint platform application get --application my-app",
        },
        {
          description: "List the application services for a specific application and type",
          command: "settlemint platform application get --application my-app --type middleware",
        },
        {
          description: "List the application services for multiple types",
          command: "settlemint platform application get --type blockchain-network blockchain-node middleware",
        },
      ]),
    )
    .option(
      "-app, --application <application>",
      "The application unique name to list the services in (defaults to application from env)",
    )
    .addOption(new Option("-t, --type <type...>", "The type(s) of service to list").choices(SERVICE_TYPES))
    .action(async ({ application, type }, cmd) => {
      intro("Listing application services");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const selectedInstance = await instancePrompt(env, true);
      const personalAccessToken = await getInstanceCredentials(selectedInstance);
      if (!personalAccessToken) {
        return missingPersonalAccessTokenError();
      }
      const accessToken = personalAccessToken.personalAccessToken;
      const settlemint = createSettleMintClient({
        accessToken,
        instance: selectedInstance,
      });

      const applicationUniqueName =
        application ?? env.SETTLEMINT_APPLICATION ?? (await selectApplication(settlemint, env));

      const itemsToShow = await getServicesAndMapResults(settlemint, applicationUniqueName, type);
      for (const item of itemsToShow) {
        note(item.label);
        table(item.items);
      }

      outro("Application services listed");
    });
}

async function selectApplication(settlemint: SettlemintClient, env: Partial<DotEnv>) {
  const workspaces = await workspaceSpinner(settlemint);
  const workspace = await workspacePrompt(env, workspaces, true);
  const applications = await applicationsSpinner(settlemint, workspace.uniqueName);
  const selectedApplication = await applicationPrompt(env, applications, true);
  return selectedApplication.uniqueName;
}

async function getServicesAndMapResults(
  settlemint: SettlemintClient,
  applicationUniqueName: string,
  types?: ServiceType[],
) {
  const services = await servicesSpinner(settlemint, applicationUniqueName, types);
  const results: {
    label: string;
    items: ServiceItem[];
  }[] = [];
  for (const serviceType of types ?? SERVICE_TYPES) {
    if (!types || types?.includes(serviceType)) {
      const [_, labels] = Object.entries(LABELS_MAP).find(([key, value]) => value.command === serviceType) ?? [
        null,
        { plural: serviceType },
      ];
      const serviceItems = getItemsForServiceType(services, serviceType);
      results.push({
        label: capitalizeFirstLetter(labels.plural),
        items: serviceItems.map((m) => ({
          name: m.name,
          uniqueName: m.uniqueName,
          status: colorizeStatus(m.status),
          url: "TODO",
        })),
      });
    }
  }
  return results;
}

function getItemsForServiceType(services: Awaited<ReturnType<typeof servicesSpinner>>, serviceType: ServiceType) {
  switch (serviceType) {
    case "middleware":
      return services.middlewares;
    case "integration-tool":
      return services.integrationTools;
    case "storage":
      return services.storages;
    case "private-key":
      return services.privateKeys;
    case "insights":
      return services.insights;
    case "custom-deployment":
      return services.customDeployments;
    case "blockchain-network":
      return services.blockchainNetworks;
    case "blockchain-node":
      return services.blockchainNodes;
    default:
      return [];
  }
}

function colorizeStatus(status: BlockchainNode["status"]) {
  if (status === "FAILED") {
    return redBright(status);
  }
  if (status === "PAUSED" || status === "AUTO_PAUSED" || status === "PAUSING" || status === "AUTO_PAUSING") {
    return gray(status);
  }
  if (
    status === "DEPLOYING" ||
    status === "RESTARTING" ||
    status === "SCALING" ||
    status === "WAITING" ||
    status === "RETRYING" ||
    status === "RESUMING" ||
    status === "CONNECTING" ||
    status === "DESTROYING"
  ) {
    return yellowBright(status);
  }
  return greenBright(status);
}
