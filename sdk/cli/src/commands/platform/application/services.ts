import { formatServiceSubType } from "@/commands/platform/utils/formatting/format-service-sub-type";
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
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { formatHealthStatus } from "../utils/formatting/format-health-status";
import { formatStatus } from "../utils/formatting/format-status";

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
          description: "List the application services in wide format with more information (such as console url)",
          command: "settlemint platform application get -o wide",
        },
        {
          description: "List the application services in JSON format",
          command: "settlemint platform application get -o json > services.json",
        },
        {
          description: "List the application services in YAML format",
          command: "settlemint platform application get -o yaml > services.yaml",
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
    .addOption(new Option("-o, --output <output>", "The output format").choices(["wide", "json", "yaml"]))
    .action(async ({ application, type, output }) => {
      const printToTerminal = !output || output === "wide";
      if (printToTerminal) {
        intro("Listing application services");
      }
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

      const servicesToShow = await getServicesAndMapResults({
        settlemint,
        applicationUniqueName,
        types: type,
        printToTerminal,
      });
      if (printToTerminal) {
        for (const service of servicesToShow) {
          table(service.label, service.items);
        }
      } else {
        console.log(JSON.stringify(servicesToShow, null, 2));
      }
      if (printToTerminal) {
        outro("Application services listed");
      }
    });
}

async function selectApplication(settlemint: SettlemintClient, env: Partial<DotEnv>) {
  const workspaces = await workspaceSpinner(settlemint);
  const workspace = await workspacePrompt(env, workspaces, true);
  const applications = await applicationsSpinner(settlemint, workspace.uniqueName);
  const selectedApplication = await applicationPrompt(env, applications, true);
  return selectedApplication.uniqueName;
}

async function getServicesAndMapResults({
  settlemint,
  applicationUniqueName,
  types,
  printToTerminal,
}: {
  settlemint: SettlemintClient;
  applicationUniqueName: string;
  types?: ServiceType[];
  printToTerminal: boolean;
}) {
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
          status: formatStatus(m.status, printToTerminal),
          healthSatus: formatHealthStatus(m.healthStatus, printToTerminal),
          type: formatServiceSubType(m, printToTerminal),
          provider: m.provider,
          region: m.region,
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
