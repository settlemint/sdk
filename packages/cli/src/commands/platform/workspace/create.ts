import { accessTokenPrompt } from "@/commands/connect/accesstoken.prompt";
import { instancePrompt } from "@/commands/connect/instance.prompt";
import { writeEnvSpinner } from "@/commands/connect/write-env.spinner";
import { Command } from "@commander-js/extra-typings";
import { createSettleMintClient } from "@settlemint/sdk-js";
import { loadEnv } from "@settlemint/sdk-utils/environment";
import { intro, outro, spinner } from "@settlemint/sdk-utils/terminal";
import type { DotEnv } from "@settlemint/sdk-utils/validation";
import isInCi from "is-in-ci";

/**
 * Creates and returns the 'workspace' command for the SettleMint SDK.
 * This command creates a new workspace in the SettleMint platform.
 * It takes a name and optional description for the workspace.
 *
 * @returns {Command} The configured 'workspace' command
 */
export function workspaceCreateCommand(): Command<[name: string], { prod?: boolean; description?: string }> {
  return new Command("workspace")
    .alias("w")
    .argument("<name>", "The name of the workspace")
    .option("-a, --accept", "Accept the default and previously set values")
    .option("-d, --default", "Save this workspace as the default one in your .env file")
    .option("--prod", "Connect to your production environment")
    .option("--description <description>", "Description of the workspace")
    .option("--tax-id-value <taxIdValue>", "Tax ID value")
    .option("--tax-id-type <taxIdType>", "Tax ID type")
    .option("--postal-code <postalCode>", "Postal code")
    .option("--payment-method-id <paymentMethodId>", "Payment method ID")
    .option("--parent-id <parentId>", "Parent workspace ID")
    .option("--country <country>", "Country")
    .option("--company-name <companyName>", "Company name")
    .option("--city <city>", "City")
    .option("--address-line-2 <addressLine2>", "Address line 2")
    .option("--address-line-1 <addressLine1>", "Address line 1")
    .action(
      async (
        name,
        {
          accept,
          default: isDefault,
          prod,
          taxIdValue,
          taxIdType,
          postalCode,
          paymentMethodId,
          parentId,
          country,
          companyName,
          city,
          addressLine2,
          addressLine1,
        },
      ) => {
        intro("Creating workspace in the SettleMint platform");

        const autoAccept = !!accept || isInCi;
        const env: Partial<DotEnv> = await loadEnv(false, !!prod);

        const accessToken = await accessTokenPrompt(env, autoAccept);
        const instance = await instancePrompt(env, autoAccept);

        const settlemint = createSettleMintClient({
          accessToken,
          instance,
        });

        const workspace = await spinner({
          startMessage: "Creating workspace",
          task: async () => {
            return settlemint.workspace.create({
              name,
              taxIdValue,
              taxIdType,
              postalCode,
              paymentMethodId,
              parentId,
              country,
              companyName,
              city,
              addressLine2,
              addressLine1,
            });
          },
          stopMessage: "Workspace created",
        });

        outro(`Workspace ${workspace.name} created successfully`);

        if (isDefault) {
          await writeEnvSpinner(!!prod, {
            SETTLEMINT_ACCESS_TOKEN: accessToken,
            SETTLEMINT_INSTANCE: instance,
            SETTLEMINT_WORKSPACE: workspace.id,
          });
        }
      },
    );
}
