import { formatServiceSubType } from "@/commands/platform/utils/formatting/format-service-sub-type";
import { LABELS_MAP } from "@/constants/resource-type";
import { missingPersonalAccessTokenError } from "@/error/missing-config-error";
import { nothingSelectedError } from "@/error/nothing-selected-error";
import { applicationPrompt } from "@/prompts/application.prompt";
import { instancePrompt } from "@/prompts/instance.prompt";
import { workspacePrompt } from "@/prompts/workspace.prompt";
import { applicationsSpinner } from "@/spinners/applications.spinner";
import { type ServiceType, servicesSpinner } from "@/spinners/services.spinner";
import { workspaceSpinner } from "@/spinners/workspaces.spinner";
import { createExamples } from "@/utils/commands/create-examples";
import { getInstanceCredentials } from "@/utils/config";
import { getApplicationUrl, getClusterServicePlatformUrl, getWorkspaceUrl } from "@/utils/get-platform-url";
import { Command, Option } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { stringify } from "yaml";
import { formatHealthStatus } from "../utils/formatting/format-health-status";
import { formatStatus } from "../utils/formatting/format-status";

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
          command: "platform list services",
        },
        {
          description: "List the application services in wide format with more information (such as console url)",
          command: "platform list services -o wide",
        },
        {
          description: "List the application services in JSON format",
          command: "platform list services -o json > services.json",
        },
        {
          description: "List the application services in YAML format",
          command: "platform list services -o yaml > services.yaml",
        },
        {
          description: "List the application services for a specific application",
          command: "platform list services --application my-app",
        },
        {
          description: "List the application services for a specific application and type",
          command: "platform list services --application my-app --type middleware",
        },
        {
          description: "List the application services for multiple types",
          command: "platform list services --type blockchain-network blockchain-node middleware",
        },
      ]),
    )
    .option(
      "-app, --application <application>",
      "The application unique name to list the services in (defaults to application from env)",
    )
    .addOption(new Option("-t, --type <type...>", "The type(s) of service to list").choices(SERVICE_TYPES))
    .addOption(
      new Option(
        "-o, --output <output>",
        "The output format. For 'wide' format, disable terminal line wrapping for best results (use 'tput rmam' command on Unix systems)",
      ).choices(["wide", "json", "yaml"]),
    )
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
        application ??
        env.SETTLEMINT_APPLICATION ??
        (printToTerminal ? await selectApplication(settlemint, env) : null);

      if (!applicationUniqueName) {
        return nothingSelectedError("application");
      }

      const wide = output === "wide";
      const servicesToShow = await getServicesAndMapResults({
        instance: selectedInstance,
        settlemint,
        applicationUniqueName,
        types: type,
        printToTerminal,
        wide,
      });
      const selectedApplication = await settlemint.application.read(applicationUniqueName);
      const data = {
        workspace: {
          uniqueName: selectedApplication.workspace.uniqueName,
          name: selectedApplication.workspace.name,
          url: getWorkspaceUrl(selectedInstance, selectedApplication.workspace),
        },
        application: {
          uniqueName: selectedApplication.uniqueName,
          name: selectedApplication.name,
          url: getApplicationUrl(selectedInstance, selectedApplication),
        },
        services: servicesToShow,
      };
      if (printToTerminal) {
        table(
          `Services for ${selectedApplication.name} (${applicationUniqueName}) - ${getApplicationUrl(selectedInstance, selectedApplication)}`,
          servicesToShow,
        );
      } else if (output === "json") {
        console.log(JSON.stringify(data, null, 2));
      } else if (output === "yaml") {
        console.log(stringify(data));
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
  instance,
  settlemint,
  applicationUniqueName,
  types,
  printToTerminal,
  wide,
}: {
  instance: string;
  settlemint: SettlemintClient;
  applicationUniqueName: string;
  types?: ServiceType[];
  printToTerminal: boolean;
  wide: boolean;
}) {
  const application = await settlemint.application.read(applicationUniqueName);
  const services = await servicesSpinner(settlemint, applicationUniqueName, types);
  const results = (types ?? SERVICE_TYPES)
    .filter((serviceType) => !types || types.includes(serviceType))
    .map((serviceType) => {
      const [_, labels] = Object.entries(LABELS_MAP).find(([key, value]) => value.command === serviceType) ?? [
        null,
        { plural: serviceType },
      ];
      const serviceItems = getItemsForServiceType(services, serviceType);

      if (serviceItems.length === 0 && !types) {
        return null;
      }

      return serviceItems.map((s) => {
        const basicFields = {
          group: capitalizeFirstLetter(labels.plural),
          name: s.name,
          uniqueName: s.uniqueName,
          status: formatStatus(s.status, printToTerminal),
          healthStatus: formatHealthStatus(s.healthStatus, printToTerminal),
          type: formatServiceSubType(s, printToTerminal),
          provider: s.provider,
          region: s.region,
        };
        if (wide || !printToTerminal) {
          return {
            ...basicFields,
            url: getClusterServicePlatformUrl(instance, application, s, serviceType),
          };
        }
        return basicFields;
      });
    })
    .filter((result): result is NonNullable<typeof result> => result !== null);

  return results.flat();
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
