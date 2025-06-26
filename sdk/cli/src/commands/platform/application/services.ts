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
import { jsonOutput } from "@/utils/output/json-output";
import { yamlOutput } from "@/utils/output/yaml-output";
import { Command, Option } from "@commander-js/extra-typings";
import { type SettlemintClient, createSettleMintClient } from "@settlemint/sdk-js";
import { capitalizeFirstLetter } from "@settlemint/sdk-utils";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, table } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import { formatHealthStatus } from "../utils/formatting/format-health-status";
import { formatStatus } from "../utils/formatting/format-status";

export const SERVICE_TYPES: ServiceType[] = [
  "blockchain-network",
  "blockchain-node",
  "load-balancer",
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
      "--app, --application <application>",
      "The application unique name to list the services in (defaults to application from env)",
    )
    .addOption(new Option("-t, --type <type...>", "The type(s) of service to list").choices(SERVICE_TYPES))
    .addOption(new Option("-o, --output <output>", "The output format").choices(["wide", "json", "yaml"]))
    .arguments("[typeOperands...]")
    .action(async (typeOperands, options) => {
      intro("Listing application services");

      const env: Partial<DotEnv> = await loadEnv(false, false);
      const selectedInstance = await instancePrompt({
        env,
        accept: true,
      });
      const personalAccessToken = await getInstanceCredentials(selectedInstance);
      if (!personalAccessToken) {
        return missingPersonalAccessTokenError();
      }
      const accessToken = personalAccessToken.personalAccessToken;
      const settlemint = createSettleMintClient({
        accessToken,
        instance: selectedInstance,
      });

      const printToTerminal = !options.output || options.output === "wide";
      const applicationUniqueName =
        options.application ??
        env.SETTLEMINT_APPLICATION ??
        (printToTerminal ? await selectApplication(settlemint, env) : null);

      if (!applicationUniqueName) {
        return nothingSelectedError("application");
      }

      let effectiveTypes: ServiceType[] | undefined;
      if (options.type && options.type.length > 0) {
        effectiveTypes = options.type as ServiceType[];
      } else if (typeOperands && typeOperands.length > 0) {
        effectiveTypes = typeOperands.filter((op) => SERVICE_TYPES.includes(op as ServiceType)) as ServiceType[];
        if (effectiveTypes.length === 0 && typeOperands.length > 0) {
          // If operands were provided but none were valid, it's like asking for invalid types.
          // Depending on desired behavior, could warn or proceed as if no types specified.
          // For now, let it proceed (will show no services for these invalid types or all if effectiveTypes is empty but not undefined).
          // To be stricter, one might throw an error or inform the user.
        }
      }

      const wide = options.output === "wide";
      const servicesToShow = await getServicesAndMapResults({
        instance: selectedInstance,
        settlemint,
        applicationUniqueName,
        types: effectiveTypes,
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

      if (options.output === "json") {
        jsonOutput(data);
      } else if (options.output === "yaml") {
        yamlOutput(data);
      } else {
        table(
          `Services for ${selectedApplication.name} (${applicationUniqueName}) - ${getApplicationUrl(selectedInstance, selectedApplication)}`,
          servicesToShow,
        );
      }

      outro("Application services listed");
    });
}

export async function selectApplication(settlemint: SettlemintClient, env: Partial<DotEnv>) {
  const workspaces = await workspaceSpinner(settlemint);
  const workspace = await workspacePrompt(env, workspaces, true);
  const applications = await applicationsSpinner(settlemint, workspace.uniqueName);
  const selectedApplication = await applicationPrompt(env, applications, true);
  return selectedApplication.uniqueName;
}

export async function getServicesAndMapResults({
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
      const [_, labels] = Object.entries(LABELS_MAP).find(([_key, value]) => value.command === serviceType) ?? [
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
    case "load-balancer":
      return services.loadBalancers;
    default:
      return [];
  }
}
