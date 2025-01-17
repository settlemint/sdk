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
import { camelCaseToWords, capitalizeFirstLetter, replaceUnderscoresAndHyphensWithSpaces } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
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

      const servicesToShow = await getServicesAndMapResults(settlemint, applicationUniqueName, type);
      for (const service of servicesToShow) {
        table(service.label, service.items);
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
      if (serviceItems.length === 0 && !types) {
        continue;
      }
      results.push({
        label: capitalizeFirstLetter(labels.plural),
        items: serviceItems.map((m) => ({
          name: m.name,
          uniqueName: m.uniqueName,
          status: formatStatus(m.status),
          healthSatus: formatHealthStatus(m.healthStatus),
          type: getServiceSubType(m),
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

function formatStatus(status: BlockchainNode["status"]) {
  const label = camelCaseToWords(status.toLowerCase());
  if (status === "FAILED") {
    return redBright(label);
  }
  if (status === "PAUSED" || status === "AUTO_PAUSED" || status === "PAUSING" || status === "AUTO_PAUSING") {
    return gray(label);
  }
  if (status === "COMPLETED") {
    return greenBright(label);
  }
  return yellowBright(label);
}

function formatHealthStatus(healthStatus: BlockchainNode["healthStatus"]) {
  if (healthStatus === "HEALTHY") {
    return greenBright("Healthy");
  }
  return yellowBright(`Unhealthy (${camelCaseToWords(replaceUnderscoresAndHyphensWithSpaces(healthStatus))})`);
}

function getServiceSubType(service: object) {
  if ("__typename" in service && typeof service.__typename === "string") {
    return camelCaseToWords(service.__typename);
  }
  return "Unknown";
}
